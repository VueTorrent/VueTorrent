<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import draggable from 'vuedraggable'
import { useDisplay } from 'vuetify'
import FilterPresetNameField from './FilterPresetNameField.vue'
import SaveFilterPresetDialog from './SaveFilterPresetDialog.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { TrackerSpecialFilter } from '@/constants/vuetorrent'
import { useDialogStore, useFilterPresetStore } from '@/stores'
import { FilterPreset } from '@/types/vuetorrent'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t, getTorrentStateString } = useI18nUtils()
const { mobile } = useDisplay()
const dialogStore = useDialogStore()
const filterPresetStore = useFilterPresetStore()
const { filterPresets, hasAnyFilter, activeFilterPresetId } = storeToRefs(filterPresetStore)

type SummaryValue = { text: string; excluded?: boolean }
type SummaryItem = { key: string; label: string; color: string; values: SummaryValue[] }

function getTagLabel(tag: string | null) {
  return tag === null ? t('navbar.side.filters.tag.empty') : tag
}

function getTrackerLabel(tracker: string | TrackerSpecialFilter) {
  if (tracker === TrackerSpecialFilter.UNTRACKED) return t('navbar.side.filters.tracker.empty')
  if (tracker === TrackerSpecialFilter.NOT_WORKING) return t('navbar.side.filters.tracker.not_working')
  return tracker
}

function getSummary(preset: FilterPreset) {
  const items: SummaryItem[] = []
  if (preset.textFilter) {
    items.push({ key: 'text', label: t('navbar.top.quick_filters.summary.text'), color: 'active-text', values: [{ text: preset.textFilter }] })
  }
  if (preset.statusFilter.length) {
    items.push({
      key: 'state',
      label: t('navbar.top.quick_filters.summary.state'),
      color: 'active-status',
      values: preset.statusFilter.map(state => ({ text: getTorrentStateString(state) })),
    })
  }
  if (preset.categoryFilter.length) {
    items.push({
      key: 'category',
      label: t('navbar.top.quick_filters.summary.category'),
      color: 'active-category',
      values: preset.categoryFilter.map(category => ({ text: category === '' ? t('navbar.side.filters.category.empty') : category })),
    })
  }
  if (preset.tagFilterInclude.length + preset.tagFilterExclude.length) {
    items.push({
      key: 'tag',
      label: t('navbar.top.quick_filters.summary.tag'),
      color: 'active-tag',
      values: [
        ...preset.tagFilterInclude.map(tag => ({ text: getTagLabel(tag), excluded: false })),
        ...preset.tagFilterExclude.map(tag => ({ text: getTagLabel(tag), excluded: true })),
      ],
    })
  }
  if (preset.trackerFilterInclude.length + preset.trackerFilterExclude.length) {
    items.push({
      key: 'tracker',
      label: t('navbar.top.quick_filters.summary.tracker'),
      color: 'active-tracker',
      values: [
        ...preset.trackerFilterInclude.map(tracker => ({ text: getTrackerLabel(tracker), excluded: false })),
        ...preset.trackerFilterExclude.map(tracker => ({ text: getTrackerLabel(tracker), excluded: true })),
      ],
    })
  }
  return items
}

const summaries = computed(() => Object.fromEntries(filterPresets.value.map(preset => [preset.id, getSummary(preset)])))

function deletePreset(preset: FilterPreset) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteFilterPreset'),
    text: preset.name,
    yesColor: 'error',
    onConfirm: () => filterPresetStore.deleteFilterPreset(preset.id),
  })
}

function createPreset() {
  dialogStore.createDialog(SaveFilterPresetDialog)
}

function applyPreset(preset: FilterPreset) {
  filterPresetStore.applyFilterPreset(preset.id)
  close()
}

function updatePreset(preset: FilterPreset) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.updateFilterPreset'),
    text: preset.name,
    yesColor: 'error',
    onConfirm: () => filterPresetStore.updateFilterPreset(preset.id),
  })
}

function close() {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="700">
    <v-card>
      <v-card-title>
        {{ $t('navbar.top.quick_filters.label') }}
      </v-card-title>
      <v-card-text class="pb-0">
        <div v-if="filterPresets.length === 0" class="text-center text-medium-emphasis pb-4">
          {{ $t('common.emptyList') }}
        </div>
        <draggable v-model="filterPresets" item-key="id" handle=".dnd-handle" :force-fallback="true" ghost-class="preset-ghost" fallback-class="preset-dragged">
          <template #item="{ element: preset }">
            <div class="d-flex align-start flex-gap-column mb-4">
              <v-icon icon="mdi-drag-vertical" class="dnd-handle mt-4" />
              <div class="flex-grow-1" style="min-width: 0">
                <FilterPresetNameField :preset="preset" />
                <div class="d-flex flex-wrap align-center ga-1 text-body-small text-medium-emphasis pt-1">
                  <span>{{ $t('navbar.top.quick_filters.summary.label', summaries[preset.id].length) }}</span>
                  <v-menu v-for="item in summaries[preset.id]" :key="item.key" location="bottom">
                    <template #activator="{ props: menu }">
                      <v-chip v-bind="menu" :color="item.color" variant="flat" size="x-small" label>
                        {{ item.label }}
                      </v-chip>
                    </template>
                    <v-card max-width="300">
                      <v-card-text class="text-body-small pa-2">
                        <div v-for="(value, index) in item.values" :key="index" class="d-flex align-center ga-1">
                          <v-icon v-if="value.excluded !== undefined" size="small" :icon="value.excluded ? 'mdi-filter-minus' : 'mdi-filter-plus'" />
                          <span class="text-break">{{ value.text }}</span>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </div>
              </div>
              <div class="d-flex mt-2" :class="{ 'flex-gap-column': !mobile }">
                <v-tooltip :text="$t('navbar.top.quick_filters.apply')" location="top">
                  <template #activator="{ props: tooltip }">
                    <v-btn
                      v-bind="tooltip"
                      :density="mobile ? 'compact' : 'default'"
                      :icon="preset.id === activeFilterPresetId ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                      :color="preset.id === activeFilterPresetId ? 'accent' : undefined"
                      variant="text"
                      :aria-label="$t('navbar.top.quick_filters.apply')"
                      @click="applyPreset(preset)" />
                  </template>
                </v-tooltip>
                <v-tooltip :text="$t('navbar.top.quick_filters.update')" location="top">
                  <template #activator="{ props: tooltip }">
                    <v-btn
                      v-bind="tooltip"
                      :density="mobile ? 'compact' : 'default'"
                      icon="mdi-content-save-edit-outline"
                      variant="text"
                      :disabled="!hasAnyFilter || preset.id === activeFilterPresetId"
                      :aria-label="$t('navbar.top.quick_filters.update')"
                      @click="updatePreset(preset)" />
                  </template>
                </v-tooltip>
                <v-tooltip :text="$t('navbar.top.quick_filters.delete')" location="top">
                  <template #activator="{ props: tooltip }">
                    <v-btn
                      v-bind="tooltip"
                      :density="mobile ? 'compact' : 'default'"
                      icon="mdi-delete"
                      color="error"
                      variant="text"
                      :aria-label="$t('navbar.top.quick_filters.delete')"
                      @click="deletePreset(preset)" />
                  </template>
                </v-tooltip>
              </div>
            </div>
          </template>
        </draggable>
      </v-card-text>
      <v-card-actions>
        <v-btn color="accent" prepend-icon="mdi-content-save-outline" :disabled="!hasAnyFilter || activeFilterPresetId !== null" @click="createPreset">
          {{ $t('dialogs.saveFilterPreset.title') }}
        </v-btn>
        <v-spacer />
        <v-btn color="accent" @click="close">
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dnd-handle {
  cursor: n-resize;
}

.preset-ghost {
  outline: 2px solid rgb(var(--v-theme-accent));
  outline-offset: 4px;
  border-radius: 4px;
}

.preset-dragged {
  opacity: 0 !important;
}
</style>
