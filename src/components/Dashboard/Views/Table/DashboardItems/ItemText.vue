<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string, color?: (v: any) => string }>()
</script>

<template>
  <td :class="color ? color(torrent[value]) : ''">{{ torrent[value] }}</td>
</template>

<style scoped></style>
