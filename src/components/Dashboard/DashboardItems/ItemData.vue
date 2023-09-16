<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
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
      {{ formatDataValue(torrent[value], vuetorrentStore.useBinarySize) }}
      <span class="text-caption text-grey">
        {{ formatDataUnit(torrent[value], vuetorrentStore.useBinarySize) }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
