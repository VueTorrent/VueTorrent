<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import FilterPresetsDialog from '@/components/Dialogs/FilterPresetsDialog.vue'
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

const scrollContainer = ref<HTMLElement>()
const canScrollStart = ref(false)
const canScrollEnd = ref(false)

function updateScrollHints() {
  const el = scrollContainer.value
  if (!el) return
  canScrollStart.value = el.scrollLeft > 1
  canScrollEnd.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function onWheel(e: WheelEvent) {
  const el = scrollContainer.value
  if (!el || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
  const previous = el.scrollLeft
  el.scrollLeft += e.deltaY
  if (el.scrollLeft !== previous) e.preventDefault()
}

const DRAG_THRESHOLD = 5
let dragStartX = 0
let dragStartScroll = 0
let hasDragged = false

function onDragMove(e: PointerEvent) {
  const el = scrollContainer.value
  if (!el) return
  const delta = e.clientX - dragStartX
  if (!hasDragged && Math.abs(delta) < DRAG_THRESHOLD) return
  hasDragged = true
  el.scrollLeft = dragStartScroll - delta
}

function onDragEnd() {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)
  window.removeEventListener('pointercancel', onDragEnd)
}

function onPointerdown(e: PointerEvent) {
  const el = scrollContainer.value
  if (!el || e.pointerType !== 'mouse' || e.button !== 0) return
  dragStartX = e.clientX
  dragStartScroll = el.scrollLeft
  hasDragged = false
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragEnd)
  window.addEventListener('pointercancel', onDragEnd)
}

function onClickCapture(e: MouseEvent) {
  if (!hasDragged) return
  hasDragged = false
  e.preventDefault()
  e.stopPropagation()
}

onBeforeUnmount(onDragEnd)
useResizeObserver(scrollContainer, updateScrollHints)
watch(filterPresets, () => nextTick(updateScrollHints), { deep: true })

function openManageDialog() {
  dialogStore.createDialog(FilterPresetsDialog)
}

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
  <div v-if="filterPresets.length > 0" class="d-flex align-center quick-filters-wrapper">
    <div
      ref="scrollContainer"
      class="d-flex align-center flex-gap-column quick-filters"
      :class="{ 'fade-start': canScrollStart, 'fade-end': canScrollEnd }"
      @scroll="updateScrollHints"
      @wheel="onWheel"
      @pointerdown="onPointerdown"
      @click.capture="onClickCapture">
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
                icon
                width="20"
                height="20"
                variant="text"
                :aria-label="t('navbar.top.quick_filters.delete')"
                @mouseenter="isDeleteTargeted = true"
                @mouseleave="isDeleteTargeted = false"
                @keydown.enter.stop
                @keydown.space.stop
                @click.stop="deletePreset(preset)">
                <v-icon icon="mdi-close-circle" size="16" />
              </v-btn>
            </template>
          </v-chip>
        </template>
        {{ getTooltipText(preset) }}
      </v-tooltip>
    </div>
    <v-tooltip :text="t('navbar.top.quick_filters.manage')" location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          class="ml-3 flex-shrink-0"
          icon="mdi-filter-cog"
          size="small"
          variant="text"
          :aria-label="t('navbar.top.quick_filters.manage')"
          @click="openManageDialog" />
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.quick-filters-wrapper {
  min-width: 0;
}

.quick-filters {
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
  user-select: none;
  padding: 2px 0;
  --fade-size: 32px;
}

.quick-filters::-webkit-scrollbar {
  display: none;
}

.quick-filters.fade-end {
  mask-image: linear-gradient(to right, black calc(100% - var(--fade-size)), transparent);
}

.quick-filters.fade-start {
  mask-image: linear-gradient(to left, black calc(100% - var(--fade-size)), transparent);
}

.quick-filters.fade-start.fade-end {
  mask-image: linear-gradient(to right, transparent, black var(--fade-size), black calc(100% - var(--fade-size)), transparent);
}
</style>
