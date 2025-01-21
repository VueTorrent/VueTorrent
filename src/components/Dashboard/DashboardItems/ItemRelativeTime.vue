<script setup lang="ts">
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      <span>{{ dayjs(value(torrent) * 1000).fromNow() }}</span>
    </div>
  </div>
</template>
