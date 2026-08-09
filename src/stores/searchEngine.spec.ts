import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useSearchEngineStore } from './searchEngine'
import { SearchEngineColumn } from '@/constants/vuetorrent'
import { SearchData, SearchPreset } from '@/types/vuetorrent'

/**
 * The VueTorrent settings store binds vue-i18n, vue-router and Vuetify's theme at setup
 * time, none of which exist outside a component. Stub it so the search store's own logic
 * can be unit-tested in isolation.
 */
const { fakeSettings } = vi.hoisted(() => ({
  fakeSettings: {
    searchEngineDefaultSortBy: 'none',
    searchEngineDefaultSortOrder: 'desc',
    searchPresets: [] as SearchPreset[],
    searchPresetDefaultId: null as string | null,
  },
}))

vi.mock('./vuetorrent', () => ({
  useVueTorrentStore: () => fakeSettings,
}))

vi.mock('@/services/qbit', () => ({
  default: {
    getSearchResults: vi.fn(() => Promise.resolve({ results: [], status: 'Stopped' as const, total: 0 })),
    startSearch: vi.fn(() => Promise.resolve({ id: 1 })),
    stopSearch: vi.fn(() => Promise.resolve()),
    getSearchPlugins: vi.fn(() => Promise.resolve([])),
  },
}))

describe('stores/searchEngine - presets', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fakeSettings.searchEngineDefaultSortBy = 'none'
    fakeSettings.searchEngineDefaultSortOrder = 'desc'
    fakeSettings.searchPresets = []
    fakeSettings.searchPresetDefaultId = null
  })

  function seedTab(store: ReturnType<typeof useSearchEngineStore>): SearchData {
    store.createNewTab()
    const tab = store.searchData[store.searchData.length - 1]
    tab.sortBy = [{ key: SearchEngineColumn.NB_SEEDERS, order: 'desc' }]
    tab.itemsPerPage = 50
    tab.filters.category = 'movies'
    tab.filters.plugin = 'jackett'
    tab.filters.title = '1080p'

    return tab
  }

  test('saves the current tab as a named preset and restores it', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    const id = store.saveSearchPreset(tab, 'Most seeders')!
    expect(fakeSettings.searchPresets).toHaveLength(1)
    expect(fakeSettings.searchPresets[0].name).toBe('Most seeders')

    tab.sortBy = []
    tab.itemsPerPage = 10
    tab.filters.category = 'all'

    expect(store.loadSearchPreset(tab, id)).toBe(true)
    expect(tab.sortBy).toEqual([{ key: SearchEngineColumn.NB_SEEDERS, order: 'desc' }])
    expect(tab.itemsPerPage).toBe(50)
    expect(tab.filters.category).toBe('movies')
  })

  test('there is no upper limit on the number of presets', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    for (let i = 0; i < 25; i++) {
      store.saveSearchPreset(tab, `Preset ${i}`)
    }

    expect(fakeSettings.searchPresets).toHaveLength(25)
  })

  test('saving under an existing name overwrites it in place and keeps its id', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    const firstId = store.saveSearchPreset(tab, 'Reused')
    store.setDefaultSearchPreset(firstId)

    tab.itemsPerPage = 100
    const secondId = store.saveSearchPreset(tab, 'Reused')

    expect(secondId).toBe(firstId)
    expect(fakeSettings.searchPresets).toHaveLength(1)
    expect(fakeSettings.searchPresets[0].itemsPerPage).toBe(100)
    // the default must survive an overwrite
    expect(fakeSettings.searchPresetDefaultId).toBe(firstId)
  })

  test('does not restore the text filter unless it was captured', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    // titleFilter defaults to false: a query-specific filter should not leak between searches
    const withoutTitle = store.saveSearchPreset(tab, 'No title')!
    tab.filters.title = 'something else'
    store.loadSearchPreset(tab, withoutTitle)
    expect(tab.filters.title).toBe('something else')

    const withTitle = store.saveSearchPreset(tab, 'With title', { sortBy: true, itemsPerPage: true, categoryAndPlugin: true, titleFilter: true })!
    tab.filters.title = 'changed again'
    store.loadSearchPreset(tab, withTitle)
    expect(tab.filters.title).toBe('something else')
  })

  test('a saved preset is not aliased by the tab that saved it', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    store.saveSearchPreset(tab, 'Snapshot')
    tab.sortBy![0].order = 'asc'

    expect(fakeSettings.searchPresets[0].sortBy[0].order).toBe('desc')
  })

  test('the default preset is applied to newly created tabs', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)
    const id = store.saveSearchPreset(tab, 'Default one')!

    expect(store.setDefaultSearchPreset(id)).toBe(true)

    store.createNewTab()
    const fresh = store.searchData[store.searchData.length - 1]
    expect(fresh.sortBy).toEqual([{ key: SearchEngineColumn.NB_SEEDERS, order: 'desc' }])
    expect(fresh.itemsPerPage).toBe(50)
    expect(fresh.filters.category).toBe('movies')
  })

  test('deleting a preset removes it and clears the default if it pointed there', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    const keep = store.saveSearchPreset(tab, 'Keep')!
    const drop = store.saveSearchPreset(tab, 'Drop')!
    store.setDefaultSearchPreset(drop)

    expect(store.deleteSearchPreset(drop)).toBe(true)
    expect(fakeSettings.searchPresets.map(preset => preset.id)).toEqual([keep])
    expect(fakeSettings.searchPresetDefaultId).toBeNull()
  })

  test('deleting a preset does not re-point the default at another one', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    const first = store.saveSearchPreset(tab, 'First')!
    const second = store.saveSearchPreset(tab, 'Second')!
    store.setDefaultSearchPreset(second)

    // Removing an earlier entry shifts indices; keying the default by id must survive that.
    store.deleteSearchPreset(first)
    expect(fakeSettings.searchPresetDefaultId).toBe(second)
  })

  test('unknown ids are rejected', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    expect(store.loadSearchPreset(tab, 'nope')).toBe(false)
    expect(store.deleteSearchPreset('nope')).toBe(false)
    expect(store.setDefaultSearchPreset('nope')).toBe(false)
  })

  test('falls back to the configured default sort when no preset is default', () => {
    const store = useSearchEngineStore()
    fakeSettings.searchEngineDefaultSortBy = SearchEngineColumn.PUB_DATE
    fakeSettings.searchEngineDefaultSortOrder = 'asc'

    store.createNewTab()
    const fresh = store.searchData[store.searchData.length - 1]
    expect(fresh.sortBy).toEqual([{ key: SearchEngineColumn.PUB_DATE, order: 'asc' }])
  })

  test('a blank name is rejected rather than inventing one', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    expect(store.saveSearchPreset(tab, '   ')).toBeNull()
    expect(fakeSettings.searchPresets).toHaveLength(0)
  })

  test('the text filter is not even stored when it was not captured', () => {
    const store = useSearchEngineStore()
    const tab = seedTab(store)

    // The checkbox says the filter is not saved, so it must not be persisted either -
    // otherwise it would still reach the settings export and the backend sync.
    const id = store.saveSearchPreset(tab, 'No title')!
    expect(fakeSettings.searchPresets.find(p => p.id === id)?.title).toBe('')

    const withTitle = store.saveSearchPreset(tab, 'With title', { sortBy: true, itemsPerPage: true, categoryAndPlugin: true, titleFilter: true })!
    expect(fakeSettings.searchPresets.find(p => p.id === withTitle)?.title).toBe('1080p')
  })
})
