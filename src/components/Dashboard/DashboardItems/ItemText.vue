<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => string; color?: (v: Torrent) => string }>()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div :class="color ? color(torrent) : ''">{{ val }}</div>
  </div>
</template>
