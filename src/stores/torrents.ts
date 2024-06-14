import { useSearchQuery } from '@/composables'
import { TorrentState } from '@/constants/qbit'
import { Comparator, comparators, extractHostname } from '@/helpers'
import qbit from '@/services/qbit'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { Torrent } from '@/types/vuetorrent'
import { useArrayFilter, useSorted } from '@vueuse/core'
import { defineStore } from 'pinia'
import { MaybeRefOrGetter, ref, toValue } from 'vue'

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

    const sortCriterias = ref<{ value: keyof Torrent, reverse: boolean }[]>([
      { value: "added_on", reverse: false }
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

    const { results: filteredTorrents } = useSearchQuery(
      torrentsWithFilters,
      () => (isTextFilterActive.value ? textFilter.value : null),
      torrent => torrent.name
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
        compareResult = comparatorMap["hash"].asc(a.hash, b.hash)
      }
      return compareResult
    })

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
      filteredAndSortedTorrents,
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

const comparatorMap: Record<keyof Torrent, Comparator<any>> = {
  added_on: comparators.numeric,
  amount_left: comparators.numeric,
  auto_tmm: comparators.boolean,
  availability: comparators.numeric,
  avgDownloadSpeed: comparators.numeric,
  avgUploadSpeed: comparators.numeric,
  available_peers: comparators.numeric,
  available_seeds: comparators.numeric,
  category: comparators.text,
  completed_on: comparators.numeric,
  content_path: comparators.text,
  dl_limit: comparators.numeric,
  dlspeed: comparators.numeric,
  download_path: comparators.text,
  downloaded: comparators.numeric,
  downloaded_session: comparators.numeric,
  eta: comparators.numeric,
  f_l_piece_prio: comparators.boolean,
  forced: comparators.boolean,
  globalSpeed: comparators.numeric,
  globalVolume: comparators.numeric,
  hash: comparators.text,
  inactive_seeding_time_limit: comparators.numeric,
  infohash_v1: comparators.text,
  infohash_v2: comparators.text,
  last_activity: comparators.invertedNumeric,
  name: comparators.numeric,
  num_leechs: comparators.numeric,
  num_seeds: comparators.numeric,
  priority: comparators.numeric,
  progress: comparators.numeric,
  ratio: comparators.numeric,
  ratio_limit: comparators.numeric,
  savePath: comparators.text,
  seeding_time: comparators.numeric,
  seeding_time_limit: comparators.numeric,
  seen_complete: comparators.numeric,
  seq_dl: comparators.boolean,
  size: comparators.numeric,
  state: comparators.text,
  super_seeding: comparators.boolean,
  tags: comparators.text, // FIXME: string array
  time_active: comparators.numeric,
  total_size: comparators.numeric,
  tracker_domain: comparators.numeric,
  trackers_count: comparators.numeric,
  up_limit: comparators.numeric,
  uploaded: comparators.numeric,
  uploaded_session: comparators.numeric,
  upspeed: comparators.numeric
}
