import { useSearchQuery } from '@/composables'
import { SortOptions, TorrentState } from '@/constants/qbit'
import { Comparator, comparators, extractHostname } from '@/helpers'
import qbit from '@/services/qbit'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { Torrent } from '@/types/vuetorrent'
import { useArrayFilter, useSorted } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, MaybeRefOrGetter, ref, toValue } from 'vue'

const comparatorMap: { [k: string]: Comparator<any> } = {
  [SortOptions.ADDED_ON]: comparators.numeric,
  // [SortOptions.AMOUNT_LEFT]: comparators.numeric,
  // [SortOptions.AUTO_TMM]: comparators.boolean,
  // [SortOptions.AVAILABILITY]: comparators.numeric,
  // [SortOptions.AVG_DOWNLOAD_SPEED]: comparators.numeric,
  // [SortOptions.AVG_UPLOAD_SPEED]: comparators.numeric,
  // [SortOptions.CATEGORY]: comparators.string,
  // [SortOptions.COMPLETED]: comparators.numeric,
  // [SortOptions.COMPLETION_ON]: comparators.numeric,
  // [SortOptions.CONTENT_PATH]: comparators.numeric,
  // [SortOptions.DL_LIMIT]: comparators.numeric,
  [SortOptions.DLSPEED]: comparators.numeric,
  // [SortOptions.DOWNLOAD_PATH]: comparators.numeric,
  [SortOptions.DOWNLOADED]: comparators.numeric,
  [SortOptions.DOWNLOADED_SESSION]: comparators.numeric,
  [SortOptions.ETA]: comparators.numeric,
  // [SortOptions.F_L_PIECE_PRIO]: comparators.numeric,
  // [SortOptions.FORCE_START]: comparators.numeric,
  [SortOptions.GLOBALSPEED]: comparators.numeric,
  [SortOptions.GLOBALVOLUME]: comparators.numeric,
  [SortOptions.HASH]: comparators.numeric,
  // [SortOptions.INFOHASH_V1]: comparators.numeric,
  // [SortOptions.INFOHASH_V2]: comparators.numeric,
  [SortOptions.LAST_ACTIVITY]: comparators.numeric,
  // [SortOptions.MAGNET_URI]: comparators.numeric,
  // [SortOptions.MAX_RATIO]: comparators.numeric,
  // [SortOptions.MAX_SEEDING_TIME]: comparators.numeric,
  [SortOptions.NAME]: comparators.numeric,
  // [SortOptions.NUM_COMPLETE]: comparators.numeric,
  // [SortOptions.NUM_INCOMPLETE]: comparators.numeric,
  // [SortOptions.NUM_LEECHS]: comparators.numeric,
  // [SortOptions.NUM_SEEDS]: comparators.numeric,
  // [SortOptions.PRIORITY]: comparators.numeric,
  // [SortOptions.PROGRESS]: comparators.numeric,
  // [SortOptions.RATIO]: comparators.numeric,
  // [SortOptions.RATIO_LIMIT]: comparators.numeric,
  // [SortOptions.SAVE_PATH]: comparators.numeric,
  // [SortOptions.SEEDING_TIME]: comparators.numeric,
  // [SortOptions.SEEDING_TIME_LIMIT]: comparators.numeric,
  // [SortOptions.SEEN_COMPLETE]: comparators.numeric,
  // [SortOptions.SEQ_DL]: comparators.numeric,
  [SortOptions.SIZE]: comparators.numeric,
  // [SortOptions.STATE]: comparators.numeric,
  // [SortOptions.SUPER_SEEDING]: comparators.numeric,
  // [SortOptions.TAGS]: comparators.numeric,
  // [SortOptions.TIME_ACTIVE]: comparators.numeric,
  [SortOptions.TOTAL_SIZE]: comparators.numeric,
  // [SortOptions.TRACKER]: comparators.numeric,
  // [SortOptions.TRACKERS_COUNT]: comparators.numeric,
  // [SortOptions.UP_LIMIT]: comparators.numeric,
  [SortOptions.UPLOADED]: comparators.numeric,
  [SortOptions.UPLOADED_SESSION]: comparators.numeric,
  [SortOptions.UPSPEED]: comparators.numeric,
}

export const useTorrentStore = defineStore(
  'torrents',
  () => {
    const torrents = ref<Torrent[]>([])

    const isTextFilterActive = ref(true)
    const isStatusFilterActive = ref(true)
    const isCategoryFilterActive = ref(true)
    const isTagFilterActive = ref(true)
    const isTrackerFilterActive = ref(true)

    const textFilter = ref('')
    const statusFilter = ref<TorrentState[]>([])
    const categoryFilter = ref<string[]>([])
    const tagFilter = ref<(string | null)[]>([])
    const trackerFilter = ref<(string | null)[]>([])

    const sortCriterias = ref<{ value: SortOptions, reverse: boolean }[]>([
      { value: SortOptions.ADDED_ON, reverse: false }
    ])

    type matchFn = (t: Torrent) => boolean
    const matchStatus: matchFn = t => statusFilter.value.includes(t.state)
    const matchCategory: matchFn = t => categoryFilter.value.includes(t.category)
    const matchTag: matchFn = t => (t.tags.length === 0 && tagFilter.value.includes(null)) || t.tags.some(tag => tagFilter.value.includes(tag))
    const matchTracker: matchFn = t => trackerFilter.value.includes(extractHostname(t.tracker))

    const torrentsWithFilters = useArrayFilter(torrents, torrent => {
      return !(
        (statusFilter.value.length > 0 && isStatusFilterActive.value && !matchStatus(torrent)) ||
        (categoryFilter.value.length > 0 && isCategoryFilterActive.value && !matchCategory(torrent)) ||
        (tagFilter.value.length > 0 && isTagFilterActive.value && !matchTag(torrent)) ||
        (trackerFilter.value.length > 0 && isTrackerFilterActive.value && !matchTracker(torrent))
      )
    })

    const sortedTorrents = useSorted(torrentsWithFilters, (a, b) => {
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
      return compareResult
    })

    const { results: filteredTorrents } = useSearchQuery(
      torrentsWithFilters,
      () => (isTextFilterActive.value ? textFilter.value : null),
      torrent => torrent.name
    )

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
      return filteredTorrents.value.findIndex(t => t.hash === hash)
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

    async function addTorrents(torrents: File[], urls: string, payload: AddTorrentPayload) {
      return await qbit.addTorrents(torrents, urls, payload)
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
      sortCriterias,
      torrentsWithFilters,
      filteredTorrents,
      sortedTorrents,
      setTorrentCategory,
      addTorrentTags,
      removeTorrentTags,
      getTorrentByHash,
      getTorrentIndexByHash,
      deleteTorrents,
      moveTorrents,
      addTorrents,
      renameTorrent,
      resumeTorrents,
      forceResumeTorrents,
      pauseTorrents,
      recheckTorrents,
      setTorrentPriority,
      exportTorrent,
      $reset: () => {
        torrents.value = []

        isTextFilterActive.value = true
        textFilter.value = ''
        isStatusFilterActive.value = true
        statusFilter.value = []
        isCategoryFilterActive.value = true
        categoryFilter.value = []
        isTagFilterActive.value = true
        tagFilter.value = []
        isTrackerFilterActive.value = true
        trackerFilter.value = []
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, excludePaths: ['torrents'] }]
    }
  }
)
