<script setup lang="ts">
import qbit from '@/services/qbit'
import { useAppStore } from '@/stores'
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const modelValue = defineModel<string>({ required: true })
const items = ref<string[]>([])

const appStore = useAppStore()

const updateDirContent = useDebounceFn(async query => {
  if (!query) return

  const directoryContent = await qbit.getDirectoryContent(query, 'all')
  if (!directoryContent) return

  items.value = directoryContent
}, 500)
</script>

<template>
  <v-combobox v-if="appStore.usesQbit5" v-model="modelValue" :items="items" :label="title" @update:search="updateDirContent" />
  <v-text-field v-else v-model="modelValue" :label="title" />
</template>
