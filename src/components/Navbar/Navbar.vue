<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type SpeedGraph from './SpeedGraph.vue'

const drawer = ref(false)

const authStore = useAuthStore()
</script>

<template>
  <VNavigationDrawer
    v-model="drawer"
    class="primary drawer"
    style="position: fixed"
    width="256"
    height="100%"
    disableResizeWatcher
  >
    <VCard style="display: flex; flex-direction: column" class="pt-3 primary" flat>
      <CurrentSpeed />

      <SpeedGraph />
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
