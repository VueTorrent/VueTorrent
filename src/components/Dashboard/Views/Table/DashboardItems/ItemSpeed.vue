<script setup lang="ts">
import { useNumberFormatter } from '@/composables'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()

const { formatSpeed } = useNumberFormatter()
</script>

<template>
  <td class="text-no-wrap">
    {{ formatSpeed({ speed: value(torrent) }) }}
  </td>
</template>
