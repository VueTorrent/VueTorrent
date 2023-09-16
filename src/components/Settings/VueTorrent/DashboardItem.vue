<script setup lang="ts">
import { TorrentProperty } from '@/types/vuetorrent'
defineProps<{ property: TorrentProperty }>()
defineEmits<{ update: [value: void] }>()
</script>

<template>
  <tr class="table-row">
    <td><v-icon icon="mdi-drag-vertical" /></td>
    <td><v-btn density="compact"
               :icon="property.active ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
               variant="flat"
               @click="$emit('update')" /></td>
    <td>{{ $t(`torrent.properties.${property.name}`) }}</td>
  </tr>
</template>

<style scoped>
tr.table-row {
  cursor: move;
  margin-bottom: 12px !important;
}
</style>