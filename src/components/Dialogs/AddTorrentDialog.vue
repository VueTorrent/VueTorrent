<script setup lang="ts">
import { AppPreferences } from '@/constants/qbit'
import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences.ts'
import { useMaindataStore, useNavbarStore, usePreferenceStore, useVueTorrentStore } from '@/stores'
import { Category } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const maindataStore = useMaindataStore()
const navbarStore = useNavbarStore()
const preferenceStore = usePreferenceStore()
const vueTorrentStore = useVueTorrentStore()

const isFormValid = computed(() => navbarStore.addTorrentDialogUrls.length > 0 || navbarStore.addTorrentDialogFiles.length > 0)
const formData = reactive({
  autoTMM: false,
  skipChecking: false,
  sequentialDownload: false,
  firstLastPiecePrio: false,
  startNow: true,
  contentLayout: ContentLayout.ORIGINAL,
  stopCondition: StopCondition.NONE,
  savepath: '',
  category: null as Category | null,
  tags: [] as string[]
})
const tagSearch = ref('')
const categorySearch = ref('')

const contentLayoutOptions = ref([
  { title: t('constants.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
  { title: t('constants.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
  { title: t('constants.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
])
const stopConditionOptions = ref([
  { title: t('constants.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
  { title: t('constants.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
  { title: t('constants.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED }
])

const resetForm = () => {
  navbarStore.addTorrentDialogUrls = ''
  navbarStore.addTorrentDialogFiles = []

  formData.autoTMM = false
  formData.skipChecking = false
  formData.sequentialDownload = false
  formData.firstLastPiecePrio = false
  formData.startNow = true
  formData.contentLayout = preferenceStore.preferences!.torrent_content_layout
  formData.stopCondition = preferenceStore.preferences!.torrent_stop_condition
  formData.savepath = preferenceStore.preferences!.save_path
  formData.category = null
  formData.tags = []
}

const submit = async () => {
  if (!isFormValid.value) return

  const params: AddTorrentPayload = {
    savepath: formData.savepath,
    paused: !formData.startNow,
    skip_checking: formData.skipChecking,
    autoTMM: formData.autoTMM,
    sequentialDownload: formData.sequentialDownload,
    firstLastPiecePrio: formData.firstLastPiecePrio,
    contentLayout: formData.contentLayout,
    stopCondition: formData.stopCondition
  }

  if (navbarStore.addTorrentDialogUrls.length > 0) params.urls = navbarStore.addTorrentDialogUrls
  if (formData.category && formData.category.name) params.category = formData.category.name
  if (formData.tags.length > 0) params.tags = formData.tags.join(',')

  await maindataStore.addTorrents(params, navbarStore.addTorrentDialogFiles)

  resetForm()
  close()
}
const close = () => {
  navbarStore.addTorrentDialogVisible = false
}

const onCategoryChanged = () => {
  formData.savepath = (formData.category && formData.category.savePath)
    ? formData.category.savePath
    : preferenceStore.preferences!.save_path
}

onBeforeMount(async () => {
  if (!preferenceStore.preferences) {
    await preferenceStore.fetchPreferences()
  }
  formData.autoTMM = preferenceStore.preferences!.auto_tmm_enabled
  formData.startNow = !preferenceStore.preferences!.start_paused_enabled
  formData.contentLayout = preferenceStore.preferences!.torrent_content_layout
  formData.stopCondition = preferenceStore.preferences!.torrent_stop_condition
  formData.savepath = preferenceStore.preferences!.save_path
})

watch(() => navbarStore.addTorrentDialogVisible, async (isVisible) => {
  if (!isVisible) return

  if (maindataStore.categories.length < 1) {
    await maindataStore.fetchCategories()
  }
  if (maindataStore.tags.length < 1) {
    await maindataStore.fetchTags()
  }
}, { immediate: true })
</script>

<template>
  <v-dialog v-model="navbarStore.addTorrentDialogVisible"
            fullscreen
            transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.add.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-file-input v-model="navbarStore.addTorrentDialogFiles"
                          accept=".torrent"
                          counter
                          :show-size="vueTorrentStore.useBinarySize ? 1024 : 1000"
                          multiple
                          persistent-clear
                          persistent-hint
                          prepend-icon=""
                          variant="outlined"
                          :label="t('dialogs.add.files')">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-paperclip</v-icon>
              </template>
              <template v-slot:selection="{ fileNames }">
                  <span v-for="(fileName, index) in fileNames"
                        :key="fileName">
                    <v-chip v-if="index < 2" color="accent">{{ fileName }}</v-chip>
                    <span v-else-if="index >= 2" class="text-overline text-grey-darken-2 ml-2">
                      {{ t('dialogs.add.fileOverflow', fileNames.length - 2) }}
                    </span>
                  </span>
              </template>
            </v-file-input>
            <v-textarea v-model="navbarStore.addTorrentDialogUrls"
                        clearable
                        :label="t('dialogs.add.links')">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-link</v-icon>
              </template>
            </v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-combobox v-model="formData.tags"
                        v-model:search="tagSearch"
                        :items="maindataStore.tags"
                        :hide-no-data="false"
                        clearable
                        chips
                        multiple
                        :label="t('dialogs.add.tags')">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-tag</v-icon>
              </template>
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title v-if="tagSearch?.length > 0">
                    {{ t('dialogs.add.noTagMatch', { query: tagSearch }) }}
                  </v-list-item-title>
                  <v-list-item-title v-else>
                    {{ t('dialogs.add.noTags') }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-combobox>
            <v-combobox v-model="formData.category"
                        v-model:search="categorySearch"
                        :items="maindataStore.categories"
                        item-title="name"
                        return-object
                        :hide-no-data="false"
                        clearable
                        chips
                        label="Category"
                        @update:modelValue="onCategoryChanged">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-label</v-icon>
              </template>
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title v-if="categorySearch?.length > 0">
                    {{ t('dialogs.add.noCategoryMatch', { query: categorySearch }) }}
                  </v-list-item-title>
                  <v-list-item-title v-else>
                    {{ t('dialogs.add.noCategories') }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model="formData.savepath"
                          :disabled="formData.autoTMM"
                          :label="t('dialogs.add.savePath')">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-folder</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="formData.contentLayout"
                      :items="contentLayoutOptions"
                      hide-details
                      color="accent"
                      variant="solo-filled"
                      rounded="xl"
                      :label="t('constants.contentLayout.title')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="formData.stopCondition"
                      :items="stopConditionOptions"
                      hide-details
                      color="accent"
                      variant="solo-filled"
                      rounded="xl"
                      :label="t('constants.stopCondition.title')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-list>
              <v-list-item>
                <v-checkbox v-model="formData.startNow"
                            density="compact"
                            hide-details
                            :label="t('dialogs.add.startNow')" />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="formData.skipChecking"
                            density="compact"
                            hide-details
                            :label="t('dialogs.add.skipChecking')" />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="formData.autoTMM"
                            density="compact"
                            hide-details
                            :label="t('dialogs.add.autoTMM')" />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="formData.sequentialDownload"
                            density="compact"
                            hide-details
                            :label="t('dialogs.add.sequentialDownload')" />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="formData.firstLastPiecePrio"
                            density="compact"
                            hide-details
                            :label="t('dialogs.add.firstLastPiecePrio')" />
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="!isFormValid"
               color="accent"
               variant="elevated"
               :text="$t('dialogs.add.submit')"
               @click="submit" />
        <v-btn color="error"
               variant="flat"
               :text="$t('common.close')"
               @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>