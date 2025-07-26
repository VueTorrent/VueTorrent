<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { CardProps } from './CardProps'

const childProps = defineProps<CardProps<any> & { unit: string }>()
</script>

<template>
  <BaseCard v-bind="childProps">
    <template #default="{ value: val }">
      <span data-testid="card-value" class="text-subtitle-1 font-weight-bold">{{ val }}</span>
      <span data-testid="card-unit" class="font-weight-light text-caption ml-1 text-subtitle-1">{{ unit }}</span>
    </template>
  </BaseCard>
</template>
