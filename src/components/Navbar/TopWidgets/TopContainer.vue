<script lang="ts" setup>
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useDashboardStore, useDialogStore, useMaindataStore, useNavbarStore } from '@/stores'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflow from './TopOverflow.vue'

const route = useRoute()
const router = useRouter()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const navbarStore = useNavbarStore()

const isOnTorrentDetail = computed(() => route.name === 'torrentDetail')
const hashes = computed(() => (isOnTorrentDetail.value ? [route.params.hash as string] : dashboardStore.selectedTorrents))

const resumeTorrents = async () => {
  await maindataStore.resumeTorrents(hashes.value)
}
const pauseTorrents = async () => {
  await maindataStore.pauseTorrents(hashes.value)
}
const deleteTorrents = () => {
  if (!hashes.value.length) return

  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...hashes.value] })
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

  <v-divider inset vertical />

  <TopOverflow
    v-if="$vuetify.display.mobile"
    @deleteTorrents="deleteTorrents"
    @openLogs="openLogs"
    @openSearchEngine="openSearchEngine"
    @openSettings="openSettings"
    @openrssArticles="openrssArticles"
    @pauseTorrents="pauseTorrents"
    @resumeTorrents="resumeTorrents" />
  <TopActions
    v-else
    @deleteTorrents="deleteTorrents"
    @openLogs="openLogs"
    @openSearchEngine="openSearchEngine"
    @openSettings="openSettings"
    @openrssArticles="openrssArticles"
    @pauseTorrents="pauseTorrents"
    @resumeTorrents="resumeTorrents" />
</template>

<style scoped></style>
