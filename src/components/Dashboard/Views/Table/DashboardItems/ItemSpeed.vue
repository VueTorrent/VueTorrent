<script setup lang="ts">
import { formatSpeed } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <td>{{ formatSpeed(torrent[value], vuetorrentStore.useBitSpeed) }}</td>
</template>

<style scoped></style>
