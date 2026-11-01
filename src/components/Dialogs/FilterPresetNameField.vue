<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { useFilterPresetStore } from '@/stores'
import { FilterPreset } from '@/types/vuetorrent'

const props = defineProps<{
  preset: FilterPreset
}>()

const { t } = useI18nUtils()
const filterPresetStore = useFilterPresetStore()

const draft = ref<string>()

const name = computed({
  get: () => draft.value ?? props.preset.name,
  set: v => (draft.value = v),
})

const rules = [(v: string) => !!v.trim() || t('dialogs.saveFilterPreset.required')]

function commitRename() {
  if (draft.value === undefined) return
  filterPresetStore.renameFilterPreset(props.preset.id, draft.value)
  draft.value = undefined
}
</script>

<template>
  <v-text-field v-model="name" :rules="rules" :label="t('dialogs.saveFilterPreset.name')" hide-details="auto" @blur="commitRename" @keydown.enter="commitRename" />
</template>
