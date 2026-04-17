<script setup lang="ts">
defineProps<{
  title?: string
  columns: '2' | '4' | '6' | '8'
}>()
</script>

<template>
  <v-card flat class="inherit-bg">
    <v-card-title class="px-0 text-white ml-1 text-body-large">
      {{ title }}
    </v-card-title>
    <v-card-text :class="['px-0', 'pb-0', 'd-grid', `grid-columns-${columns}`, 'ga-2']">
      <slot />
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
