<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number; total?: (t: Torrent) => number }>()
</script>

<template>
  <td class="text-no-wrap">
    {{ value(torrent) }}
    <span v-if="total"> / {{ total(torrent) }} </span>
  </td>
</template>
