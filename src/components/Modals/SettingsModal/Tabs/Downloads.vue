<template>
  <v-card flat>
    <v-subheader>When adding a torrent</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.create_subfolder_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Create subfolder for torrents with multiple files"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.start_paused_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Do not start the download automatically"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>Public Settings</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.preallocate_all"
        hide-details
        class="ma-0 pa-0"
        label="Pre-allocate disk space for all files"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.incomplete_files_ext"
        hide-details
        class="ma-0 pa-0"
        label="Append .!qB extension to incomplete files"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>Saving Management</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.auto_tmm_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Automatic Torrent Management"
      />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-checkbox
        v-model="settings.save_path_changed_tmm_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Relocate Torrent when category changes"
      />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-text-field
        v-model="settings.save_path"
        class="mb-2"
        outlined
        dense
        label="Default Save Path"
        hide-details
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.temp_path_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Keep incomplete torrents in:"
      />
    </v-list-item>
    <v-list-item v-if="settings.temp_path_enabled">
      <v-text-field
        v-model="settings.temp_path"
        class="mb-2"
        outlined
        dense
        hide-details
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.autorun_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Autorun enabled:"
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled">
      <v-text-field
        v-model="settings.autorun_program"
        class="mb-2"
        outlined
        dense
        label="Autorun program"
        hide-details
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled" class="mb-4">
      <v-card flat color="grey--text selected">
        <v-card-text>
          <h5>Supported parameters (case sensitive):</h5>
          <ul>
            <li>%N: Torrent name </li>
            <li>%L: Category</li>
            <li>%G: Tags (separated by comma)</li>
            <li>%F: Content path (same as root path for multi-file torrent)</li>
            <li>%R: Root path (first torrent subdirectory path)</li>
            <li>%D: Save path</li>
            <li>%C: Number of files</li>
            <li>%Z: Torrent size (bytes)</li>
            <li>%T: Current tracker</li>
            <li>%I: Info hash</li>
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
