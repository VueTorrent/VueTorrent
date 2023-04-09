<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const drawer = ref(false)

const status = ref(true)

const authStore = useAuthStore()
</script>

<template>
  <nav>
    <VAppBar>
      <VAppBarNavIcon
        class="grey--text text--lighten-1"
        aria-label="Open Navigation Drawer"
        @click.stop="drawer = !drawer"
      />
      <VToolbarTitle>
        <span class="font-weight-light">qBit</span>
        <span>torrent</span>
      </VToolbarTitle>
      <VBtn @click="authStore.logout()"> Logout </VBtn>
    </VAppBar>
    <VSpacer />

    <VNavigationDrawer
      v-model="drawer"
      app
      class="primary drawer"
      style="position: fixed"
      width="256"
      height="100%"
      disableResizeWatcher
    >
      <VCard v-if="true" style="display: flex; flex-direction: column" class="pt-3 primary" flat>
        <CurrentSpeed v-if="status" :status="status" />
      </VCard>
    </VNavigationDrawer>
  </nav>
</template>
