<script setup lang="ts">
import { formatPercent } from '@/helpers'
import { Torrent } from '@/types/VueTorrent'

defineProps<{ torrent: Torrent, title: string, value: string }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.${title}`) }}
    </div>
    <div>
      {{ formatPercent(torrent[value]) }}
    </div>
  </div>
</template>

<style scoped>

</style>