<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import dayjs from '@/plugins/dayjs.ts'

defineProps<{ torrent: Torrent; title: string; value: string }>()
</script>

<template>
  <div class="d-flex flex-column">
    <div class="text-caption text-grey">
      {{ $t(`torrent.properties.${title}`) }}
    </div>
    <div>
      <span>{{ dayjs(torrent[value] * 1000).fromNow() }}</span>
    </div>
  </div>
</template>

<style scoped></style>
