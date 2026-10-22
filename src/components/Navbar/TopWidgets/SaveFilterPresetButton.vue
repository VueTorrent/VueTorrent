<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import SaveFilterPresetDialog from '@/components/Dialogs/SaveFilterPresetDialog.vue'
import { useI18nUtils } from '@/composables'
import { useDialogStore, useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const { hasAnyFilter, activeFilterPresetId } = storeToRefs(useTorrentStore())

/** Allow saving only when there's something to save that isn't already a preset */
const canSave = computed(() => hasAnyFilter.value && activeFilterPresetId.value === null)

function openSaveDialog() {
  dialogStore.createDialog(SaveFilterPresetDialog)
}
</script>

<template>
  <v-slide-x-transition>
    <v-btn v-if="canSave" class="ml-2" icon="mdi-content-save-outline" size="small" variant="text" :title="t('navbar.top.quick_filters.save')" @click="openSaveDialog" />
  </v-slide-x-transition>
</template>
