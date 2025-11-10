<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import { DirectoryContentMode } from '@/constants/qbit'
import { HistoryKey } from '@/constants/vuetorrent'
import qbit from '@/services/qbit'
import { useAppStore, useHistoryStore } from '@/stores'

const props = defineProps<{
  title: string
  historyKey: HistoryKey
}>()

const modelValue = defineModel<string | undefined>({ required: true })
const serverItems = ref<string[]>([])

const appStore = useAppStore()
const historyStore = useHistoryStore()
const comboboxRef = ref<HTMLInputElement>()

const historyItems = computed(() => historyStore.getHistory(props.historyKey))

const allItems = computed(() => {
  const history = historyItems.value
  const server = serverItems.value

  const combined = [...history]
  server.forEach(item => {
    if (!combined.includes(item)) {
      combined.push(item)
    }
  })

  return combined
})

const updateDirContent = useDebounceFn(async query => {
  if (!query || !appStore.usesQbit5) {
    serverItems.value = []
    return
  }

  try {
    const directoryContent = await qbit.getDirectoryContent(query, DirectoryContentMode.ALL)
    if (directoryContent) {
      serverItems.value = directoryContent
    }
  } catch (error) {
    console.warn('Failed to fetch directory content:', error)
    serverItems.value = []
  }
}, 500)

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, modelValue.value ?? '')
}

defineExpose({
  saveValueToHistory,
  focus: () => comboboxRef.value?.focus(),
})
</script>

<template>
  <v-combobox ref="comboboxRef" v-model="modelValue" :items="allItems" :label="title" @update:search="updateDirContent">
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
</template>
