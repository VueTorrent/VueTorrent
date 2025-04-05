<script setup lang="ts">
import { useDashboardStore, useNavbarStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BottomActions from './SideWidgets/BottomActions.vue'
import CurrentSpeed from './SideWidgets/CurrentSpeed.vue'
import Filters from './SideWidgets/Filters.vue'
import FreeSpace from './SideWidgets/FreeSpace.vue'
import SpeedGraph from './SideWidgets/SpeedGraph.vue'
import TransferStats from './SideWidgets/TransferStats.vue'
import ActiveFilters from './TopWidgets/ActiveFilters.vue'
import TopContainer from './TopWidgets/TopContainer.vue'
import TorrentSearchbar from '@/components/TorrentSearchbar.vue'

const router = useRouter()
const dashboardStore = useDashboardStore()
const { isDrawerOpen } = storeToRefs(useNavbarStore())
const { isDrawerRight, showCurrentSpeed, showSpeedGraph, showAlltimeStat, showSessionStat, showFreeSpace } = storeToRefs(useVueTorrentStore())

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const goHome = () => {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <v-navigation-drawer class="ios-padding" v-model="isDrawerOpen" :location="isDrawerRight ? 'right' : 'left'" color="navbar" disable-route-watcher>
    <v-list class="clean-px px-2 pt-0">
      <v-list-item v-if="showCurrentSpeed">
        <CurrentSpeed />
      </v-list-item>

      <v-list-item v-if="showSpeedGraph">
        <SpeedGraph />
      </v-list-item>

      <v-list-item v-if="showAlltimeStat">
        <TransferStats :session="false" />
      </v-list-item>

      <v-list-item v-if="showSessionStat">
        <TransferStats :session="true" />
      </v-list-item>

      <v-list-item v-if="showFreeSpace">
        <FreeSpace />
      </v-list-item>

      <v-list-item>
        <Filters />
      </v-list-item>

      <v-list-item density="compact">
        <div class="d-flex justify-center text-accent text-select">
          {{ dashboardStore.torrentCountString }}
        </div>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <BottomActions />
    </template>
  </v-navigation-drawer>

  <v-app-bar class="ios-padding">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <div class="title-wrapper cursor-pointer" @click="goHome">
      <span v-if="$vuetify.display.smAndUp" class="text-accent">Vue</span>
      <span v-if="$vuetify.display.smAndUp">Torrent</span>
    </div>

    <ActiveFilters />

    <TorrentSearchbar v-if="$vuetify.display.lgAndUp" bg-color="background" class="px-6" />
    <v-spacer v-else />

    <TopContainer />
  </v-app-bar>
</template>

<style scoped lang="scss">
.clean-px > * {
  padding-inline-start: 0 !important;
  padding-inline-end: 0 !important;
}
.title-wrapper {
  display: inline-flex;
  width: min-content;
  padding: 0.4em;
  align-items: center;
  font-size: larger;
}
</style>
