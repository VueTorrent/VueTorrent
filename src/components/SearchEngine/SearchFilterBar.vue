<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18nUtils, useNumberFormatter } from '@/composables'
import { useVueTorrentStore } from '@/stores'
import { ByteUnitExponent, SearchFilters } from '@/types/vuetorrent'

const filters = defineModel<SearchFilters>('filters', { required: true })

const { t } = useI18nUtils()
const { formatDataUnit } = useNumberFormatter()
const { useBinarySize } = storeToRefs(useVueTorrentStore())

function sizeToBytes(value: number, unitExponent: ByteUnitExponent) {
  const base = useBinarySize.value ? 1024 : 1000
  return value * base ** unitExponent
}

const sizeUnits = computed(() => {
  return Object.values(ByteUnitExponent)
    .filter((value): value is ByteUnitExponent => typeof value === 'number')
    .map(exponent => ({ value: exponent, title: formatDataUnit({ data: sizeToBytes(1, exponent) }) }))
})

const seedsRangeInverted = computed(() => filters.value.seedsMax != null && (filters.value.seedsMin ?? 0) > filters.value.seedsMax)
const sizeRangeInverted = computed(() => {
  if (filters.value.sizeMax == null) return false
  const minBytes = sizeToBytes(filters.value.sizeMin ?? 0, filters.value.sizeMinUnit)
  const maxBytes = sizeToBytes(filters.value.sizeMax, filters.value.sizeMaxUnit)
  return minBytes > maxBytes
})

function nonNegative(key: 'seedsMin' | 'seedsMax' | 'sizeMin' | 'sizeMax') {
  return computed<number | null, string>({
    get: () => filters.value[key],
    set: raw => {
      const parsed = raw === '' ? null : Number(raw)
      filters.value[key] = parsed == null || Number.isNaN(parsed) ? null : Math.max(parsed, 0)
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
    <v-text-field v-model="filters.title" class="flex-grow-1" density="compact" hide-details :label="t('searchEngine.filters.title.label')" style="min-width: 200px" />

    <div class="search-filter-group d-flex flex-wrap align-center ga-2">
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.seeds.label') }}</span>
      <v-text-field v-model="seedsMinModel" density="compact" hide-details :label="t('searchEngine.filters.rangeFilters.min')" min="0" style="width: 6em" type="number" />
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.rangeFilters.to') }}</span>
      <v-text-field v-model="seedsMaxModel" density="compact" hide-details :label="t('searchEngine.filters.rangeFilters.max')" min="0" style="width: 6em" type="number" />
      <v-tooltip v-if="seedsRangeInverted" :text="t('searchEngine.filters.rangeFilters.invertedWarning')" location="top">
        <template #activator="{ props }">
          <v-icon v-bind="props" icon="mdi-alert" color="warning" size="small" />
        </template>
      </v-tooltip>
    </div>

    <div class="search-filter-group d-flex flex-wrap align-center ga-2">
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.size.label') }}</span>
      <v-text-field
        v-model="sizeMinModel"
        density="compact"
        hide-details
        :label="t('searchEngine.filters.rangeFilters.min')"
        min="0"
        step="0.01"
        style="width: 6em"
        type="number" />
      <v-select v-model="filters.sizeMinUnit" density="compact" hide-details :items="sizeUnits" style="width: 6em" />
      <span class="text-body-2 flex-shrink-0">{{ t('searchEngine.filters.rangeFilters.to') }}</span>
      <v-text-field
        v-model="sizeMaxModel"
        density="compact"
        hide-details
        :label="t('searchEngine.filters.rangeFilters.max')"
        min="0"
        step="0.01"
        style="width: 6em"
        type="number" />
      <v-select v-model="filters.sizeMaxUnit" density="compact" hide-details :items="sizeUnits" style="width: 6em" />
      <v-tooltip v-if="sizeRangeInverted" :text="t('searchEngine.filters.rangeFilters.invertedWarning')" location="top">
        <template #activator="{ props }">
          <v-icon v-bind="props" icon="mdi-alert" color="warning" size="small" />
        </template>
      </v-tooltip>
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
