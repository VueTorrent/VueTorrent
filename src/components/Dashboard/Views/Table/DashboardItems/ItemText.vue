<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()
</script>

<template>
  <td>{{ torrent[value] }}</td>
</template>

<style scoped></style>
