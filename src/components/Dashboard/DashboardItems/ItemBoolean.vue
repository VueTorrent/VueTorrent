<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => boolean }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      <v-icon v-if="value(torrent)" color="accent">mdi-check</v-icon>
      <v-icon v-else color="error">mdi-close</v-icon>
    </div>
  </div>
</template>
