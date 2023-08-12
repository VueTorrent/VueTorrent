<script setup lang="ts">
import { AppPreferences } from '@/constants/qbit'
import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences.ts'
import { useMaindataStore, usePreferenceStore, useVueTorrentStore } from '@/stores'
import { Category } from '@/types/qbit/models'
import { onBeforeMount, reactive, ref, watch } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },

  initialMagnet: {
    type: String,
    required: false
  },
  initialFiles: {
    type: File,
    required: false
  },
  openSuddenly: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
const vueTorrentStore = useVueTorrentStore()

const dialogVisible = ref(false)
const isFormValid = ref(true)
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
  tags: [] as string[],
  files: [] as File[],
  urls: '' as string
})
const tagSearch = ref('')
const categorySearch = ref('')

const contentLayoutOptions = ref([
  { title: 'Original', value: AppPreferences.ContentLayout.ORIGINAL },
  { title: 'Create subfolder', value: AppPreferences.ContentLayout.SUBFOLDER },
  { title: 'Remove subfolder', value: AppPreferences.ContentLayout.NO_SUBFOLDER }
])
const stopConditionOptions = ref([
  { title: 'None', value: AppPreferences.StopCondition.NONE },
  { title: 'Metadata received', value: AppPreferences.StopCondition.METADATA_RECEIVED },
  { title: 'Files checked', value: AppPreferences.StopCondition.FILES_CHECKED }
])

const submit = () => {
  if (!isFormValid.value) return
}
const close = () => {
  dialogVisible.value = false
}

const onCategoryChanged = () => {
  formData.savepath = (formData.category && formData.category.savePath)
    ? formData.category.savePath
    : preferenceStore.preferences!.save_path
}

onBeforeMount(async () => {
  if (!preferenceStore.preferences) {
    await preferenceStore.fetchPreferences()
    formData.autoTMM = preferenceStore.preferences!.auto_tmm_enabled
    formData.startNow = !preferenceStore.preferences!.start_paused_enabled
    formData.contentLayout = preferenceStore.preferences!.torrent_content_layout
    formData.stopCondition = preferenceStore.preferences!.torrent_stop_condition
    formData.savepath = preferenceStore.preferences!.save_path
  }
  if (!maindataStore.categories) {
    await maindataStore.fetchCategories()
  }
  if (!maindataStore.tags) {
    await maindataStore.fetchTags()
  }
})

watch(() => dialogVisible.value, (value) => emit('update:modelValue', value))
</script>

<template>
  <v-dialog v-model="dialogVisible"
            activator="parent"
            max-width="800"
            persistent>
    <v-card>
      <v-card-title>
        <v-toolbar color="transparent">
          <v-toolbar-title>Add Torrents</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid" @submit.prevent="submit">
          <v-row>
            <v-col>
              <v-file-input v-show="formData.urls.length === 0"
                            v-model="formData.files"
                            accept=".torrent"
                            counter
                            :show-size="vueTorrentStore.useBinarySize ? 1024 : 1000"
                            multiple
                            persistent-clear
                            persistent-hint
                            variant="outlined"
                            label="Select files">
                <template v-slot:selection="{ fileNames }">
                  <span v-for="(fileName, index) in fileNames"
                        :key="fileName">
                    <v-chip v-if="index < 2" color="accent">{{ fileName }}</v-chip>
                    <span v-else-if="index >= 2" class="text-overline text-grey-darken-2 ml-2">
                      +{{ fileNames.length - 2 }} more
                    </span>
                  </span>
                </template>
              </v-file-input>
              <v-textarea v-show="formData.files.length === 0"
                          v-model="formData.urls"
                          prepend-icon="mdi-link"
                          label="Links (magnet, http, file, ...)" />
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
                          prepend-icon="mdi-tag"
                          label="Tags">
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title v-if="tagSearch?.length > 0">
                      No tags matching '{{ tagSearch }}'. Press Enter to create it.
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      No tags yet. Type a name to create one.
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
                          prepend-icon="mdi-label"
                          label="Category"
                          @input="onCategoryChanged">
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title v-if="categorySearch?.length > 0">
                      No categories matching '{{ categorySearch }}'. It will be created automatically.
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      No categories yet. Type a name to create one.
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
                            prepend-icon="mdi-folder"
                            label="Save Path" />
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
                        label="Torrent Content Layout" />
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
                        label="Torrent Stop Condition" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-list>
                <v-list-item>
                  <v-checkbox v-model="formData.startNow"
                              density="compact"
                              hide-details
                              label="Start torrent immediately" />
                </v-list-item>
                <v-list-item>
                  <v-checkbox v-model="formData.skipChecking"
                              density="compact"
                              hide-details
                              label="Skip hash checking" />
                </v-list-item>
                <v-list-item>
                  <v-checkbox v-model="formData.autoTMM"
                              density="compact"
                              hide-details
                              label="Automatic Torrent Management" />
                </v-list-item>
                <v-list-item>
                  <v-checkbox v-model="formData.sequentialDownload"
                              density="compact"
                              hide-details
                              label="Sequential download" />
                </v-list-item>
                <v-list-item>
                  <v-checkbox v-model="formData.firstLastPiecePrio"
                              density="compact"
                              hide-details
                              label="Prioritize first and last pieces" />
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="!isFormValid"
               color="accent"
               variant="flat"
               text="Submit"
               @click="submit" />
        <v-btn color="error"
               variant="flat"
               text="Cancel"
               @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>