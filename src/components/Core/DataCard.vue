<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{ color: string; value: number; icon: string }>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="flex-grow-1 pa-3">
    <div class="d-flex flex-column align-center">
      <v-icon :color="color">{{ icon }}</v-icon>
      <div :class="`text-select text-${color}`">
        <span data-testid="card-value" class="text-subtitle-1 font-weight-bold">{{ formatDataValue(value, vueTorrentStore.useBinarySize) }}</span>
        <span data-testid="card-unit" class="font-weight-light text-caption ml-1 text-subtitle-1">{{ formatDataUnit(value, vueTorrentStore.useBinarySize) }}</span>
      </div>
    </div>
  </v-sheet>
</template>
