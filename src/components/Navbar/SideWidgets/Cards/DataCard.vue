<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { CardProps } from './CardProps'
import { useNumberFormatter } from '@/composables'

const childProps = defineProps<CardProps<number>>()

const { formatDataUnit, formatDataValue } = useNumberFormatter()
</script>

<template>
  <BaseCard v-bind="childProps">
    <template #default="{ value: val }">
      <span data-testid="card-value" class="text-title-medium font-weight-bold">{{ formatDataValue({ data: val }) }}</span>
      <span data-testid="card-unit" class="text-label-large ml-1">{{ formatDataUnit({ data: val }) }}</span>
    </template>
  </BaseCard>
</template>
