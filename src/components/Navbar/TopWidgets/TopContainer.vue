<script setup lang="ts">
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useDashboardStore, useNavbarStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflowMenu from './TopOverflowMenu.vue'

const router = useRouter()
const dashboardStore = useDashboardStore()
const navbarStore = useNavbarStore()

const deleteTorrentDialogVisible = ref(false)
const deleteHashes = ref<string[]>([])

const resumeTorrents = () => {
  // TODO
  console.log('resumeTorrents')
}
const pauseTorrents = () => {
  // TODO
  console.log('pauseTorrents')
}
const deleteTorrents = () => {
  deleteTorrentDialogVisible.value = true
  deleteHashes.value = [...dashboardStore.selectedTorrents]
}
const openSearchEngine = () => {
  router.push({ name: 'searchEngine' })
}
const openrssArticles = () => {
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

  <v-divider vertical inset />

  <TopOverflowMenu
    v-if="$vuetify.display.mobile"
    @resumeTorrents="resumeTorrents"
    @pauseTorrents="pauseTorrents"
    @deleteTorrents="deleteTorrents"
    @openSearchEngine="openSearchEngine"
    @openrssArticles="openrssArticles"
    @openLogs="openLogs"
    @openSettings="openSettings"
  />
  <TopActions
    v-else
    @resumeTorrents="resumeTorrents"
    @pauseTorrents="pauseTorrents"
    @deleteTorrents="deleteTorrents"
    @openSearchEngine="openSearchEngine"
    @openrssArticles="openrssArticles"
    @openLogs="openLogs"
    @openSettings="openSettings"
  />

  <ConfirmDeleteDialog v-model="deleteTorrentDialogVisible" :hashes="deleteHashes" disable-activator />
</template>

<style scoped></style>
