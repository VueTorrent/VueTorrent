<script setup lang="ts">
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { Torrent } from '@/types/vuetorrent'
import dayjs from '@/plugins/dayjs'

defineProps<{ torrent: Torrent; title: string; value: string }>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div>
      <span v-if="torrent[value] > 0">
        {{ dayjs(torrent[value] * 1000).format(vueTorrentStore.dateFormat ?? 'DD/MM/YYYY, HH:mm:ss') }}
      </span>
      <span v-else>{{ $t('dashboard.not_complete') }}</span>
    </div>
  </div>
</template>

<style scoped></style>
