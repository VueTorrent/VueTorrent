<script setup lang="ts">
import AddTorrentDialog from './Dialogs/AddTorrentDialog.vue'
import { useAddTorrentStore, useDialogStore } from '@/stores'

const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()

function openAddTorrentDialog() {
  dialogStore.createDialog(AddTorrentDialog)
}
</script>

<template>
  <v-bottom-navigation v-touch="{ up: openAddTorrentDialog }" :active="addTorrentStore.pendingTorrentsCount > 0" class="cursor-pointer" @click="openAddTorrentDialog">
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', addTorrentStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-list-item>
      <v-icon icon="mdi-chevron-up" />
    </v-list-item>
  </v-bottom-navigation>
</template>
