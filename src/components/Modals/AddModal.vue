<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n';
import { useModal } from '@/composables/modal';
import { usePreferences } from '@/composables/api/preferences';
import { useCategories, useTags, useTorrents } from '@/composables/api/torrents';
import { useValidator } from '@/composables/validator';
import { DEFAULT_DEST_FOLDER_PATH } from '@/constants';
import { 
  mdiClose, 
  mdiCloudUpload, 
  mdiPaperclip,
  mdiLink,
  mdiTag,
  mdiLabel,
  mdiFolder,
} from '@mdi/js'

import type { AddTorrentsPayload } from '@/types/vuetorrent/payloads/AddTorrentsPayload';
import { AppPreferences } from '@/enums/qbit';

const props = defineProps<{
  guid: string
}>()

const { dialog } = useModal(props.guid)
const display = useDisplay()
const { torrentFilesRule } = useValidator()
const { categories: availableCategories } = useCategories()
const { tags: availableTags } = useTags()
const { data: preferences, isLoading: isPreferencesLoading } = usePreferences()
const { t } = useI18n()
const { addTorrents } = useTorrents()

const addTorrentButton = ref<HTMLButtonElement>()
const form = ref<HTMLFormElement>()

const isFormValid = ref(false)
const isDropAreaVisible = ref(false)

const params = reactive<AddTorrentsPayload>({
  urls: '',
  files: [],
  tags: [],
  category: undefined,
  directory: DEFAULT_DEST_FOLDER_PATH,
  start: false,
  autoTMM: false,
  contentLayout: AppPreferences.ContentLayout.ORIGINAL,
  stopCondition: AppPreferences.StopCondition.NONE,
  skipHashChecking: false,
  sequentialDownload: false,
  firstLastPiecePriority: false,
})

const contentLayoutOptions = ref([
  { text: t('enums.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
  { text: t('enums.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
  { text: t('enums.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
])

const stopConditionOptions = ref([
  { text: t('enums.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
  { text: t('enums.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
  { text: t('enums.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED }
])

// Destination folder path depends first on the settings then category
const destinationFolderPath = computed(() => {
  return params.category && params.category.savePath 
    ? params.category.savePath
    : preferences.value
    ? preferences.value.save_path
    : DEFAULT_DEST_FOLDER_PATH
})

function setPreferences() {
  params.start = !preferences.value?.start_paused_enabled
  params.autoTMM = !!preferences.value?.auto_tmm_enabled
  params.directory = destinationFolderPath.value
  params.contentLayout = preferences.value?.torrent_content_layout
  params.stopCondition = preferences.value?.torrent_stop_condition
}

function onDropFile(event: DragEvent) {
  isDropAreaVisible.value = false
  if (!event.dataTransfer || params.urls.length > 0) {
    return
  }
  params.files.push(...Array.from(event.dataTransfer.files))
}

function onAddTorrent() {
  addTorrents(params)
  dialog.value = false
}

watch(
  () => isPreferencesLoading.value, 
  (value) => { if (!value) setPreferences() }
)

</script>

<template>
  <v-dialog
    v-model="dialog"
    :content-class="display.xs.value ? 'rounded-0' : 'rounded-form'"
    max-width="550px"
    :fullscreen="display.xs.value"
    persistent
  >

    <!-- Drop file area outside the content of the modal -->
    <div
      class="noselect"
      style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: -1; background-color: transparent;"
      @drop.prevent="onDropFile"
      @dragover.prevent="isDropAreaVisible = true"
      @dragend.prevent="isDropAreaVisible = false"
      @dragleave.prevent="isDropAreaVisible = false"
    />

    <v-card
      class="pa-8"
      @drop.prevent="onDropFile"
      @dragover.prevent="isDropAreaVisible = true" 
      @dragend.prevent="isDropAreaVisible = false"
    >
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <v-toolbar flat dense class="transparent pb-4">
            <v-toolbar-title>
              <h2 class="text-center">{{ $t('modals.add.title') }}</h2>
            </v-toolbar-title>
            <v-btn :icon="mdiClose" @click="dialog = false">
          </v-btn>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="isFormValid">

            <!-- Select or drag'n drop your torrent files -->
            <v-file-input
              v-if="!params.urls.length"
              v-model="params.files"
              color="deep-purple accent-4"
              counter
              :label="$t('modals.add.selectFiles')"
              multiple
              :prepend-icon="mdiPaperclip"
              :rules="[ torrentFilesRule ]"
              variant="outlined"
              :show-size="1000"
              chips
            />

            <!-- Or your magnet links -->
            <v-textarea
              v-if="!params.files.length"
              v-model="params.urls"
              color="deep-purple accent-4"
              :label="$t('url')"
              :prepend-icon="mdiLink"
              rows="1"
              required
              :autofocus="!display.xs.value"
              auto-grow
              variant="underlined"
              clearable
              :hint="$t('modals.add.urlHint')"
            />

            <!-- Add Tags -->
            <v-combobox 
              v-model="params.tags"
              color="deep-purple accent-4"
              variant="underlined"
              :items="availableTags" 
              clearable 
              :label="$t('tags')" 
              :prepend-icon="mdiTag" 
              multiple
              chips
            />

            <!-- Add Category -->
            <v-combobox
              v-model="params.category"
              color="deep-purple accent-4"
              variant="underlined" 
              :items="availableCategories" 
              clearable
              item-title="name"
              :label="$t('category')" 
              item-text="name" 
              :prepend-icon="mdiLabel" 
            />

            <!-- Define Download Directory path -->
            <v-text-field
              v-model="params.directory"
              :disabled="params.autoTMM"
              variant="underlined" 
              color="deep-purple accent-4"
              :label="$t('modals.add.downloadDirectory')"
              :prepend-icon="mdiFolder"
            />

            <v-row no-gutters class="flex-gap my-4">
              <v-col>
                <div class="d-flex flex-column align-center">
                  <p class="subtitle-1 mb-1 text-center pb-4">{{ $t('enums.contentLayout.title') }}</p>
                  <v-select 
                    v-model="params.contentLayout"
                    color="deep-purple accent-4"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    flat
                    hide-details 
                    background-color="background" 
                    class="rounded-xl" 
                    :items="contentLayoutOptions" 
                  />
                </div>
              </v-col>
              <v-col>
                <div class="d-flex flex-column align-center">
                  <p class="subtitle-1 mb-1 text-center pb-4">{{ $t('enums.stopCondition.title') }}</p>
                  <v-select 
                    v-model="params.stopCondition"
                    color="deep-purple accent-4"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    flat
                    hide-details 
                    background-color="background" 
                    class="rounded-xl" 
                    :items="stopConditionOptions" 
                  />
                </div>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-flex xs12 sm6>
                <v-checkbox 
                  color="deep-purple accent-4" 
                  v-model="params.start" 
                  :label="$t('modals.add.starttorrent')" 
                  hide-details
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-checkbox 
                  color="deep-purple accent-4" 
                  v-model="params.skipHashChecking" 
                  :label="$t('modals.add.skipHashCheck')"
                  hide-details
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-checkbox
                  color="deep-purple accent-4" 
                  v-model="params.autoTMM" 
                  :label="$t('modals.add.automaticTorrentManagement')"
                  hide-details 
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-checkbox 
                  color="deep-purple accent-4"
                  v-model="params.sequentialDownload" 
                  :label="$t('rightClick.advanced.sequentialDownload')"
                  hide-details 
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-checkbox 
                  color="deep-purple accent-4" 
                  v-model="params.firstLastPiecePriority"
                  :label="$t('rightClick.advanced.firstLastPriority')" 
                  hide-details 
                />
              </v-flex>
            </v-row>

          </v-form>
        </v-card-text>

        <v-spacer />

        <v-card-actions class="justify-center">
          <v-btn
            color="deep-purple accent-4" 
            ref="addTorrentButton" 
            :disabled="!isFormValid" 
            class="accent white--text mx-0 mt-3" 
            @click="onAddTorrent"
            variant="flat"
          >
            Add Torrent
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

    <!-- Displayed when a dragged file hover the drop file area -->
    <div
      v-show="isDropAreaVisible"
      class="drop-file-area drop-file-area-alert noselect"
    >
      <div class="h-100 d-flex flex-column flex-col justify-center align-center white--text">
        <v-icon :icon="mdiCloudUpload" size="40" class="white--text"></v-icon>
        <h3>{{ $t('modals.add.dropHereForAdd') }}</h3>
      </div>
    </div>

  </v-dialog>
</template>

<style lang="scss" scoped>
.drop-file-area {
  pointer-events: none;

  &-alert {
    position: fixed; 
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%; 
    text-align: center; 
    background-color: rgb(0, 0, 0, 0.5);
  }
}

.flex-gap {
  column-gap: 8px;
}

:deep {
  .v-overlay__scrim {
    z-index: -2;
  }
  .v-overlay__content {
    contain: inherit;
  }
}

</style>