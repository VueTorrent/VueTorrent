<script setup lang="ts">
defineProps<{
  color: string
  label: string
  value: number
}>()
</script>

<template>
  <VCard flat color="secondary" class="mx-2">
    <VRow class="py-3 mx-auto">
      <VCol>
        <div style="margin-top: 6px" :class="`text-${color}`" data-testid="StringCard-label">
          {{ label }}
        </div>
      </VCol>
      <VCol class="flex-nowrap">
        <span data-testid="StringCard-Wrapper" :class="`text-${color} text-h6`">
          <span data-testid="StringCard-value">{{ value }}</span>
        </span>
      </VCol>
    </VRow>
  </VCard>
</template>
