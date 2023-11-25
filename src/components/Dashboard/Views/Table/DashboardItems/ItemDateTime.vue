<script setup lang="ts">
import dayjs from '@/plugins/dayjs.ts'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <td v-if="torrent[value] > 0">
    {{ dayjs(torrent[value] * 1000).format(vueTorrentStore.dateFormat ?? 'DD/MM/YYYY, HH:mm:ss') }}
  </td>
  <td v-else>{{ $t('dashboard.not_complete') }}</td>
</template>

<style scoped></style>
