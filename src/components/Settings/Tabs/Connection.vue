<template>
  <v-card flat>
    <v-list-item class="my-5">
      <v-select v-model="settings.bittorrent_protocol" flat dense hide-details outlined :items="bittorrent_protocol" :label="$t('modals.settings.pageConnection.protocol')" />
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageConnection.listeningSubHeader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="auto">
          <v-text-field v-model="settings.listen_port" class="mb-2" outlined dense type="number" hide-details :label="$t('modals.settings.pageConnection.incomingConnectionPort')" />
        </v-col>
        <v-col cols="auto">
          <v-btn @click="generateRandomPort">Random</v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.upnp" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.useUPnP')" />
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageConnection.subHeader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_conn_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.globalMaxConnection')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_conn_enabled" v-model="settings.max_connec" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_conn_per_torrent_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.perTorrentMaxConnection')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_conn_per_torrent_enabled" v-model="settings.max_connec_per_torrent" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_uploads_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.globalMaxUploadSlots')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_uploads_enabled" v-model="settings.max_uploads" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_uploads_per_torrent_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.perTorrentMaxUploadSlots')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_uploads_per_torrent_enabled" v-model="settings.max_uploads_per_torrent" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.pageConnection.proxySubHeader') }}</v-subheader>

    <v-list-item>
      <v-row class="mx-1 pb-4">
        <v-col cols="5" class="pa-0 pr-2">
          <v-select v-model="settings.proxy_type" outlined dense hide-details small-chips :items="proxyTypes" />
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field :disabled="settings.proxy_type === 0" v-model="settings.proxy_ip" class="mr-1" outlined dense hide-details :label="$t('modals.settings.pageConnection.proxyHost')" />
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-text-field :disabled="settings.proxy_type === 0" v-model="settings.proxy_port" class="ml-1" outlined dense type="number" hide-details :label="$t('modals.settings.pageConnection.proxyPort')" />
        </v-col>
      </v-row>
    </v-list-item>

    <!-- TODO -->

    <v-list-item>
      <v-checkbox v-model="settings.proxy_peer_connections" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.proxyPeerConnections')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="settings.proxy_torrents_only" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.proxyTorrentOnly')" />
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-checkbox v-model="settings.proxy_auth_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.pageConnection.proxyAuth')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.proxy_username"
        class="mb-2"
        outlined
        dense
        hide-details
        :disabled="!settings.proxy_auth_enabled"
        :label="$t('modals.settings.pageWebUI.username')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.proxy_password"
        class="mb-2"
        outlined
        dense
        hide-details
        type="password"
        :disabled="!settings.proxy_auth_enabled"
        :label="$t('modals.settings.pageWebUI.password')"
      />
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import {FullScreenModal, SettingsTab} from '@/mixins'
import {BitTorrentProtocol, ProxyType} from '@/enums/qbit/AppPreferences'
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Connection',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      proxyTypes: [
        {
          value: ProxyType.DISABLED,
          text: '(None)'
        },
        {
          value: ProxyType.HTTP,
          text: 'HTTP'
        },
        {
          value: ProxyType.SOCKS5,
          text: 'SOCKS5'
        },
        {
          value: ProxyType.SOCKS4,
          text: 'SOCKS4'
        }
      ],
      bittorrent_protocol: [
        { value: BitTorrentProtocol.TCP_uTP, text: 'TCP and μTP' },
        { value: BitTorrentProtocol.TCP, text: 'TCP' },
        { value: BitTorrentProtocol.uTP, text: 'μTP' }
      ],
      max_conn_enabled: false,
      max_conn_per_torrent_enabled: false,
      max_uploads_enabled: false,
      max_uploads_per_torrent_enabled: false
    }
  },
  mounted() {
    this.max_conn_enabled = this.settings.max_connec > 0
    this.max_conn_per_torrent_enabled = this.settings.max_connec_per_torrent > 0
    this.max_uploads_enabled = this.settings.max_uploads > 0
    this.max_uploads_per_torrent_enabled = this.settings.max_uploads_per_torrent > 0
  },
  watch: {
    max_conn_enabled(newValue) {
      this.settings.max_connec = newValue ? this.settings.max_connec : -1
    },
    max_conn_per_torrent_enabled(newValue) {
      this.settings.max_connec_per_torrent = newValue ? this.settings.max_connec_per_torrent : -1
    },
    max_uploads_enabled(newValue) {
      this.settings.max_uploads = newValue ? this.settings.max_uploads : -1
    },
    max_uploads_per_torrent_enabled(newValue) {
      this.settings.max_uploads_per_torrent = newValue ? this.settings.max_uploads_per_torrent : -1
    }
  },
  methods: {
    generateRandomPort() {
      //source: https://github.com/qbittorrent/qBittorrent/blob/d83b2a61311b0dc3bc31ee52d1b9eaac715c3cdf/src/webui/www/private/views/preferences.html#L1729-L1734
      const min = 1024;
      const max = 65535;
      this.settings.listen_port = Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
})
</script>
