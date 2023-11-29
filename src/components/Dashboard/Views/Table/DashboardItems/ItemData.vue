<script setup lang="ts">
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <td>{{ formatData(torrent[value], vuetorrentStore.useBinarySize) }}</td>
</template>

<style scoped></style>
