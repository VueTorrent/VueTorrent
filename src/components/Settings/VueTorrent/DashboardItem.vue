<script setup lang="ts">
import { TorrentProperty } from '@/constants/vuetorrent'

defineProps<{ property: TorrentProperty }>()
defineEmits<{ update: [value: void] }>()
</script>

<template>
  <tr class="table-row">
    <td>
      <v-icon icon="mdi-drag-vertical" class="dnd-handle" />
    </td>
    <td>
      <v-btn density="compact" :icon="property.active ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" variant="flat" @click="$emit('update')" />
    </td>
    <td>{{ $t(`torrent.properties.${property.name}`) }}</td>
  </tr>
</template>

<style scoped>
td .dnd-handle {
  cursor: move;
}
</style>
