<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageBittorrent.subHeaderPrivacy') }}</v-subheader>
    <v-list-item>
      <v-checkbox v-model="settings.dht" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.enableDHT')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.pex" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.enablePeX')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.lsd" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.enableLPD')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.anonymous_mode" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.enableAnonymous')" />
    </v-list-item>
    <v-divider insert />
    <v-list-item>
      <v-checkbox v-model="settings.queueing_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.torrentQueue')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_downloads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.maxActiveDownload')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_uploads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.maxActiveUpload')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_torrents"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.maxActiveTorrent')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.dont_count_slow_torrents" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.excludeSlowTorrent')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_dl_rate_threshold"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.downloadRateLimit')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_ul_rate_threshold"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.uploadRateLimit')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_inactive_timer"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageBittorrent.torrentInactivityTimer')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageBittorrent.subHeaderSeedLimits') }}</v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox v-model="settings.max_ratio_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.whenRatioReaches')" />
        </v-col>
        <v-col>
          <v-text-field v-model="settings.max_ratio" class="mb-2" outlined dense type="number" hide-details :disabled="!settings.max_ratio_enabled" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox v-model="settings.max_seeding_time_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageBittorrent.whenSeedingTimeReaches')" />
        </v-col>
        <v-col>
          <v-text-field v-model="settings.max_seeding_time" class="mb-2" outlined dense type="number" hide-details :disabled="!settings.max_seeding_time_enabled" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-subheader>
            {{ $t('then') }}
          </v-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="settings.max_ratio_act"
            class="mb-2"
            outlined
            :disabled="!settings.max_ratio_enabled && !settings.max_seeding_time_enabled"
            dense
            small-chips
            :items="thenTypes"
          />
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'BitTorrent',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      thenTypes: [
        {
          value: 0,
          text: this.$i18n.t('modals.settings.pageBittorrent.maxRatioPauseTorrent')
        },
        {
          value: 1,
          text: this.$i18n.t('modals.settings.pageBittorrent.maxRatioRemoveTorrent')
        },
        {
          value: 3,
          text: this.$i18n.t('modals.settings.pageBittorrent.maxRatioRemoveTorrentAndFiles')
        },
        {
          value: 2,
          text: this.$i18n.t('modals.settings.pageBittorrent.maxRatioTorrentSuperseeding')
        }
      ]
    }
  }
}
</script>
