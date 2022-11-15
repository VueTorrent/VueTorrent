<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageDownloads.subHeaderWhenAddTorrent') }}</v-subheader>
    <v-list-item>
      <v-checkbox v-model="settings.create_subfolder_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.whenAddTorrent.createSubFolder')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.start_paused_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.whenAddTorrent.donotAutoStart')" />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageDownloads.subHeaderPublicSettings') }}</v-subheader>
    <v-list-item>
      <v-checkbox v-model="settings.preallocate_all" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.publicSettings.preAllocateDisk')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.incomplete_files_ext" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.publicSettings.appendQBExtension')" />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageDownloads.subHeaderSaveManagement') }}</v-subheader>
    <v-list-item>
      <v-checkbox v-model="settings.auto_tmm_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.autoManagement')" />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-checkbox v-model="settings.save_path_changed_tmm_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.relocate')" />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-text-field v-model="settings.save_path" class="mb-2" outlined dense :label="$t('modals.settings.pageDownloads.saveManagement.defaultSavePath')" hide-details />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.temp_path_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.keepIncompleteIn')" />
    </v-list-item>
    <v-list-item v-if="settings.temp_path_enabled">
      <v-text-field v-model="settings.temp_path" class="mb-2" outlined dense hide-details />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.autorun_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageDownloads.saveManagement.autoEnabled')" />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled">
      <v-text-field v-model="settings.autorun_program" class="mb-2" outlined dense :label="$t('modals.settings.pageDownloads.saveManagement.autorunProgram')" hide-details />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled" class="mb-4">
      <v-card flat color="grey--text selected">
        <v-card-text>
          <h5>
            {{ $t('modals.settings.pageDownloads.saveManagement.supportParamTitle') }}
          </h5>
          <ul>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamN') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamL') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamG') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamF') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamR') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamD') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamC') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamZ') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamT') }}
            </li>
            <li>
              {{ $t('modals.settings.pageDownloads.saveManagement.supportParamI') }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-list-item>
  </v-card>
</template>
<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'Downloads',
  mixins: [SettingsTab, FullScreenModal]
}
</script>
