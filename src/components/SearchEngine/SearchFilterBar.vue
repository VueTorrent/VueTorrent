<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
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

/**
 * Updates the bounds of `v-range-slider` on new search results when min/max
 * values are unchanged by the user (when they are at the edges). Dragging or
 * typing a different value "freezes" it.
 */
function trackBounds(bounds: () => [number, number], minKey: 'seedsMin' | 'sizeMin', maxKey: 'seedsMax' | 'sizeMax') {
  watch(bounds, ([newMin, newMax], [oldMin, oldMax]) => {
    if (newMin === newMax) {
      filters.value[minKey] = newMin
      filters.value[maxKey] = newMax
      return
    }
    if (filters.value[minKey] === oldMin) filters.value[minKey] = newMin
    if (filters.value[maxKey] === oldMax) filters.value[maxKey] = newMax
  })
}

trackBounds(() => seedsBounds.value, 'seedsMin', 'seedsMax')
trackBounds(() => sizeBounds.value, 'sizeMin', 'sizeMax')

const seedsSlider = computed<[number, number]>({
  get: (): [number, number] => [filters.value.seedsMin, filters.value.seedsMax],
  set: ([newMin, newMax]: [number, number]) => {
    filters.value.seedsMin = newMin
    filters.value.seedsMax = newMax
  },
})

const sizeSlider = computed<[number, number]>({
  get: (): [number, number] => [filters.value.sizeMin, filters.value.sizeMax],
  set: ([newMin, newMax]: [number, number]) => {
    filters.value.sizeMin = newMin
    filters.value.sizeMax = newMax
  },
})

function nonNegative(key: 'seedsMin' | 'seedsMax' | 'sizeMin' | 'sizeMax') {
  return computed<number, string>({
    get: () => filters.value[key],
    set: raw => {
      const parsed = Number(raw)
      filters.value[key] = Number.isNaN(parsed) ? 0 : Math.max(parsed, 0)
    },
  })
}

const seedsMinModel = nonNegative('seedsMin')
const seedsMaxModel = nonNegative('seedsMax')
const sizeMinModel = nonNegative('sizeMin')
const sizeMaxModel = nonNegative('sizeMax')
</script>

<template>
  <div class="d-flex flex-wrap align-center ga-4 py-2">
    <v-text-field v-model="filters.title" density="compact" hide-details :label="t('searchEngine.filters.title.label')" style="min-width: 200px; flex-grow: 10" />

    <div class="search-filter-group d-flex flex-wrap align-center ga-2 flex-grow-1">
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.seeds.label') }}</span>
      <v-range-slider
        v-model="seedsSlider"
        class="flex-grow-1"
        color="primary"
        :direction="$vuetify.display.mobile ? 'vertical' : 'horizontal'"
        :disabled="seedsBounds[0] === seedsBounds[1]"
        density="compact"
        hide-details
        :max="seedsBounds[1]"
        :min="seedsBounds[0]"
        :step="1"
        style="min-width: 20em"
        thumb-label="always">
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
      <v-range-slider
        v-model="sizeSlider"
        class="flex-grow-1"
        color="primary"
        :direction="$vuetify.display.mobile ? 'vertical' : 'horizontal'"
        :disabled="sizeBounds[0] === sizeBounds[1]"
        density="compact"
        hide-details
        :max="sizeBounds[1]"
        :min="sizeBounds[0]"
        :step="1"
        style="min-width: 24em"
        thumb-label="always">
        <template #thumb-label="{ modelValue }">
          <div style="white-space: nowrap">{{ formatData({ data: modelValue }) }}</div>
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
