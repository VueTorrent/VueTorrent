<script setup lang="ts">
import type { Torrent } from '@/models'
import { titleCase } from '@/utils/textFormatting'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <v-col cols="6" sm="2">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.completed_on')) }}
    </div>
    <div>{{ torrent.completed_on }}</div>
  </v-col>
</template>
