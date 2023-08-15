<script setup lang="ts">
import { Torrent } from '@/types/VueTorrent'

defineProps<{ torrent: Torrent, title: string, value: string, total: string }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.${title}`) }}
    </div>
    <div>{{ torrent[value] }} / {{ torrent[total] }}</div>
  </div>
</template>

<style scoped>

</style>