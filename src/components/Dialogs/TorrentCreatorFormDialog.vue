<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import ServerPathField from '@/components/Core/ServerPathField.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { TorrentFormat } from '@/constants/qbit'
import { formatData } from '@/helpers'
import { useAppStore, useCategoryStore, usePreferenceStore, useTagStore, useTorrentCreatorStore } from '@/stores'
import { TorrentCreatorParams } from '@/types/qbit/models'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const appStore = useAppStore()
const categoryStore = useCategoryStore()
const preferenceStore = usePreferenceStore()
const tagStore = useTagStore()
const torrentCreatorStore = useTorrentCreatorStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const rememberSettings = ref(false)

// Load saved settings from localStorage
const savedSettings = localStorage.getItem('vuetorrent:torrentCreator:lastUsed')
const lastUsed = savedSettings ? JSON.parse(savedSettings) : {}

const formData = reactive<Required<TorrentCreatorParams>>({
  sourcePath: '',
  format: TorrentFormat.HYBRID,
  pieceSize: 0,
  optimizeAlignment: false,
  paddedFileSizeLimit: 0,
  private: false,
  startSeeding: false,
  torrentFilePath: '',
  trackers: '',
  urlSeeds: '',
  source: '',
  comment: '',
  autoAddToClient: lastUsed.autoAddToClient ?? false,
  addCategory: lastUsed.addCategory ?? '',
  addTags: lastUsed.addTags ?? [],
  addUseAutoTmm: lastUsed.addUseAutoTmm ?? (preferenceStore.preferences?.auto_tmm_enabled || false),
})

const formatOptions = [
  { title: t('constants.torrentFormat.v1'), value: TorrentFormat.V1 },
  { title: t('constants.torrentFormat.v2'), value: TorrentFormat.V2 },
  { title: t('constants.torrentFormat.hybrid'), value: TorrentFormat.HYBRID },
]

const pieceSizeOptions = computed(() => {
  const sizes = [{ title: t('common.auto'), value: 0 }]

  for (let i = 16 * 1024; i < 500_000_000; i *= 2) {
    sizes.push({ title: formatData(i, true, 0), value: i })
  }

  return sizes
})

const categoryOptions = computed(() => [
  { title: t('common.none'), value: '' },
  ...categoryStore.categories.map(cat => ({ title: cat.name, value: cat.name }))
])

const availableTags = computed(() => tagStore.tags)

const paddedLimitRules = [(v: number) => !v || v < -1 || t('dialogs.torrentCreator.paddedFileSizeLimitRule')]

// Save settings to localStorage when they change
const saveSettings = () => {
  if (rememberSettings.value) {
    const settingsToSave = {
      autoAddToClient: formData.autoAddToClient,
      addCategory: formData.addCategory,
      addTags: formData.addTags,
      addUseAutoTmm: formData.addUseAutoTmm,
    }
    localStorage.setItem('vuetorrent:torrentCreator:lastUsed', JSON.stringify(settingsToSave))
  }
}

// Watch for changes to save settings
watch([
  () => formData.autoAddToClient,
  () => formData.addCategory,
  () => formData.addTags,
  () => formData.addUseAutoTmm,
], saveSettings, { deep: true })

onMounted(() => {
  // Load remember setting preference
  rememberSettings.value = localStorage.getItem('vuetorrent:torrentCreator:rememberSettings') === 'true'
})

watch(rememberSettings, (newValue) => {
  localStorage.setItem('vuetorrent:torrentCreator:rememberSettings', String(newValue))
  if (newValue) {
    saveSettings()
  } else {
    localStorage.removeItem('vuetorrent:torrentCreator:lastUsed')
  }
})

async function submit() {
  if (!isFormValid.value) return

  await torrentCreatorStore.createTask(formData)

  close()
}

function close() {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="1250">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.torrentCreator.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent>
          <v-row>
            <v-col cols="12">
              <ServerPathField
                v-model="formData.sourcePath"
                :title="t('dialogs.torrentCreator.sourcePath')"
                :rules="[(v: string) => !!v || t('dialogs.torrentCreator.rules.sourcePathRequired')]" />
            </v-col>
            <v-col cols="12">
              <ServerPathField
                v-model="formData.torrentFilePath"
                :title="t('dialogs.torrentCreator.torrentFilePath')"
                :rules="[(v: string) => !v || v.endsWith('.torrent') || t('dialogs.torrentCreator.rules.outputFileExtension')]" />
            </v-col>

            <v-divider />

            <v-col v-if="appStore.usesLibtorrent2" cols="12" sm="6" class="pb-0">
              <v-select v-model="formData.format" hide-details :items="formatOptions" :label="t('dialogs.torrentCreator.format')" />
            </v-col>
            <v-col cols="12" :sm="appStore.usesLibtorrent2 ? 6 : undefined" class="pb-0">
              <v-select v-model="formData.pieceSize" hide-details :items="pieceSizeOptions" :label="t('dialogs.torrentCreator.pieceSize')" />
            </v-col>

            <template v-if="appStore.usesLibtorrent1">
              <v-col cols="12" sm="6" class="py-0">
                <v-checkbox v-model="formData.optimizeAlignment" hide-details :label="t('dialogs.torrentCreator.optimizeAlignment')" />
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model.number="formData.paddedFileSizeLimit"
                  min="-1"
                  :rules="paddedLimitRules"
                  :label="t('dialogs.torrentCreator.paddedFileSizeLimit')"
                  :hint="t('dialogs.torrentCreator.paddedFileSizeLimitHint')"
                  suffix="kiB" />
              </v-col>
            </template>
            <v-col cols="12" sm="6" class="py-0">
              <v-checkbox v-model="formData.private" hide-details :label="t('dialogs.torrentCreator.private')" />
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-checkbox v-model="formData.startSeeding" hide-details :label="t('dialogs.torrentCreator.startSeeding')" />
            </v-col>

            <v-divider />

            <v-col cols="12">
              <v-checkbox v-model="formData.autoAddToClient" hide-details :label="t('dialogs.torrentCreator.autoAddToClient')" />
            </v-col>

            <template v-if="formData.autoAddToClient">
              <v-col cols="12" sm="6">
                <v-select 
                  v-model="formData.addCategory" 
                  :items="categoryOptions" 
                  hide-details 
                  :label="t('dialogs.torrentCreator.addCategory')" 
                  clearable />
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox 
                  v-model="formData.addUseAutoTmm" 
                  :label="t('dialogs.torrentCreator.addUseAutoTmm')" 
                  :hint="t('dialogs.torrentCreator.addUseAutoTmmHint', { default: preferenceStore.preferences?.auto_tmm_enabled ? t('common.enabled') : t('common.disabled') })"
                  persistent-hint />
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="formData.addTags"
                  :items="availableTags"
                  :label="t('dialogs.torrentCreator.addTags')"
                  multiple
                  chips
                  hide-details
                  closable-chips />
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="rememberSettings" hide-details :label="t('dialogs.torrentCreator.rememberSettings')" />
              </v-col>
            </template>

            <v-divider />

            <v-col cols="12">
              <v-textarea v-model="formData.trackers" :label="t('dialogs.torrentCreator.trackers')" :hint="t('dialogs.torrentCreator.trackersHint')" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.urlSeeds" hide-details :label="t('dialogs.torrentCreator.urlSeeds')" />
            </v-col>
            <v-col v-if="appStore.isFeatureAvailable('5.1.0')" cols="12">
              <v-textarea v-model="formData.source" hide-details :label="t('dialogs.torrentCreator.source')" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.comment" hide-details :label="t('dialogs.torrentCreator.comment')" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" color="accent" @click="submit">
          {{ t('dialogs.torrentCreator.actions.submit') }}
        </v-btn>
        <v-btn color="error" @click="close">
          {{ t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
