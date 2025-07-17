<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'
import { toast } from 'vue3-toastify'
import AddTorrentParamsForm from './AddTorrentParamsForm.vue'
import HistoryField from '@/components/Core/HistoryField.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { HistoryKey } from '@/constants/vuetorrent'
import { useAddTorrentStore, useAppStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { AddTorrentPayload } from '@/types/qbit/payloads'

const props = withDefaults(
  defineProps<{
    guid: string
    openSuddenly?: boolean
  }>(),
  {
    openSuddenly: false,
  }
)

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const addTorrentStore = useAddTorrentStore()
const { urls, files, form, addTorrentParams } = storeToRefs(addTorrentStore)
const appStore = useAppStore()
const torrentStore = useTorrentStore()
const vueTorrentStore = useVueTorrentStore()

const fileOverflowDisplayLimit = 2

const isFormValid = computed(() => urls.value.length > 0 || files.value.length > 0)

const cookieField = ref<typeof HistoryField>()
const addTorrentParamsForm = ref<typeof AddTorrentParamsForm>()

const cookie = computed({
  get: () => form.value.cookie,
  set: value => (form.value.cookie = value || undefined),
})

const rename = computed({
  get: () => form.value.rename,
  set: value => (form.value.rename = value || undefined),
})

function submit() {
  if (!isFormValid.value) return

  const payload: AddTorrentPayload = {
    addToTopOfQueue: addTorrentParams.value.add_to_top_of_queue,
    autoTMM: addTorrentParams.value.use_auto_tmm,
    category: addTorrentParams.value.category,
    contentLayout: addTorrentParams.value.content_layout,
    cookie: form.value.cookie,
    dlLimit: addTorrentParams.value.download_limit,
    downloadPath: addTorrentParams.value.download_path,
    firstLastPiecePrio: form.value.firstLastPiecePrio,
    forced: addTorrentParams.value.forced,
    inactiveSeedingTimeLimit: addTorrentParams.value.inactive_seeding_time_limit,
    paused: addTorrentParams.value.stopped,
    stopped: addTorrentParams.value.stopped,
    ratioLimit: addTorrentParams.value.ratio_limit,
    rename: form.value.rename,
    savepath: addTorrentParams.value.save_path,
    seedingTimeLimit: addTorrentParams.value.seeding_time_limit,
    sequentialDownload: form.value.sequentialDownload,
    skip_checking: addTorrentParams.value.skip_checking,
    stopCondition: addTorrentParams.value.stop_condition,
    tags: addTorrentParams.value.tags?.join(','),
    upLimit: addTorrentParams.value.upload_limit,
    useDownloadPath: addTorrentParams.value.use_download_path,
  }

  const torrentsCount = files.value.length + urls.value.split('\n').filter(url => url.trim().length).length
  void toast
    .promise(
      torrentStore.addTorrents(files.value, urls.value, payload),
      {
        pending: t('toast.add.pending'),
        error: t('toast.add.error', torrentsCount),
        success: t('toast.add.success', torrentsCount),
      },
      {
        autoClose: 1500,
      }
    )
    .then(() => {
      cookieField.value?.saveValueToHistory()
      addTorrentParamsForm.value?.saveFields()
      addTorrentStore.resetForm()
      close()
    })
}

function close() {
  isOpened.value = false
}

onBeforeMount(() => {
  addTorrentStore.initForm()
})
</script>

<template>
  <v-dialog
    v-model="isOpened"
    :class="$vuetify.display.mobile ? '' : 'w-75'"
    :fullscreen="$vuetify.display.mobile"
    scrollable
    :transition="openSuddenly ? 'none' : 'dialog-bottom-transition'">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.add.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>

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
              <template #prepend>
                <v-icon color="accent"> mdi-paperclip </v-icon>
              </template>
              <template #selection="{ fileNames }">
                <template v-for="(filename, index) in fileNames">
                  <v-chip v-if="index < fileOverflowDisplayLimit" :key="index" class="mr-2" color="accent" label size="small">
                    {{ filename }}
                  </v-chip>
                </template>
                <span v-if="fileNames.length === fileOverflowDisplayLimit + 1" class="text-overline text-grey-darken-2 ml-2">
                  {{ t('dialogs.add.file_overflow', fileNames.length - fileOverflowDisplayLimit) }}
                </span>
              </template>
            </v-file-input>

            <v-textarea v-model="urls" :label="t('dialogs.add.links')" clearable>
              <template #prepend>
                <v-icon color="accent"> mdi-link </v-icon>
              </template>
            </v-textarea>

            <v-slide-y-transition>
              <HistoryField
                v-if="!!urls && !appStore.isFeatureAvailable('5.1.0')"
                ref="cookieField"
                v-model="cookie"
                :history-key="HistoryKey.COOKIE"
                clearable
                :label="$t('dialogs.add.cookie')"
                :placeholder="$t('dialogs.add.cookie_placeholder')">
                <template #prepend>
                  <v-icon color="accent"> mdi-cookie </v-icon>
                </template>
              </HistoryField>
            </v-slide-y-transition>

            <v-text-field v-model="rename" clearable hide-details :label="$t('dialogs.add.rename')">
              <template #prepend>
                <v-icon color="accent"> mdi-rename </v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row class="mx-3">
          <v-col cols="12" md="6">
            <v-checkbox v-model="form.sequentialDownload" :label="t('dialogs.add.sequential_download')" color="accent" density="compact" hide-details />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox v-model="form.firstLastPiecePrio" :label="t('dialogs.add.first_last_piece_prio')" color="accent" density="compact" hide-details />
          </v-col>
        </v-row>

        <AddTorrentParamsForm ref="addTorrentParamsForm" v-model="addTorrentParams" />
      </v-card-text>

      <v-card-actions class="mb-2">
        <v-btn :text="$t('dialogs.add.reset_form')" color="error" variant="flat" @click="addTorrentStore.resetForm()" />
        <v-spacer />
        <v-btn :disabled="!isFormValid" :text="$t('dialogs.add.submit')" color="accent" type="submit" variant="elevated" @click="submit" />
        <v-btn :text="$t('common.close')" color="" variant="flat" @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
