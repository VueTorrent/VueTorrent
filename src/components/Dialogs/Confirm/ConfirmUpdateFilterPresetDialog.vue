<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useI18nUtils } from '@/composables'
import { useFilterPresetStore } from '@/stores'
import { FilterPreset } from '@/types/vuetorrent'

const props = defineProps<{
  guid: string
  preset: FilterPreset
}>()

const { t } = useI18nUtils()
const filterPresetStore = useFilterPresetStore()

const includeSort = ref(!!props.preset.sortCriterias)
</script>

<template>
  <ConfirmDialog :guid="guid" :title="t('dialogs.confirm.updateFilterPreset')" yes-color="error" @confirm="filterPresetStore.updateFilterPreset(preset.id, includeSort)">
    <div class="text-pre">{{ preset.name }}</div>
    <v-checkbox v-model="includeSort" density="compact" hide-details :label="t('dialogs.saveFilterPreset.includeSort')" />
  </ConfirmDialog>
</template>
