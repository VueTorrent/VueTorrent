<script setup lang="ts">
import dayjs from '@/plugins/dayjs.ts'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const durationFormat = 'D[d] H[h] m[m] s[s]'
</script>

<template>
  <td v-if="torrent[value] > 0">
    {{ dayjs.duration(torrent[value], 'seconds').format(durationFormat) }}
  </td>
  <td v-else>{{ $t('dashboard.not_complete') }}</td>
</template>

<style scoped></style>
