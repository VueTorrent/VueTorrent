<script setup lang="ts">
import { useNavbarStore } from '@/stores'
import { useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflowMenu from './TopOverflowMenu.vue'

const router = useRouter()
const navbarStore = useNavbarStore()

const resumeTorrents = () => {
  // TODO
  console.log('resumeTorrents')
}
const pauseTorrents = () => {
  // TODO
  console.log('pauseTorrents')
}
const openSearchEngine = () => {
  router.push({ name: 'searchEngine' })
}
const openRssFeeds = () => {
  router.push({ name: 'rssArticles' })
}
const openLogs = () => {
  router.push({ name: 'logs' })
}
const openSettings = () => {
  router.push({ name: 'settings' })
}
</script>

<template>
  <v-tooltip :text="$t('topbar.addTorrents')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-plus" v-bind="props" @click="navbarStore.showAddTorrentDialog" />
    </template>
  </v-tooltip>

  <TopActions v-if="!$vuetify.display.mobile"
              @resumeTorrents="resumeTorrents"
              @pauseTorrents="pauseTorrents"
              @openSearchEngine="openSearchEngine"
              @openRssFeeds="openRssFeeds"
              @openLogs="openLogs"
              @openSettings="openSettings"/>
  <TopOverflowMenu v-else
                   @resumeTorrents="resumeTorrents"
                   @pauseTorrents="pauseTorrents"
                   @openSearchEngine="openSearchEngine"
                   @openRssFeeds="openRssFeeds"
                   @openLogs="openLogs"
                   @openSettings="openSettings" />
</template>

<style scoped>

</style>