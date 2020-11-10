<template>
  <v-container>
        <v-card flat>
            <v-card-text :style="{ minHeight: phoneLayout ? '' : '75vh'}">
                <h3>When adding a torrent</h3>
                <div class="settings_content ml-5 mr-5">
                    <v-checkbox
                        dense
                        :label="`Create subfolder for torrents with multiple files`"
                        v-model="settings.create_subfolder_enabled"
                    />
                    <v-checkbox
                        dense
                        :label="`Do not start the download automatically`"
                        v-model="settings.start_paused_enabled"
                    />
                </div>

                <v-checkbox
                    dense
                    :label="`Pre-allocate disk space for all files`"
                    v-model="settings.preallocate_all"
                />
                <v-checkbox
                    dense
                    :label="` Append .!qB extension to incomplete files`"
                    v-model="settings.incomplete_files_ext"
                />

                <h3>Saving Management</h3>
                <div class="settings_content ml-5 mr-5">
                    <v-row dense>
                        <v-col cols="5" class="d-flex align-center">
                            <h4>Default Save Path</h4>
                        </v-col>
                        <v-col>
                            <v-text-field
                                class="mb-2"
                                outlined
                                dense
                                hide-details
                                v-model="settings.save_path"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="5">
                            <v-checkbox
                                dense
                                :label="`Keep incomplete torrents in:`"
                                v-model="settings.temp_path_enabled"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                class="mb-2"
                                outlined
                                dense
                                hide-details
                                :disabled="!settings.temp_path_enabled"
                                v-model="settings.temp_path"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
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
