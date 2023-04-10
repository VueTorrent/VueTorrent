<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePreferenceStore } from '@/stores/settings'
import SpeedGraph from './SpeedGraph.vue'
import CurrentSpeed from './CurrentSpeed.vue'
import TransferStats from './TransferStats.vue'
import FreeSpace from './FreeSpace.vue'

const drawer = ref(false)

const authStore = useAuthStore()
const settingsStore = usePreferenceStore()
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
    <VCard style="display: flex; flex-direction: column" class="pt-3" flat color="primary">
      <CurrentSpeed />

      <SpeedGraph />

      <TransferStats :isSession="false" />
      <TransferStats :isSession="true" />

      <FreeSpace />
    </VCard>
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
