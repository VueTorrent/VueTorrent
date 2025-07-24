<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { CardProps } from './CardProps'

const childProps = defineProps<CardProps<any>>()
</script>

<template>
  <BaseCard v-bind="childProps">
    <template #default="{ value: val }">
      <span class="text-subtitle-1 font-weight-bold">{{ val }}</span>
    </template>
  </BaseCard>
</template>
