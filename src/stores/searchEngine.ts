import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref, shallowRef, triggerRef } from 'vue'
import qbit from '@/services/qbit'
import { SearchPlugin } from '@/types/qbit/models'
import { SearchData } from '@/types/vuetorrent'

export const useSearchEngineStore = defineStore(
  'searchEngine',
  () => {
    const searchData = shallowRef<SearchData[]>([])
    const searchPlugins = ref<SearchPlugin[]>([])

    function createNewTab() {
      searchData.value.push({
        uniqueId: uuidv4(),
        id: 0,
        lastQuery: '',
        query: '',
        itemsPerPage: 10,
        filters: {
          title: '',
          category: 'all',
          plugin: 'enabled',
        },
        results: [],
        timer: null,
      })
      triggerRef(searchData)
    }

    function deleteTab(uniqueId: string) {
      searchData.value = searchData.value.filter(tab => tab.uniqueId !== uniqueId)
    }

    async function runNewSearch(tab: SearchData) {
      const searchJob = await qbit.startSearch(tab.query, tab.filters.category, [tab.filters.plugin])
      tab.id = searchJob.id
      tab.results = []
      tab.lastQuery = tab.query
      triggerRef(searchData)
    }

    async function refreshResults(tab: SearchData) {
      const response = await qbit.getSearchResults(tab.id, tab.results.length)

      tab.results.push(...response.results)
      triggerRef(searchData)

      return response.status
    }

    async function stopSearch(tab: SearchData) {
      if (tab.id && tab.id !== 0) await qbit.stopSearch(tab.id)
      tab.id = 0
      triggerRef(searchData)
    }

    async function fetchSearchPlugins() {
      searchPlugins.value = await qbit.getSearchPlugins()
    }

    async function installSearchPlugin(url: string) {
      await qbit.installSearchPlugin([url])
    }

    async function uninstallSearchPlugin(name: string) {
      await qbit.uninstallSearchPlugin([name])
    }

    async function toggleSearchPlugin(plugin: SearchPlugin) {
      await qbit.enableSearchPlugin([plugin.name], !plugin.enabled)
    }

    async function updatePlugins() {
      await qbit.updateSearchPlugins()
    }

    async function downloadTorrent(torrentUrl: string, pluginName: string) {
      await qbit.downloadTorrentWithSearchPlugin(torrentUrl, pluginName)
    }

    return {
      searchData,
      searchPlugins,
      createNewTab,
      deleteTab,
      runNewSearch,
      refreshResults,
      stopSearch,
      fetchSearchPlugins,
      installSearchPlugin,
      uninstallSearchPlugin,
      toggleSearchPlugin,
      updatePlugins,
      downloadTorrent,
      $reset: () => {
        searchData.value = []
        searchPlugins.value = []
        createNewTab()
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchEngineStore, import.meta.hot))
}
