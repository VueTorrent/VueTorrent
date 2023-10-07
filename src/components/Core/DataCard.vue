<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

defineProps<{ title: string; color: string; value: number }>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <v-sheet color="secondary" rounded="md" class="pa-3">
    <v-row :class="[`text-${color}`]">
      <v-col cols="7" class="text-subtitle-1">{{ title }}</v-col>
      <v-col cols="5" class="">
        <span class="font-weight-bold text-subtitle-1">{{ formatDataValue(value, vueTorrentStore.useBinarySize) }}</span>
        <span class="text-caption ml-1 text-subtitle-1">{{ formatDataUnit(value, vueTorrentStore.useBinarySize) }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped></style>
