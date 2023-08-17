import { FilterState } from '@/constants/qbit'
import { SortOptions } from '@/constants/qbit/SortOptions.ts'
import { formatData } from '@/helpers'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { GetTorrentPayload } from '@/types/qbit/payloads'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'


export const useDashboardStore = defineStore('dashboard', () => {
  const maindataStore = useMaindataStore()

  const currentPage = ref(1)
  const searchFilter = ref('')
  const filteredTorrentsCount = computed(() => maindataStore.torrents.length)
  const isSelectionMultiple = ref(false)
  const selectedTorrents = ref<string[]>([])
  const latestSelectedTorrent = ref<number>(-1)
  const sortOptions = reactive({
    isCustomSortEnabled: false,
    sortBy: SortOptions.DEFAULT,
    reverseOrder: false,
    statusFilter: undefined as FilterState | undefined,
    categoryFilter: undefined as string | undefined,
    tagFilter: undefined as string | undefined,
    trackerFilter: undefined as string | undefined
  })

  const { t } = useI18n()
  const mainDataStore = useMaindataStore()
  const vuetorrentStore = useVueTorrentStore()

  const torrentCountString = computed(() => {
    if (selectedTorrents.value.length) {
      const selectedSize = selectedTorrents.value
          .map(hash => mainDataStore.getTorrentByHash(hash))
          .filter(torrent => torrent !== undefined)
          .map(torrent => torrent!.size)
          .reduce((partial, size) => partial + size, 0)

      return t('dashboard.selectedTorrentsCount', {
        count: selectedTorrents.value.length,
        total: mainDataStore.torrents.length,
        size: formatData(selectedSize, vuetorrentStore.useBinarySize),
      })
    } else {
      return t('dashboard.torrentsCount', { total: filteredTorrentsCount.value })
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

  function toggleSelect(hash: string) {
    if (isTorrentInSelection(hash)) {
      unselectTorrent(hash)
    } else {
      selectTorrent(hash)
    }
  }

  function spanTorrentSelection(index: number) {
    if (latestSelectedTorrent.value < 0) return
    const start = Math.min(index, latestSelectedTorrent.value)
    const end = Math.max(index, latestSelectedTorrent.value)
    const hashes = mainDataStore.torrents.slice(start, end + 1).map(t => t.hash)
    selectTorrents(...hashes)
  }

  function selectAllTorrents() {
    isSelectionMultiple.value = true
    selectTorrents(...mainDataStore.torrents.map(t => t.hash))
  }

  function unselectAllTorrents() {
    selectedTorrents.value.splice(0, selectedTorrents.value.length)
  }

  watch(selectedTorrents, (newValue) => {
    if (newValue.length === 0) {
      latestSelectedTorrent.value = -1
    }
  })

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
    toggleSelect,
    getTorrentsPayload,
  }
})