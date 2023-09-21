<script setup lang="ts">
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useDashboardStore, useMaindataStore, useNavbarStore } from "@/stores";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TopActions from './TopActions.vue'
import TopOverflow from './TopOverflow.vue'

const route = useRoute()
const router = useRouter()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const navbarStore = useNavbarStore()

const deleteTorrentDialogVisible = ref(false)
const deleteHashes = ref<string[]>([])

const isOnTorrentDetail = computed(() => route.name === 'torrentDetail')
const hashes = computed(() => isOnTorrentDetail.value ? [route.params.hash as string] : dashboardStore.selectedTorrents)

const resumeTorrents = async () => {
  await maindataStore.resumeTorrents(hashes.value)
}
const pauseTorrents = async () => {
  await maindataStore.pauseTorrents(hashes.value)
}
const deleteTorrents = () => {
  if (!hashes.value.length) return

  deleteTorrentDialogVisible.value = true
  deleteHashes.value = [...hashes.value]
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

  <TopOverflow
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
