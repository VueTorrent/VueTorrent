<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import BottomActions from './SideWidgets/BottomActions.vue'
import CurrentSpeed from './SideWidgets/CurrentSpeed.vue'
import Filters from './SideWidgets/Filters.vue'
import FreeSpace from './SideWidgets/FreeSpace.vue'
import PerformanceStats from './SideWidgets/PerformanceStats.vue'
import SpeedGraph from './SideWidgets/SpeedGraph.vue'
import TransferStats from './SideWidgets/TransferStats.vue'
import { useDashboardStore, useNavbarStore, useVueTorrentStore } from '@/stores'

const dashboardStore = useDashboardStore()
const { isDrawerOpen } = storeToRefs(useNavbarStore())
const {
  isDrawerRight,
  showCurrentSpeed,
  showSpeedGraph,
  showTransferStats,
  showPerformanceStats,
  showFreeSpace,
  showFilterState,
  showFilterCategory,
  showFilterTag,
  showFilterTracker,
} = storeToRefs(useVueTorrentStore())

const showFilters = computed(() => showFilterState.value || showFilterCategory.value || showFilterTag.value || showFilterTracker.value)
</script>

<template>
  <v-navigation-drawer v-model="isDrawerOpen" class="ios-padding" :location="isDrawerRight ? 'right' : 'left'" color="navbar" disable-route-watcher>
    <v-list class="clean-px px-2 pt-0">
      <v-list-item v-if="showCurrentSpeed">
        <CurrentSpeed />
      </v-list-item>

      <v-list-item v-if="showSpeedGraph">
        <SpeedGraph />
      </v-list-item>

      <v-list-item v-if="showTransferStats">
        <TransferStats />
      </v-list-item>

      <v-list-item v-if="showFreeSpace">
        <FreeSpace />
      </v-list-item>

      <v-list-item v-if="showPerformanceStats">
        <PerformanceStats />
      </v-list-item>

      <v-list-item v-if="showFilters">
        <Filters />
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
