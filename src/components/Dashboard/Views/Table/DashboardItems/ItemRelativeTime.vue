<script setup lang="ts">
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => number }>()
</script>

<template>
  <td class="text-no-wrap">
    {{ dayjs(value(torrent) * 1000).fromNow() }}
  </td>
</template>
