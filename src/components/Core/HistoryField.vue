<script setup lang="ts">
import { computed, ref } from 'vue'
import { HistoryKey } from '@/constants/vuetorrent'
import { useHistoryStore } from '@/stores'

const props = withDefaults(
  defineProps<{
    historyKey: HistoryKey
    multiline?: boolean
  }>(),
  {
    multiline: false,
  }
)

const _value = defineModel<string | undefined>({ required: true })

const historyStore = useHistoryStore()

const field = ref<HTMLInputElement>()
const historyMenu = ref(false)

const historyValue = computed(() => historyStore.getHistory(props.historyKey))

function saveValueToHistory() {
  historyStore.pushValueToHistory(props.historyKey, _value.value ?? '')
}

function selectHistoryItem(item: string) {
  _value.value = item
  historyMenu.value = false
}

defineExpose({
  saveValueToHistory,
  focus: () => field.value?.focus(),
})
</script>

<template>
  <v-combobox v-if="!multiline" ref="field" v-model="_value" :items="historyValue">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
  </v-combobox>
  <v-textarea v-else ref="field" v-model="_value">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template #append-inner>
      <v-menu v-if="historyValue.length" v-model="historyMenu" location="bottom end">
        <template #activator="{ props: menuProps }">
          <v-btn v-bind="menuProps" icon="mdi-history" size="small" variant="text" />
        </template>
        <v-list density="compact">
          <v-list-item v-for="(item, index) in historyValue" :key="index" @click="selectHistoryItem(item)">
            <v-list-item-title class="text-truncate" style="max-width: 320px">
              {{ item.replace(/\n/g, ' · ') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-textarea>
</template>

<style scoped></style>
