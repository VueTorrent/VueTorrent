import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useVueTorrentStore } from './vuetorrent'
import { SearchEngineColumn } from '@/constants/vuetorrent'
import qbit from '@/services/qbit'
import { SearchPlugin } from '@/types/qbit/models'
import { defaultSearchPresetCapture, SearchData, SearchPreset, SearchPresetCapture } from '@/types/vuetorrent'

export const useSearchEngineStore = defineStore(
  'searchEngine',
  () => {
    const searchData = ref<SearchData[]>([])
    const searchPlugins = ref<SearchPlugin[]>([])

    function createNewTab() {
      const vueTorrentStore = useVueTorrentStore()
      const tab: SearchData = {
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
        sortBy:
          vueTorrentStore.searchEngineDefaultSortBy === SearchEngineColumn.NONE
            ? []
            : [{ key: vueTorrentStore.searchEngineDefaultSortBy, order: vueTorrentStore.searchEngineDefaultSortOrder }],
      }

      // A default preset, when set, takes precedence over the single default sort above:
      // it is the more specific expression of the same intent.
      const defaultPreset = vueTorrentStore.searchPresets.find(preset => preset.id === vueTorrentStore.searchPresetDefaultId)
      if (defaultPreset) {
        applyPresetToTab(tab, defaultPreset)
      }

      searchData.value.push(tab)
    }

    /** Copy a preset onto a tab, honouring the preset's own capture flags. */
    function applyPresetToTab(tab: SearchData, preset: SearchPreset) {
      if (preset.capture.sortBy) {
        // Clone: presets are shared state, tabs must not alias them.
        tab.sortBy = preset.sortBy.map(criteria => ({ ...criteria }))
      }
      if (preset.capture.itemsPerPage) {
        tab.itemsPerPage = preset.itemsPerPage
      }
      if (preset.capture.categoryAndPlugin) {
        tab.filters.category = preset.category
        tab.filters.plugin = preset.plugin
      }
      if (preset.capture.titleFilter) {
        tab.filters.title = preset.title
      }
    }

    /**
     * Capture the current state of `tab` as a preset. Saving under a name that already
     * exists overwrites that preset in place, keeping its id so a default survives.
     * Returns the preset's id, or null if the name is blank.
     */
    function saveSearchPreset(tab: SearchData, name: string, capture: SearchPresetCapture = defaultSearchPresetCapture()) {
      const vueTorrentStore = useVueTorrentStore()
      const trimmed = name.trim()
      if (!trimmed) return null

      const existing = vueTorrentStore.searchPresets.find(preset => preset.name === trimmed)

      const preset: SearchPreset = {
        id: existing?.id ?? uuidv4(),
        name: trimmed,
        capture: { ...capture },
        sortBy: (tab.sortBy ?? []).map(criteria => ({ ...criteria })),
        itemsPerPage: tab.itemsPerPage,
        category: tab.filters.category,
        plugin: tab.filters.plugin,
        // Only persist the text filter when it was actually opted into.
        title: capture.titleFilter ? tab.filters.title : '',
      }

      if (existing) {
        vueTorrentStore.searchPresets.splice(vueTorrentStore.searchPresets.indexOf(existing), 1, preset)
      } else {
        vueTorrentStore.searchPresets.push(preset)
      }

      return preset.id
    }

    function loadSearchPreset(tab: SearchData, id: string) {
      const preset = useVueTorrentStore().searchPresets.find(entry => entry.id === id)
      if (!preset) return false

      applyPresetToTab(tab, preset)

      return true
    }

    function deleteSearchPreset(id: string) {
      const vueTorrentStore = useVueTorrentStore()
      const index = vueTorrentStore.searchPresets.findIndex(preset => preset.id === id)
      if (index === -1) return false

      vueTorrentStore.searchPresets.splice(index, 1)
      // Never leave the default pointing at a deleted preset.
      if (vueTorrentStore.searchPresetDefaultId === id) {
        vueTorrentStore.searchPresetDefaultId = null
      }

      return true
    }

    /** Pass `null` to clear the default. Referencing an unknown preset is a no-op. */
    function setDefaultSearchPreset(id: string | null) {
      const vueTorrentStore = useVueTorrentStore()
      if (id === null) {
        vueTorrentStore.searchPresetDefaultId = null
        return true
      }
      if (!vueTorrentStore.searchPresets.some(preset => preset.id === id)) return false

      vueTorrentStore.searchPresetDefaultId = id

      return true
    }

    function deleteTab(uniqueId: string) {
      searchData.value = searchData.value.filter(tab => tab.uniqueId !== uniqueId)
    }

    async function runNewSearch(tab: SearchData) {
      const searchJob = await qbit.startSearch(tab.query, tab.filters.category, [tab.filters.plugin])
      tab.id = searchJob.id
      tab.results = []
      tab.lastQuery = tab.query
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
      saveSearchPreset,
      loadSearchPreset,
      deleteSearchPreset,
      setDefaultSearchPreset,
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
