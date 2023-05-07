<template>
  <v-card flat>
    <v-list-item class="my-5">
      <v-select
        v-model="settings.bittorrent_protocol"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="bittorrent_protocol"
        :label="$t('modals.settings.connection.protocol')"
      />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.connection.listeningPort.subheader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="auto">
          <v-text-field
            v-model="settings.listen_port"
            class="mb-2"
            outlined
            dense
            type="number"
            hide-details
            :label="$t('modals.settings.connection.listeningPort.incomingConnectionPort')"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn @click="generateRandomPort">{{ $t('modals.settings.connection.listeningPort.randomPort') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.upnp" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.listeningPort.useUPnP')" />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.connection.connectionLimits.subheader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_conn_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.connectionLimits.globalMaxConnection')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_conn_enabled" v-model="settings.max_connec" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_conn_per_torrent_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.connectionLimits.perTorrentMaxConnection')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_conn_per_torrent_enabled" v-model="settings.max_connec_per_torrent" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox v-model="max_uploads_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.connectionLimits.globalMaxUploadSlots')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_uploads_enabled" v-model="settings.max_uploads" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-checkbox
            v-model="max_uploads_per_torrent_enabled"
            hide-details
            class="ma-0 pa-0"
            :label="$t('modals.settings.connection.connectionLimits.perTorrentMaxUploadSlots')"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field :disabled="!max_uploads_per_torrent_enabled" v-model="settings.max_uploads_per_torrent" type="number" class="ms-2" dense hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.connection.proxy.subheader') }}</v-subheader>

    <v-list-item>
      <v-row class="mx-1 pb-4">
        <v-col cols="5" class="pa-0 pr-2">
          <v-select v-model="settings.proxy_type" height="1" outlined dense hide-details :items="proxyTypes" />
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field
            :disabled="settings.proxy_type === ProxyType.DISABLED"
            v-model="settings.proxy_ip"
            class="mr-1"
            outlined
            dense
            hide-details
            :label="$t('modals.settings.connection.proxy.host')"
          />
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-text-field
            :disabled="settings.proxy_type === ProxyType.DISABLED"
            v-model="settings.proxy_port"
            class="ml-1"
            outlined
            dense
            type="number"
            hide-details
            :label="$t('modals.settings.connection.proxy.port')"
          />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox
        :disabled="settings.proxy_type === ProxyType.DISABLED"
        v-model="settings.proxy_peer_connections"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.connection.proxy.peerConnections')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        :disabled="settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4"
        v-model="settings.proxy_torrents_only"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.connection.proxy.torrentOnly')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        :disabled="settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4"
        v-model="settings.proxy_hostname_lookup"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.connection.proxy.hostNameLookup')"
      />
    </v-list-item>

    <v-list-item class="mb-5">
      <v-checkbox
        :disabled="settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4"
        v-model="settings.proxy_auth_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.connection.proxy.auth.subtitle')"
      />
      <v-row class="ms-6">
        <v-col>
          <v-text-field
            :disabled="settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4 || !settings.proxy_auth_enabled"
            v-model="settings.proxy_username"
            dense
            hide-details
            class="mb-5"
            :label="$t('modals.settings.connection.proxy.auth.username')"
          />
          <v-text-field
            :disabled="settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4 || !settings.proxy_auth_enabled"
            v-model="settings.proxy_password"
            dense
            hide-details
            :label="$t('modals.settings.connection.proxy.auth.password')"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="
              settings.proxy_type === ProxyType.DISABLED || settings.proxy_type === ProxyType.SOCKS4 || !settings.proxy_auth_enabled ? '' : showPassword ? mdiEye : mdiEyeOff
            "
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <h5>{{ $t('modals.settings.connection.proxy.auth.tip') }}</h5>
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.connection.ipFiltering.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.ip_filter_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.ipFiltering.filterPath')" />
      <v-text-field :disabled="!settings.ip_filter_enabled" v-model="settings.ip_filter_path" class="ms-2" dense hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.ip_filter_trackers" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.ipFiltering.applyToTrackers')" />
    </v-list-item>

    <v-list-item>
      <v-subheader>{{ $t('modals.settings.connection.ipFiltering.bannedIps') }}</v-subheader>
    </v-list-item>

    <v-list-item>
      <v-textarea v-model="settings.banned_IPs" outlined required auto-grow clearable persistent-hint :hint="$t('modals.settings.connection.ipFiltering.bannedIpsHint')" />
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { FullScreenModal, SettingsTab } from '@/mixins'
import { BitTorrentProtocol, ProxyType } from '@/enums/qbit/AppPreferences'
import { defineComponent } from 'vue'
import { mdiEye, mdiEyeOff } from '@mdi/js'

export default defineComponent({
  name: 'Connection',
  computed: {
    ProxyType() {
      return ProxyType
    }
  },
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      proxyTypes: [
        {
          value: ProxyType.DISABLED,
          text: '(None)'
        },
        {
          value: ProxyType.SOCKS4,
          text: 'SOCKS4'
        },
        {
          value: ProxyType.SOCKS5,
          text: 'SOCKS5'
        },
        {
          value: ProxyType.HTTP,
          text: 'HTTP'
        }
      ],
      bittorrent_protocol: [
        { value: BitTorrentProtocol.TCP_uTP, text: this.$t('enums.bittorrentProtocols.tcp_utp') },
        { value: BitTorrentProtocol.TCP, text: this.$t('enums.bittorrentProtocols.tcp') },
        { value: BitTorrentProtocol.uTP, text: this.$t('enums.bittorrentProtocols.utp') }
      ],
      max_conn_enabled: false,
      max_conn_per_torrent_enabled: false,
      max_uploads_enabled: false,
      max_uploads_per_torrent_enabled: false,
      showPassword: false,
      mdiEye,
      mdiEyeOff
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
      // source: https://github.com/qbittorrent/qBittorrent/blob/d83b2a61311b0dc3bc31ee52d1b9eaac715c3cdf/src/webui/www/private/views/preferences.html#L1729-L1734
      const min = 1024
      const max = 65535
      this.settings.listen_port = Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
})
</script>
