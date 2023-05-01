<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageDownloads.whenAddTorrent.subheader') }}</v-subheader>
    <v-list-item>
      <v-select v-model="settings.torrent_content_layout" flat dense hide-details outlined :label="$t('enums.contentLayout.title')" :items="contentLayoutOptions" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.start_paused_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.whenAddTorrent.donotAutoStart')" />
    </v-list-item>

    <v-list-item>
      <v-select v-model="settings.torrent_stop_condition" flat dense hide-details outlined :label="$t('enums.stopCondition.title')" :items="stopConditionOptions" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.auto_delete_mode" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.whenAddTorrent.autoDeleteMode')" />
    </v-list-item>

    <v-divider insert />

    <v-list-item>
      <v-checkbox v-model="settings.preallocate_all" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.publicSettings.preAllocateDisk')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.incomplete_files_ext" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.publicSettings.appendQBExtension')" />
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageDownloads.saveManagement.subheader') }}</v-subheader>

    <v-list-item>
      <v-select
        class="mb-3"
        v-model="settings.auto_tmm_enabled"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.autoTMMEnabled')"
        :items="defaultTMMOptions"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        class="mb-3"
        v-model="settings.torrent_changed_tmm_enabled"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.torrentChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>
    <v-list-item>
      <v-select
        class="mb-3"
        v-model="settings.save_path_changed_tmm_enabled"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.savePathChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>
    <v-list-item>
      <v-select
        class="mb-3"
        v-model="settings.category_changed_tmm_enabled"
        flat
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.categoryChangedTMM')"
        :items="paramChangedTMMOptions"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.save_path" dense hide-details outlined :label="$t('modals.settings.pageDownloads.saveManagement.defaultSavePath')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.temp_path_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.keepIncompleteIn')" />
      <v-text-field :disabled="!settings.temp_path_enabled" v-model="settings.temp_path" class="ms-2" dense hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="export_dir_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.exportDir')" />
      <v-text-field :disabled="!export_dir_enabled" v-model="settings.export_dir" class="ms-2" dense hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="export_dir_fin_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.exportDirFinished')" />
      <v-text-field :disabled="!export_dir_fin_enabled" v-model="settings.export_dir_fin" class="ms-2" dense hide-details />
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageDownloads.saveManagement.monitoredFolders.subheader') }}</v-subheader>

    <v-list-item>
      <!-- TODO: Monitored folder -->
      <v-btn :disabled="true">Coming soon!</v-btn>
    </v-list-item>

    <v-divider insert />

    <v-list-item>
      <v-checkbox
        v-model="settings.excluded_file_names_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.excludedFileNames.label')"
      />
    </v-list-item>
    <v-list-item>
      <v-textarea
        :disabled="!settings.excluded_file_names_enabled"
        v-model="settings.excluded_file_names"
        outlined
        required
        auto-grow
        clearable
        :hint="$t('modals.settings.pageDownloads.saveManagement.excludedFileNames.hint')"
      />
    </v-list-item>

    <v-divider insert />

    <v-list-item>
      <v-checkbox
        v-model="settings.mail_notification_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.enabled')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_sender"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.from')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_email"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.to')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_smtp"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.smtpServer')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_ssl_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.sslEnabled')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        :disabled="!settings.mail_notification_enabled"
        v-model="settings.mail_notification_auth_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.authEnabled')"
      />
      <v-card flat class="ms-6">
        <v-text-field
          :disabled="!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled"
          v-model="settings.mail_notification_username"
          dense
          hide-details
          :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.username')"
        />
        <v-text-field
          :disabled="!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled"
          v-model="settings.mail_notification_password"
          dense
          hide-details
          :label="$t('modals.settings.pageDownloads.saveManagement.mailNotification.password')"
        />
      </v-card>
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox
        v-model="settings.autorun_on_torrent_added_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.runExternalProgram.onAddedEnabled')"
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_on_torrent_added_enabled">
      <v-text-field
        v-model="settings.autorun_on_torrent_added_program"
        class="mb-2"
        outlined
        dense
        :label="$t('modals.settings.pageDownloads.saveManagement.runExternalProgram.onAddedLabel')"
        hide-details
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.autorun_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageDownloads.saveManagement.runExternalProgram.onFinishedEnabled')"
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled">
      <v-text-field
        v-model="settings.autorun_program"
        class="mb-2"
        outlined
        dense
        :label="$t('modals.settings.pageDownloads.saveManagement.runExternalProgram.onFinishedLabel')"
        hide-details
      />
    </v-list-item>
    <v-list-item class="mb-4">
      <v-card flat color="grey--text selected">
        <v-card-text>
          <h5>
            {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamTitle') }}
          </h5>
          <ul>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamN') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamL') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamG') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamF') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamR') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamD') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamC') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamZ') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamT') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamI') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamJ') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.supportParamK') }}
            </li>
          </ul>
          <h5>{{ $t('modals.settings.pageDownloads.saveManagement.runExternalProgram.tip') }}</h5>
        </v-card-text>
      </v-card>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, SettingsTab } from '@/mixins'
import { AppPreferences } from '@/enums/qbit'

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
        { text: this.$t('modals.settings.pageDownloads.saveManagement.defaultTMMOptions.manual'), value: false },
        { text: this.$t('modals.settings.pageDownloads.saveManagement.defaultTMMOptions.automatic'), value: true }
      ],
      paramChangedTMMOptions: [
        { text: this.$t('modals.settings.pageDownloads.saveManagement.paramChangedTMMOptions.relocateTorrent'), value: true },
        { text: this.$t('modals.settings.pageDownloads.saveManagement.paramChangedTMMOptions.switchToManual'), value: false }
      ],
      export_dir_enabled: false,
      export_dir_fin_enabled: false
    }
  },

  mounted() {
    this.export_dir_enabled = this.settings.export_dir.length > 0
    this.export_dir_fin_enabled = this.settings.export_dir_fin.length > 0
  },

  watch: {
    export_dir_enabled(newValue) {
      this.settings.export_dir = newValue ? this.settings.export_dir : ''
    },
    export_dir_fin_enabled(newValue) {
      this.settings.export_dir_fin = newValue ? this.settings.export_dir_fin : ''
    }
  }
})
</script>
