<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDialog, useI18nUtils } from '@/composables'
import { useSearchEngineStore, useVueTorrentStore } from '@/stores'
import { defaultSearchPresetCapture, SearchData } from '@/types/vuetorrent'

const props = defineProps<{
  guid: string
  tab: SearchData
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const searchEngineStore = useSearchEngineStore()
const vueTorrentStore = useVueTorrentStore()

const name = ref('')
const capture = ref(defaultSearchPresetCapture())
const setAsDefault = ref(false)

const willOverwrite = computed(() => vueTorrentStore.searchPresets.some(preset => preset.name === name.value.trim()))

function submit() {
  if (!name.value.trim()) return

  const id = searchEngineStore.saveSearchPreset(props.tab, name.value, capture.value)
  if (!id) return

  if (setAsDefault.value) {
    searchEngineStore.setDefaultSearchPreset(id)
  }

  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="600">
    <v-card>
      <v-card-title>{{ t('searchEngine.presets.saveTitle') }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <!-- A plain field on purpose: v-combobox only commits typed text on blur/enter,
                 so typing a name and clicking Save directly would save nothing. -->
            <v-text-field v-model="name" autofocus density="compact" hide-details :label="t('searchEngine.presets.name')" @keydown.enter.prevent="submit" />
            <div v-if="willOverwrite" class="text-caption text-warning mt-1">
              {{ t('searchEngine.presets.overwriteHint') }}
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-subtitle-2 mb-1">{{ t('searchEngine.presets.captureTitle') }}</div>
            <v-checkbox v-model="capture.sortBy" density="compact" hide-details :label="t('searchEngine.presets.captureSort')" />
            <v-checkbox v-model="capture.itemsPerPage" density="compact" hide-details :label="t('searchEngine.presets.captureRows')" />
            <v-checkbox v-model="capture.categoryAndPlugin" density="compact" hide-details :label="t('searchEngine.presets.captureCategoryPlugin')" />
            <v-checkbox
              v-model="capture.titleFilter"
              density="compact"
              hide-details
              :hint="t('searchEngine.presets.captureTitleFilterHint')"
              :label="t('searchEngine.presets.captureTitleFilter')"
              persistent-hint />
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="setAsDefault" density="compact" hide-details :label="t('searchEngine.presets.setAsDefault')" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="isOpened = false">{{ t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!name.trim()" @click="submit">{{ t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
