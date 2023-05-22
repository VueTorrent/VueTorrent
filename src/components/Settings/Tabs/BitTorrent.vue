<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.bittorrent.privacy.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.dht" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.privacy.enableDHT')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.pex" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.privacy.enablePeX')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.lsd" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.privacy.enableLPD')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.encryption"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="encyptionModeOptions"
        :label="$t('modals.settings.bittorrent.privacy.encryptionMode')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.anonymous_mode" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.privacy.enableAnonymous')" />
      <a href="https://github.com/qbittorrent/qBittorrent/wiki/Anonymous-Mode" class="ml-3" target="_blank">{{ $t('modals.settings.bittorrent.privacy.moreInfo') }}</a>
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-text-field
        v-model="settings.max_active_checking_torrents"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.bittorrent.maxActiveCheckingTorrents')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.queueing_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.torrentQueueing.subheader')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        :disabled="!settings.queueing_enabled"
        v-model="settings.max_active_downloads"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.maxActiveDownload')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.queueing_enabled"
        v-model="settings.max_active_uploads"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.maxActiveUpload')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.queueing_enabled"
        v-model="settings.max_active_torrents"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.maxActiveTorrent')"
      />
    </v-list-item>

    <v-list-item class="ms-8">
      <v-checkbox
        :disabled="!settings.queueing_enabled"
        v-model="settings.dont_count_slow_torrents"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.bittorrent.torrentQueueing.excludeSlowTorrent')"
      />
    </v-list-item>
    <v-list-item class="ms-8">
      <v-text-field
        :disabled="!settings.queueing_enabled || !settings.dont_count_slow_torrents"
        v-model="settings.slow_torrent_dl_rate_threshold"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.downloadRateLimit')"
      />
    </v-list-item>
    <v-list-item class="ms-8">
      <v-text-field
        :disabled="!settings.queueing_enabled || !settings.dont_count_slow_torrents"
        v-model="settings.slow_torrent_ul_rate_threshold"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.uploadRateLimit')"
      />
    </v-list-item>
    <v-list-item class="ms-8">
      <v-text-field
        :disabled="!settings.queueing_enabled || !settings.dont_count_slow_torrents"
        v-model="settings.slow_torrent_inactive_timer"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.bittorrent.torrentQueueing.torrentInactivityTimer')"
      />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.bittorrent.seedLimits.subheader') }}</v-subheader>

    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox v-model="settings.max_ratio_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.seedLimits.whenRatioReaches')" />
        </v-col>
        <v-col>
          <v-text-field v-model="settings.max_ratio" class="mb-2" outlined dense type="number" hide-details :disabled="!settings.max_ratio_enabled" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox v-model="settings.max_seeding_time_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.seedLimits.whenSeedingTimeReaches')" />
        </v-col>
        <v-col>
          <v-text-field v-model="settings.max_seeding_time" class="mb-2" outlined dense persistent-hint :hint="$t('modals.settings.bittorrent.seedLimits.whenSeedingTimeReachesHint')" type="number" :disabled="!settings.max_seeding_time_enabled" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-subheader>
            {{ $t('modals.settings.bittorrent.seedLimits.then') }}
          </v-subheader>
        </v-col>
        <v-col>
          <v-select
            :disabled="!settings.max_ratio_enabled && !settings.max_seeding_time_enabled"
            v-model="settings.max_ratio_act"
            height="1"
            flat
            dense
            hide-details
            outlined
            :items="thenTypes"
          />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.add_trackers_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.bittorrent.autoAddTrackers')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        :disabled="!settings.add_trackers_enabled"
        v-model="settings.add_trackers"
        outlined
        required
        auto-grow
        clearable
        persistent-hint
        :hint="$t('modals.settings.bittorrent.autoAddTrackersHint')"
      />
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SettingsTab, FullScreenModal } from '@/mixins'
import { Encryption, MaxRatioAction } from '@/enums/qbit/AppPreferences'

export default defineComponent({
  name: 'BitTorrent',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      encyptionModeOptions: [
        { value: Encryption.PREFER_ENCRYPTION, text: this.$t('enums.encryption.preferEncryption') },
        { value: Encryption.FORCE_ON, text: this.$t('enums.encryption.forceOn') },
        { value: Encryption.FORCE_OFF, text: this.$t('enums.encryption.forceOff') }
      ],
      thenTypes: [
        { value: MaxRatioAction.PAUSE_TORRENT, text: this.$t('enums.maxRatioAction.pauseTorrent') },
        { value: MaxRatioAction.REMOVE_TORRENT, text: this.$t('enums.maxRatioAction.removeTorrent') },
        { value: MaxRatioAction.REMOVE_TORRENT_AND_FILES, text: this.$t('enums.maxRatioAction.removeTorrentAndFiles') },
        { value: MaxRatioAction.ENABLE_SUPERSEEDING, text: this.$t('enums.maxRatioAction.torrentSuperseeding') }
      ]
    }
  }
})
</script>
