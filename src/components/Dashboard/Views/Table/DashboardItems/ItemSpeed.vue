<script setup lang="ts">
import { formatSpeed } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBitSpeed } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td>{{ formatSpeed(value(torrent), useBitSpeed) }}</td>
</template>
