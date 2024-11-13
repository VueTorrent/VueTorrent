<script setup lang="ts">
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{
  icon: string
  color: string
  value: number
  active: boolean
}>()
const emit = defineEmits(['currentSpeedButtonClicked'])

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-btn :color="active ? 'selected' : 'secondary'" rounded="lg" class="py-3 wrap text-none" style="width: 100%; height: 100%" @click="$emit('currentSpeedButtonClicked')">
    <v-row class="d-flex flex-row align-center">
      <v-col cols="2" class="px-4">
        <v-icon class="" :icon="icon" :color="color" />
      </v-col>
      <v-col cols="8" class="d-flex flex-column align-center justify-center">
        <div>
          <span :class="`text-subtitle-1 font-weight-bold text-select text-${color}`">
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
  </v-btn>
</template>
