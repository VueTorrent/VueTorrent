<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { DirectoryContentMode } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { useAppStore } from '@/stores'

defineProps<{
  title: string
}>()

const modelValue = defineModel<string | undefined>({ required: true })
const items = ref<string[]>([])

const appStore = useAppStore()

const updateDirContent = useDebounceFn(async query => {
  if (!query) return

  const directoryContent = await qbit.getDirectoryContent(query, DirectoryContentMode.ALL)
  if (!directoryContent) return

  items.value = directoryContent
}, 500)
</script>

<template>
  <v-combobox v-if="appStore.usesQbit5" v-model="modelValue" :items="items" :label="title" @update:search="updateDirContent">
    <template #prepend="slotProps">
      <slot name="prepend" v-bind="slotProps" />
    </template>
    <template #append="slotProps">
      <slot name="append" v-bind="slotProps" />
    </template>
    <template #append-inner="slotProps">
      <slot name="append-inner" v-bind="slotProps" />
    </template>
    <template #prepend-inner="slotProps">
      <slot name="prepend-inner" v-bind="slotProps" />
    </template>
  </v-combobox>
  <v-text-field v-else v-model="modelValue" :label="title">
    <template #prepend="slotProps">
      <slot name="prepend" v-bind="slotProps" />
    </template>
    <template #append="slotProps">
      <slot name="append" v-bind="slotProps" />
    </template>
    <template #append-inner="slotProps">
      <slot name="append-inner" v-bind="slotProps" />
    </template>
    <template #prepend-inner="slotProps">
      <slot name="prepend-inner" v-bind="slotProps" />
    </template>
  </v-text-field>
</template>
