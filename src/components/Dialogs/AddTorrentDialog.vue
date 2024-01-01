<script lang="ts" setup>
import HistoryField from '@/components/Core/HistoryField.vue'
import { useDialog } from '@/composables'
import { AppPreferences } from '@/constants/qbit'
import { HistoryKey } from '@/constants/vuetorrent'
import { useAddTorrentStore, useMaindataStore, usePreferenceStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const props = withDefaults(
  defineProps<{
    guid: string
    openSuddenly?: boolean
  }>(),
  {
    openSuddenly: false
  }
)

const { isOpened } = useDialog(props.guid)
const { t } = useI18n()
const addTorrentStore = useAddTorrentStore()
const { urls, files, form } = storeToRefs(addTorrentStore)
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
const torrentStore = useTorrentStore()
const vueTorrentStore = useVueTorrentStore()

const fileOverflowDisplayLimit = 2
const contentLayoutOptions = [
  { title: t('constants.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
  { title: t('constants.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
  { title: t('constants.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
]
const stopConditionOptions = [
  { title: t('constants.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
  { title: t('constants.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
  { title: t('constants.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED }
]

const isFormValid = computed(() => urls.value.length > 0 || files.value.length > 0)

const cookieField = ref<typeof HistoryField>()
const dlPathField = ref<typeof HistoryField>()
const savePathField = ref<typeof HistoryField>()

const cookie = computed({
  get: () => form.value.cookie,
  set: value => (form.value.cookie = value || undefined)
})

const rename = computed({
  get: () => form.value.rename,
  set: value => (form.value.rename = value || undefined)
})

const tagSearch = ref('')
const tags = computed({
  get: () => {
    if (form.value.tags) {
      return form.value.tags.split(',').map(tag => tag.trim())
    } else {
      return []
    }
  },
  set: (value: string[]) => (form.value.tags = value.join(','))
})

const categorySearch = ref('')
const categories = computed(() => maindataStore.categories.map(c => c.name))
const category = computed<string | undefined>({
  get: () => form.value.category || categorySearch.value || undefined,
  set: value => (form.value.category = value || undefined)
})

const downloadPath = computed({
  get: () => form.value.downloadPath,
  set: value => {
    form.value.useDownloadPath = !!value || undefined
    form.value.downloadPath = value || undefined
  }
})

const startNow = computed({
  get: () => !form.value.paused,
  set: value => (form.value.paused = !value)
})

const dlLimit = computed({
  get: () => {
    if (!form.value.dlLimit || form.value.dlLimit === -1) {
      return ''
    } else {
      return (form.value.dlLimit / 1024).toString()
    }
  },
  set: value => {
    if (!value) {
      form.value.dlLimit = undefined
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue > 0) {
        form.value.dlLimit = parsedValue * 1024
      }
    }
  }
})

const upLimit = computed({
  get: () => {
    if (!form.value.upLimit || form.value.upLimit === -1) {
      return ''
    } else {
      return (form.value.upLimit / 1024).toString()
    }
  },
  set: value => {
    if (!value) {
      form.value.upLimit = undefined
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue > 0) {
        form.value.upLimit = parsedValue * 1024
      }
    }
  }
})

const ratioLimit = computed({
  get: () => form.value.ratioLimit,
  set: val => (form.value.ratioLimit = val || undefined)
})

const seedingTimeLimit = computed({
  get: () => form.value.seedingTimeLimit,
  set: val => (form.value.seedingTimeLimit = val || undefined)
})

const inactiveSeedingTimeLimit = computed({
  get: () => form.value.inactiveSeedingTimeLimit,
  set: val => (form.value.inactiveSeedingTimeLimit = val || undefined)
})

function submit() {
  if (!isFormValid.value) return

  toast
    .promise(
      torrentStore.addTorrents(files.value, urls.value, form.value),
      {
        pending: t('dialogs.add.pending'),
        error: t('dialogs.add.error', addTorrentStore.pendingTorrentsCount),
        success: t('dialogs.add.success', addTorrentStore.pendingTorrentsCount)
      },
      {
        autoClose: 1500
      }
    )
    .then(() => {
      cookieField.value?.saveValueToHistory()
      dlPathField.value?.saveValueToHistory()
      savePathField.value?.saveValueToHistory()
      addTorrentStore.resetForm()
      close()
    })
}

function close() {
  isOpened.value = false
}

const onCategoryChanged = () => {
  form.value.savepath = maindataStore.getCategoryFromName(form.value.category)?.savePath ?? preferenceStore.preferences!.save_path
}
</script>

<template>
  <v-dialog
    v-model="isOpened"
    :class="$vuetify.display.mobile ? '' : 'w-75'"
    :fullscreen="$vuetify.display.mobile"
    :transition="openSuddenly ? 'none' : 'dialog-bottom-transition'">
    <v-card>
      <v-card-title>
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.add.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>

      <v-infinite-scroll mode="manual">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="files"
                :label="t('dialogs.add.files')"
                :show-size="vueTorrentStore.useBinarySize ? 1024 : 1000"
                accept=".torrent"
                counter
                multiple
                persistent-clear
                persistent-hint
                prepend-icon=""
                variant="outlined">
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-paperclip</v-icon>
                </template>
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(filename, index) in fileNames">
                    <v-chip v-if="index < fileOverflowDisplayLimit" class="mr-2" color="accent" label size="small">
                      {{ filename }}
                    </v-chip>
                  </template>
                  <span v-if="fileNames.length === fileOverflowDisplayLimit + 1" class="text-overline text-grey-darken-2 ml-2">
                    {{ t('dialogs.add.fileOverflow', fileNames.length - fileOverflowDisplayLimit) }}
                  </span>
                </template>
              </v-file-input>
              <v-textarea v-model="urls" :label="t('dialogs.add.links')" clearable>
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-link</v-icon>
                </template>
              </v-textarea>
              <HistoryField
                v-if="!!urls"
                v-model="cookie"
                :historyKey="HistoryKey.COOKIE"
                ref="cookieField"
                clearable
                :label="$t('dialogs.add.cookie')"
                :placeholder="$t('dialogs.add.cookiePlaceholder')">
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-cookie</v-icon>
                </template>
              </HistoryField>
              <v-text-field v-model="rename" clearable hide-details :label="$t('dialogs.add.rename')">
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-rename</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox
                v-model="tags"
                v-model:search="tagSearch"
                :hide-no-data="false"
                :items="maindataStore.tags"
                :label="t('dialogs.add.tags')"
                chips
                clearable
                hide-details
                multiple
                autocomplete="tags">
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
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox
                v-model="category"
                v-model:search="categorySearch"
                :hide-no-data="false"
                :items="categories"
                :label="$t('dialogs.add.category')"
                clearable
                hide-details
                autocomplete="categories"
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

            <v-col cols="12">
              <HistoryField
                v-model="downloadPath"
                :history-key="HistoryKey.TORRENT_PATH"
                ref="dlPathField"
                :disabled="form.autoTMM"
                :label="t('dialogs.add.downloadPath')"
                hide-details>
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-tray-arrow-down</v-icon>
                </template>
              </HistoryField>
            </v-col>

            <v-col cols="12">
              <HistoryField
                v-model="form.savepath"
                :history-key="HistoryKey.TORRENT_PATH"
                ref="savePathField"
                :disabled="form.autoTMM"
                :label="t('dialogs.add.savePath')"
                hide-details>
                <template v-slot:prepend>
                  <v-icon color="accent">mdi-content-save</v-icon>
                </template>
              </HistoryField>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.contentLayout"
                :items="contentLayoutOptions"
                :label="t('constants.contentLayout.title')"
                color="accent"
                hide-details
                rounded="xl"
                variant="solo-filled" />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.stopCondition"
                :items="stopConditionOptions"
                :label="t('constants.stopCondition.title')"
                color="accent"
                hide-details
                rounded="xl"
                variant="solo-filled" />
            </v-col>
          </v-row>

          <v-row class="mx-3">
            <v-col cols="12" md="6">
              <v-checkbox v-model="startNow" :label="t('dialogs.add.startNow')" color="accent" density="compact" hide-details />
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="form.addToTopOfQueue" :label="t('dialogs.add.addToTopOfQueue')" color="accent" density="compact" hide-details />
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="form.skip_checking" :label="t('dialogs.add.skipChecking')" color="accent" density="compact" hide-details />
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="form.autoTMM" :label="t('dialogs.add.autoTMM')" color="accent" density="compact" hide-details />
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="form.sequentialDownload" :label="t('dialogs.add.sequentialDownload')" color="accent" density="compact" hide-details />
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="form.firstLastPiecePrio" :label="t('dialogs.add.firstLastPiecePrio')" color="accent" density="compact" hide-details />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-expansion-panels>
                <v-expansion-panel color="primary" :title="$t('dialogs.add.limitCollapse')">
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="dlLimit" :label="$t('dialogs.add.dlLimit')" hide-details suffix="KiB/s">
                          <template v-slot:prepend>
                            <v-icon color="accent">mdi-download</v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="upLimit" :label="$t('dialogs.add.upLimit')" hide-details suffix="KiB/s">
                          <template v-slot:prepend>
                            <v-icon color="accent">mdi-upload</v-icon>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field v-model="ratioLimit" :hint="$t('dialogs.add.limitHint')" :label="$t('dialogs.add.ratioLimit')" type="number" />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="seedingTimeLimit"
                          :label="$t('dialogs.add.seedingTimeLimit')"
                          :hint="$t('dialogs.add.limitHint')"
                          :suffix="$t('units.minutes')"
                          type="number" />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="inactiveSeedingTimeLimit"
                          :label="$t('dialogs.add.inactiveSeedingTimeLimit')"
                          :hint="$t('dialogs.add.limitHint')"
                          :suffix="$t('units.minutes')"
                          type="number" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-text>

        <template v-slot:load-more></template>
      </v-infinite-scroll>

      <v-card-actions class="mb-2">
        <v-btn :text="$t('dialogs.add.resetForm')" color="error" variant="flat" @click="addTorrentStore.resetForm()" />
        <v-spacer />
        <v-btn :disabled="!isFormValid" :text="$t('dialogs.add.submit')" color="accent" type="submit" variant="elevated" @click="submit" />
        <v-btn :text="$t('common.close')" color="" variant="flat" @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
