<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{
  icon: string
  color: string
  value: number
}>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="py-3">
    <v-row class="d-flex flex-row align-center px-3">
      <v-col cols="2" class="px-4">
        <v-icon class="" :icon="icon" :color="color" />
      </v-col>
      <v-col cols="8" class="d-flex flex-column align-center justify-center">
        <div>
          <span :class="`text-subtitle-1 roboto text-select text-${color}`">
            {{ formatSpeedValue(value, vueTorrentStore.useBitSpeed) }}
          </span>
        </div>
        <div>
          <span :class="`text-caption text-${color}`">
            {{ formatSpeedUnit(value, vueTorrentStore.useBitSpeed) }}
          </span>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
@import '@fontsource/roboto-mono';

.roboto {
  font-family: 'Roboto Mono', sans-serif !important;
  font-weight: 600;
}
</style>
