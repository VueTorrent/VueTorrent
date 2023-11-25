<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import dayjs from '@/plugins/dayjs'

defineProps<{ torrent: Torrent; title: string; value: string }>()
</script>

<template>
  <td>{{ dayjs(torrent[value] * 1000).fromNow() }}</td>
</template>

<style scoped></style>
