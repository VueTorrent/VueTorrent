<script lang="ts" setup>
import { useDialog } from '@/composables'
import { AppPreferences } from '@/constants/qbit'
import { useMaindataStore } from '@/stores/maindata'
import { useNavbarStore } from '@/stores/navbar'
import { usePreferenceStore } from '@/stores/preferences'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  guid: string
  openSuddenly?: boolean
}>(), {
  openSuddenly: false
})

const { isOpened } = useDialog(props.guid)
const { t } = useI18n()
const maindataStore = useMaindataStore()
const navbarStore = useNavbarStore()
const preferenceStore = usePreferenceStore()
const vueTorrentStore = useVueTorrentStore()

const fileOverflowDisplayLimit = 2

const isFormValid = computed(() => navbarStore.addTorrentDialogUrls.length > 0 || navbarStore.addTorrentDialogFiles.length > 0)
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

const submit = async () => {
  if (!isFormValid.value) return

  const params: AddTorrentPayload = {
    savepath: navbarStore.addTorrentDialogForm.savepath,
    paused: !navbarStore.addTorrentDialogForm.startNow,
    skip_checking: navbarStore.addTorrentDialogForm.skipChecking,
    autoTMM: navbarStore.addTorrentDialogForm.autoTMM,
    sequentialDownload: navbarStore.addTorrentDialogForm.sequentialDownload,
    firstLastPiecePrio: navbarStore.addTorrentDialogForm.firstLastPiecePrio,
    contentLayout: navbarStore.addTorrentDialogForm.contentLayout,
    stopCondition: navbarStore.addTorrentDialogForm.stopCondition
  }

  if (navbarStore.addTorrentDialogUrls.length > 0) params.urls = navbarStore.addTorrentDialogUrls
  if (navbarStore.addTorrentDialogForm.category && navbarStore.addTorrentDialogForm.category.name) params.category = navbarStore.addTorrentDialogForm.category.name
  if (navbarStore.addTorrentDialogForm.tags.length > 0) params.tags = navbarStore.addTorrentDialogForm.tags.join(',')

  await maindataStore.addTorrents(params, navbarStore.addTorrentDialogFiles)

  navbarStore.resetAddTorrentDialogForm()
  close()
}
const close = () => {
  isOpened.value = false
}

const onCategoryChanged = () => {
  navbarStore.addTorrentDialogForm.savepath = navbarStore.addTorrentDialogForm.category && navbarStore.addTorrentDialogForm.category.savePath ? navbarStore.addTorrentDialogForm.category.savePath : preferenceStore.preferences!.save_path
}

onBeforeMount(async () => {
  const promises = []
  if (!preferenceStore.preferences) {
    promises.push(preferenceStore.fetchPreferences())
  }
  if (maindataStore.categories.length < 1) {
    promises.push(maindataStore.fetchCategories())
  }
  if (maindataStore.tags.length < 1) {
    promises.push(maindataStore.fetchTags())
  }

  await Promise.all(promises)
})
</script>

<template>
  <v-dialog v-model="isOpened" :class="$vuetify.display.mobile ? '' : 'w-50'"
            :fullscreen="$vuetify.display.mobile" :transition="openSuddenly ? 'none' : 'dialog-bottom-transition'">
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
            <v-file-input v-model="navbarStore.addTorrentDialogFiles" :label="t('dialogs.add.files')" :show-size="vueTorrentStore.useBinarySize ? 1024 : 1000"
                          accept=".torrent" counter multiple
                          persistent-clear persistent-hint prepend-icon="" variant="outlined">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-paperclip</v-icon>
              </template>
              <template v-slot:selection="{ fileNames }">
                <template v-for="(filename, index) in fileNames">
                  <v-chip v-if="index < fileOverflowDisplayLimit" class="mr-2" color="accent" label size="small">
                    {{ filename }}
                  </v-chip>
                </template>
                <span v-if="fileNames.length == fileOverflowDisplayLimit" class="text-overline text-grey-darken-2 ml-2">
                  {{ t('dialogs.add.fileOverflow', fileNames.length - fileOverflowDisplayLimit) }}
                </span>
              </template>
            </v-file-input>
            <v-textarea v-model="navbarStore.addTorrentDialogUrls" :label="t('dialogs.add.links')" clearable>
              <template v-slot:prepend>
                <v-icon color="accent">mdi-link</v-icon>
              </template>
            </v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-combobox v-model="navbarStore.addTorrentDialogForm.tags" v-model:search="tagSearch"
                        :hide-no-data="false" :items="maindataStore.tags" :label="t('dialogs.add.tags')" chips clearable
                        multiple>
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
            <v-combobox v-model="navbarStore.addTorrentDialogForm.category" v-model:search="categorySearch"
                        :hide-no-data="false" :items="maindataStore.categories" chips clearable
                        item-title="name" label="Category" return-object @update:modelValue="onCategoryChanged">
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
            <v-text-field v-model="navbarStore.addTorrentDialogForm.savepath"
                          :disabled="navbarStore.addTorrentDialogForm.autoTMM" :label="t('dialogs.add.savePath')">
              <template v-slot:prepend>
                <v-icon color="accent">mdi-folder</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="navbarStore.addTorrentDialogForm.contentLayout" :items="contentLayoutOptions"
                      :label="t('constants.contentLayout.title')" color="accent" hide-details rounded="xl"
                      variant="solo-filled" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="navbarStore.addTorrentDialogForm.stopCondition" :items="stopConditionOptions"
                      :label="t('constants.stopCondition.title')" color="accent" hide-details rounded="xl"
                      variant="solo-filled" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-list>
              <v-list-item>
                <v-checkbox v-model="navbarStore.addTorrentDialogForm.startNow" :label="t('dialogs.add.startNow')" density="compact"
                            hide-details />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="navbarStore.addTorrentDialogForm.skipChecking" :label="t('dialogs.add.skipChecking')" density="compact"
                            hide-details />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="navbarStore.addTorrentDialogForm.autoTMM" :label="t('dialogs.add.autoTMM')" density="compact"
                            hide-details />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="navbarStore.addTorrentDialogForm.sequentialDownload" :label="t('dialogs.add.sequentialDownload')" density="compact"
                            hide-details />
              </v-list-item>
              <v-list-item>
                <v-checkbox v-model="navbarStore.addTorrentDialogForm.firstLastPiecePrio" :label="t('dialogs.add.firstLastPiecePrio')" density="compact"
                            hide-details />
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn :disabled="!isFormValid" color="accent" variant="elevated" :text="$t('dialogs.add.submit')" @click="submit" />
        <v-btn color="error" variant="flat" :text="$t('common.close')" @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
