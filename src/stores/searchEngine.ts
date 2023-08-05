import { qbit } from '@/services'
import { SearchPlugin } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSearchEngineStore = defineStore('searchEngine', () => {
  const searchData = ref<any[] /*TODO*/>([])
  const searchPlugins = ref<SearchPlugin[]>([])

  async function fetchSearchPlugins() {
    searchPlugins.value = await qbit.getSearchPlugins()
  }

  return { searchData, searchPlugins, fetchSearchPlugins }
})