<script setup lang="ts">
import { computed } from 'vue'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; value: (t: Torrent) => string; color?: (v: Torrent) => string }>()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <td :class="color ? color(torrent) : ''" class="text-no-wrap">
    {{ val }}
  </td>
</template>
