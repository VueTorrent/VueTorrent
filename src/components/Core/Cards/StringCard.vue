<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { CardProps } from './CardProps'

const { ...childProps } = defineProps<CardProps<any>>()
</script>

<template>
  <BaseCard v-bind="childProps">
    <template #default="{ value }">
      <span class="text-subtitle-1 font-weight-bold">{{ value }}</span>
    </template>
  </BaseCard>
</template>
