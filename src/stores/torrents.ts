import { useSearchQuery, useTorrentBuilder } from '@/composables'
import { comparatorMap, FilterType, TorrentState } from '@/constants/vuetorrent'
import qbit from '@/services/qbit'
import { useTorrentDetailStore } from '@/stores/torrentDetail.ts'
import { RawQbitTorrent } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { Torrent as VtTorrent } from '@/types/vuetorrent'
import { useArrayFilter, useSorted } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, MaybeRefOrGetter, ref, shallowRef, toValue, triggerRef } from 'vue'
import { useTrackerStore } from './trackers'

export const useTorrentStore = defineStore(
  'torrents',
  () => {
    const { buildFromQbit } = useTorrentBuilder()
    const trackerStore = useTrackerStore()

    const _torrents = shallowRef<Map<string, RawQbitTorrent>>(new Map())
    const torrents = computed(() =>
      Array.from(_torrents.value.entries()).map(([hash, v]) =>
        buildFromQbit({
          ...v,
          hash
        })
      )
    )

    const isTextFilterActive = shallowRef(true)
    const isStatusFilterActive = shallowRef(true)
    const isCategoryFilterActive = shallowRef(true)
    const isTagFilterActive = shallowRef(true)
    const isTrackerFilterActive = shallowRef(true)

    const textFilter = ref('')
    const statusFilter = ref<TorrentState[]>([])
    const categoryFilter = ref<string[]>([])
    const tagFilter = ref<(string | null)[]>([])
    const trackerFilter = ref<(string | null)[]>([])

    const filterType = ref(FilterType.CONJUNCTIVE)
    const tagFilterType = ref(FilterType.DISJUNCTIVE)
    const trackerFilterType = ref(FilterType.DISJUNCTIVE)

    const sortCriterias = ref<{ value: keyof VtTorrent; reverse: boolean }[]>([{ value: 'added_on', reverse: true }])

    type matchFn = (t: VtTorrent) => boolean
    const matchStatus: matchFn = t => statusFilter.value.includes(t.state)
    const matchCategory: matchFn = t => categoryFilter.value.includes(t.category)
    const matchTag: matchFn = t => {
      const matcher = (tag: string | null) => {
        if (tag === null) {
          return t.tags.length === 0
        }
        return t.tags.includes(tag)
      }

      switch (tagFilterType.value) {
        case FilterType.CONJUNCTIVE:
          return tagFilter.value.every(matcher)
        case FilterType.DISJUNCTIVE:
          return tagFilter.value.some(matcher)
      }
    }
    const matchTracker: matchFn = t => {
      const torrentTrackers = trackerStore.torrentTrackers.get(t.hash) ?? []

      const matcher = (tracker: string | null) => {
        if (tracker === null) {
          return torrentTrackers.length === 0
        }
        return torrentTrackers.includes(tracker)
      }

      switch (trackerFilterType.value) {
        case FilterType.CONJUNCTIVE:
          return trackerFilter.value.every(matcher)
        case FilterType.DISJUNCTIVE:
          return trackerFilter.value.some(matcher)
      }
    }

    const torrentsWithNavbarFilters = useArrayFilter(torrents, torrent => {
      const matchResults = []
      statusFilter.value.length > 0 && isStatusFilterActive.value && matchResults.push(matchStatus(torrent))
      categoryFilter.value.length > 0 && isCategoryFilterActive.value && matchResults.push(matchCategory(torrent))
      tagFilter.value.length > 0 && isTagFilterActive.value && matchResults.push(matchTag(torrent))
      trackerFilter.value.length > 0 && isTrackerFilterActive.value && matchResults.push(matchTracker(torrent))

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
      torrent => [torrent.name, torrent.hash]
    )

    const filteredAndSortedTorrents = useSorted(filteredTorrents, (a, b) => {
      let i = 0
      let compareResult = 0
      while (i < sortCriterias.value.length && compareResult === 0) {
        const { value, reverse } = sortCriterias.value.at(i++)!
        const av = a[value]
        const bv = b[value]
        const comparator = comparatorMap[value]
        const compareFn = reverse ? comparator.desc : comparator.asc
        compareResult = compareFn(av, bv)
      }
      if (compareResult === 0) {
        compareResult = comparatorMap.hash.asc(a.hash, b.hash)
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

    async function removeTorrentTags(hashes: string[], tags?: string[]) {
      await qbit.removeTorrentTag(hashes, tags)
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
      await qbit.resumeTorrents(toValue(hashes))
    }

    async function forceResumeTorrents(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.forceStartTorrents(toValue(hashes))
    }

    async function pauseTorrents(hashes: MaybeRefOrGetter<string[]>) {
      await qbit.pauseTorrents(toValue(hashes))
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
      _torrents,
      torrents,
      isTextFilterActive,
      isStatusFilterActive,
      isCategoryFilterActive,
      isTagFilterActive,
      isTrackerFilterActive,
      textFilter,
      statusFilter,
      categoryFilter,
      tagFilter,
      trackerFilter,
      filterType,
      tagFilterType,
      trackerFilterType,
      sortCriterias,
      processedTorrents: filteredAndSortedTorrents,
      syncFromMaindata,
      setTorrentCategory,
      addTorrentTags,
      removeTorrentTags,
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
      forceResumeTorrents,
      pauseTorrents,
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
        tagFilter.value = []
        tagFilterType.value = FilterType.DISJUNCTIVE

        isTrackerFilterActive.value = true
        trackerFilter.value = []
        trackerFilterType.value = FilterType.DISJUNCTIVE
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, excludePaths: ['_torrents'] }]
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTorrentDetailStore, import.meta.hot))
}
