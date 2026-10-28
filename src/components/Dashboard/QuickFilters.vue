<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { useDialogStore, useFilterPresetStore } from '@/stores'
import { FilterPreset } from '@/types/vuetorrent'

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const filterPresetStore = useFilterPresetStore()
const { filterPresets, activeFilterPresetId } = storeToRefs(filterPresetStore)

const hoveredPresetId = ref<string | null>(null)
const focusedPresetId = ref<string | null>(null)
const isDeleteTargeted = ref(false)

function onMouseenter(preset: FilterPreset) {
  hoveredPresetId.value = preset.id
  isDeleteTargeted.value = false
}

function isTooltipOpen(preset: FilterPreset) {
  return hoveredPresetId.value === preset.id || focusedPresetId.value === preset.id
}

function onTooltipUpdate(preset: FilterPreset, value: boolean) {
  if (value) return
  if (hoveredPresetId.value === preset.id) hoveredPresetId.value = null
  if (focusedPresetId.value === preset.id) focusedPresetId.value = null
}

function onFocusin(preset: FilterPreset, e: FocusEvent) {
  focusedPresetId.value = preset.id
  isDeleteTargeted.value = (e.target as HTMLElement).classList.contains('quick-filter-delete')
}

function onFocusout(preset: FilterPreset, e: FocusEvent) {
  const chip = e.currentTarget as HTMLElement
  if (chip.contains(e.relatedTarget as Node | null)) return
  setTimeout(() => {
    if (focusedPresetId.value === preset.id && !chip.contains(document.activeElement)) {
      focusedPresetId.value = null
      isDeleteTargeted.value = false
    }
  })
}

function getTooltipText(preset: FilterPreset) {
  if (isDeleteTargeted.value) return t('navbar.top.quick_filters.delete')
  return preset.id === activeFilterPresetId.value ? t('navbar.top.quick_filters.clear') : t('navbar.top.quick_filters.apply')
}

function togglePreset(preset: FilterPreset) {
  if (activeFilterPresetId.value === preset.id) {
    filterPresetStore.clearFilters()
  } else {
    filterPresetStore.applyFilterPreset(preset.id)
  }
}

function deletePreset(preset: FilterPreset) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteFilterPreset'),
    text: preset.name,
    yesColor: 'error',
    onConfirm: () => filterPresetStore.deleteFilterPreset(preset.id),
  })
}
</script>

<template>
  <div v-if="filterPresets.length > 0" class="d-flex align-center flex-gap-column quick-filters">
    <v-tooltip
      v-for="preset in filterPresets"
      :key="preset.id"
      :model-value="isTooltipOpen(preset)"
      :open-on-hover="false"
      :open-on-focus="false"
      :open-on-click="false"
      location="bottom"
      @update:model-value="onTooltipUpdate(preset, $event)">
      <template #activator="{ props: tooltip }">
        <v-chip
          v-bind="tooltip"
          class="flex-shrink-0"
          label
          size="large"
          :color="preset.id === activeFilterPresetId ? 'accent' : undefined"
          :variant="preset.id === activeFilterPresetId ? 'elevated' : 'tonal'"
          :aria-label="`${preset.name} - ${preset.id === activeFilterPresetId ? t('navbar.top.quick_filters.clear') : t('navbar.top.quick_filters.apply')}`"
          @click="togglePreset(preset)"
          @mouseenter="onMouseenter(preset)"
          @mouseleave="hoveredPresetId = null"
          @focusin="onFocusin(preset, $event)"
          @focusout="onFocusout(preset, $event)">
          <template #prepend>
            <v-icon class="mr-1">{{ preset.id === activeFilterPresetId ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
          </template>
          {{ preset.name }}
          <template #append>
            <v-btn
              class="ml-1 quick-filter-delete"
              icon="mdi-close-circle"
              size="x-small"
              variant="text"
              density="comfortable"
              :aria-label="t('navbar.top.quick_filters.delete')"
              @mouseenter="isDeleteTargeted = true"
              @mouseleave="isDeleteTargeted = false"
              @keydown.enter.stop
              @keydown.space.stop
              @click.stop="deletePreset(preset)" />
          </template>
        </v-chip>
      </template>
      {{ getTooltipText(preset) }}
    </v-tooltip>
  </div>
</template>

<style scoped>
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
