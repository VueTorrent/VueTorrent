<script setup lang="ts">
import ActiveFilters from '@/components/Navbar/TopWidgets/ActiveFilters.vue'
import { ref } from 'vue'
import BottomActions from '@/components/Navbar/SideWidgets/BottomActions.vue'
import FilterSelect from '@/components/Navbar/SideWidgets/FilterSelect.vue'
import FreeSpace from '@/components/Navbar/SideWidgets/FreeSpace.vue'
import SpeedGraph from '@/components/Navbar/SideWidgets/SpeedGraph.vue'
import TopContainer from '@/components/Navbar/TopWidgets/TopContainer.vue'
import CurrentSpeed from '@/components/Navbar/SideWidgets/CurrentSpeed.vue'
import TransferStats from '@/components/Navbar/SideWidgets/TransferStats.vue'
import { useDashboardStore, useVueTorrentStore } from '@/stores'

const dashboardStore = useDashboardStore()
const vueTorrentStore = useVueTorrentStore()

const isDrawerOpen = ref(vueTorrentStore.openSideBarOnStart)

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<template>
  <v-navigation-drawer v-model="isDrawerOpen" color="primary" disable-route-watcher>
    <v-list class="clean-px px-2">
      <v-list-item v-if="vueTorrentStore.showCurrentSpeed">
        <CurrentSpeed />
      </v-list-item>

      <v-list-item v-if="vueTorrentStore.showSpeedGraph">
        <SpeedGraph />
      </v-list-item>

      <v-list-item v-if="vueTorrentStore.showAlltimeStat">
        <TransferStats :session="false" />
      </v-list-item>

      <v-list-item v-if="vueTorrentStore.showSessionStat">
        <TransferStats :session="true" />
      </v-list-item>

      <v-list-item v-if="vueTorrentStore.showFreeSpace">
        <FreeSpace />
      </v-list-item>

      <v-list-item>
        <FilterSelect />
      </v-list-item>

      <v-list-item density="compact">
        <div class="d-flex justify-center text-accent">
          {{ dashboardStore.torrentCountString }}
        </div>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <BottomActions />
    </template>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title>
      <span v-if="$vuetify.display.smAndUp" class="text-accent">Vue</span>
      <span v-if="$vuetify.display.smAndUp">Torrent</span>

      <ActiveFilters />
    </v-app-bar-title>

    <TopContainer />
  </v-app-bar>
</template>

<style scoped lang="scss">
.clean-px > * {
  padding-inline-start: 0 !important;
  padding-inline-end: 0 !important;
}
</style>
