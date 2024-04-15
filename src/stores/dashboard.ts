import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { formatData } from '@/helpers'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTorrentStore } from './torrents'
import { useVueTorrentStore } from './vuetorrent'

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    const currentPage = ref(1)
    const isSelectionMultiple = ref(false)
    const selectedTorrents = ref<string[]>([])
    const latestSelectedTorrent = ref<string>()
    const displayMode = ref(DashboardDisplayMode.LIST)

    const { t } = useI18n()
    const torrentStore = useTorrentStore()
    const vuetorrentStore = useVueTorrentStore()

    const torrentCountString = computed(() => {
      if (selectedTorrents.value.length) {
        const selectedSize = selectedTorrents.value
          .map(hash => torrentStore.getTorrentByHash(hash))
          .filter(torrent => torrent !== undefined)
          .map(torrent => torrent!.size)
          .reduce((partial, size) => partial + size, 0)

        return t('dashboard.selectedTorrentsCount', {
          count: selectedTorrents.value.length,
          total: torrentStore.filteredTorrents.length,
          size: formatData(selectedSize, vuetorrentStore.useBinarySize)
        })
      } else {
        return t('dashboard.torrentsCount', torrentStore.filteredTorrents.length)
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

      const latestIndex = torrentStore.getTorrentIndexByHash(latestSelectedTorrent.value)
      const endIndex = torrentStore.getTorrentIndexByHash(endHash)

      const start = Math.min(endIndex, latestIndex)
      const end = Math.max(endIndex, latestIndex)
      const hashes = torrentStore.filteredTorrents.slice(start, end + 1).map(t => t.hash)
      selectTorrents(...hashes)
    }

    function selectAllTorrents() {
      isSelectionMultiple.value = true
      selectedTorrents.value.splice(0, selectedTorrents.value.length, ...torrentStore.torrents.map(t => t.hash))
      latestSelectedTorrent.value = torrentStore.torrents[0]?.hash
    }

    function unselectAllTorrents() {
      selectedTorrents.value = []
    }

    watch(selectedTorrents, newValue => {
      if (newValue.length === 0) {
        latestSelectedTorrent.value = undefined
      }
    })

    watch(
      () => torrentStore.filteredTorrents,
      newValue => {
        const pageCount = Math.ceil(newValue.length / vuetorrentStore.paginationSize)
        if (pageCount < currentPage.value) {
          currentPage.value = Math.max(1, pageCount)
        }
      }
    )

    return {
      currentPage,
      isSelectionMultiple,
      selectedTorrents,
      latestSelectedTorrent,
      displayMode,
      torrentCountString,
      isTorrentInSelection,
      selectTorrent,
      selectTorrents,
      unselectTorrent,
      spanTorrentSelection,
      selectAllTorrents,
      unselectAllTorrents,
      toggleSelect,
      $reset: () => {
        currentPage.value = 1
        isSelectionMultiple.value = false
        selectedTorrents.value = []
        latestSelectedTorrent.value = undefined
        displayMode.value = DashboardDisplayMode.LIST
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, includePaths: ['displayMode'] }]
    }
  }
)
