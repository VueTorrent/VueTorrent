<script setup lang="ts">
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBinarySize } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td>{{ formatData(value(torrent), useBinarySize) }}</td>
</template>
