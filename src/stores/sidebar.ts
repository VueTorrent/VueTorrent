import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { SidebarWidget } from '@/types/vuetorrent'

type FilterKey = 'state' | 'category' | 'tag' | 'tracker'

interface FilterItem {
  name: FilterKey
  active: boolean
}

export const useSidebarStore = defineStore(
  'sidebar',
  () => {
    const sidebarWidgets = ref<SidebarWidget[]>([
      { name: 'CurrentSpeed', active: true },
      { name: 'SpeedGraph', active: true },
      { name: 'TransferStats', active: true },
      { name: 'FreeSpace', active: true },
      { name: 'PerformanceStats', active: true },
      { name: 'Filters', active: true },
    ])
    const showFilterState = ref(true)
    const showFilterCategory = ref(true)
    const showFilterTag = ref(true)
    const showFilterTracker = ref(true)
    const isDrawerRight = ref(false)

    const filters = ref<FilterItem[]>([
      { name: 'state', active: true },
      { name: 'category', active: true },
      { name: 'tag', active: true },
      { name: 'tracker', active: true },
    ])

    function toggleWidget(name: string) {
      const widget = sidebarWidgets.value.find(w => w.name === name)
      if (widget) {
        widget.active = !widget.active
      }
    }

    function setAllWidgets(active: boolean) {
      sidebarWidgets.value = sidebarWidgets.value.map(widget => ({ ...widget, active }))
    }

    function setAllFilters(active: boolean) {
      filters.value = filters.value.map(filter => ({ ...filter, active }))
    }

    return {
      sidebarWidgets,
      toggleWidget,
      setAllWidgets,
      setAllFilters,
      showFilterState,
      showFilterCategory,
      showFilterTag,
      showFilterTracker,
      isDrawerRight,
      filters,
      $reset: () => {
        sidebarWidgets.value = [
          { name: 'CurrentSpeed', active: true },
          { name: 'SpeedGraph', active: true },
          { name: 'TransferStats', active: true },
          { name: 'FreeSpace', active: true },
          { name: 'PerformanceStats', active: true },
          { name: 'Filters', active: true },
        ]
        showFilterState.value = true
        showFilterCategory.value = true
        showFilterTag.value = true
        showFilterTracker.value = true
        isDrawerRight.value = false
        filters.value = [
          { name: 'state', active: true },
          { name: 'category', active: true },
          { name: 'tag', active: true },
          { name: 'tracker', active: true },
        ]
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, key: 'sidebarSettings' }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
}
