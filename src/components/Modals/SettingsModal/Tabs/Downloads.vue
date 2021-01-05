<template>
  <v-container>
    <v-card flat>
      <perfect-scrollbar>
        <v-card-text :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh'}">
          <h3>When adding a torrent</h3>
          <div class="settings_content ml-5 mr-5">
            <v-checkbox
              v-model="settings.create_subfolder_enabled"
              dense
              :label="`Create subfolder for torrents with multiple files`"
            />
            <v-checkbox
              v-model="settings.start_paused_enabled"
              dense
              :label="`Do not start the download automatically`"
            />
          </div>

          <v-checkbox
            v-model="settings.preallocate_all"
            dense
            :label="`Pre-allocate disk space for all files`"
          />
          <v-checkbox
            v-model="settings.incomplete_files_ext"
            dense
            :label="` Append .!qB extension to incomplete files`"
          />

          <h3>Saving Management</h3>
          <div class="settings_content ml-5 mr-5">
            <v-checkbox
              v-model="settings.auto_tmm_enabled"
              dense
              label="Automatic Torrent Management "
            />
            <v-checkbox
              v-model="settings.save_path_changed_tmm_enabled"
              dense
              label="Relocate Torrent when category changes"
            />
            <v-row dense>
              <v-col cols="5" class="d-flex align-center">
                <h4>Default Save Path</h4>
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
            <v-row dense>
              <v-col cols="5">
                <v-checkbox
                  v-model="settings.temp_path_enabled"
                  dense
                  :label="`Keep incomplete torrents in:`"
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
          </div>
        </v-card-text>
      </perfect-scrollbar>
    </v-card>
  </v-container>
</template>

<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'Downloads',
  mixins: [SettingsTab, FullScreenModal]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SettingsTab.scss';
</style>
