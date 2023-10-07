<script setup lang="ts">
import { useNavbarStore } from '@/stores'

const navbarStore = useNavbarStore()
</script>

<template>
  <v-bottom-navigation :active="navbarStore.pendingTorrentsCount > 0" class="pointer" v-touch="{ up: navbarStore.showAddTorrentDialog }" @click="navbarStore.showAddTorrentDialog">
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', navbarStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-list-item>
      <v-icon icon="mdi-chevron-up" />
    </v-list-item>
  </v-bottom-navigation>
</template>

<style scoped></style>
