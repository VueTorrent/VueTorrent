<script setup lang="ts">
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
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
      :value="torrent.progress"
      height="20"
      style="width: 90%"
      :color="`torrent-${torrent.state}`"
      rounded
    >
      <span class="text-caption text-white">{{ torrent.progress }}%</span>
    </VProgressLinear>
  </VCol>
</template>
