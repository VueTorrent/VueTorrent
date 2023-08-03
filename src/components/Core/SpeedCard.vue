<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
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
      <div class="d-flex flex-row align-center justify-center">
        <v-icon :icon="icon" :color="color" />
        <div class="d-flex flex-column align-center justify-center">
          <span class="ml-2" :class="`text-${color}`">{{ value }}</span>
          <span class="ml-2" :class="`text-${color}`">KB/s</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>