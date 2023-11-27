<script setup lang="ts">
import { useHistoryStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  historyKey: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const historyStore = useHistoryStore()

const historyValue = computed(() => historyStore.getHistory(props.historyKey))
const _value = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value)
})

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, _value.value)
}

defineExpose({
  saveValueToHistory
})
</script>

<template>
  <v-combobox v-model="_value" :items="historyValue" />
</template>

<style scoped>

</style>