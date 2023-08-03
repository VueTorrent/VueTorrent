<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
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
      <v-icon :color="color" :icon="icon" />
      <span :class="`text-${color}`">{{ value }} KB/s</span>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>