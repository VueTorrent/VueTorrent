<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { CardProps } from './CardProps'
import { formatSpeedUnit, formatSpeedValue } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

const childProps = defineProps<CardProps<number>>()

const vueTorrentStore = useVueTorrentStore()
</script>

<template>
  <BaseCard v-bind="childProps">
    <template #default="{ value: val }">
      <span data-testid="card-value" class="text-title-medium font-weight-bold">{{ formatSpeedValue(val, vueTorrentStore.useBitSpeed) }}</span>
      <span data-testid="card-unit" class="text-label-large ml-1">{{ formatSpeedUnit(val, vueTorrentStore.useBitSpeed) }}</span>
    </template>
  </BaseCard>
</template>
