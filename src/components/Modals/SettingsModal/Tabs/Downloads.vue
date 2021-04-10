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
    <v-subheader>public settings</v-subheader>
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
    <v-list-item>
      <v-checkbox
        v-model="settings.save_path_changed_tmm_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Relocate Torrent when category changes"
      />
    </v-list-item>


    
    <v-list-item>
      <v-row dense>
        <v-col>
          <p class="pt-1 pl-5">
            Default Save Path
          </p>
        </v-col>
        <v-col>
          <v-text-field
            v-model="settings.save_path"
            class="mb-2"
            outlined
            dense
            hide-details
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox
            v-model="settings.max_seeding_time_enabled"
            hide-details
            class="ma-0 pa-0"
            label="Keep incomplete torrents in:"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="settings.temp_path"
            class="mb-2"
            outlined
            dense
            hide-details
            :disabled="!settings.temp_path_enabled"
          />
        </v-col>
      </v-row>
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