<script setup lang="ts">
import type { Torrent } from '@/models'
import { titleCase } from '@/utils/textFormatting'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.progress')) }}
    </div>
    <VProgressLinear
      :model-value="Math.round(torrent.progress * 10000) / 100"
      height="20"
      :color="`torrent-${torrent.state}`"
      rounded
    >
      <span class="text-caption text-white">{{ Math.round(torrent.progress * 10000) / 100 }}%</span>
    </VProgressLinear>
  </VCol>
</template>
