<script setup lang="ts">
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import { useDialogStore } from '@/stores/dialog'
import { useNavbarStore } from '@/stores/navbar'

const dialogStore = useDialogStore()
const navbarStore = useNavbarStore()

function openAddTorrentDialog() {
  dialogStore.createDialog(AddTorrentDialog)
}
</script>

<template>
  <v-bottom-navigation :active="navbarStore.pendingTorrentsCount > 0" class="pointer" v-touch="{ up: openAddTorrentDialog }" @click="openAddTorrentDialog">
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', navbarStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-list-item>
      <v-icon icon="mdi-chevron-up" />
    </v-list-item>
  </v-bottom-navigation>
</template>

<style scoped></style>
