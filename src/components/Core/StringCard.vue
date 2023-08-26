<script setup lang="ts">
defineProps<{ title: string, value: any, color: string }>()
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