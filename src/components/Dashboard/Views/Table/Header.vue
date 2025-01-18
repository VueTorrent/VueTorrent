<script setup lang="ts">
import { useTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

defineProps<{
  title: string
  sortKey: string
}>()

defineEmits<{
  onHeaderClick: []
}>()

const { sortCriterias } = storeToRefs(useTorrentStore())

const sortCriteria = computed(() => sortCriterias.value[0])
</script>

<template>
  <th class="text-no-wrap text-left cursor-pointer" @click="$emit('onHeaderClick')">
    <div class="d-flex align-center">
      <span>{{ title }}</span>
      <v-icon v-if="sortCriteria.value === sortKey" class="ml-2" :icon="sortCriteria.reverse ? 'mdi-arrow-up' : 'mdi-arrow-down'" />
    </div>
  </th>
</template>

<style scoped></style>
