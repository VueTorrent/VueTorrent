<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import SaveFilterPresetDialog from '@/components/Dialogs/SaveFilterPresetDialog.vue'
import { useI18nUtils } from '@/composables'
import { useDialogStore, useFilterPresetStore } from '@/stores'

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const { hasAnyFilter, activeFilterPresetId } = storeToRefs(useFilterPresetStore())

const canSave = computed(() => hasAnyFilter.value && activeFilterPresetId.value === null)

function openSaveDialog() {
  dialogStore.createDialog(SaveFilterPresetDialog)
}
</script>

<template>
  <v-slide-x-transition>
    <v-tooltip v-if="canSave" :text="t('navbar.top.quick_filters.save')" location="bottom">
      <template #activator="{ props }">
        <v-btn v-bind="props" class="ml-2" icon="mdi-content-save-outline" size="small" variant="text" :aria-label="t('navbar.top.quick_filters.save')" @click="openSaveDialog" />
      </template>
    </v-tooltip>
  </v-slide-x-transition>
</template>
