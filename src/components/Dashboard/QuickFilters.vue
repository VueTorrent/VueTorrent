<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18nUtils } from '@/composables'
import { useDialogStore, useTorrentStore } from '@/stores'
import { FilterPreset } from '@/types/vuetorrent'

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const torrentStore = useTorrentStore()
const { filterPresets, activeFilterPresetId } = storeToRefs(torrentStore)

function togglePreset(preset: FilterPreset) {
  if (activeFilterPresetId.value === preset.id) {
    torrentStore.clearFilters()
  } else {
    torrentStore.applyFilterPreset(preset.id)
  }
}

function deletePreset(preset: FilterPreset) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteFilterPreset'),
    text: preset.name,
    yesColor: 'error',
    onConfirm: () => torrentStore.deleteFilterPreset(preset.id),
  })
}
</script>

<template>
  <div v-if="filterPresets.length > 0" class="d-flex align-center flex-gap-column quick-filters">
    <v-chip
      v-for="preset in filterPresets"
      :key="preset.id"
      class="flex-shrink-0"
      label
      size="large"
      :color="preset.id === activeFilterPresetId ? 'accent' : undefined"
      :variant="preset.id === activeFilterPresetId ? 'elevated' : 'tonal'"
      @click="togglePreset(preset)">
      <template #prepend>
        <v-icon class="mr-1">{{ preset.id === activeFilterPresetId ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
      </template>
      {{ preset.name }}
      <template #append>
        <!-- Custom close icon: Vuetify's "closable" hides the chip before the deletion is confirmed -->
        <v-icon class="ml-1" icon="mdi-close-circle" size="small" @click.stop="deletePreset(preset)" />
      </template>
    </v-chip>
  </div>
</template>

<style scoped>
/* Chips keep their size and the row scrolls horizontally when there are too many */
.quick-filters {
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px 0;
}

.quick-filters::-webkit-scrollbar {
  display: none;
}
</style>
