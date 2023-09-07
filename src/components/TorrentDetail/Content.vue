<script setup lang="ts">
import { Torrent } from '@/types/VueTorrent'

const props = defineProps<{ torrent: Torrent, isActive: boolean }>()
</script>

<template>
  TorrentDetail > Content
  <!-- TODO -->
</template>

<style scoped>

</style>