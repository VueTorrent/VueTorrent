import { useSearchQuery } from '@/composables'
import { FilterState } from '@/constants/qbit'
import { SortOptions } from '@/constants/qbit/SortOptions'
import { formatData } from '@/helpers'
import { useMaindataStore } from '@/stores/maindata'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { GetTorrentPayload } from '@/types/qbit/payloads'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    const currentPage = ref(1)
    const searchFilter = ref('')
    const filteredTorrents = computed(() => searchQuery.results.value)
    const isSelectionMultiple = ref(false)
    const selectedTorrents = ref<string[]>([])
    const latestSelectedTorrent = ref<number>(-1)
    const sortOptions = reactive({
      isCustomSortEnabled: false,
      sortBy: SortOptions.DEFAULT,
      reverseOrder: false,
      statusFilter: FilterState.ALL as FilterState,
      categoryFilter: null as string | null,
      tagFilter: null as string | null,
      trackerFilter: null as string | null
    })
    const isCompactMode = ref(false)

    const { t } = useI18n()
    const maindataStore = useMaindataStore()
    const vuetorrentStore = useVueTorrentStore()
    const searchQuery = useSearchQuery(
      () => maindataStore.torrents,
      searchFilter,
      torrent => torrent.name,
      results => {
        if (sortOptions.isCustomSortEnabled) {
          if (sortOptions.sortBy === 'priority') {
            results.sort((a, b) => {
              if (a.priority > 0 && b.priority > 0) return a.priority - b.priority
              else if (a.priority <= 0 && b.priority <= 0) return a.added_on - b.added_on
              else if (a.priority <= 0) return 1
              else return -1
            })
          } else {
            results.sort((a, b) => a[sortOptions.sortBy] - b[sortOptions.sortBy] || a.added_on - b.added_on)
          }
          if (sortOptions.reverseOrder) results.reverse()
        }
        return results
      }
    )

    const torrentCountString = computed(() => {
      if (selectedTorrents.value.length) {
        const selectedSize = selectedTorrents.value
          .map(hash => maindataStore.getTorrentByHash(hash))
          .filter(torrent => torrent !== undefined)
          .map(torrent => torrent!.size)
          .reduce((partial, size) => partial + size, 0)

        return t('dashboard.selectedTorrentsCount', {
          count: selectedTorrents.value.length,
          total: filteredTorrents.value.length,
          size: formatData(selectedSize, vuetorrentStore.useBinarySize)
        })
      } else {
        return t('dashboard.torrentsCount', filteredTorrents.value.length)
      }
    })

    const getTorrentsPayload = computed<GetTorrentPayload>(() => {
      return {
        filter: sortOptions.statusFilter ?? FilterState.ALL,
        category: sortOptions.categoryFilter ?? undefined,
        tag: sortOptions.tagFilter ?? undefined,
        sort: sortOptions.isCustomSortEnabled ? SortOptions.DEFAULT : sortOptions.sortBy,
        reverse: sortOptions.reverseOrder
      }
    })

    function isTorrentInSelection(hash: string) {
      return selectedTorrents.value.includes(hash)
    }

    function selectTorrent(hash: string) {
      selectedTorrents.value.push(hash)
      latestSelectedTorrent.value = maindataStore.getTorrentIndexByHash(hash)
    }

    function selectTorrents(...hashes: string[]) {
      isSelectionMultiple.value = true
      hashes.forEach(selectTorrent)
    }

    function unselectTorrent(hash: string) {
      const index = selectedTorrents.value.indexOf(hash)
      if (index >= 0) {
        selectedTorrents.value.splice(index, 1)
      }
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
      const hashes = maindataStore.torrents.slice(start, end + 1).map(t => t.hash)
      selectTorrents(...hashes)
    }

    function selectAllTorrents() {
      isSelectionMultiple.value = true
      selectedTorrents.value.splice(0, selectedTorrents.value.length, ...maindataStore.torrents.map(t => t.hash))
      latestSelectedTorrent.value = 0
    }

    function unselectAllTorrents() {
      selectedTorrents.value.splice(0, selectedTorrents.value.length)
    }

    watch(selectedTorrents, newValue => {
      if (newValue.length === 0) {
        latestSelectedTorrent.value = -1
      }
    })

    watch(filteredTorrents, newValue => {
      const pageCount = Math.ceil(newValue.length / vuetorrentStore.paginationSize)
      if (pageCount < currentPage.value) {
        currentPage.value = Math.max(1, pageCount)
      }
    })

    return {
      currentPage,
      searchFilter,
      filteredTorrents,
      isSelectionMultiple,
      selectedTorrents,
      latestSelectedTorrent,
      sortOptions,
      isCompactMode,
      torrentCountString,
      isTorrentInSelection,
      selectTorrent,
      selectTorrents,
      unselectTorrent,
      spanTorrentSelection,
      selectAllTorrents,
      unselectAllTorrents,
      toggleSelect,
      getTorrentsPayload
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          key: 'vuetorrent_dashboard',
          paths: ['searchFilter', 'sortOptions', 'isCompactMode']
        }
      ]
    }
  }
)
