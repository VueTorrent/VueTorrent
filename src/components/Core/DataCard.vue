<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{title: string, color: string, value: number}>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="pa-3">
    <div :class="['d-flex', `text-${color}`]">
      <div class="d-flex align-center justify-center">{{ title }}</div>
      <v-spacer />
      <div>
        <span class="font-weight-bold">{{ formatDataValue(value, vueTorrentStore.useBinarySize) }}</span>
        <span class="text-caption ml-1">{{ formatDataUnit(value, vueTorrentStore.useBinarySize) }}</span>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>