<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: true
  },
  title: {
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
  <v-sheet color="secondary" rounded="lg" class="pa-3">
    <div class="d-flex">
      <div class="d-flex align-center justify-center" :class="`text-${color}`">{{ title }}</div>
      <v-spacer />
      <div :class="`text-${color}`">
        <span class="font-weight-bold">{{ value }}</span>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>