<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { isValidUri } from '@/helpers'
import { useTrackerStore } from '@/stores'

defineProps<{
  availableTrackers: string[]
}>()

defineEmits<{
  delete: []
}>()

const modelValue = defineModel<[string | undefined, string | undefined]>({ required: true })

const { t } = useI18nUtils()
const { trackers } = storeToRefs(useTrackerStore())

const oldTrackerUrl = computed({
  get: () => modelValue.value[0],
  set: v => (modelValue.value[0] = v),
})
const newTrackerUrl = computed({
  get: () => modelValue.value[1],
  set: v => (modelValue.value[1] = v),
})

const newUrlRules = [
  (v: string) => {
    if (!oldTrackerUrl.value || !newTrackerUrl.value || newTrackerUrl.value.length === 0) return true

    return isValidUri(v) || t('dialogs.bulkEditTrackers.edit.row.rules.invalid_url')
  },
]
</script>

<template>
  <div class="d-flex ga-3 flex-row">
    <v-select v-model="oldTrackerUrl" class="w-50" :items="availableTrackers" :label="t('dialogs.bulkEditTrackers.edit.row.old_url')" />
    <v-combobox v-model="newTrackerUrl" class="w-50" :items="trackers" :rules="newUrlRules" :label="t('dialogs.bulkEditTrackers.edit.row.new_url')" />
    <v-btn color="error" variant="text" icon="mdi-minus" @click="$emit('delete')" />
  </div>
</template>
