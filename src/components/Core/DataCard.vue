<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{ title: string; color: string; value: number }>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="pa-3">
    <v-row data-testid="card-wrapper" :class="`text-select text-${color}`">
      <v-col data-testid="card-title" cols="7" class="text-subtitle-1">
        {{ title }}
      </v-col>
      <v-col cols="5" class="">
        <span data-testid="card-value" class="text-subtitle-1 font-weight-bold">{{ formatDataValue(value, vueTorrentStore.useBinarySize) }}</span>
        <span data-testid="card-unit" class="font-weight-light text-caption ml-1 text-subtitle-1">{{ formatDataUnit(value, vueTorrentStore.useBinarySize) }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>
