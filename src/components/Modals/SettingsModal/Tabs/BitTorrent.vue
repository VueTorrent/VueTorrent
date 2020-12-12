<template>
  <v-container>
    <v-card flat>
      <perfect-scrollbar>
        <v-card-text :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh'}">
          <h3>Privacy</h3>
          <div class="settings_content ml-5 mr-5">
            <v-checkbox
              v-model="settings.dht"
              dense
              :label="`Enable DHT (decentralized network) to find more peers`"
            />
            <v-checkbox
              v-model="settings.pex"
              dense
              :label="`Enable Peer Exchange (PeX) to find more peers`"
            />
            <v-checkbox
              v-model="settings.lsd"
              dense
              :label="`Enable Local Peer Discovery to find more peers`"
            />
            <v-checkbox
              v-model="settings.anonymous_mode"
              dense
              :label="`Enable anonymous mode`"
            />
          </div>

          <v-checkbox
            v-model="settings.queueing_enabled"
            dense
            :label="`Torrent Queueing`"
          />
          <div class="settings_content ml-5 mr-5">
            <v-text-field
              v-model="settings.max_active_downloads"
              class="mb-2"
              outlined
              dense
              hide-details
              :label="`Maximum active downloads`"
              :disabled="!settings.queueing_enabled"
            />
            <v-text-field
              v-model="settings.max_active_uploads"
              class="mb-2"
              outlined
              dense
              hide-details
              :label="`Maximum active uploads`"
              :disabled="!settings.queueing_enabled"
            />
            <v-text-field
              v-model="settings.max_active_torrents"
              class="mb-2"
              outlined
              dense
              hide-details
              :label="`Maximum active torrents`"
              :disabled="!settings.queueing_enabled"
            />

            <v-checkbox
              v-model="settings.dont_count_slow_torrents"
              dense
              :label="`Do not count slow torrents in these limits`"
            />

            <div class="settings_content">
              <v-text-field
                v-model="settings.slow_torrent_dl_rate_threshold"
                class="mb-2"
                outlined
                dense
                hide-details
                :label="`Download rate threshold KiB/s`"
                :disabled="!settings.dont_count_slow_torrents"
              />
              <v-text-field
                v-model="settings.slow_torrent_ul_rate_threshold"
                class="mb-2"
                outlined
                dense
                hide-details
                :label="`Upload rate threshold KiB/s`"
                :disabled="!settings.dont_count_slow_torrents"
              />
              <v-text-field
                v-model="settings.slow_torrent_inactive_timer"
                class="mb-2"
                outlined
                dense
                hide-details
                :label="`Torrent inactivity timer`"
                :disabled="!settings.dont_count_slow_torrents"
              />
            </div>
          </div>

          <h3>Seeding Limits</h3>
          <div class="settings_content ml-5 mr-5">
            <v-row dense>
              <v-col cols="10">
                <v-checkbox
                  v-model="settings.max_ratio_enabled"
                  dense
                  :label="`When ratio reaches`"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="settings.max_ratio"
                  class="mb-2"
                  outlined
                  dense
                  hide-details
                  :disabled="!settings.max_ratio_enabled"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="10">
                <v-checkbox
                  v-model="settings.max_seeding_time_enabled"
                  dense
                  label="When seeding time reaches"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="settings.max_seeding_time"
                  class="mb-2"
                  outlined
                  dense
                  hide-details
                  :disabled="!settings.max_seeding_time_enabled"
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
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'BitTorrent',
  mixins: [SettingsTab, FullScreenModal]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SettingsTab.scss';
</style>
