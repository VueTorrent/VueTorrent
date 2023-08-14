<script setup lang="ts">
import { useNavbarStore } from '@/stores'

const navbarStore = useNavbarStore()
</script>

<template>
  <v-bottom-navigation :active="navbarStore.pendingTorrentsCount > 0" >
    <v-list-item :title="$t('navbar.addPanel.torrentsPendingCount', navbarStore.pendingTorrentsCount)" />
    <v-spacer />
    <v-btn icon="mdi-chevron-up" @click="navbarStore.showAddTorrentDialog" />
  </v-bottom-navigation>
</template>

<style scoped>

</style>