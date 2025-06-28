<script setup lang="ts">
defineProps<{ title: string; value: any; color: string }>()
</script>

<template>
  <v-sheet color="secondary" rounded="lg" class="pa-3">
    <v-row class="text-select">
      <v-col cols="7" :class="`text-subtitle-1 text-${color}`">
        {{ title }}
      </v-col>
      <v-col cols="5" :class="`text-${color}`">
        <span class="text-subtitle-1 font-weight-bold">{{ value }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>
