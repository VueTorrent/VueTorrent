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
    const isSelectionMultiple = ref(false)
    const selectedTorrents = ref<string[]>([])
    const latestSelectedTorrent = ref<string>()
    const sortOptions = reactive({
      isCustomSortEnabled: false,
      sortBy: SortOptions.DEFAULT,
      reverseOrder: false
    })

    const { t } = useI18n()
    const maindataStore = useMaindataStore()
    const vuetorrentStore = useVueTorrentStore()

    const torrentCountString = computed(() => {
      if (selectedTorrents.value.length) {
        const selectedSize = selectedTorrents.value
        .map(hash => maindataStore.getTorrentByHash(hash))
        .filter(torrent => torrent !== undefined)
        .map(torrent => torrent!.size)
        .reduce((partial, size) => partial + size, 0)

        return t('dashboard.selectedTorrentsCount', {
          count: selectedTorrents.value.length,
          total: maindataStore.filteredTorrents.length,
          size: formatData(selectedSize, vuetorrentStore.useBinarySize)
        })
      } else {
        return t('dashboard.torrentsCount', maindataStore.filteredTorrents.length)
      }
    })

    const getTorrentsPayload = computed<GetTorrentPayload>(() => {
      return {
        sort: sortOptions.isCustomSortEnabled ? SortOptions.DEFAULT : sortOptions.sortBy,
        reverse: sortOptions.reverseOrder
      }
    })

    function isTorrentInSelection(hash: string) {
      return selectedTorrents.value.includes(hash)
    }

    function selectTorrent(hash: string) {
      if (!isTorrentInSelection(hash)) {
        selectedTorrents.value.push(hash)
      }

      latestSelectedTorrent.value = hash
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

    function spanTorrentSelection(endHash: string) {
      if (!latestSelectedTorrent.value) return

      const latestIndex = maindataStore.getTorrentIndexByHash(latestSelectedTorrent.value)
      const endIndex = maindataStore.getTorrentIndexByHash(endHash)

      const start = Math.min(endIndex, latestIndex)
      const end = Math.max(endIndex, latestIndex)
      const hashes = maindataStore.filteredTorrents.slice(start, end + 1).map(t => t.hash)
      selectTorrents(...hashes)
    }

    function selectAllTorrents() {
      isSelectionMultiple.value = true
      selectedTorrents.value.splice(0, selectedTorrents.value.length, ...maindataStore.torrents.map(t => t.hash))
      latestSelectedTorrent.value = maindataStore.torrents[0]?.hash
    }

    function unselectAllTorrents() {
      selectedTorrents.value = []
    }

    watch(selectedTorrents, newValue => {
      if (newValue.length === 0) {
        latestSelectedTorrent.value = undefined
      }
    })

    watch(() => maindataStore.filteredTorrents, newValue => {
      const pageCount = Math.ceil(newValue.length / vuetorrentStore.paginationSize)
      if (pageCount < currentPage.value) {
        currentPage.value = Math.max(1, pageCount)
      }
    })

    return {
      currentPage,
      isSelectionMultiple,
      selectedTorrents,
      latestSelectedTorrent,
      sortOptions,
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
          paths: ['sortOptions']
        }
      ]
    }
  }
)
