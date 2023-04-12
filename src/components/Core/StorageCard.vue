<script setup lang="ts">
import { getDataUnit } from '@/utils/dataParse'
import { getDataValue } from '@/utils/dataParse'

const props = defineProps<{
  label: string
  color: string
  value: number
}>()
</script>

<template>
  <VCard flat color="secondary" class="mt-2 mb-2">
    <VRow class="pa-3 mx-auto">
      <VCol>
        <div style="margin-top: 6px" :class="`text-${color}`" data-testid="StorageCard-label">
          {{ label }}
        </div>
      </VCol>
      <VCol>
        <span data-testid="StorageCard-Wrapper" :class="`text-${color} text-h6`">
          <span data-testid="StorageCard-value" class="mr-4">{{ getDataValue(value) }}</span>
          <span data-testid="StorageCard-unit" class="text-caption">
            {{ getDataUnit(value) }}
          </span>
        </span>
      </VCol>
    </VRow>
  </VCard>
</template>
