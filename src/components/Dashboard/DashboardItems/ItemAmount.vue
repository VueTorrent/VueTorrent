<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; titleKey?: string; value: (t: Torrent) => number; total?: (t: Torrent) => number }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      {{ value(torrent) }}
      <span v-if="total" class="text-caption text-grey"> / {{ total(torrent) }} </span>
    </div>
  </div>
</template>
