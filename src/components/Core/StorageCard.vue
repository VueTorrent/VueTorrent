<script setup lang="ts">
import { getDataUnit, getDataValue } from '@/utils/dataParse'

defineProps<{
  label: string
  color: string
  value: number
}>()
</script>

<template>
  <VCard flat color="secondary" class="mx-2">
    <VRow class="py-3 mx-auto">
      <VCol>
        <div style="margin-top: 6px" :class="`text-${color}`" data-testid="StorageCard-label">
          {{ label }}
        </div>
      </VCol>
      <VCol class="flex-nowrap">
        <span data-testid="StorageCard-Wrapper" :class="`text-${color} text-h6`">
          <span data-testid="StorageCard-value">{{ getDataValue(value) }}</span>
          <span data-testid="StorageCard-unit" class="text-caption ml-1">
            {{ getDataUnit(value) }}
          </span>
        </span>
      </VCol>
    </VRow>
  </VCard>
</template>
