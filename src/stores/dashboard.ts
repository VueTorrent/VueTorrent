import { FilterState } from '@/constants/qbit'
import { useMaindataStore } from '@/stores'
import { GetTorrentPayload } from '@/types/qbit/payloads'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'


export const useDashboardStore = defineStore('dashboard', () => {
  const currentPage = ref(1)
  const searchFilter = ref('')
  const filteredTorrentsCount = computed(() => 0)
  const isSelectionMultiple = ref(false)
  const selectedTorrents = ref<string[]>([])
  const latestSelectedTorrent = ref<number>(-1)
  const sortOptions = reactive({
    isCustomSortEnabled: false,
    sortBy: 'default',
    reverseOrder: false,
    statusFilter: undefined as FilterState | undefined,
    categoryFilter: undefined as string | undefined,
    tagFilter: undefined as string | undefined,
    trackerFilter: undefined as string | undefined
  })

  const mainDataStore = useMaindataStore()
  const { t } = useI18n()

  const torrentCountString = computed(() => {
    if (selectedTorrents.value.length) {
      const selectedSize = selectedTorrents.value
      .map(hash => mainDataStore.getTorrentByHash(hash))
      .filter(torrent => torrent !== undefined)
      .map(torrent => torrent!.size)
      .reduce((partial, size) => partial + size, 0)

      return t('dashboard.selectedTorrentsCount', selectedTorrents.value.length, {
        count: selectedTorrents.value.length,
        total: mainDataStore.torrents.length,
        size: selectedSize
      })
    } else {
      return t('dashboard.torrentsCount', filteredTorrentsCount.value)
    }
  })

  const getTorrentsPayload = computed<GetTorrentPayload>(() => {
    return {
      filter: sortOptions.statusFilter ?? FilterState.ALL,
      category: sortOptions.categoryFilter,
      tag: sortOptions.tagFilter,
      sort: sortOptions.sortBy,
      reverse: sortOptions.reverseOrder
    }
  })

  function isTorrentInSelection(hash: string) {
    return selectedTorrents.value.includes(hash)
  }

  function selectTorrent(hash: string) {
    selectedTorrents.value.push(hash)
    latestSelectedTorrent.value = mainDataStore.getTorrentIndexByHash(hash)
  }

  function selectTorrents(...hashes: string[]) {
    hashes.forEach(selectTorrent)
  }

  function unselectTorrent(hash: string) {
    const index = selectedTorrents.value.indexOf(hash)
    if (index >= 0) {
      selectedTorrents.value.splice(index, 1)
    }
  }

  function unselectTorrents(...hashes: string[]) {
    hashes.forEach(unselectTorrent)
  }

  function spanTorrentSelection(index: number) {
    if (latestSelectedTorrent.value < 0) return
    const start = Math.min(index, latestSelectedTorrent.value)
    const end = Math.max(index, latestSelectedTorrent.value)
    const hashes = mainDataStore.torrents.slice(start, end + 1).map(t => t.hash)
    hashes.forEach(hash => (isTorrentInSelection(hash) ? unselectTorrent : selectTorrent)(hash))
  }

  function selectAllTorrents() {
    selectTorrents(...mainDataStore.torrents.map(t => t.hash))
  }

  function unselectAllTorrents() {
    unselectTorrents(...mainDataStore.torrents.map(t => t.hash))
  }

  return {
    currentPage,
    searchFilter,
    filteredTorrentsCount,
    isSelectionMultiple,
    selectedTorrents,
    latestSelectedTorrent,
    sortOptions,
    torrentCountString,
    isTorrentInSelection,
    selectTorrent,
    selectTorrents,
    unselectTorrent,
    unselectTorrents,
    spanTorrentSelection,
    selectAllTorrents,
    unselectAllTorrents,
    getTorrentsPayload
  }
})