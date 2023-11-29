<script setup lang="ts">
import { HistoryKey } from '@/constants/vuetorrent'
import { useHistoryStore } from '@/stores'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue?: string
  historyKey: HistoryKey
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const historyStore = useHistoryStore()

const field = ref<HTMLInputElement>()

const historyValue = computed(() => historyStore.getHistory(props.historyKey))
const _value = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value)
})

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, _value.value)
}

defineExpose({
  saveValueToHistory,
  focus: () => field.value?.focus()
})
</script>

<template>
  <v-combobox v-model="_value" ref="field" :items="historyValue" />
</template>

<style scoped></style>
