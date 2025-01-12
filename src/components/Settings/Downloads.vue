<script setup lang="ts">
import { AppPreferences } from '@/constants/qbit'
import { ScanDirs, ScanDirsEnum } from '@/constants/qbit/AppPreferences'
import { useAppStore, usePreferenceStore } from '@/stores'
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue'
import { useI18nUtils } from '@/composables'
import { toast } from 'vue3-toastify'

type MonitoredFolder = { monitoredFolderPath: string; saveType: ScanDirs | -1; otherPath: string }

const { t } = useI18nUtils()
const appStore = useAppStore()
const preferenceStore = usePreferenceStore()

const autoDeleteModeOptions = [
  { title: t('constants.auto_delete_mode.never'), value: AppPreferences.AutoDeleteMode.NEVER },
  { title: t('constants.auto_delete_mode.if_added'), value: AppPreferences.AutoDeleteMode.IF_ADDED },
  { title: t('constants.auto_delete_mode.always'), value: AppPreferences.AutoDeleteMode.ALWAYS }
]

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

const defaultTMMOptions = [
  { title: t('settings.downloads.saveManagement.defaultTMMOptions.manual'), value: false },
  { title: t('settings.downloads.saveManagement.defaultTMMOptions.automatic'), value: true }
]

const paramChangedTMMOptions = [
  { title: t('settings.downloads.saveManagement.paramChangedTMMOptions.relocateTorrent'), value: true },
  { title: t('settings.downloads.saveManagement.paramChangedTMMOptions.switchToManual'), value: false }
]

const isExportDirEnabled = ref(false)
const isExportDirFinEnabled = ref(false)
const showPassword = ref(false)
const monitoredFoldersDialog = ref(false)
const monitoredFoldersDialogDelete = ref(false)
const monitoredFoldersEditedIndex = ref(-1)
const monitoredFoldersEditedItem = ref({
  monitoredFolderPath: '',
  saveType: ScanDirsEnum.MONITORED_FOLDER,
  otherPath: ''
} as MonitoredFolder)
const monitoredFoldersDefaultItem = ref({
  monitoredFolderPath: '',
  saveType: ScanDirsEnum.MONITORED_FOLDER,
  otherPath: ''
} as MonitoredFolder)
const monitoredFoldersHeaders = ref([
  { title: t('settings.downloads.monitoredFolders.monitoredFolderPath'), key: 'monitoredFolderPath', sortable: false },
  { title: t('settings.downloads.monitoredFolders.saveType'), key: 'saveType', sortable: false },
  { title: t('settings.downloads.monitoredFolders.otherPath'), key: 'otherPath', sortable: false },
  { title: t('settings.downloads.monitoredFolders.actions'), key: 'actions', sortable: false }
])
const monitoredFoldersData = ref<MonitoredFolder[]>([])
const monitoredFoldersMonitorTypeOptions = ref([
  { title: t('constants.monitoredFolderSaveLocation.monitoredFolder'), value: ScanDirsEnum.MONITORED_FOLDER },
  { title: t('constants.monitoredFolderSaveLocation.defaultSavePath'), value: ScanDirsEnum.DEFAULT_SAVE_PATH },
  { title: t('constants.monitoredFolderSaveLocation.other'), value: -1 }
])

const addStoppedEnabled = computed({
  get: () => preferenceStore.preferences!.add_stopped_enabled ?? preferenceStore.preferences!.start_paused_enabled,
  set(v) {
    if (!preferenceStore.preferences) return
    preferenceStore.preferences.add_stopped_enabled = v
    preferenceStore.preferences.start_paused_enabled = v
  }
})

onBeforeMount(async () => {
  isExportDirEnabled.value = preferenceStore.preferences!.export_dir.length > 0
  isExportDirFinEnabled.value = preferenceStore.preferences!.export_dir_fin.length > 0

  Object.entries(preferenceStore.preferences!.scan_dirs).forEach(entry => {
    const [k, v] = entry

    let saveType, otherPath
    if (typeof v === 'string') {
      saveType = -1
      otherPath = v
    } else {
      saveType = v
      otherPath = ''
    }
    monitoredFoldersData.value.push({ monitoredFolderPath: k, saveType, otherPath })
  })
})

watch(
  () => isExportDirEnabled,
  newValue => {
    if (!newValue) {
      preferenceStore.preferences!.export_dir = ''
    }
  }
)
watch(
  () => isExportDirFinEnabled,
  newValue => {
    if (!newValue) {
      preferenceStore.preferences!.export_dir_fin = ''
    }
  }
)

const editItem = (item: MonitoredFolder) => {
  monitoredFoldersEditedIndex.value = monitoredFoldersData.value.indexOf(item)
  monitoredFoldersEditedItem.value = { ...item }
  monitoredFoldersDialog.value = true
}
const deleteItem = (item: MonitoredFolder) => {
  monitoredFoldersEditedIndex.value = monitoredFoldersData.value.indexOf(item)
  monitoredFoldersEditedItem.value = { ...item }
  monitoredFoldersDialogDelete.value = true
}
const deleteItemConfirm = () => {
  monitoredFoldersData.value.splice(monitoredFoldersEditedIndex.value, 1)
  convertSettings()
  closeDeleteDialog()
}
const save = () => {
  if (monitoredFoldersEditedIndex.value > -1) {
    Object.assign(monitoredFoldersData.value[monitoredFoldersEditedIndex.value], monitoredFoldersEditedItem.value)
  } else {
    monitoredFoldersData.value.push(monitoredFoldersEditedItem.value)
  }
  convertSettings()
  closeDialog()
}
const convertSettings = () => {
  const scan_dirs = {} as Record<string, AppPreferences.ScanDirs>
  monitoredFoldersData.value.forEach(folder => {
    scan_dirs[folder.monitoredFolderPath] = folder.saveType === -1 ? folder.otherPath : folder.saveType
  })
  preferenceStore.preferences!.scan_dirs = scan_dirs
}
const closeDialog = async () => {
  monitoredFoldersDialog.value = false
  await nextTick()
  monitoredFoldersEditedItem.value = { ...monitoredFoldersDefaultItem.value }
  monitoredFoldersEditedIndex.value = -1
}
const closeDeleteDialog = async () => {
  monitoredFoldersDialogDelete.value = false
  await nextTick()
  monitoredFoldersEditedItem.value = { ...monitoredFoldersDefaultItem.value }
  monitoredFoldersEditedIndex.value = -1
}

async function sendTestEmail() {
  appStore
    .sendTestEmail()
    .then(() => toast.success(t('settings.downloads.mailNotification.test.success')))
    .catch(err => toast.error(t('settings.downloads.mailNotification.test.error', { message: err.message })))
}
</script>

<template>
  <v-list>
    <v-list-subheader>{{ t('settings.downloads.whenAddTorrent.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-select v-model="preferenceStore.preferences!.torrent_content_layout" hide-details :items="contentLayoutOptions" :label="t('constants.contentLayout.title')" />

      <v-checkbox v-model="preferenceStore.preferences!.add_to_top_of_queue" hide-details :label="t('settings.downloads.whenAddTorrent.addToTopOfQueue')" />

      <v-checkbox v-model="preferenceStore.preferences!.merge_trackers" hide-details :label="t('settings.downloads.whenAddTorrent.mergeTrackers')" />

      <v-checkbox v-model="addStoppedEnabled" hide-details :label="t('settings.downloads.whenAddTorrent.doNotAutoStart')" />

      <v-select v-model="preferenceStore.preferences!.torrent_stop_condition" :items="stopConditionOptions" :label="t('constants.stopCondition.title')" />

      <v-select v-model="preferenceStore.preferences!.auto_delete_mode" :items="autoDeleteModeOptions" :label="t('settings.downloads.whenAddTorrent.autoDeleteMode')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.preallocate_all" hide-details :label="t('settings.downloads.publicSettings.preAllocateDisk')" />

      <v-checkbox v-model="preferenceStore.preferences!.incomplete_files_ext" hide-details :label="t('settings.downloads.publicSettings.appendQBExtension')" />

      <v-checkbox
        v-if="appStore.usesQbit5"
        v-model="preferenceStore.preferences!.use_unwanted_folder"
        hide-details
        :label="t('settings.downloads.publicSettings.useUnwantedFolder')" />
    </v-list-item>

    <v-divider />

    <v-list-subheader>{{ t('settings.downloads.saveManagement.subheader') }}</v-list-subheader>
    <v-list-item>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="preferenceStore.preferences!.auto_tmm_enabled"
            :items="defaultTMMOptions"
            hide-details
            :label="t('settings.downloads.saveManagement.autoTMMEnabled')" />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="preferenceStore.preferences!.torrent_changed_tmm_enabled"
            :items="paramChangedTMMOptions"
            hide-details
            :label="t('settings.downloads.saveManagement.torrentChangedTMM')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="preferenceStore.preferences!.save_path_changed_tmm_enabled"
            :items="paramChangedTMMOptions"
            hide-details
            :label="t('settings.downloads.saveManagement.savePathChangedTMM')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="preferenceStore.preferences!.category_changed_tmm_enabled"
            :items="paramChangedTMMOptions"
            hide-details
            :label="t('settings.downloads.saveManagement.categoryChangedTMM')" />
        </v-col>

        <v-col cols="12" v-if="appStore.usesQbit5" class="py-0">
          <v-checkbox
            v-model="preferenceStore.preferences!.use_category_paths_in_manual_mode"
            hide-details
            :label="t('settings.downloads.saveManagement.useCategoryPathInManualMode')" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="preferenceStore.preferences!.save_path" hide-details :label="t('settings.downloads.saveManagement.defaultSavePath')" />
        </v-col>

        <v-col cols="12">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="preferenceStore.preferences!.temp_path_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.temp_path"
              :disabled="!preferenceStore.preferences!.temp_path_enabled"
              hide-details
              :label="t('settings.downloads.saveManagement.keepIncomplete')" />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="isExportDirEnabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.export_dir"
              :disabled="!isExportDirEnabled"
              hide-details
              :label="t('settings.downloads.saveManagement.exportDir')" />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="isExportDirFinEnabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.export_dir_fin"
              :disabled="!isExportDirFinEnabled"
              hide-details
              :label="t('settings.downloads.saveManagement.exportDirFinished')" />
          </div>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />

    <v-data-table :mobile="null" class="my-4" :headers="monitoredFoldersHeaders" :items="monitoredFoldersData">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ t('settings.downloads.monitoredFolders.subheader') }}</v-toolbar-title>
          <v-divider inset vertical />
          <v-spacer />
          <v-dialog v-model="monitoredFoldersDialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" variant="flat" dark class="mb-2" v-bind="props">
                {{ t('settings.downloads.monitoredFolders.newItem') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ t('settings.downloads.monitoredFolders.editItem') }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="monitoredFoldersEditedItem.monitoredFolderPath" :label="t('settings.downloads.monitoredFolders.monitoredFolderPath')" />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="monitoredFoldersEditedItem.saveType"
                        hide-details
                        :items="monitoredFoldersMonitorTypeOptions"
                        :label="t('settings.downloads.monitoredFolders.saveType')" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        :disabled="monitoredFoldersEditedItem.saveType !== -1"
                        v-model="monitoredFoldersEditedItem.otherPath"
                        :label="t('settings.downloads.monitoredFolders.otherPath')" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="accent darken-1" @click="closeDialog">{{ t('common.cancel') }}</v-btn>
                <v-btn color="accent darken-1" @click="save">{{ t('common.save') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="monitoredFoldersDialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">{{ t('settings.downloads.monitoredFolders.confirmDelete') }}</v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" @click="closeDeleteDialog">{{ t('common.cancel') }}</v-btn>
                <v-btn color="blue darken-1" @click="deleteItemConfirm">{{ t('common.ok') }}</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.saveType`]="{ item }">
        {{ monitoredFoldersMonitorTypeOptions.find(value => value.value === item.saveType)?.title }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        {{ t('settings.downloads.monitoredFolders.noData') }}
      </template>
    </v-data-table>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.excluded_file_names_enabled" hide-details :label="t('settings.downloads.excludedFileNames.label')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        v-model="preferenceStore.preferences!.excluded_file_names"
        :disabled="!preferenceStore.preferences!.excluded_file_names_enabled"
        clearable
        auto-grow
        persistent-hint
        :hint="t('settings.downloads.excludedFileNames.hint')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.mail_notification_enabled" hide-details :label="t('settings.downloads.mailNotification.enabled')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.mail_notification_sender"
        :disabled="!preferenceStore.preferences!.mail_notification_enabled"
        hide-details
        :label="t('settings.downloads.mailNotification.from')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.mail_notification_email"
        :disabled="!preferenceStore.preferences!.mail_notification_enabled"
        hide-details
        :label="t('settings.downloads.mailNotification.to')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.mail_notification_smtp"
        :disabled="!preferenceStore.preferences!.mail_notification_enabled"
        hide-details
        :label="t('settings.downloads.mailNotification.smtpServer')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.mail_notification_ssl_enabled"
        :disabled="!preferenceStore.preferences!.mail_notification_enabled"
        hide-details
        :label="t('settings.downloads.mailNotification.sslEnabled')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.mail_notification_auth_enabled"
        :disabled="!preferenceStore.preferences!.mail_notification_enabled"
        hide-details
        :label="t('settings.downloads.mailNotification.authEnabled')" />

      <v-row>
        <v-col>
          <v-text-field
            v-model="preferenceStore.preferences!.mail_notification_username"
            :disabled="!preferenceStore.preferences!.mail_notification_enabled || !preferenceStore.preferences!.mail_notification_auth_enabled"
            hide-details
            :label="t('settings.downloads.mailNotification.username')" />
          <v-text-field
            v-model="preferenceStore.preferences!.mail_notification_password"
            :disabled="!preferenceStore.preferences!.mail_notification_enabled || !preferenceStore.preferences!.mail_notification_auth_enabled"
            hide-details
            :label="t('settings.downloads.mailNotification.password')"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="
              !preferenceStore.preferences!.mail_notification_enabled || !preferenceStore.preferences!.mail_notification_auth_enabled
                ? ''
                : showPassword
                  ? 'mdi-eye'
                  : 'mdi-eye-off'
            "
            @click:append="showPassword = !showPassword" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item v-if="appStore.usesQbit5">
      <v-btn color="primary" @click="sendTestEmail">{{ t('settings.downloads.mailNotification.test.label') }}</v-btn>
    </v-list-item>

    <v-divider class="mt-3" />

    <v-list-subheader>{{ t('settings.downloads.runExternalProgram.subheader') }}</v-list-subheader>
    <v-list-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-checkbox v-model="preferenceStore.preferences!.autorun_on_torrent_added_enabled" hide-details :label="t('settings.downloads.runExternalProgram.onAddedEnabled')" />
          <v-text-field
            v-model="preferenceStore.preferences!.autorun_on_torrent_added_program"
            :disabled="!preferenceStore.preferences!.autorun_on_torrent_added_enabled"
            hide-details
            :label="t('settings.downloads.runExternalProgram.onAddedLabel')" />
          <v-checkbox v-model="preferenceStore.preferences!.autorun_enabled" hide-details :label="t('settings.downloads.runExternalProgram.onFinishedEnabled')" />
          <v-text-field
            v-model="preferenceStore.preferences!.autorun_program"
            :disabled="!preferenceStore.preferences!.autorun_enabled"
            hide-details
            :label="t('settings.downloads.runExternalProgram.onFinishedLabel')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="2" variant="outlined">
            <v-card-title>{{ t('settings.downloads.runExternalProgram.supportParamTitle') }}</v-card-title>
            <v-card-text>
              <ul class="no-bullet">
                <li>{{ t('settings.downloads.runExternalProgram.supportParamN') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamL') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamG') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamF') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamR') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamD') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamC') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamZ') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamT') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamI') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamJ') }}</li>
                <li>{{ t('settings.downloads.runExternalProgram.supportParamK') }}</li>
              </ul>
              <h5>{{ t('settings.downloads.runExternalProgram.tip') }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
