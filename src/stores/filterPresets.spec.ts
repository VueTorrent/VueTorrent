import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useFilterPresetStore } from './filterPresets'
import { useTorrentStore } from './torrents'
import { FilterType, TorrentState } from '@/constants/vuetorrent'

beforeEach(() => {
  setActivePinia(createTestingPinia({ stubActions: false }))
})

function setupFilters(torrents: ReturnType<typeof useTorrentStore>) {
  torrents.textFilter = 'peaky'
  torrents.statusFilter = [TorrentState.UPLOADING, TorrentState.UL_STALLED]
  torrents.categoryFilter = ['tv']
  torrents.tagFilterInclude = ['hd']
  torrents.tagFilterExclude = ['1080p']
  torrents.tagFilterType = FilterType.CONJUNCTIVE
}

describe('stores/filterPresets', () => {
  test('saves the current sort only when asked to', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    torrents.sortCriterias = [{ value: 'name', reverse: false }]

    expect(presets.saveFilterPreset('Without sort').sortCriterias).toBeUndefined()
    expect(presets.saveFilterPreset('With sort', true).sortCriterias).toEqual([{ value: 'name', reverse: false }])
  })

  test('applies the saved sort and leaves the current sort otherwise', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    torrents.sortCriterias = [{ value: 'name', reverse: false }]
    const withSort = presets.saveFilterPreset('With sort', true)
    const withoutSort = presets.saveFilterPreset('Without sort')

    torrents.sortCriterias = [{ value: 'size', reverse: true }]
    presets.applyFilterPreset(withoutSort.id)
    expect(torrents.sortCriterias).toEqual([{ value: 'size', reverse: true }])

    presets.applyFilterPreset(withSort.id)
    expect(torrents.sortCriterias).toEqual([{ value: 'name', reverse: false }])
  })

  test('changing the sort keeps the preset active and its filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('With sort', true)
    presets.applyFilterPreset(preset.id)

    torrents.sortCriterias = [{ value: 'size', reverse: true }]

    expect(presets.activeFilterPresetId).toBe(preset.id)
    expect(torrents.textFilter).toBe('peaky')
    expect(preset.sortCriterias).toEqual([{ value: 'added_on', reverse: true }])
  })

  test('updates the saved sort only when asked to', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const { id } = presets.saveFilterPreset('With sort', true)
    torrents.sortCriterias = [{ value: 'size', reverse: true }]

    presets.updateFilterPreset(id, true)
    expect(presets.filterPresets[0].sortCriterias).toEqual([{ value: 'size', reverse: true }])

    presets.updateFilterPreset(id)
    expect(presets.filterPresets[0].sortCriterias).toBeUndefined()
  })

  test('saves the current filters as a named preset', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)

    const preset = presets.saveFilterPreset('  Peaky Blinders  ')

    expect(presets.filterPresets).toHaveLength(1)
    expect(preset.name).toBe('Peaky Blinders')
    expect(preset.textFilter).toBe('peaky')
    expect(preset.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(preset.categoryFilter).toEqual(['tv'])
    expect(preset.tagFilterInclude).toEqual(['hd'])
    expect(preset.tagFilterExclude).toEqual(['1080p'])
    expect(preset.tagFilterType).toBe(FilterType.CONJUNCTIVE)
  })

  test('saved preset is not affected by later filter changes', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky Blinders')

    torrents.statusFilter.push(TorrentState.DOWNLOADING)
    torrents.textFilter = 'other'

    expect(preset.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(preset.textFilter).toBe('peaky')
  })

  test('detects the preset matching the current filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    expect(presets.activeFilterPresetId).toBeNull()

    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky Blinders')
    expect(presets.activeFilterPresetId).toBe(preset.id)

    torrents.statusFilter = [TorrentState.UL_STALLED, TorrentState.UPLOADING]
    expect(presets.activeFilterPresetId).toBe(preset.id)

    torrents.textFilter = 'other'
    expect(presets.activeFilterPresetId).toBeNull()
  })

  test('preset is not considered active when one of its filters is disabled', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    presets.saveFilterPreset('Peaky Blinders')

    torrents.isStatusFilterActive = false
    expect(presets.activeFilterPresetId).toBeNull()
  })

  test('disabled filters are not saved in a preset', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    torrents.isStatusFilterActive = false
    torrents.isTagFilterActive = false

    const preset = presets.saveFilterPreset('Without states')

    expect(preset.textFilter).toBe('peaky')
    expect(preset.categoryFilter).toEqual(['tv'])
    expect(preset.statusFilter).toEqual([])
    expect(preset.tagFilterInclude).toEqual([])
    expect(preset.tagFilterExclude).toEqual([])
    expect(presets.activeFilterPresetId).toBe(preset.id)
  })

  test('nothing to save when all present filters are disabled', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    torrents.textFilter = 'peaky'
    torrents.isTextFilterActive = false

    expect(presets.hasAnyFilter).toBe(false)
  })

  test('applies a preset and re-enables disabled filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky Blinders')

    presets.clearFilters()
    torrents.isTagFilterActive = false
    expect(presets.hasAnyFilter).toBe(false)

    presets.applyFilterPreset(preset.id)

    expect(torrents.textFilter).toBe('peaky')
    expect(torrents.statusFilter).toEqual([TorrentState.UPLOADING, TorrentState.UL_STALLED])
    expect(torrents.tagFilterExclude).toEqual(['1080p'])
    expect(torrents.isTagFilterActive).toBe(true)
    expect(presets.activeFilterPresetId).toBe(preset.id)
  })

  test('marks the applied preset as active when several presets share the same filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const first = presets.saveFilterPreset('First')
    const second = presets.saveFilterPreset('Second')

    presets.applyFilterPreset(second.id)
    expect(presets.activeFilterPresetId).toBe(second.id)

    presets.applyFilterPreset(first.id)
    expect(presets.activeFilterPresetId).toBe(first.id)
  })

  test('applying a preset does not share arrays with it', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky Blinders')

    presets.applyFilterPreset(preset.id)
    torrents.categoryFilter.push('movies')

    expect(presets.filterPresets[0].categoryFilter).toEqual(['tv'])
  })

  test('ignores unknown preset ids', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)

    presets.applyFilterPreset('unknown')

    expect(torrents.textFilter).toBe('peaky')
  })

  test('clears all filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    torrents.trackerFilterInclude = ['tracker.example.org']

    presets.clearFilters()

    expect(presets.hasAnyFilter).toBe(false)
  })

  test('updates a preset with the current filters', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky Blinders')

    torrents.textFilter = 'peaky s06'
    torrents.statusFilter = [TorrentState.DOWNLOADING]
    expect(presets.activeFilterPresetId).toBeNull()

    presets.updateFilterPreset(preset.id)

    expect(presets.filterPresets[0].id).toBe(preset.id)
    expect(presets.filterPresets[0].name).toBe('Peaky Blinders')
    expect(presets.filterPresets[0].textFilter).toBe('peaky s06')
    expect(presets.filterPresets[0].statusFilter).toEqual([TorrentState.DOWNLOADING])
    expect(presets.activeFilterPresetId).toBe(preset.id)
  })

  test('renames a preset', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky')

    presets.renameFilterPreset(preset.id, '  Peaky Blinders  ')

    expect(presets.filterPresets[0].name).toBe('Peaky Blinders')
    expect(presets.filterPresets[0].textFilter).toBe('peaky')
    expect(presets.activeFilterPresetId).toBe(preset.id)
  })

  test('ignores an empty name when renaming', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const preset = presets.saveFilterPreset('Peaky')

    presets.renameFilterPreset(preset.id, '   ')

    expect(presets.filterPresets[0].name).toBe('Peaky')
  })

  test('deletes a preset', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    const first = presets.saveFilterPreset('First')
    torrents.textFilter = 'other'
    const second = presets.saveFilterPreset('Second')

    presets.deleteFilterPreset(first.id)

    expect(presets.filterPresets.map(p => p.id)).toEqual([second.id])
  })

  test('keeps presets when the torrent store is reset', () => {
    const torrents = useTorrentStore()
    const presets = useFilterPresetStore()
    setupFilters(torrents)
    presets.saveFilterPreset('Peaky Blinders')

    torrents.$reset()

    expect(presets.filterPresets).toHaveLength(1)
    expect(presets.hasAnyFilter).toBe(false)
  })
})
