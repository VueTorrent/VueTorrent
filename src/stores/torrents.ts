import { useArrayFilter, useSorted, whenever } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, MaybeRefOrGetter, ref, shallowRef, toValue, triggerRef } from 'vue'
import { useAppStore } from './app'
import { useTorrentDetailStore } from './torrentDetail'
import { useTrackerStore } from './trackers'
import { useSearchQuery, useTorrentBuilder } from '@/composables'
import { comparatorMap, FilterType, TorrentState, TrackerSpecialFilter } from '@/constants/vuetorrent'
import qbit from '@/services/qbit'
import { RawQbitTorrent } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { FilterPreset, Torrent as VtTorrent } from '@/types/vuetorrent'

export const useTorrentStore = defineStore(
  'torrents',
  () => {
    const torrentStateNotAnnounced = [
      TorrentState.UNKNOWN,
      TorrentState.ERROR,
      TorrentState.MISSING_FILES,
      TorrentState.DL_STOPPED,
      TorrentState.UL_STOPPED,
      TorrentState.UL_QUEUED,
      TorrentState.DL_QUEUED,
      TorrentState.CHECKING_DISK,
      TorrentState.CHECKING_RESUME_DATA,
      TorrentState.MOVING,
    ]

    const appStore = useAppStore()
    const { buildFromQbit } = useTorrentBuilder()
    const trackerStore = useTrackerStore()

    const _torrents = shallowRef<Map<string, RawQbitTorrent>>(new Map())
    const torrents = computed(() =>
      Array.from(_torrents.value.entries()).map(([hash, v]) =>
        buildFromQbit({
          ...v,
          hash,
        })
      )
    )

    const filterType = ref(FilterType.CONJUNCTIVE)

    const isTextFilterActive = shallowRef(true)
    const textFilter = ref('')
    whenever(
      () => textFilter.value.length === 0,
      () => (isTextFilterActive.value = true)
    )

    const isStatusFilterActive = shallowRef(true)
    const statusFilter = ref<TorrentState[]>([])
    const torrentsByStatus = computed(() =>
      torrents.value.reduce(
        (acc, torrent) => {
          if (!acc[torrent.state]) {
            acc[torrent.state] = 0
          }
          acc[torrent.state] += 1
          return acc
        },
        {} as Record<TorrentState, number>
      )
    )
    whenever(
      () => statusFilter.value.length === 0,
      () => (isStatusFilterActive.value = true)
    )

    const isCategoryFilterActive = shallowRef(true)
    const categoryFilter = ref<string[]>([])
    whenever(
      () => categoryFilter.value.length === 0,
      () => (isCategoryFilterActive.value = true)
    )

    const isTagFilterActive = shallowRef(true)
    const tagFilterInclude = ref(new Array<string | null>())
    const tagFilterExclude = ref(new Array<string | null>())
    const tagFilterType = ref(FilterType.DISJUNCTIVE)
    whenever(
      () => tagFilterInclude.value.length + tagFilterExclude.value.length === 0,
      () => (isTagFilterActive.value = true)
    )

    const isTrackerFilterActive = shallowRef(true)
    const trackerFilterInclude = ref(new Array<string | TrackerSpecialFilter>())
    const trackerFilterExclude = ref(new Array<string | TrackerSpecialFilter>())
    const trackerFilterType = ref(FilterType.DISJUNCTIVE)
    const torrentsByTracker = computed(() =>
      torrents.value.reduce(
        (acc, torrent) => {
          const trackers = trackerStore.torrentHostnameTrackers.get(torrent.hash) ?? []
          if (trackers.length === 0) {
            acc[TrackerSpecialFilter.UNTRACKED] = (acc[TrackerSpecialFilter.UNTRACKED] ?? 0) + 1
            return acc
          }

          if (torrent.tracker === '' && !torrentStateNotAnnounced.includes(torrent.state)) {
            acc[TrackerSpecialFilter.NOT_WORKING] = (acc[TrackerSpecialFilter.NOT_WORKING] ?? 0) + 1
          }

          trackers.forEach(tracker => {
            if (!acc[tracker]) {
              acc[tracker] = 0
            }
            acc[tracker] += 1
          })
          return acc
        },
        {} as Record<string | TrackerSpecialFilter, number>
      )
    )
    whenever(
      () => trackerFilterInclude.value.length + trackerFilterExclude.value.length === 0,
      () => (isTrackerFilterActive.value = true)
    )

    const sortCriterias = ref<{ value: keyof VtTorrent; reverse: boolean }[]>([{ value: 'added_on', reverse: true }])

    const filterPresets = ref<FilterPreset[]>([])

    const effectiveFilters = computed<Omit<FilterPreset, 'id' | 'name'>>(() => ({
      filterType: filterType.value,
      textFilter: isTextFilterActive.value ? textFilter.value : '',
      statusFilter: isStatusFilterActive.value ? [...statusFilter.value] : [],
      categoryFilter: isCategoryFilterActive.value ? [...categoryFilter.value] : [],
      tagFilterInclude: isTagFilterActive.value ? [...tagFilterInclude.value] : [],
      tagFilterExclude: isTagFilterActive.value ? [...tagFilterExclude.value] : [],
      tagFilterType: tagFilterType.value,
      trackerFilterInclude: isTrackerFilterActive.value ? [...trackerFilterInclude.value] : [],
      trackerFilterExclude: isTrackerFilterActive.value ? [...trackerFilterExclude.value] : [],
      trackerFilterType: trackerFilterType.value,
    }))

    const hasAnyFilter = computed(() => {
      const f = effectiveFilters.value
      return (
        f.textFilter.length > 0 ||
        f.statusFilter.length > 0 ||
        f.categoryFilter.length > 0 ||
        f.tagFilterInclude.length + f.tagFilterExclude.length > 0 ||
        f.trackerFilterInclude.length + f.trackerFilterExclude.length > 0
      )
    })

    function sameItems<T>(a: T[], b: T[]) {
      return a.length === b.length && a.every(v => b.includes(v)) && b.every(v => a.includes(v))
    }

    function presetMatchesCurrentFilters(preset: FilterPreset) {
      const f = effectiveFilters.value
      return (
        preset.textFilter === f.textFilter &&
        sameItems(preset.statusFilter, f.statusFilter) &&
        sameItems(preset.categoryFilter, f.categoryFilter) &&
        sameItems(preset.tagFilterInclude, f.tagFilterInclude) &&
        sameItems(preset.tagFilterExclude, f.tagFilterExclude) &&
        sameItems(preset.trackerFilterInclude, f.trackerFilterInclude) &&
        sameItems(preset.trackerFilterExclude, f.trackerFilterExclude) &&
        (preset.statusFilter.length + preset.categoryFilter.length === 0 || preset.filterType === f.filterType) &&
        (preset.tagFilterInclude.length + preset.tagFilterExclude.length === 0 || preset.tagFilterType === f.tagFilterType) &&
        (preset.trackerFilterInclude.length + preset.trackerFilterExclude.length === 0 || preset.trackerFilterType === f.trackerFilterType)
      )
    }

    const activeFilterPresetId = computed(() => {
      if (!hasAnyFilter.value) return null
      return filterPresets.value.find(presetMatchesCurrentFilters)?.id ?? null
    })

    function saveFilterPreset(name: string) {
      const preset: FilterPreset = { id: uuidv4(), name: name.trim(), ...structuredClone(effectiveFilters.value) }
      filterPresets.value = [...filterPresets.value, preset]
      return preset
    }

    function applyFilterPreset(id: string) {
      const preset = filterPresets.value.find(p => p.id === id)
      if (!preset) return

      filterType.value = preset.filterType
      textFilter.value = preset.textFilter
      statusFilter.value = [...preset.statusFilter]
      categoryFilter.value = [...preset.categoryFilter]
      tagFilterInclude.value = [...preset.tagFilterInclude]
      tagFilterExclude.value = [...preset.tagFilterExclude]
      tagFilterType.value = preset.tagFilterType
      trackerFilterInclude.value = [...preset.trackerFilterInclude]
      trackerFilterExclude.value = [...preset.trackerFilterExclude]
      trackerFilterType.value = preset.trackerFilterType

      isTextFilterActive.value = true
      isStatusFilterActive.value = true
      isCategoryFilterActive.value = true
      isTagFilterActive.value = true
      isTrackerFilterActive.value = true
    }

    function clearFilters() {
      textFilter.value = ''
      statusFilter.value = []
      categoryFilter.value = []
      tagFilterInclude.value = []
      tagFilterExclude.value = []
      trackerFilterInclude.value = []
      trackerFilterExclude.value = []
    }

    function deleteFilterPreset(id: string) {
      filterPresets.value = filterPresets.value.filter(p => p.id !== id)
    }

    function matchStatus(t: VtTorrent): boolean {
      return statusFilter.value.includes(t.state)
    }
    function matchCategory(t: VtTorrent): boolean {
      return categoryFilter.value.includes(t.category)
    }
    function matchTag(t: VtTorrent): boolean {
      function matcher(tag: string | null) {
        if (tag === null) {
          return t.tags.length === 0
        }
        return t.tags.includes(tag)
      }

      switch (tagFilterType.value) {
        case FilterType.CONJUNCTIVE:
          return Array.from(tagFilterInclude.value).every(matcher) && Array.from(tagFilterExclude.value).every(t => !matcher(t))
        case FilterType.DISJUNCTIVE:
          return Array.from(tagFilterInclude.value).some(matcher) || Array.from(tagFilterExclude.value).some(t => !matcher(t))
      }
    }
    function matchTracker(t: VtTorrent) {
      const torrentTrackers = trackerStore.torrentHostnameTrackers.get(t.hash) ?? []

      function matcher(tracker: string | TrackerSpecialFilter) {
        switch (tracker) {
          case TrackerSpecialFilter.UNTRACKED:
            return torrentTrackers.length === 0
          case TrackerSpecialFilter.NOT_WORKING:
            return torrentTrackers.length > 0 && t.tracker === '' && !torrentStateNotAnnounced.includes(t.state)
          default:
            return torrentTrackers.includes(tracker)
        }
      }

      switch (trackerFilterType.value) {
        case FilterType.CONJUNCTIVE:
          return Array.from(trackerFilterInclude.value).every(matcher) && Array.from(trackerFilterExclude.value).every(t => !matcher(t))
        case FilterType.DISJUNCTIVE:
          return Array.from(trackerFilterInclude.value).some(matcher) || Array.from(trackerFilterExclude.value).some(t => !matcher(t))
      }
    }

    const torrentsWithNavbarFilters = useArrayFilter(torrents, torrent => {
      const matchResults = []

      if (statusFilter.value.length > 0 && isStatusFilterActive.value) {
        matchResults.push(matchStatus(torrent))
      }
      if (categoryFilter.value.length > 0 && isCategoryFilterActive.value) {
        matchResults.push(matchCategory(torrent))
      }
      if (tagFilterInclude.value.length + tagFilterExclude.value.length > 0 && isTagFilterActive.value) {
        matchResults.push(matchTag(torrent))
      }
      if (trackerFilterInclude.value.length + trackerFilterExclude.value.length > 0 && isTrackerFilterActive.value) {
        matchResults.push(matchTracker(torrent))
      }

      if (matchResults.length === 0) {
        return true
      }

      switch (filterType.value) {
        case FilterType.CONJUNCTIVE:
          return matchResults.every(Boolean)
        case FilterType.DISJUNCTIVE:
          return matchResults.some(Boolean)
      }
    })

    const { results: filteredTorrents } = useSearchQuery(
      torrentsWithNavbarFilters,
      () => (isTextFilterActive.value ? textFilter.value : null),
      torrent => [torrent.name, torrent.hash, torrent.download_path, torrent.savePath]
    )

    const filteredAndSortedTorrents = useSorted(filteredTorrents, (a, b) => {
      let i = 0
      let compareResult = 0
      while (i < sortCriterias.value.length && compareResult === 0) {
        const { value, reverse } = sortCriterias.value.at(i++)!
        compareResult = comparatorMap[value](a, b, !reverse)
      }
      if (compareResult === 0) {
        compareResult = comparatorMap.hash(a, b, true)
      }
      return compareResult
    })

    function syncFromMaindata(fullUpdate: boolean, entries: [string, Partial<RawQbitTorrent>][], removed?: string[]) {
      if (fullUpdate) {
        _torrents.value = new Map(entries as [string, RawQbitTorrent][])
        return
      }

      for (const [hash, qbitTorrent] of entries) {
        const torrent = _torrents.value.get(hash)
        if (torrent) {
          _torrents.value.set(hash, { ...torrent, ...qbitTorrent })
        } else {
          _torrents.value.set(hash, qbitTorrent as RawQbitTorrent)
        }
      }

      removed?.forEach(t => _torrents.value.delete(t))
      triggerRef(_torrents)
    }

    async function setTorrentCategory(hashes: string[], category: string) {
      await qbit.setCategory(hashes, category)
    }

    async function addTorrentTags(hashes: string[], tags: string[]) {
      await qbit.addTorrentTag(hashes, tags)
    }

    async function removeTorrentTags(hashes: string[], tags: string[]) {
      await qbit.removeTorrentTag(hashes, tags)
    }

    async function removeTorrentAllTags(hashes: string[]) {
      await qbit.removeTorrentAllTags(hashes)
    }

    function getTorrentByHash(hash: string) {
      return torrents.value.find(t => t.hash === hash)
    }

    function getTorrentIndexByHash(hash: string) {
      return filteredAndSortedTorrents.value.findIndex(t => t.hash === hash)
    }

    async function deleteTorrents(hashes: string[], deleteWithFiles: boolean) {
      await qbit.deleteTorrents(hashes, deleteWithFiles)
    }

    async function moveTorrents(mode: 'dl' | 'save', hashes: string[], newPath: string) {
      switch (mode) {
        case 'dl':
          return await qbit.setTorrentDownloadPath(hashes, newPath)
        case 'save':
          return await qbit.setTorrentSavePath(hashes, newPath)
      }
    }

    async function addTorrents(torrents: File[], urls: string | string[], payload?: AddTorrentPayload) {
      const links = Array.isArray(urls) ? urls.join('\n') : urls
      return qbit.addTorrents(torrents, links, payload)
    }

    async function reannounceTorrents(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.reannounceTorrents(toValue(hashes))
    }

    async function toggleSeqDl(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.toggleSequentialDownload(toValue(hashes))
    }

    async function toggleFLPiecePrio(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.toggleFirstLastPiecePriority(toValue(hashes))
    }

    async function toggleAutoTmm(hashes: MaybeRefOrGetter<string[]>, enable: MaybeRefOrGetter<boolean>) {
      await qbit.setAutoTMM(toValue(hashes), toValue(enable))
    }

    async function setSuperSeeding(hashes: MaybeRefOrGetter<string[]>, enable: MaybeRefOrGetter<boolean>) {
      await qbit.setSuperSeeding(toValue(hashes), toValue(enable))
    }

    async function renameTorrent(hash: string, newName: string) {
      await qbit.setTorrentName(hash, newName)
    }

    async function resumeTorrents(hashes: MaybeRefOrGetter<string[]>) {
      if (appStore.usesQbit5) {
        await qbit.startTorrents(toValue(hashes))
      } else {
        await qbit.resumeTorrents(toValue(hashes))
      }
    }

    async function resumeAllTorrents() {
      if (appStore.usesQbit5) {
        await qbit.startAllTorrents()
      } else {
        await qbit.resumeAllTorrents()
      }
    }

    async function forceStartTorrents(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.forceStartTorrents(toValue(hashes))
    }

    async function pauseTorrents(hashes: MaybeRefOrGetter<string[]>) {
      if (appStore.usesQbit5) {
        await qbit.stopTorrents(toValue(hashes))
      } else {
        await qbit.pauseTorrents(toValue(hashes))
      }
    }

    async function pauseAllTorrents() {
      if (appStore.usesQbit5) {
        await qbit.stopAllTorrents()
      } else {
        await qbit.pauseAllTorrents()
      }
    }

    async function recheckTorrents(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.recheckTorrents(toValue(hashes))
    }

    async function setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio') {
      await qbit.setTorrentPriority(hashes, priority)
    }

    async function exportTorrent(hash: string) {
      return await qbit.exportTorrent(hash)
    }

    return {
      torrents,
      isTextFilterActive,
      isStatusFilterActive,
      isCategoryFilterActive,
      isTagFilterActive,
      isTrackerFilterActive,
      textFilter,
      statusFilter,
      categoryFilter,
      tagFilterInclude,
      tagFilterExclude,
      trackerFilterInclude,
      trackerFilterExclude,
      filterType,
      tagFilterType,
      trackerFilterType,
      torrentsByStatus,
      torrentsByTracker,
      sortCriterias,
      filterPresets,
      hasAnyFilter,
      activeFilterPresetId,
      saveFilterPreset,
      applyFilterPreset,
      deleteFilterPreset,
      clearFilters,
      processedTorrents: filteredAndSortedTorrents,
      syncFromMaindata,
      setTorrentCategory,
      addTorrentTags,
      removeTorrentTags,
      removeTorrentAllTags,
      getTorrentByHash,
      getTorrentIndexByHash,
      deleteTorrents,
      moveTorrents,
      addTorrents,
      reannounceTorrents,
      toggleSeqDl,
      toggleFLPiecePrio,
      toggleAutoTmm,
      setSuperSeeding,
      renameTorrent,
      resumeTorrents,
      resumeAllTorrents,
      forceStartTorrents,
      pauseTorrents,
      pauseAllTorrents,
      recheckTorrents,
      setTorrentPriority,
      exportTorrent,
      $reset: () => {
        _torrents.value.clear()
        triggerRef(_torrents)
        sortCriterias.value = [{ value: 'added_on', reverse: true }]

        filterType.value = FilterType.CONJUNCTIVE

        isTextFilterActive.value = true
        textFilter.value = ''

        isStatusFilterActive.value = true
        statusFilter.value = []

        isCategoryFilterActive.value = true
        categoryFilter.value = []

        isTagFilterActive.value = true
        tagFilterInclude.value = []
        tagFilterExclude.value = []
        tagFilterType.value = FilterType.DISJUNCTIVE

        isTrackerFilterActive.value = true
        trackerFilterInclude.value = []
        trackerFilterExclude.value = []
        trackerFilterType.value = FilterType.DISJUNCTIVE
      },
    }
  },
  {
    persist: [{ storage: localStorage }],
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTorrentDetailStore, import.meta.hot))
}
