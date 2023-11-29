<script setup lang="ts">
import { TorrentState } from '@/constants/qbit'
import { formatPercent } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; title: string; value: string }>()

const isTorrentActive = computed(() => {
  return [
    TorrentState.UPLOADING,
    TorrentState.CHECKING_UP,
    TorrentState.FORCED_UP,
    TorrentState.ALLOCATING,
    TorrentState.DOWNLOADING,
    TorrentState.META_DL,
    TorrentState.CHECKING_DL,
    TorrentState.FORCED_DL,
    TorrentState.CHECKING_RESUME_DATA,
    TorrentState.MOVING
  ].includes(props.torrent.state)
})
</script>

<template>
  <td>
    <v-progress-linear :model-value="torrent[value]" :max="1" :striped="isTorrentActive" :height="20" :color="`torrent-${torrent.state}`" rounded="sm" style="width: 10em">
      {{ formatPercent(torrent[value]) }}
    </v-progress-linear>
  </td>
</template>

<style scoped></style>
