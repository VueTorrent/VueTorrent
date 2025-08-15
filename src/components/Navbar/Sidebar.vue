<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent, Component } from 'vue'
import BottomActions from './SideWidgets/BottomActions.vue'
import { useDashboardStore, useNavbarStore, useSidebarStore } from '@/stores'
import { SidebarWidget } from '@/types/vuetorrent'

const CurrentSpeed = defineAsyncComponent(() => import('./SideWidgets/CurrentSpeed.vue'))
const SpeedGraph = defineAsyncComponent(() => import('./SideWidgets/SpeedGraph.vue'))
const TransferStats = defineAsyncComponent(() => import('./SideWidgets/TransferStats.vue'))
const FreeSpace = defineAsyncComponent(() => import('./SideWidgets/FreeSpace.vue'))
const PerformanceStats = defineAsyncComponent(() => import('./SideWidgets/PerformanceStats.vue'))
const Filters = defineAsyncComponent(() => import('./SideWidgets/Filters.vue'))

const dashboardStore = useDashboardStore()
const { isDrawerOpen } = storeToRefs(useNavbarStore())
const { sidebarWidgets, isDrawerRight, showFilterState, showFilterCategory, showFilterTag, showFilterTracker } = storeToRefs(useSidebarStore())

const components: Record<string, Component> = {
  CurrentSpeed,
  SpeedGraph,
  TransferStats,
  FreeSpace,
  PerformanceStats,
  Filters,
}

const orderedWidgets = computed(() => {
  return sidebarWidgets.value.filter((widget: SidebarWidget) => {
    if (widget.name === 'Filters') {
      return widget.active && (showFilterState.value || showFilterCategory.value || showFilterTag.value || showFilterTracker.value)
    }
    return widget.active
  })
})
</script>

<template>
  <v-navigation-drawer v-model="isDrawerOpen" class="ios-padding" :location="isDrawerRight ? 'right' : 'left'" color="navbar" disable-route-watcher>
    <v-list class="clean-px px-2 pt-0">
      <v-list-item v-for="widget in orderedWidgets" :key="widget.name">
        <component :is="components[widget.name]" />
      </v-list-item>

      <v-list-item density="compact" class="d-flex justify-center text-accent text-select">
        {{ dashboardStore.torrentCountString }}
      </v-list-item>
    </v-list>
    <template #append>
      <BottomActions />
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.clean-px > * {
  padding-inline-start: 0 !important;
  padding-inline-end: 0 !important;
}
</style>
