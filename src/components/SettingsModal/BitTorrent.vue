<template>
    <v-container>
        <v-card flat>
            <v-card-text>
                <h3>Privacy</h3>
                <div class="settings_content ml-5 mr-5">
                    <v-checkbox
                        dense
                        :label="`Enable DHT (decentralized network) to find more peers`"
                        v-model="settings.dht"
                    />
                    <v-checkbox
                        dense
                        :label="`Enable Peer Exchange (PeX) to find more peers`"
                        v-model="settings.pex"
                    />
                    <v-checkbox
                        dense
                        :label="`Enable Local Peer Discovery to find more peers`"
                        v-model="settings.lsd"
                    />
                    <v-checkbox
                        dense
                        :label="`Enable anonymous mode`"
                        v-model="settings.anonymous_mode"
                    />
                </div>

                <v-checkbox
                    dense
                    :label="`Torrent Queueing`"
                    v-model="settings.queueing_enabled"
                />
                <div class="settings_content ml-5 mr-5">
                    <v-text-field
                        class="mb-2"
                        outlined
                        dense
                        hide-details
                        :label="`Maximum active downloads`"
                        :disabled="!settings.queueing_enabled"
                        v-model="settings.max_active_downloads"
                    />
                    <v-text-field
                        class="mb-2"
                        outlined
                        dense
                        hide-details
                        :label="`Maximum active uploads`"
                        :disabled="!settings.queueing_enabled"
                        v-model="settings.max_active_uploads"
                    />
                    <v-text-field
                        class="mb-2"
                        outlined
                        dense
                        hide-details
                        :label="`Maximum active torrents`"
                        :disabled="!settings.queueing_enabled"
                        v-model="settings.max_active_torrents"
                    />

                    <v-checkbox
                        dense
                        :label="`Do not count slow torrents in these limits`"
                        v-model="settings.dont_count_slow_torrents"
                    />

                    <div class="settings_content">
                        <v-text-field
                            class="mb-2"
                            outlined
                            dense
                            hide-details
                            :label="`Download rate threshold KiB/s`"
                            :disabled="!settings.dont_count_slow_torrents"
                            v-model="settings.slow_torrent_dl_rate_threshold"
                        />
                        <v-text-field
                            class="mb-2"
                            outlined
                            dense
                            hide-details
                            :label="`Upload rate threshold KiB/s`"
                            :disabled="!settings.dont_count_slow_torrents"
                            v-model="settings.slow_torrent_ul_rate_threshold"
                        />
                        <v-text-field
                            class="mb-2"
                            outlined
                            dense
                            hide-details
                            :label="`Torrent inactivity timer`"
                            :disabled="!settings.dont_count_slow_torrents"
                            v-model="settings.slow_torrent_inactive_timer"
                        />
                    </div>
                </div>

                <h3>Seeding Limits</h3>
                <div class="settings_content ml-5 mr-5">
                    <v-row dense>
                        <v-col cols="10">
                            <v-checkbox
                                dense
                                :label="`When ratio reaches`"
                                v-model="settings.max_ratio_enabled"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                class="mb-2"
                                outlined
                                dense
                                hide-details
                                :disabled="!settings.max_ratio_enabled"
                                v-model="settings.max_ratio"
                            />
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="10">
                            <v-checkbox
                                dense
                                :label="`When seeding time reaches`"
                                v-model="settings.max_seeding_time_enabled"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                class="mb-2"
                                outlined
                                dense
                                hide-details
                                :disabled="!settings.max_seeding_time_enabled"
                                v-model="settings.max_seeding_time"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="success" @click="save_settings">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'

export default {
    name: 'BitTorrent',
    methods: {
        async save_settings() {
            await qbit.setPreferences(this.getSettings())
        }
    },
    computed: {
        ...mapGetters(['getSettings']),
        settings() {
            return this.getSettings()
        }
    }
}
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
    padding-top: 0px;
}

.settings_content {
    border-left: 2px solid black;
    padding-left: 8px;
}

.box {
    margin: 2px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid black;
}
</style>
