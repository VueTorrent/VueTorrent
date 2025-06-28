import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

import { useTorrentStore } from './torrents'
import { useVueTorrentStore } from './vuetorrent'
import { useArrayPagination, useI18nUtils } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { formatData } from '@/helpers'

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    const _page = ref(1)
    const isSelectionMultiple = ref(false)
    const selectedTorrents = ref<string[]>([])
    const latestSelectedTorrent = ref<string>()
    const displayMode = ref(DashboardDisplayMode.LIST)

    const { t } = useI18nUtils()
    const torrentStore = useTorrentStore()
    const { processedTorrents, torrents } = storeToRefs(torrentStore)
    const { paginationSize, useBinarySize } = storeToRefs(useVueTorrentStore())

    const { paginatedResults: paginatedTorrents, currentPage, pageCount } = useArrayPagination(processedTorrents, paginationSize, _page)

    const torrentCountString = computed(() => {
      if (selectedTorrents.value.length) {
        const selectedSize = selectedTorrents.value
          .map(hash => torrentStore.getTorrentByHash(hash))
          .filter(torrent => torrent !== undefined)
          .map(torrent => torrent.size)
          .reduce((partial, size) => partial + size, 0)

        return t('dashboard.selectedTorrentsCount', {
          count: selectedTorrents.value.length,
          total: processedTorrents.value.length,
          size: formatData(selectedSize, useBinarySize.value)
        })
      } else {
        return t('dashboard.torrentsCount', processedTorrents.value.length)
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
      const hashes = processedTorrents.value.slice(start, end + 1).map(t => t.hash)
      selectTorrents(...hashes)
    }

    function selectAllTorrents() {
      isSelectionMultiple.value = true
      selectedTorrents.value.splice(0, selectedTorrents.value.length, ...torrents.value.map(t => t.hash))
      latestSelectedTorrent.value = torrents.value[0]?.hash
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
      () => torrentStore.processedTorrents,
      newValue => {
        const pageCount = Math.ceil(newValue.length / paginationSize.value)
        if (pageCount < _page.value) {
          _page.value = Math.max(1, pageCount)
        }
      }
    )

    return {
      paginatedTorrents,
      currentPage,
      pageCount,
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
        _page.value = 1
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}
