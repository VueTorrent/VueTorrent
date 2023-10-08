<script setup lang="ts">
defineProps<{ title: string; value: any; color: string }>()
</script>

<template>
  <v-sheet color="secondary" rounded="md" class="pa-3">
    <v-row>
      <v-col cols="7" class="text-subtitle-1" :class="`text-${color}`">{{ title }}</v-col>
      <v-col cols="5" :class="`text-${color}`">
        <span class="text-subtitle-1 roboto">{{ value }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss">
@import '@fontsource-variable/roboto-mono';
.roboto {
  font-family: 'Roboto Mono Variable', sans-serif !important;
  font-weight: 500;
}
</style>
