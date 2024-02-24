<script setup lang="ts">
import { HistoryKey } from '@/constants/vuetorrent'
import { useHistoryStore } from '@/stores'
import { computed, ref } from 'vue'

const props = defineProps<{
  historyKey: HistoryKey
}>()

const _value = defineModel<string>({ required: true })

const historyStore = useHistoryStore()

const field = ref<HTMLInputElement>()

const historyValue = computed(() => historyStore.getHistory(props.historyKey))

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, _value.value)
}

defineExpose({
  saveValueToHistory,
  focus: () => field.value?.focus()
})
</script>

<template>
  <v-combobox v-model="_value" ref="field" :items="historyValue">
    <template v-slot:prepend><slot name="prepend" /></template>
  </v-combobox>
</template>

<style scoped></style>
