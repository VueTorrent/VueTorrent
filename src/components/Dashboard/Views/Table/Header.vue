<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTorrentStore } from '@/stores'

const { sortKey } = defineProps<{
  title: string
  sortKey: string
}>()

defineEmits<{
  onHeaderClick: []
}>()

const { sortCriterias } = storeToRefs(useTorrentStore())

const sortCriteria = computed(() => sortCriterias.value[0])
const ariaSort = computed(() => (sortCriteria.value?.value === sortKey ? (sortCriteria.value.reverse ? 'descending' : 'ascending') : undefined))
</script>

<template>
  <th class="text-no-wrap text-left" :aria-sort="ariaSort">
    <button type="button" class="sort-button" @click="$emit('onHeaderClick')">
      <span>{{ title }}</span>
      <v-icon v-if="sortCriteria.value === sortKey" class="ml-2" :icon="sortCriteria.reverse ? 'mdi-sort-descending' : 'mdi-sort-ascending'" aria-hidden="true" />
    </button>
  </th>
</template>

<style scoped>
.sort-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.sort-button:focus-visible {
  outline: 2px solid rgb(var(--v-theme-on-surface));
  outline-offset: 2px;
}
</style>
