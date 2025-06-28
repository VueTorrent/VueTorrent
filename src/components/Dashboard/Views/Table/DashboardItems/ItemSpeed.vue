<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatSpeed } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBitSpeed } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td class="text-no-wrap">
    {{ formatSpeed(value(torrent), useBitSpeed) }}
  </td>
</template>
