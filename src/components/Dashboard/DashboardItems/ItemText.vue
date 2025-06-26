<script setup lang="ts">
import { computed } from 'vue'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => string; color?: (v: Torrent) => string }>()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div :class="color ? color(torrent) : ''">
      {{ val }}
    </div>
  </div>
</template>
