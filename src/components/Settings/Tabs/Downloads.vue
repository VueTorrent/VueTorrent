<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.downloads.whenAddTorrent.subheader') }}</v-subheader>
    <v-list-item>
      <v-select v-model="settings.torrent_content_layout" height="1" flat dense hide-details outlined :label="$t('enums.contentLayout.title')" :items="contentLayoutOptions" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.start_paused_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.whenAddTorrent.doNotAutoStart')" />
    </v-list-item>

    <v-list-item>
      <v-select v-model="settings.torrent_stop_condition" height="1" flat dense hide-details outlined :label="$t('enums.stopCondition.title')" :items="stopConditionOptions" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.auto_delete_mode" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.whenAddTorrent.autoDeleteMode')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.preallocate_all" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.publicSettings.preAllocateDisk')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.incomplete_files_ext" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.publicSettings.appendQBExtension')" />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.downloads.saveManagement.subheader') }}</v-subheader>

    <v-list-item>
      <v-select
        class="mb-5"
        v-model="settings.auto_tmm_enabled"
        height="1"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.saveManagement.autoTMMEnabled')"
        :items="defaultTMMOptions"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        class="mb-5"
        v-model="settings.torrent_changed_tmm_enabled"
        height="1"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.saveManagement.torrentChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>
    <v-list-item>
      <v-select
        class="mb-5"
        v-model="settings.save_path_changed_tmm_enabled"
        height="1"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.saveManagement.savePathChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>
    <v-list-item>
      <v-select
        class="mb-5"
        v-model="settings.category_changed_tmm_enabled"
        height="1"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.saveManagement.categoryChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.save_path" dense hide-details outlined :label="$t('modals.settings.downloads.saveManagement.defaultSavePath')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.temp_path_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.saveManagement.keepIncompleteIn')" />
      <v-text-field :disabled="!settings.temp_path_enabled" v-model="settings.temp_path" class="ms-2" dense hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="export_dir_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.saveManagement.exportDir')" />
      <v-text-field :disabled="!export_dir_enabled" v-model="settings.export_dir" class="ms-2" dense hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="export_dir_fin_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.saveManagement.exportDirFinished')" />
      <v-text-field :disabled="!export_dir_fin_enabled" v-model="settings.export_dir_fin" class="ms-2" dense hide-details />
    </v-list-item>

    <v-divider />

    <v-data-table class="mt-5" :headers="monitoredFoldersHeaders" :items="monitoredFoldersData">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('modals.settings.downloads.monitoredFolders.subheader') }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer></v-spacer>
          <v-dialog v-model="monitoredFoldersDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">{{ $t('modals.settings.downloads.monitoredFolders.newItem') }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h5>{{ $t('modals.settings.downloads.monitoredFolders.editItem') }}</h5>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="monitoredFoldersEditedItem.monitoredFolderPath" :label="$t('modals.settings.downloads.monitoredFolders.monitoredFolderPath')" />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="monitoredFoldersEditedItem.saveType"
                        height="1"
                        flat
                        dense
                        hide-details
                        outlined
                        :items="monitoredFoldersMonitorTypeOptions"
                        :label="$t('modals.settings.downloads.monitoredFolders.saveType')"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        :disabled="monitoredFoldersEditedItem.saveType !== -1"
                        v-model="monitoredFoldersEditedItem.otherPath"
                        :label="$t('modals.settings.downloads.monitoredFolders.otherPath')"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="accent darken-1" text @click="close">{{ $t('cancel') }}</v-btn>
                <v-btn color="accent darken-1" text @click="save">{{ $t('save') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="monitoredFoldersDialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-break">{{ $t('modals.settings.downloads.monitoredFolders.confirmDelete') }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">{{ $t('cancel') }}</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t('ok') }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.saveType="{ item }">
        {{ monitoredFoldersMonitorTypeOptions.filter(value => value.value === item.saveType)[0].text }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">{{ mdiPencil }}</v-icon>
        <v-icon small @click="deleteItem(item)">{{ mdiDelete }}</v-icon>
      </template>
      <template v-slot:no-data>
        {{ $t('modals.settings.downloads.monitoredFolders.noData') }}
      </template>
    </v-data-table>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.excluded_file_names_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.excludedFileNames.label')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        :disabled="!settings.excluded_file_names_enabled"
        v-model="settings.excluded_file_names"
        outlined
        required
        auto-grow
        clearable
        persistent-hint
        :hint="$t('modals.settings.downloads.excludedFileNames.hint')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.mail_notification_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.mailNotification.enabled')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_sender"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.mailNotification.from')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_email"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.mailNotification.to')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_smtp"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.downloads.mailNotification.smtpServer')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_ssl_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.downloads.mailNotification.sslEnabled')"
      />
    </v-list-item>

    <v-list-item class="mb-5">
      <v-checkbox
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_auth_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.downloads.mailNotification.authEnabled')"
      />
      <v-row class="ms-6">
        <v-col>
          <v-text-field
            :disabled="!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled"
            v-model="settings.mail_notification_username"
            dense
            hide-details
            class="mb-5"
            :label="$t('modals.settings.downloads.mailNotification.username')"
          />
          <v-text-field
            :disabled="!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled"
            v-model="settings.mail_notification_password"
            dense
            hide-details
            :label="$t('modals.settings.downloads.mailNotification.password')"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled ? '' : showPassword ? mdiEye : mdiEyeOff"
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.downloads.runExternalProgram.subheader') }}</v-subheader>

    <v-row>
      <v-col cols="12" md="6">
        <v-list-item>
          <v-checkbox
            v-model="settings.autorun_on_torrent_added_enabled"
            hide-details
            class="ma-0 pa-0"
            :label="$t('modals.settings.downloads.runExternalProgram.onAddedEnabled')"
          />
        </v-list-item>
        <v-list-item>
          <v-text-field
            :disabled="!settings.autorun_on_torrent_added_enabled"
            v-model="settings.autorun_on_torrent_added_program"
            class="mb-2"
            outlined
            dense
            :label="$t('modals.settings.downloads.runExternalProgram.onAddedLabel')"
            hide-details
          />
        </v-list-item>
        <v-list-item>
          <v-checkbox v-model="settings.autorun_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.downloads.runExternalProgram.onFinishedEnabled')" />
        </v-list-item>
        <v-list-item>
          <v-text-field
            :disabled="!settings.autorun_enabled"
            v-model="settings.autorun_program"
            class="mb-2"
            outlined
            dense
            :label="$t('modals.settings.downloads.runExternalProgram.onFinishedLabel')"
            hide-details
          />
        </v-list-item>
      </v-col>

      <v-col cols="12" md="6" class="pt-0">
        <v-card flat color="grey--text selected">
          <v-card-text>
            <h5>
              {{ $t('modals.settings.downloads.runExternalProgram.supportParamTitle') }}
            </h5>
            <ul>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamN') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamL') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamG') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamF') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamR') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamD') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamC') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamZ') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamT') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamI') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamJ') }}
              </li>
              <li>
                {{ $t('modals.settings.downloads.runExternalProgram.supportParamK') }}
              </li>
            </ul>
            <h5>{{ $t('modals.settings.downloads.runExternalProgram.tip') }}</h5>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, SettingsTab } from '@/mixins'
import { AppPreferences } from '@/enums/qbit'
import { mdiDelete, mdiEye, mdiEyeOff, mdiPencil } from '@mdi/js'
import { ScanDirs, ScanDirsEnum } from '@/enums/qbit/AppPreferences'

type MonitoredFolder = { monitoredFolderPath: string; saveType: ScanDirs | -1; otherPath: string }

export default defineComponent({
  name: 'Downloads',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      contentLayoutOptions: [
        { text: this.$t('enums.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
        { text: this.$t('enums.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
        { text: this.$t('enums.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
      ],
      stopConditionOptions: [
        { text: this.$t('enums.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
        { text: this.$t('enums.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
        { text: this.$t('enums.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED }
      ],
      defaultTMMOptions: [
        { text: this.$t('modals.settings.downloads.saveManagement.defaultTMMOptions.manual'), value: false },
        { text: this.$t('modals.settings.downloads.saveManagement.defaultTMMOptions.automatic'), value: true }
      ],
      paramChangedTMMOptions: [
        { text: this.$t('modals.settings.downloads.saveManagement.paramChangedTMMOptions.relocateTorrent'), value: true },
        { text: this.$t('modals.settings.downloads.saveManagement.paramChangedTMMOptions.switchToManual'), value: false }
      ],
      export_dir_enabled: false,
      export_dir_fin_enabled: false,
      showPassword: false,
      monitoredFoldersDialog: false,
      monitoredFoldersDialogDelete: false,
      monitoredFoldersEditedIndex: -1,
      monitoredFoldersEditedItem: { monitoredFolderPath: '', saveType: ScanDirsEnum.MONITORED_FOLDER, otherPath: '' } as MonitoredFolder,
      monitoredFoldersDefaultItem: { monitoredFolderPath: '', saveType: ScanDirsEnum.MONITORED_FOLDER, otherPath: '' } as MonitoredFolder,
      monitoredFoldersHeaders: [
        { text: this.$t('modals.settings.downloads.monitoredFolders.monitoredFolderPath'), value: 'monitoredFolderPath', sortable: false },
        { text: this.$t('modals.settings.downloads.monitoredFolders.saveType'), value: 'saveType', sortable: false },
        { text: this.$t('modals.settings.downloads.monitoredFolders.otherPath'), value: 'otherPath', sortable: false },
        { text: this.$t('modals.settings.downloads.monitoredFolders.actions'), value: 'actions', sortable: false }
      ],
      monitoredFoldersData: [] as MonitoredFolder[],
      monitoredFoldersMonitorTypeOptions: [
        { text: this.$t('enums.monitoredFolderSaveLocation.monitoredFolder'), value: ScanDirsEnum.MONITORED_FOLDER },
        { text: this.$t('enums.monitoredFolderSaveLocation.defaultSavePath'), value: ScanDirsEnum.DEFAULT_SAVE_PATH },
        { text: this.$t('enums.monitoredFolderSaveLocation.other'), value: -1 }
      ],
      mdiEye,
      mdiEyeOff,
      mdiPencil,
      mdiDelete
    }
  },
  mounted() {
    this.export_dir_enabled = this.settings.export_dir.length > 0
    this.export_dir_fin_enabled = this.settings.export_dir_fin.length > 0

    Object.entries(this.settings.scan_dirs).forEach(entry => {
      const [k, v] = entry

      let saveType, otherPath
      if (typeof v === 'string') {
        saveType = -1
        otherPath = v
      } else {
        saveType = v
        otherPath = ''
      }
      this.monitoredFoldersData.push({ monitoredFolderPath: k, saveType, otherPath })
    })
  },
  watch: {
    export_dir_enabled(newValue) {
      this.settings.export_dir = newValue ? this.settings.export_dir : ''
    },
    export_dir_fin_enabled(newValue) {
      this.settings.export_dir_fin = newValue ? this.settings.export_dir_fin : ''
    }
  },
  methods: {
    editItem(item: MonitoredFolder) {
      this.monitoredFoldersEditedIndex = this.monitoredFoldersData.indexOf(item)
      this.monitoredFoldersEditedItem = { ...item }
      this.monitoredFoldersDialog = true
    },
    deleteItem(item: MonitoredFolder) {
      this.monitoredFoldersEditedIndex = this.monitoredFoldersData.indexOf(item)
      this.monitoredFoldersEditedItem = { ...item }
      this.monitoredFoldersDialogDelete = true
    },
    deleteItemConfirm() {
      this.monitoredFoldersData.splice(this.monitoredFoldersEditedIndex, 1)
      this.convertSettings()
      this.closeDelete()
    },
    save() {
      if (this.monitoredFoldersEditedIndex > -1) {
        Object.assign(this.monitoredFoldersData[this.monitoredFoldersEditedIndex], this.monitoredFoldersEditedItem)
      } else {
        this.monitoredFoldersData.push(this.monitoredFoldersEditedItem)
      }
      this.convertSettings()
      this.close()
    },
    convertSettings() {
      this.settings.scan_dirs = {}
      this.monitoredFoldersData.forEach(folder => {
        this.settings.scan_dirs[folder.monitoredFolderPath] = folder.saveType === -1 ? folder.otherPath : folder.saveType
      })
    },
    close() {
      this.monitoredFoldersDialog = false
      this.$nextTick(() => {
        this.monitoredFoldersEditedItem = { ...this.monitoredFoldersDefaultItem }
        this.monitoredFoldersEditedIndex = -1
      })
    },
    closeDelete() {
      this.monitoredFoldersDialogDelete = false
      this.$nextTick(() => {
        this.monitoredFoldersEditedItem = { ...this.monitoredFoldersDefaultItem }
        this.monitoredFoldersEditedIndex = -1
      })
    }
  }
})
</script>
