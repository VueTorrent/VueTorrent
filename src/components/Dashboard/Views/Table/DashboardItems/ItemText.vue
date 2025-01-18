<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; value: (t: Torrent) => string; color?: (v: Torrent) => string }>()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <td :class="color ? color(torrent) : ''" class="text-no-wrap">{{ val }}</td>
</template>
