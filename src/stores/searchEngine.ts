import { qbit } from '@/services'
import { SearchPlugin } from '@/types/qbit/models'
import { SearchData } from '@/types/VueTorrent'
import { defineStore } from 'pinia'
import { v1 as genUuid } from 'uuid'
import { ref } from 'vue'


export const useSearchEngineStore = defineStore('searchEngine', () => {
  const searchData = ref<SearchData[]>([])
  const searchPlugins = ref<SearchPlugin[]>([])

  function createNewTab() {
    searchData.value.push({
      uniqueId: genUuid(),
      id: 0,
      query: '',
      itemsPerPage: 10,
      filters: {
        title: '',
        category: 'all',
        plugin: 'enabled'
      },
      results: [],
      timer: null
    })
  }

  function deleteTab(uniqueId: string) {
    searchData.value = searchData.value.filter(tab => tab.uniqueId !== uniqueId)
  }

  async function runNewSearch(tab: SearchData) {
    const searchJob = await qbit.startSearch(
      tab.query,
      tab.filters.category,
      [tab.filters.plugin])
    tab.id = searchJob.id
    tab.results = []
  }

  async function refreshResults(tab: SearchData) {
    const response = await qbit.getSearchResults(tab.id, tab.results.length)
    tab.results.push(...response.results)

    return response.status
  }

  async function stopSearch(tab: SearchData) {
    if (tab.id && tab.id !== 0) await qbit.stopSearch(tab.id)
    tab.id = 0
  }

  async function fetchSearchPlugins() {
    searchPlugins.value = await qbit.getSearchPlugins()
  }

  return { searchData, searchPlugins, createNewTab, deleteTab, runNewSearch, refreshResults, stopSearch, fetchSearchPlugins }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        key: 'vuetorrent_searchEngine'
      }
    ]
  }
})