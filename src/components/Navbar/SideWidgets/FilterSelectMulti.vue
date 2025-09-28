<script setup lang="ts" generic="T">
import { vOnLongPress } from '@vueuse/components'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { FilterState, FilterType } from '@/constants/vuetorrent'
import { arrayRemove } from '@/helpers'

defineProps<{
  title: string
  items: { title: string; value: T }[]
  filterType: FilterType
}>()

defineEmits<{
  disable: () => void
  toggleFilterType: () => void
}>()

const includeValues = defineModel<T[]>('include', { required: true })
const excludeValues = defineModel<T[]>('exclude', { required: true })

const { t } = useI18nUtils()

const filterCount = computed(() => includeValues.value.length + excludeValues.value.length)

function getValueState(value: T) {
  if (includeValues.value.includes(value)) {
    return FilterState.INCLUDED
  } else if (excludeValues.value.includes(value)) {
    return FilterState.EXCLUDED
  } else {
    return FilterState.DISABLED
  }
}

function getIcon(value: T) {
  switch (getValueState(value)) {
    case FilterState.INCLUDED:
      return 'mdi-plus-box'
    case FilterState.EXCLUDED:
      return 'mdi-minus-box'
    case FilterState.DISABLED:
    default:
      return 'mdi-checkbox-blank-outline'
  }
}

function getClassColor(value: T) {
  switch (getValueState(value)) {
    case FilterState.INCLUDED:
      return 'text-green'
    case FilterState.EXCLUDED:
      return 'text-red'
    default:
      return undefined
  }
}

function toggleValue(value: T) {
  switch (getValueState(value)) {
    case FilterState.INCLUDED:
      // Switch to excluded
      arrayRemove(includeValues.value, value)
      excludeValues.value.push(value)
      break
    case FilterState.EXCLUDED:
      // Switch to disabled
      arrayRemove(excludeValues.value, value)
      break
    case FilterState.DISABLED:
    default:
      // Switch to included
      includeValues.value.push(value)
  }
}

function disableFilter(value: T) {
  arrayRemove(includeValues.value, value)
  arrayRemove(excludeValues.value, value)
}
</script>

<template>
  <v-list-item class="px-0 pb-3">
    <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
      {{ title }}
    </v-list-item-title>
    <v-select
      :model-value="[...includeValues, ...excludeValues]"
      :items="items"
      :placeholder="t('navbar.side.filters.disabled')"
      bg-color="secondary"
      class="text-accent pt-1"
      density="compact"
      hide-details
      multiple
      variant="solo">
      <template #prepend>
        <v-tooltip location="right" :text="t(filterType === FilterType.CONJUNCTIVE ? 'constants.filter_type.conjunctive' : 'constants.filter_type.disjunctive')">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" :icon="filterType === FilterType.CONJUNCTIVE ? 'mdi-set-center' : 'mdi-set-all'" @click="$emit('toggleFilterType')" />
          </template>
        </v-tooltip>
      </template>
      <template #prepend-item>
        <v-list-item :title="t('common.disable')" @click="$emit('disable')" />
        <v-divider />
      </template>
      <template #selection="{ item, index }">
        <span v-if="index === 0 && filterCount === 1" class="text-accent">
          {{ item.title }}
        </span>
        <span v-else-if="index === 0" class="text-accent">
          {{ t('navbar.side.filters.activeFilter', filterCount) }}
        </span>
      </template>
      <template #item="{ item, props: itemProps }">
        <v-list-item
          v-on-long-press="() => disableFilter(item.value)"
          v-bind="itemProps"
          data-custom-context-menu
          :class="getClassColor(item.value)"
          @click="toggleValue(item.value)"
          @contextmenu="disableFilter(item.value)">
          <template #prepend>
            <v-icon :icon="getIcon(item.value)" />
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-list-item>
</template>
