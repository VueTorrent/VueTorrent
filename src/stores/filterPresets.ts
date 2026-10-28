import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'
import { useTorrentStore } from './torrents'
import { FilterPreset } from '@/types/vuetorrent'

type FilterPresetValues = Omit<FilterPreset, 'id' | 'name'>

function sameItems<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every(v => b.includes(v)) && b.every(v => a.includes(v))
}

export const useFilterPresetStore = defineStore(
  'filterPresets',
  () => {
    const {
      filterType,
      isTextFilterActive,
      textFilter,
      isStatusFilterActive,
      statusFilter,
      isCategoryFilterActive,
      categoryFilter,
      isTagFilterActive,
      tagFilterInclude,
      tagFilterExclude,
      tagFilterType,
      isTrackerFilterActive,
      trackerFilterInclude,
      trackerFilterExclude,
      trackerFilterType,
    } = storeToRefs(useTorrentStore())

    const filterPresets = ref<FilterPreset[]>([])
    const lastAppliedPresetId = ref<string | null>(null)

    const effectiveFilters = computed<FilterPresetValues>(() => ({
      filterType: filterType.value,
      textFilter: isTextFilterActive.value ? textFilter.value : '',
      statusFilter: isStatusFilterActive.value ? [...statusFilter.value] : [],
      categoryFilter: isCategoryFilterActive.value ? [...categoryFilter.value] : [],
      tagFilterInclude: isTagFilterActive.value ? [...tagFilterInclude.value] : [],
      tagFilterExclude: isTagFilterActive.value ? [...tagFilterExclude.value] : [],
      tagFilterType: tagFilterType.value,
      trackerFilterInclude: isTrackerFilterActive.value ? [...trackerFilterInclude.value] : [],
      trackerFilterExclude: isTrackerFilterActive.value ? [...trackerFilterExclude.value] : [],
      trackerFilterType: trackerFilterType.value,
    }))

    const hasAnyFilter = computed(() => {
      const f = effectiveFilters.value
      return (
        f.textFilter.length > 0 ||
        f.statusFilter.length > 0 ||
        f.categoryFilter.length > 0 ||
        f.tagFilterInclude.length + f.tagFilterExclude.length > 0 ||
        f.trackerFilterInclude.length + f.trackerFilterExclude.length > 0
      )
    })

    function presetMatchesCurrentFilters(preset: FilterPreset) {
      const f = effectiveFilters.value
      return (
        preset.textFilter === f.textFilter &&
        sameItems(preset.statusFilter, f.statusFilter) &&
        sameItems(preset.categoryFilter, f.categoryFilter) &&
        sameItems(preset.tagFilterInclude, f.tagFilterInclude) &&
        sameItems(preset.tagFilterExclude, f.tagFilterExclude) &&
        sameItems(preset.trackerFilterInclude, f.trackerFilterInclude) &&
        sameItems(preset.trackerFilterExclude, f.trackerFilterExclude) &&
        (preset.statusFilter.length + preset.categoryFilter.length === 0 || preset.filterType === f.filterType) &&
        (preset.tagFilterInclude.length + preset.tagFilterExclude.length === 0 || preset.tagFilterType === f.tagFilterType) &&
        (preset.trackerFilterInclude.length + preset.trackerFilterExclude.length === 0 || preset.trackerFilterType === f.trackerFilterType)
      )
    }

    const activeFilterPresetId = computed(() => {
      if (!hasAnyFilter.value) return null
      const lastApplied = filterPresets.value.find(p => p.id === lastAppliedPresetId.value)
      if (lastApplied && presetMatchesCurrentFilters(lastApplied)) return lastApplied.id
      return filterPresets.value.find(presetMatchesCurrentFilters)?.id ?? null
    })

    function saveFilterPreset(name: string) {
      const preset: FilterPreset = { id: uuidv4(), name: name.trim(), ...structuredClone(effectiveFilters.value) }
      filterPresets.value = [...filterPresets.value, preset]
      return preset
    }

    function applyFilterPreset(id: string) {
      const preset = filterPresets.value.find(p => p.id === id)
      if (!preset) return

      lastAppliedPresetId.value = preset.id
      filterType.value = preset.filterType
      textFilter.value = preset.textFilter
      statusFilter.value = [...preset.statusFilter]
      categoryFilter.value = [...preset.categoryFilter]
      tagFilterInclude.value = [...preset.tagFilterInclude]
      tagFilterExclude.value = [...preset.tagFilterExclude]
      tagFilterType.value = preset.tagFilterType
      trackerFilterInclude.value = [...preset.trackerFilterInclude]
      trackerFilterExclude.value = [...preset.trackerFilterExclude]
      trackerFilterType.value = preset.trackerFilterType

      isTextFilterActive.value = true
      isStatusFilterActive.value = true
      isCategoryFilterActive.value = true
      isTagFilterActive.value = true
      isTrackerFilterActive.value = true
    }

    function clearFilters() {
      textFilter.value = ''
      statusFilter.value = []
      categoryFilter.value = []
      tagFilterInclude.value = []
      tagFilterExclude.value = []
      trackerFilterInclude.value = []
      trackerFilterExclude.value = []
    }

    function updateFilterPreset(id: string) {
      filterPresets.value = filterPresets.value.map(p => (p.id === id ? { id: p.id, name: p.name, ...structuredClone(effectiveFilters.value) } : p))
    }

    function renameFilterPreset(id: string, name: string) {
      const newName = name.trim()
      if (!newName) return
      filterPresets.value = filterPresets.value.map(p => (p.id === id ? { ...p, name: newName } : p))
    }

    function deleteFilterPreset(id: string) {
      filterPresets.value = filterPresets.value.filter(p => p.id !== id)
    }

    return {
      filterPresets,
      lastAppliedPresetId,
      hasAnyFilter,
      activeFilterPresetId,
      saveFilterPreset,
      applyFilterPreset,
      clearFilters,
      updateFilterPreset,
      renameFilterPreset,
      deleteFilterPreset,
      $reset: () => {
        filterPresets.value = []
        lastAppliedPresetId.value = null
      },
    }
  },
  {
    persist: [{ storage: localStorage, pick: ['filterPresets'] }],
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFilterPresetStore, import.meta.hot))
}
