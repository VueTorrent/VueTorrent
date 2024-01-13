<script setup lang="ts">
import { formatPercent } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <v-progress-linear :model-value="torrent[value]" :max="1" :height="20" :color="`torrent-${torrent.state}`" rounded="sm" style="width: 10em">
      {{ formatPercent(torrent[value]) }}
    </v-progress-linear>
  </div>
</template>

<style scoped></style>
