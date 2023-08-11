<script setup lang="ts">
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflowMenu from './TopOverflowMenu.vue'

const router = useRouter()
const addTorrentDialogVisible = ref(false)

const resumeTorrents = () => {
  // TODO
  console.log('resumeTorrents')
}
const pauseTorrents = () => {
  // TODO
  console.log('pauseTorrents')
}
const deleteTorrents = () => {
  // TODO
  console.log('deleteTorrents')
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
      <v-btn icon v-bind="props">
        <v-icon>mdi-plus</v-icon>
        <AddTorrentDialog v-model="addTorrentDialogVisible" />
      </v-btn>
    </template>
  </v-tooltip>

  <TopActions v-if="$vuetify.display.smAndUp"
              @resumeTorrents="resumeTorrents"
              @pauseTorrents="pauseTorrents"
              @deleteTorrents="deleteTorrents"
              @openSearchEngine="openSearchEngine"
              @openRssFeeds="openRssFeeds"
              @openLogs="openLogs"
              @openSettings="openSettings"/>
  <TopOverflowMenu v-else
                   @resumeTorrents="resumeTorrents"
                   @pauseTorrents="pauseTorrents"
                   @deleteTorrents="deleteTorrents"
                   @openSearchEngine="openSearchEngine"
                   @openRssFeeds="openRssFeeds"
                   @openLogs="openLogs"
                   @openSettings="openSettings" />
</template>

<style scoped>

</style>