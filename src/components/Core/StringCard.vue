<script setup lang="ts">
defineProps<{ value: any; color: string; icon: string }>()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="flex-grow-1 pa-3">
    <div class="d-flex flex-column align-center">
      <v-icon :color="color">{{ icon }}</v-icon>
      <div :class="`text-select text-${color}`">
        <span class="text-subtitle-1 font-weight-bold">{{ value }}</span>
      </div>
    </div>
  </v-sheet>
</template>
