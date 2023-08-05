import { computed, reactive, ref } from 'vue'
import {defineStore} from 'pinia'


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

  return {currentPage, searchFilter, filteredTorrentsCount, isSelectionMultiple, selectedTorrents, sortOptions}
})