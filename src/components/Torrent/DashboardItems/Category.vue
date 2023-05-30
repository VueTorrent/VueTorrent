<script setup lang="ts">
import type { Torrent } from '@/models'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol v-if="torrent.category" cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.category') }}
    </div>
    <VChip small :class="`torrent-${torrent.category} text-white text-caption`">
      {{ torrent.category }}
    </VChip>
  </VCol>
</template>
