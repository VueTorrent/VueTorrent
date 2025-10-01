<script setup lang="ts">
import { computed, ref } from 'vue'
import { HistoryKey } from '@/constants/vuetorrent'
import { useHistoryStore } from '@/stores'

const props = defineProps<{
  historyKey: HistoryKey
  label?: string
}>()

const _value = defineModel<string | undefined>({ required: true })

const historyStore = useHistoryStore()

const field = ref<HTMLInputElement>()

const historyValue = computed(() => historyStore.getHistory(props.historyKey))

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, _value.value ?? '')
}

defineExpose({
  saveValueToHistory,
  focus: () => field.value?.focus(),
})
</script>

<template>
  <v-combobox ref="field" v-model="_value" :items="historyValue" :label="label">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
    <template v-if="$slots['prepend-inner']" #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </v-combobox>
</template>

<style scoped></style>
