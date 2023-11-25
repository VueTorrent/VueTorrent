<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string; total: string }>()
</script>

<template>
  <td>{{ torrent[value] }} / {{ torrent[total] }}</td>
</template>

<style scoped></style>
