<script setup lang="ts">
import { formatPercent } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()
</script>

<template>
  <td>
    <v-progress-linear :model-value="torrent[value]" :max="1" :height="20" :color="`torrent-${torrent.state}`" rounded="sm" style="width: 10em">
      {{ formatPercent(torrent[value]) }}
    </v-progress-linear>
  </td>
</template>

<style scoped></style>
