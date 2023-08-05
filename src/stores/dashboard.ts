import { computed, reactive, ref } from 'vue'
import {defineStore} from 'pinia'
import { useMaindataStore } from '@/stores'
import { useI18n } from 'vue-i18n'


export const useDashboardStore = defineStore('dashboard', () => {
  const currentPage = ref(1)
  const searchFilter = ref('')
  const filteredTorrentsCount = computed(() => 0)
  const isSelectionMultiple = ref(false)
  const selectedTorrents = ref<string[]>([])
  const sortOptions = reactive({
    isCustomSortEnabled: false,
    sortBy: 'default',
    reverseOrder: false,
    titleFilter: undefined,
    categoryFilter: undefined,
    tagFilter: undefined,
    trackerFilter: undefined
  })

  const mainDataStore = useMaindataStore()
  const { i18n } = useI18n()

  const isTorrentInSelection = computed((hash: string) => selectedTorrents.value.includes(hash))
  const getTorrentCountString = computed(() => {
    if (selectedTorrents.value.length) {
      const selectedSize = selectedTorrents.value
          .map(hash => mainDataStore.getTorrentByHash(hash))
          .filter(torrent => torrent !== undefined)
          .map(torrent => torrent!.size)
          .reduce((partial, size) => partial + size, 0)

      return i18n.tc('dashboard.selectedTorrentsCount', selectedTorrents.value.length, {
        count: selectedTorrents.value.length,
        total: mainDataStore.torrents.length,
        size: selectedSize
      })
    } else {
      return i18n.tc('dashboard.torrentsCount', filteredTorrentsCount.value)
    }
  })

  return {currentPage, searchFilter, filteredTorrentsCount, isSelectionMultiple, selectedTorrents, sortOptions, isTorrentInSelection, getTorrentCountString}
})