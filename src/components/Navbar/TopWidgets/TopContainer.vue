<script lang="ts" setup>
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/Confirm/ConfirmDeleteDialog.vue'
import { useDashboardStore, useDialogStore, useRssStore, useTorrentStore } from '@/stores'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflow from './TopOverflow.vue'

const route = useRoute()
const router = useRouter()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const rssStore = useRssStore()
const torrentStore = useTorrentStore()

const isOnTorrentDetail = computed(() => route.name === 'torrentDetail')
const hashes = computed(() => (isOnTorrentDetail.value ? [route.params.hash as string] : dashboardStore.selectedTorrents))

function openAddTorrentDialog() {
  dialogStore.createDialog(AddTorrentDialog)
}

async function resumeTorrents() {
  await torrentStore.resumeTorrents(hashes.value)
}

async function pauseTorrents() {
  await torrentStore.pauseTorrents(hashes.value)
}

function deleteTorrents() {
  if (!hashes.value.length) return

  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...hashes.value] })
}

function openSearchEngine() {
  router.push({ name: 'searchEngine' })
}

function openRssArticles() {
  router.push({ name: 'rssArticles', params: { tab: rssStore.lastView } })
}

function openTorrentCreator() {
  router.push({ name: 'torrentCreator' })
}

function openLogs() {
  router.push({ name: 'logs' })
}

function openSettings() {
  router.push({ name: 'settings' })
}
</script>

<template>
  <v-tooltip :text="$t('topbar.addTorrents')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-plus" v-bind="props" @click="openAddTorrentDialog" />
    </template>
  </v-tooltip>

  <v-divider inset vertical />

  <TopOverflow
    v-if="$vuetify.display.smAndDown"
    @deleteTorrents="deleteTorrents"
    @openLogs="openLogs"
    @openSearchEngine="openSearchEngine"
    @openSettings="openSettings"
    @openRssArticles="openRssArticles"
    @openTorrentCreator="openTorrentCreator"
    @pauseTorrents="pauseTorrents"
    @resumeTorrents="resumeTorrents" />
  <TopActions
    v-else
    @deleteTorrents="deleteTorrents"
    @openLogs="openLogs"
    @openSearchEngine="openSearchEngine"
    @openSettings="openSettings"
    @openRssArticles="openRssArticles"
    @openTorrentCreator="openTorrentCreator"
    @pauseTorrents="pauseTorrents"
    @resumeTorrents="resumeTorrents" />
</template>

<style scoped></style>
