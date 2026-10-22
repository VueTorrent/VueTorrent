import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useTorrentStore } from './torrents'
import { FilterType, TorrentState } from '@/constants/vuetorrent'

beforeEach(() => {
  setActivePinia(createTestingPinia({ stubActions: false }))
})

function setupFilters(store: ReturnType<typeof useTorrentStore>) {
  store.textFilter = 'peaky'
  store.statusFilter = [TorrentState.UPLOADING, TorrentState.UL_STALLED]
  store.categoryFilter = ['tv']
  store.tagFilterInclude = ['hd']
  store.tagFilterExclude = ['1080p']
  store.tagFilterType = FilterType.CONJUNCTIVE
}

describe('stores/torrents - filter presets', () => {
  test('saves the current filters as a named preset', () => {
    const store = useTorrentStore()
    setupFilters(store)

    const preset = store.saveFilterPreset('  Peaky Blinders  ')

    expect(store.filterPresets).toHaveLength(1)
    expect(preset.name).toBe('Peaky Blinders')
    expect(preset.textFilter).toBe('peaky')
    expect(preset.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(preset.categoryFilter).toEqual(['tv'])
    expect(preset.tagFilterInclude).toEqual(['hd'])
    expect(preset.tagFilterExclude).toEqual(['1080p'])
    expect(preset.tagFilterType).toBe(FilterType.CONJUNCTIVE)
  })

  test('saved preset is not affected by later filter changes', () => {
    const store = useTorrentStore()
    setupFilters(store)
    const preset = store.saveFilterPreset('Peaky Blinders')

    store.statusFilter.push(TorrentState.DOWNLOADING)
    store.textFilter = 'other'

    expect(preset.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(preset.textFilter).toBe('peaky')
  })

  test('detects the preset matching the current filters', () => {
    const store = useTorrentStore()
    expect(store.activeFilterPresetId).toBeNull()

    setupFilters(store)
    const preset = store.saveFilterPreset('Peaky Blinders')
    expect(store.activeFilterPresetId).toBe(preset.id)

    // Order of selected items doesn't matter
    store.statusFilter = [TorrentState.UL_STALLED, TorrentState.UPLOADING]
    expect(store.activeFilterPresetId).toBe(preset.id)

    store.textFilter = 'other'
    expect(store.activeFilterPresetId).toBeNull()
  })

  test('preset is not considered active when one of its filters is disabled', () => {
    const store = useTorrentStore()
    setupFilters(store)
    store.saveFilterPreset('Peaky Blinders')

    store.isStatusFilterActive = false
    expect(store.activeFilterPresetId).toBeNull()
  })

  test('applies a preset and re-enables disabled filters', () => {
    const store = useTorrentStore()
    setupFilters(store)
    const preset = store.saveFilterPreset('Peaky Blinders')

    store.clearFilters()
    store.isTagFilterActive = false
    expect(store.hasAnyFilter).toBe(false)

    store.applyFilterPreset(preset.id)

    expect(store.textFilter).toBe('peaky')
    expect(store.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(store.tagFilterExclude).toEqual(['1080p'])
    expect(store.isTagFilterActive).toBe(true)
    expect(store.activeFilterPresetId).toBe(preset.id)
  })

  test('applying a preset does not share arrays with it', () => {
    const store = useTorrentStore()
    setupFilters(store)
    const preset = store.saveFilterPreset('Peaky Blinders')

    store.applyFilterPreset(preset.id)
    store.categoryFilter.push('movies')

    expect(store.filterPresets[0].categoryFilter).toEqual(['tv'])
  })

  test('ignores unknown preset ids', () => {
    const store = useTorrentStore()
    setupFilters(store)

    store.applyFilterPreset('unknown')

    expect(store.textFilter).toBe('peaky')
  })

  test('clears all filters', () => {
    const store = useTorrentStore()
    setupFilters(store)
    store.trackerFilterInclude = ['tracker.example.org']

    store.clearFilters()

    expect(store.hasAnyFilter).toBe(false)
  })

  test('deletes a preset', () => {
    const store = useTorrentStore()
    setupFilters(store)
    const first = store.saveFilterPreset('First')
    store.textFilter = 'other'
    const second = store.saveFilterPreset('Second')

    store.deleteFilterPreset(first.id)

    expect(store.filterPresets.map(p => p.id)).toEqual([second.id])
  })

  test('keeps presets when the store is reset', () => {
    const store = useTorrentStore()
    setupFilters(store)
    store.saveFilterPreset('Peaky Blinders')

    store.$reset()

    expect(store.filterPresets).toHaveLength(1)
    expect(store.hasAnyFilter).toBe(false)
  })
})
