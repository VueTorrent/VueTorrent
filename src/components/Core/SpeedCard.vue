<script setup lang="ts">
import { useVueTorrentStore } from '@/stores'
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'

defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="pointer px-5 py-3">
    <div class="d-flex flex-row align-center justify-space-evenly card-gap-inner">
      <v-icon :icon="icon" :color="color" />
      <div class="d-flex flex-column align-center justify-center">
        <span :class="`text-${color}`">{{ formatSpeedValue(value, vueTorrentStore.useBitSpeed) }}</span>
        <span class="text-caption" :class="`text-${color}`">{{ formatSpeedUnit(value, vueTorrentStore.useBitSpeed) }}</span>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>
.card-gap-inner {
  gap: 12px;
}
</style>