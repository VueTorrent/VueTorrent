<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useI18nUtils, useNumberFormatter } from '@/composables'
import { useVueTorrentStore } from '@/stores'
import { DEFAULT_SEEDS_MAX, DEFAULT_SEEDS_MIN, defaultSizeMax, SearchFilters, SearchResult } from '@/types/vuetorrent'

const props = defineProps<{ results: SearchResult[] }>()
const filters = defineModel<SearchFilters>('filters', { required: true })

const { t } = useI18nUtils()
const { formatData } = useNumberFormatter()
const { useBinarySize } = storeToRefs(useVueTorrentStore())

const seedsBounds = computed<[number, number]>(() => {
  if (!props.results.length) return [DEFAULT_SEEDS_MIN, DEFAULT_SEEDS_MAX]
  const seeds = props.results.map(result => result.nbSeeders)
  return [Math.min(...seeds), Math.max(...seeds)]
})

const sizeBounds = computed<[number, number]>(() => {
  if (!props.results.length) return [0, defaultSizeMax(useBinarySize.value)]
  const sizes = props.results.map(result => result.fileSize)
  return [Math.min(...sizes), Math.max(...sizes)]
})

const seedsFocused = ref(false)
const sizeFocused = ref(false)

/** Disables automatic updates of slider bounds when focused (being interacted with) to avoid stutter. */
function useDisplayedBounds(bounds: () => [number, number], focused: () => boolean) {
  const displayed: Ref<[number, number]> = ref(bounds())
  function sync() {
    displayed.value = bounds()
  }

  watch(bounds, newBounds => {
    if (!focused()) displayed.value = newBounds
  })
  watch(focused, isFocused => {
    if (!isFocused) sync()
  })

  return { displayed, sync }
}

const { displayed: displayedSeedsBounds, sync: syncSeedsBounds } = useDisplayedBounds(
  () => seedsBounds.value,
  () => seedsFocused.value
)
const { displayed: displayedSizeBounds, sync: syncSizeBounds } = useDisplayedBounds(
  () => sizeBounds.value,
  () => sizeFocused.value
)

/** Keeps a range glued to new search-result bounds until the user explicitly sets it (marking it `modified`). */
function trackBounds(bounds: () => [number, number], minKey: 'seedsMin' | 'sizeMin', maxKey: 'seedsMax' | 'sizeMax', modifiedKey: 'seedsModified' | 'sizeModified') {
  watch(bounds, ([newMin, newMax]) => {
    if (filters.value[modifiedKey]) return
    filters.value[minKey] = newMin
    filters.value[maxKey] = newMax
  })
}

trackBounds(() => seedsBounds.value, 'seedsMin', 'seedsMax', 'seedsModified')
trackBounds(() => sizeBounds.value, 'sizeMin', 'sizeMax', 'sizeModified')

function resetToAutomatic(minKey: 'seedsMin' | 'sizeMin', maxKey: 'seedsMax' | 'sizeMax', modifiedKey: 'seedsModified' | 'sizeModified', bounds: [number, number]) {
  filters.value[modifiedKey] = false
  filters.value[minKey] = bounds[0]
  filters.value[maxKey] = bounds[1]
}

function unclampedSliderValue(modelValue: number, bounds: [number, number], realMin: number, realMax: number): number {
  if (modelValue === bounds[1] && realMax > bounds[1]) return realMax
  if (modelValue === bounds[0] && realMin < bounds[0]) return realMin
  return modelValue
}

const seedsSlider = computed<[number, number]>({
  get: (): [number, number] => [filters.value.seedsMin, filters.value.seedsMax],
  set: ([newMin, newMax]: [number, number]) => {
    filters.value.seedsModified = true
    filters.value.seedsMin = newMin
    filters.value.seedsMax = newMax
  },
})

const sizeSlider = computed<[number, number]>({
  get: (): [number, number] => [filters.value.sizeMin, filters.value.sizeMax],
  set: ([newMin, newMax]: [number, number]) => {
    filters.value.sizeModified = true
    filters.value.sizeMin = newMin
    filters.value.sizeMax = newMax
  },
})

function rangeSideField(
  key: 'seedsMin' | 'seedsMax' | 'sizeMin' | 'sizeMax',
  siblingKey: 'seedsMin' | 'seedsMax' | 'sizeMin' | 'sizeMax',
  modifiedKey: 'seedsModified' | 'sizeModified',
  isMin: boolean
) {
  return computed<number, string>({
    get: () => filters.value[key],
    set: raw => {
      const parsed = Number(raw)
      const value = Number.isNaN(parsed) ? 0 : Math.max(parsed, 0)
      filters.value[modifiedKey] = true
      filters.value[key] = value
      const sibling = filters.value[siblingKey]
      if (isMin ? value > sibling : value < sibling) {
        filters.value[siblingKey] = value
      }
    },
  })
}

const seedsMinModel = rangeSideField('seedsMin', 'seedsMax', 'seedsModified', true)
const seedsMaxModel = rangeSideField('seedsMax', 'seedsMin', 'seedsModified', false)
const sizeMinModel = rangeSideField('sizeMin', 'sizeMax', 'sizeModified', true)
const sizeMaxModel = rangeSideField('sizeMax', 'sizeMin', 'sizeModified', false)
</script>

<template>
  <div class="d-flex flex-wrap align-center ga-4 py-2">
    <v-text-field v-model="filters.title" density="compact" hide-details :label="t('searchEngine.filters.title.label')" style="min-width: 200px; flex-grow: 10" />

    <div class="search-filter-group d-flex flex-wrap align-center ga-2 flex-grow-1">
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.seeds.label') }}</span>
      <v-btn
        v-if="filters.seedsModified"
        density="compact"
        icon="mdi-refresh"
        size="small"
        :title="t('searchEngine.filters.rangeFilters.resetToAutomatic')"
        variant="text"
        @click="resetToAutomatic('seedsMin', 'seedsMax', 'seedsModified', seedsBounds)" />
      <v-range-slider
        v-model="seedsSlider"
        v-model:focused="seedsFocused"
        class="flex-grow-1"
        color="primary"
        :disabled="seedsBounds[0] === seedsBounds[1]"
        density="compact"
        hide-details
        :max="displayedSeedsBounds[1]"
        :min="displayedSeedsBounds[0]"
        :step="1"
        style="min-width: 20em"
        thumb-label="always"
        @end="syncSeedsBounds">
        <template #thumb-label="{ modelValue }">
          <div style="white-space: nowrap">{{ unclampedSliderValue(modelValue, displayedSeedsBounds, filters.seedsMin, filters.seedsMax) }}</div>
        </template>
        <template #prepend>
          <v-text-field v-model="seedsMinModel" density="compact" hide-details hide-spin-buttons single-line style="width: 6em" type="number" variant="outlined" />
        </template>
        <template #append>
          <v-text-field v-model="seedsMaxModel" density="compact" hide-details hide-spin-buttons single-line style="width: 6em" type="number" variant="outlined" />
        </template>
      </v-range-slider>
    </div>

    <div class="search-filter-group d-flex flex-wrap align-center ga-2 flex-grow-1">
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.size.label') }}</span>
      <v-btn
        v-if="filters.sizeModified"
        density="compact"
        icon="mdi-refresh"
        size="small"
        :title="t('searchEngine.filters.rangeFilters.resetToAutomatic')"
        variant="text"
        @click="resetToAutomatic('sizeMin', 'sizeMax', 'sizeModified', sizeBounds)" />
      <v-range-slider
        v-model="sizeSlider"
        v-model:focused="sizeFocused"
        class="flex-grow-1"
        color="primary"
        :disabled="sizeBounds[0] === sizeBounds[1]"
        density="compact"
        hide-details
        :max="displayedSizeBounds[1]"
        :min="displayedSizeBounds[0]"
        :step="1"
        style="min-width: 24em"
        thumb-label="always"
        @end="syncSizeBounds">
        <template #thumb-label="{ modelValue }">
          <div style="white-space: nowrap">{{ formatData({ data: unclampedSliderValue(modelValue, displayedSizeBounds, filters.sizeMin, filters.sizeMax) }) }}</div>
        </template>
        <template #prepend>
          <v-text-field v-model="sizeMinModel" density="compact" hide-details hide-spin-buttons single-line style="width: 8em" type="number" variant="outlined" />
        </template>
        <template #append>
          <v-text-field v-model="sizeMaxModel" density="compact" hide-details hide-spin-buttons single-line style="width: 8em" type="number" variant="outlined" />
        </template>
      </v-range-slider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-filter-group {
  width: 100%;

  @media (min-width: 600px) {
    width: auto;
    flex-shrink: 0;
  }
}
</style>
