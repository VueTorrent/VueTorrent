<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <v-card color="secondary">
    <v-card-text>
      <span :class="`text-${color}`">{{ label }}</span>
      <span :class="`text-${color}`">{{ value }}</span>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>