<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ActiveFilters from './TopWidgets/ActiveFilters.vue'
import TopContainer from './TopWidgets/TopContainer.vue'
import TorrentSearchbar from '@/components/TorrentSearchbar.vue'
import { useNavbarStore } from '@/stores'
import { useVueTorrentStore } from '@/stores'

const router = useRouter()
const { isDrawerOpen } = storeToRefs(useNavbarStore())

const vueTorrentStore = useVueTorrentStore()

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

function goHome() {
  void router.push({ name: 'dashboard' })
}
</script>

<template>
  <v-app-bar class="ios-padding">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <div class="title-wrapper cursor-pointer" @click="goHome">
      <span v-if="$vuetify.display.smAndUp" class="text-accent">{{ vueTorrentStore.uiBrandPre }}</span>
      <span v-if="$vuetify.display.smAndUp">{{ vueTorrentStore.uiBrandPost }}</span>
    </div>

    <ActiveFilters />

    <TorrentSearchbar v-if="$vuetify.display.lgAndUp" bg-color="background" class="px-6" />
    <v-spacer v-else />

    <TopContainer />
  </v-app-bar>
</template>

<style scoped lang="scss">
.title-wrapper {
  display: inline-flex;
  width: min-content;
  padding: 0.4em;
  align-items: center;
  font-size: larger;
}
</style>
