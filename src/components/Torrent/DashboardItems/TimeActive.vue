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
      {{ titleCase($t('torrent.properties.time_active')) }}
    </div>
    <div>
      {{ torrent.time_active }}
    </div>
  </VCol>
</template>
