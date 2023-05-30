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
      {{ titleCase($t('torrent.properties.content_path')) }}
    </div>
    <div>{{ torrent.content_path }}</div>
  </VCol>
</template>
