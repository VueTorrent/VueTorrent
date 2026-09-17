<script setup lang="ts">
import { useNumberFormatter } from '@/composables'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { formatData } = useNumberFormatter()
</script>

<template>
  <td class="text-no-wrap">
    {{ formatData({ data: value(torrent) }) }}
  </td>
</template>
