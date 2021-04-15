<template>
  <v-card flat>
    <v-subheader>privacy</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.dht"
        hide-details
        class="ma-0 pa-0"
        label="Enable DHT (decentralized network) to find more peers"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.pex"
        hide-details
        class="ma-0 pa-0"
        label="Enable Peer Exchange (PeX) to find more peers"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.lsd"
        hide-details
        class="ma-0 pa-0"
        label="Enable Local Peer Discovery to find more peers"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.lsd"
        hide-details
        class="ma-0 pa-0"
        label="Enable anonymous mode"
      />
    </v-list-item>
    <v-divider insert />
    <v-list-item>
      <v-checkbox
        v-model="settings.queueing_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Torrent Queueing" 
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_downloads"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Maximum active downloads"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_uploads"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Maximum active uploads"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_torrents"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Maximum active torrents"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.dont_count_slow_torrents"
        hide-details
        class="ma-0 pa-0"
        label="Do not count slow torrents in these limits"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_dl_rate_threshold"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Download rate threshold KiB/s"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_ul_rate_threshold"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Upload rate threshold KiB/s"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_inactive_timer"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Torrent inactivity timer"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>seed limits</v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox
            v-model="settings.max_ratio_enabled"
            hide-details
            class="ma-0 pa-0"
            label="When ratio reaches"
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
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox
            v-model="settings.max_seeding_time_enabled"
            hide-details
            class="ma-0 pa-0"
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
    </v-list-item>
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'BitTorrent',
  mixins: [SettingsTab, FullScreenModal]
}
</script>