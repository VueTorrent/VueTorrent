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
      {{ titleCase($t('torrent.properties.infohash_v1')) }}
    </div>
    <div>
      {{ torrent.infohash_v1 }}
    </div>
  </VCol>
</template>
