<script setup lang="ts">
import { TorrentProperty } from '@/constants/vuetorrent'
import { useAppStore } from '@/stores'

defineProps<{ property: TorrentProperty }>()
defineEmits<{ update: [value: void] }>()

const appStore = useAppStore()
</script>

<template>
  <tr class="table-row">
    <td>
      <v-icon icon="mdi-drag-vertical" class="dnd-handle" />
    </td>
    <td>
      <v-btn
        :disabled="!appStore.isFeatureAvailable(property.qbitVersion)"
        density="compact"
        :icon="property.active ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
        variant="text"
        @click="$emit('update')" />
    </td>
    <td>{{ $t(`settings.vuetorrent.sidebar.${property.name}`) }}</td>
  </tr>
</template>

<style scoped>
td .dnd-handle {
  cursor: n-resize;
}
</style>
