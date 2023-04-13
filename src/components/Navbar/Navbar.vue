<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useWebUISettingsStore } from '@/stores/settings'

import { useMainData } from '@/composables/api/info'
import { useDisplay } from 'vuetify'

// composables
const authStore = useAuthStore()
const settingsStore = useWebUISettingsStore()
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
      <TransferStats :isSession="false" />
      <TransferStats :isSession="true" />
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
    <VBtn @click="authStore.logout()"> Logout </VBtn>
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
