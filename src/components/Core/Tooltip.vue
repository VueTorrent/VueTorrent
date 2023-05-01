<script setup lang="ts">
// props
defineProps<{
  icon: string
  label: string
  action?: Function
}>()
</script>

<template>
  <VTooltip>
    <template #activator="{ props }">
      <VBtn class="px-6" density="compact" :icon="icon" v-bind="props" @click="action" />
    </template>
    <span>{{ $t(label) }}</span>
  </VTooltip>
</template>
