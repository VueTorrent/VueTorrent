import { SearchPlugin } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSearchEngineStore = defineStore('searchEngine', () => {
  const searchData = ref<any[] /*TODO*/>([])
  const searchPlugins = ref<SearchPlugin[]>([])

  return { searchData, searchPlugins }
})