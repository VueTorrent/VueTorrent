<script setup lang="ts">
import { titleCase } from '@/utils/dataParse'
import StorageCard from '@/components/Core/StorageCard.vue'
const props = defineProps<{
  space: number
}>()
</script>

<template>
  <div v-if="space" class="mb-4">
    <StorageCard
      v-if="space"
      class="mt-8"
      :label="titleCase($t('navbar.freeSpace'))"
      color="upload"
      :value="space"
    />
  </div>
</template>
