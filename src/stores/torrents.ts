import { useSearchQuery, useTorrentBuilder } from '@/composables'
import { comparatorMap, TorrentState } from '@/constants/vuetorrent'
import { extractHostname } from '@/helpers'
import qbit from '@/services/qbit'
import { RawQbitTorrent } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { Torrent as VtTorrent } from '@/types/vuetorrent'
import { useArrayFilter, useSorted } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, MaybeRefOrGetter, ref, toValue } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

export const useTorrentStore = defineStore(
  'torrents',
  () => {
    const { t } = useI18n()
    const { buildFromQbit } = useTorrentBuilder()

    const _torrents = ref<Map<string, RawQbitTorrent>>(new Map())
    const torrents = computed(() => Array.from(_torrents.value.entries()).map(([hash, v]) => buildFromQbit({
      ...v,
      hash
    })))

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

    const sortCriterias = ref<{ value: keyof VtTorrent; reverse: boolean }[]>([{ value: 'added_on', reverse: true }])

    type matchFn = (t: VtTorrent) => boolean
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
      const torrentsCount = torrents.length + links.split('\n').filter(url => url.trim().length).length

      return await toast.promise(
        qbit.addTorrents(torrents, links, payload),
        {
          pending: t('toast.add.pending'),
          error: t('toast.add.error', torrentsCount),
          success: t('toast.add.success', torrentsCount)
        },
        {
          autoClose: 1500
        }
      )
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
      sortCriterias,
      processedTorrents: filteredAndSortedTorrents,
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
        _torrents.value.clear()
        sortCriterias.value = [{ value: 'added_on', reverse: true }]

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
      storageItems: [{ storage: localStorage, excludePaths: ['_torrents'] }]
    }
  }
)
