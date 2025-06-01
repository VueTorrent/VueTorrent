<script setup lang="ts" generic="T">
import { useI18nUtils } from '@/composables'
import { comparators } from '@/helpers'
import { useSorted } from '@vueuse/core'

const props = defineProps<{
  title: string
  items: { title: string; value: T }[]
}>()

defineSlots<{
  'prepend-item'(): any
}>()

defineEmits<{
  disable: () => void
}>()

const modelValue = defineModel<T[]>({ required: true })

const orderedItems = useSorted(() => props.items, (a, b) => comparators.text.asc(a.title, b.title))

const { t } = useI18nUtils()
</script>

<template>
  <v-list-item class="px-0 pb-3">
    <v-list-item-title class="px-0 text-uppercase ml-1 font-weight-light text-subtitle-2">
      {{ title }}
    </v-list-item-title>
    <v-select
      v-model="modelValue"
      :items="orderedItems"
      :placeholder="t('navbar.side.filters.disabled')"
      bg-color="secondary"
      class="text-accent pt-1"
      density="compact"
      hide-details
      multiple
      variant="solo">
      <template v-slot:prepend-item>
        <v-list-item :title="t('common.disable')" @click="$emit('disable')" />
        <slot name="prepend-item"></slot>
        <v-divider />
      </template>
      <template v-slot:selection="{ item, index }">
        <span v-if="index === 0 && modelValue.length === 1" class="text-accent">{{ item.title }}</span>
        <span v-else-if="index === 0" class="text-accent">{{ t('navbar.side.filters.activeFilter', modelValue.length) }}</span>
      </template>
    </v-select>
  </v-list-item>
</template>
