<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RawNumberTooltip from '@/components/Core/RawNumberTooltip.vue'
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { useBinarySize } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <td class="text-no-wrap">
    <RawNumberTooltip :value="value(torrent)">
      {{ formatData(value(torrent), useBinarySize) }}
    </RawNumberTooltip>
  </td>
</template>
