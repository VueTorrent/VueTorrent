<script setup lang="ts">
import {ref} from 'vue'
import TopContainer from '@/components/Navbar/TopMenu/TopContainer.vue'
import CurrentSpeed from '@/components/Navbar/CurrentSpeed.vue'
import TransferStats from '@/components/Navbar/TransferStats.vue'

const isDrawerOpen = ref(true)

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title>
      <span class="text-accent">Vue</span>Torrent
    </v-app-bar-title>
    <v-spacer />
    <TopContainer />
  </v-app-bar>

  <v-navigation-drawer v-model="isDrawerOpen">
    <v-list>
      <v-list-item>
        <CurrentSpeed />
      </v-list-item>
      <v-list-item>
        <TransferStats />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>