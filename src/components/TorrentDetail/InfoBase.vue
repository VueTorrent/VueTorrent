<script setup lang="ts">
defineProps<{ compact?: boolean }>()
</script>

<template>
  <v-col cols="12" sm="6" lg="3" :class="{ 'ma-0 pa-0': compact }">
    <v-sheet rounded="xl" class="d-flex align-center py-2">
      <div class="pl-4">
        <slot name="title" />
      </div>
      <v-spacer />
      <div class="pr-4">
        <slot name="text" />
      </div>
    </v-sheet>
  </v-col>
</template>

<style scoped>

</style>