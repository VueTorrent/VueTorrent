<template>
  <div v-if="space" class="mb-4">
    <StorageCard v-if="space" class="mt-8" :label="$t('navbar.freeSpace') | titleCase" color="upload" :value="space" />
  </div>
</template>

<script>
import StorageCard from '@/components/Core/StorageCard.vue'
export default {
  name: 'FreeSpace',
  components: {
    StorageCard
  },
  props: ['space']
}
</script>
