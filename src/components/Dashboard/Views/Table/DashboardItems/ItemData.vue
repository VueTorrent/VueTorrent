<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RawNumber from '@/components/Core/RawNumber.vue'
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBinarySize } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td class="text-no-wrap">
    <RawNumber :value="value(torrent)">
      {{ formatData(value(torrent), useBinarySize) }}
    </RawNumber>
  </td>
</template>
