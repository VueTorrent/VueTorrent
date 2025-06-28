<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBinarySize } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td class="text-no-wrap">
    {{ formatData(value(torrent), useBinarySize) }}
  </td>
</template>
