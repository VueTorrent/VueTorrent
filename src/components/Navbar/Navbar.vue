<script setup lang="ts">
import { useMainData } from '@/composables/api/info'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import BottomActions from './BottomActions.vue'
import TopActions from './TopActions.vue'

import CurrentSpeed from './CurrentSpeed.vue'
import FreeSpace from './FreeSpace.vue'
import SpeedGraph from './SpeedGraph.vue'
import TransferStats from './TransferStats.vue'

// composables
const authStore = useAuthStore()
const mainData = useMainData()
const { mobile } = useDisplay()

// data
const drawer = ref(mobile.value ? false : true)
</script>

<template>
  <VNavigationDrawer
    v-model="drawer"
    style="position: fixed"
    width="256"
    height="100%"
    disableResizeWatcher
    color="primary"
  >
    <VCard class="pa-1 pt-3" flat color="primary">
      <CurrentSpeed />
      <SpeedGraph />
      <TransferStats />
      <TransferStats isSession />
      <FreeSpace :space="mainData.data.value?.server_state?.free_space_on_disk || 0" />
      <!-- <FilterSelect :show-tracker-filter="true" /> -->
    </VCard>
    <template #append>
      <div class="pa-2">
        <BottomActions />
      </div>
    </template>
  </VNavigationDrawer>

  <VAppBar>
    <VAppBarNavIcon
      class="text-grey"
      aria-label="Open Navigation Drawer"
      @click.stop="drawer = !drawer"
    />
    <VToolbarTitle
      v-if="!$vuetify.display.xs"
      :class="['text-grey', { 'subheading ml-0': $vuetify.display.smAndDown }]"
    >
      <span class="font-weight-light">qBit</span>
      <span>torrent</span>
    </VToolbarTitle>
    <TopActions />
  </VAppBar>
</template>

<style lang="scss">
#app > div > nav > nav > div.v-navigation-drawer__content {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #56718c;
    border-radius: 20px;
  }
}

.v-app-bar > .v-toolbar__content {
  padding-right: 0;
}

.navbar {
  @media screen and (max-width: 480px) {
    .v-toolbar__title {
      display: none;
    }
    .spacer {
      display: none;
    }
  }
}
</style>
