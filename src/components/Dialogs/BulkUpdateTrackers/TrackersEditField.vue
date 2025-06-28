<script setup lang="ts">
import { computed } from 'vue'
import TrackerEditRow from './TrackerEditRow.vue'

const props = defineProps<{
  allTrackers: string[]
}>()

const selectedTrackers = defineModel<[string | undefined, string | undefined][]>({ required: true })

const remainingTrackers = computed(() => props.allTrackers.filter(tr => !selectedTrackers.value.map(tra => tra[0]).includes(tr)))

function createRow() {
  selectedTrackers.value.push([undefined, undefined])
}

function updateRow(index: number, value: [string | undefined, string | undefined]) {
  selectedTrackers.value[index] = value
}

function deleteRow(index: number) {
  selectedTrackers.value.splice(index, 1)
}
</script>

<template>
  <v-list-item v-for="(trackerData, i) in selectedTrackers" :key="i">
    <TrackerEditRow :model-value="trackerData" :available-trackers="remainingTrackers" @update:model-value="v => updateRow(i, v)" @delete="deleteRow(i)" />
  </v-list-item>

  <v-list-item>
    <v-btn prepend-icon="mdi-plus" color="accent" variant="text" :text="$t('dialogs.bulkEditTrackers.edit.row.add')" @click="createRow" />
  </v-list-item>
</template>
