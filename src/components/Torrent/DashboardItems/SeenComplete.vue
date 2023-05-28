<script setup lang="ts">
import type { Torrent } from '@/models'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <VCol cols="6" sm="1" md="1">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.seen_complete') }}
    </div>
    <div>
      {{ torrent.seen_complete }}
    </div>
  </VCol>
</template>
