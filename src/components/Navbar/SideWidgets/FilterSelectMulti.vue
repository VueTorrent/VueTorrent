<script setup lang="ts" generic="T">
import { useI18nUtils } from '@/composables'
import { FilterType } from '@/constants/vuetorrent'
import { computed } from 'vue'

defineProps<{
  title: string
  items: { title: string, value: T }[]
  filterType: FilterType
}>()

const includeValues = defineModel<Set<T>>('include', { required: true })
const excludeValues = defineModel<Set<T>>('exclude', { required: true })

defineEmits<{
  disable: () => void
  toggleFilterType: () => void
}>()

const { t } = useI18nUtils()

const filterCount = computed(() => includeValues.value.size + excludeValues.value.size)

enum ValueState {
  INCLUDED,
  EXCLUDED,
  DISABLED
}

function getValueState(value: T) {
  if (includeValues.value.has(value)) {
    return ValueState.INCLUDED
  } else if (excludeValues.value.has(value)) {
    return ValueState.EXCLUDED
  } else {
    return ValueState.DISABLED
  }
}

function getIcon(value: T) {
  switch (getValueState(value)) {
    case ValueState.INCLUDED:
      return 'mdi-plus-box'
    case ValueState.EXCLUDED:
      return 'mdi-minus-box'
    case ValueState.DISABLED:
    default:
      return 'mdi-checkbox-blank-outline'
  }
}

function getClassColor(value: T) {
  switch (getValueState(value)) {
    case ValueState.INCLUDED:
      return 'text-green'
    case ValueState.EXCLUDED:
      return 'text-red'
    default:
      return undefined
  }
}

function toggleValue(value: T) {
  switch (getValueState(value)) {
    case ValueState.INCLUDED:
      includeValues.value.delete(value)
      excludeValues.value.add(value)
      break;
    case ValueState.EXCLUDED:
      excludeValues.value.delete(value)
      break;
    case ValueState.DISABLED:
    default:
      includeValues.value.add(value)
  }
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
          <template #activator="{ props }">
            <v-icon v-bind="props" :icon="filterType === FilterType.CONJUNCTIVE ? 'mdi-set-center' : 'mdi-set-all'" @click="$emit('toggleFilterType')" />
          </template>
        </v-tooltip>
      </template>
      <template v-slot:prepend-item>
        <v-list-item :title="t('common.disable')" @click="$emit('disable')" />
        <v-divider />
      </template>
      <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && filterCount === 1" class="text-accent">
            {{ item.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', filterCount) }}
          </span>
      </template>
      <template #item="{ item }">
        <v-list-item :title="item.title" :class="getClassColor(item.value)" @click="toggleValue(item.value)">
          <template #prepend>
            <v-icon :icon="getIcon(item.value)" />
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-list-item>
</template>
