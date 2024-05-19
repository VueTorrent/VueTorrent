<script setup lang="ts">
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { useAddTorrentStore, useDialogStore } from '@/stores'

const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()

function openAddTorrentDialog() {
  dialogStore.createDialog(AddTorrentDialog)
}
</script>

<template>
  <v-bottom-navigation :active="addTorrentStore.pendingTorrentsCount > 0" class="cursor-pointer" v-touch="{ up: openAddTorrentDialog }" @click="openAddTorrentDialog">
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', addTorrentStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-list-item>
      <v-icon icon="mdi-chevron-up" />
    </v-list-item>
  </v-bottom-navigation>
</template>

<style scoped></style>
