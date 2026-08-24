<script setup lang="ts">
import { useAddTorrentStore, useDialogStore } from '@/stores'

const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()
</script>

<template>
  <v-bottom-navigation
    v-touch="{ up: dialogStore.initAndOpenAddTorrentDialog }"
    :active="addTorrentStore.pendingTorrentsCount > 0"
    class="cursor-pointer"
    @click="dialogStore.initAndOpenAddTorrentDialog">
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', addTorrentStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-list-item>
      <v-icon icon="mdi-chevron-up" />
    </v-list-item>
  </v-bottom-navigation>
</template>
