<script setup lang="ts" generic="T">
import { useI18nUtils } from '@/composables'
import { FilterType } from '@/constants/vuetorrent'

defineProps<{
  title: string
  items: { title: string, value: T }[]
  filterType: FilterType
}>()

const modelValue = defineModel<T[]>({ required: true })

defineEmits<{
  disable: () => void
  toggleFilterType: () => void
}>()

const { t } = useI18nUtils()
</script>

<template>
  <v-list-item class="px-0 pb-3">
    <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
      {{ title }}
    </v-list-item-title>
    <v-select
      v-model="modelValue"
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
          <span v-if="index === 0 && modelValue.length === 1" class="text-accent">
            {{ item.title }}
          </span>
        <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', modelValue.length) }}
          </span>
      </template>
    </v-select>
  </v-list-item>
</template>
