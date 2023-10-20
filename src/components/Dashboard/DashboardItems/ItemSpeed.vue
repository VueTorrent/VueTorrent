<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div>
      {{ formatSpeedValue(torrent[value], vuetorrentStore.useBitSpeed) }}
      <span class="text-caption text-grey">
        {{ formatSpeedUnit(torrent[value], vuetorrentStore.useBitSpeed) }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
