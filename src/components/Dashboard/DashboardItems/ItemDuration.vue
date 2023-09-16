<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import dayjs from '@/plugins/dayjs'

defineProps<{ torrent: Torrent, title: string, value: string }>()

const durationFormat = 'D[d] H[h] m[m] s[s]'
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div>
      <span v-if="torrent[value] > 0">
        {{ dayjs.duration(torrent[value], 'seconds').format(durationFormat) }}
      </span>
      <span v-else>{{ $t('dashboard.not_complete') }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>