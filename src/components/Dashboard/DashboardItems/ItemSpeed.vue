<script setup lang="ts">
import { formatSpeed } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/VueTorrent'

defineProps<{ torrent: Torrent, title: string, value: string }>()

const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.${title}`) }}
    </div>
    <div>
      {{ formatSpeed(torrent[value], vuetorrentStore.useBitSpeed) }}
    </div>
  </div>
</template>

<style scoped>

</style>