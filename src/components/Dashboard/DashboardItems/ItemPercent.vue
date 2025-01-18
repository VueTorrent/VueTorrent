<script setup lang="ts">
import { formatPercent } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number; color: (T: Torrent) => string }>()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <v-progress-linear :model-value="val" :max="1" :height="20" :color="color(torrent)" rounded="sm" style="width: 10em">
      {{ formatPercent(val) }}
    </v-progress-linear>
  </div>
</template>
