<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useAddTorrentStore, useDialogStore } from '@/stores'

const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()

function openAddTorrentDialog() {
  dialogStore.createDialog(defineAsyncComponent(() => import('./Dialogs/AddTorrentDialog.vue')))
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
