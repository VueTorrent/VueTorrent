<script setup lang="ts">
defineProps<{ title: string; value: any; color: string }>()
</script>

<template>
  <v-sheet color="secondary" rounded="md" class="pa-3">
    <v-row>
      <v-col cols="7" class="text-subtitle-1" :class="`text-${color}`">{{ title }}</v-col>
      <v-col cols="5" :class="`text-${color}`">
        <span class="text-subtitle-1">{{ value }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
</style>
