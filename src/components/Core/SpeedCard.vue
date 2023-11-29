<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

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
  <v-sheet color="secondary" rounded="lg" class="py-3">
    <v-row class="d-flex flex-row align-center px-3">
      <v-col cols="2" class="px-4">
        <v-icon class="" :icon="icon" :color="color" />
      </v-col>
      <v-col cols="8" class="d-flex flex-column align-center justify-center">
        <span class="text-subtitle-1 roboto" :class="`text-${color}`">{{ formatSpeedValue(value, vueTorrentStore.useBitSpeed) }}</span>
        <span class="text-caption" :class="`text-${color}`">{{ formatSpeedUnit(value, vueTorrentStore.useBitSpeed) }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
@import '@fontsource/roboto-mono';

.roboto {
  font-family: 'Roboto Mono', sans-serif !important;
  font-weight: 500;
}
</style>
