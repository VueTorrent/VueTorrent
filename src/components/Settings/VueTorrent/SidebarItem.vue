<script setup lang="ts">
import type { SidebarWidget } from '@/types/vuetorrent'

defineProps<{ i18nPrefix: string; property: SidebarWidget }>()
defineEmits<{ update: [value: void] }>()

</script>

<template>
  <tr class="table-row">
    <td>
      <v-icon icon="mdi-drag-vertical" class="dnd-handle" />
    </td>
    <td>
      <v-btn
        density="compact"
        :icon="property.active ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
        variant="text"
        @click="$emit('update')" />
    </td>
    <td>{{ $t(`${i18nPrefix}.${property.name}`) }}</td>
  </tr>
</template>

<style scoped>
td .dnd-handle {
  cursor: n-resize;
}
</style>
