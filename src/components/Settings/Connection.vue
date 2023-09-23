<script setup lang="ts">
import PasswordField from '@/components/Core/PasswordField.vue'
import { BitTorrentProtocol, ProxyType } from '@/constants/qbit/AppPreferences'
import { usePreferenceStore } from '@/stores'
import { onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const preferenceStore = usePreferenceStore()

const proxyTypes = ref([
  { title: '(None)', value: 'none' },
  { title: 'SOCKS4', value: 'socks4' },
  { title: 'SOCKS5', value: 'socks5' },
  { title: 'HTTP', value: 'http' }
])
const bittorrent_protocol = ref([
  { title: t('constants.bittorrentProtocols.tcp_utp'), value: BitTorrentProtocol.TCP_uTP },
  { title: t('constants.bittorrentProtocols.tcp'), value: BitTorrentProtocol.TCP },
  { title: t('constants.bittorrentProtocols.utp'), value: BitTorrentProtocol.uTP }
])
const max_conn_enabled = ref(false)
const max_conn_per_torrent_enabled = ref(false)
const max_uploads_enabled = ref(false)
const max_uploads_per_torrent_enabled = ref(false)
const proxyType = ref('none')
const proxyAuth = ref(false)

const generateRandomPort = () => {
  // source: https://github.com/qbittorrent/qBittorrent/blob/d83b2a61311b0dc3bc31ee52d1b9eaac715c3cdf/src/webui/www/private/views/preferences.html#L1729-L1734
  const min = 1024
  const max = 65535
  preferenceStore.preferences!.listen_port = Math.floor(Math.random() * (max - min + 1) + min)
}
const updateProxyType = () => {
  switch (proxyType.value) {
    case 'socks5':
      preferenceStore.preferences!.proxy_type = proxyAuth ? ProxyType.SOCKS5_PW : ProxyType.SOCKS5
      preferenceStore.preferences!.proxy_auth_enabled = proxyAuth.value
      break
    case 'http':
      preferenceStore.preferences!.proxy_type = proxyAuth ? ProxyType.HTTP_PW : ProxyType.HTTP
      preferenceStore.preferences!.proxy_auth_enabled = proxyAuth.value
      break
    case 'socks4':
      preferenceStore.preferences!.proxy_type = ProxyType.SOCKS4
      preferenceStore.preferences!.proxy_auth_enabled = false
      break
    case 'none':
    default:
      preferenceStore.preferences!.proxy_type = ProxyType.DISABLED
      preferenceStore.preferences!.proxy_auth_enabled = false
      break
  }
}

onBeforeMount(async () => {
  max_conn_enabled.value = preferenceStore.preferences!.max_connec > 0
  max_conn_per_torrent_enabled.value = preferenceStore.preferences!.max_connec_per_torrent > 0
  max_uploads_enabled.value = preferenceStore.preferences!.max_uploads > 0
  max_uploads_per_torrent_enabled.value = preferenceStore.preferences!.max_uploads_per_torrent > 0

  switch (preferenceStore.preferences!.proxy_type) {
    case ProxyType.SOCKS4:
      proxyType.value = 'socks4'
      break
    case ProxyType.SOCKS5:
    case ProxyType.SOCKS5_PW:
      proxyType.value = 'socks5'
      break
    case ProxyType.HTTP:
    case ProxyType.HTTP_PW:
      proxyType.value = 'http'
      break
    default:
      proxyType.value = 'none'
  }
  proxyAuth.value = preferenceStore.preferences!.proxy_auth_enabled
})

watch(
  () => max_conn_enabled.value,
  newValue => {
    preferenceStore.preferences!.max_connec = newValue ? preferenceStore.preferences!.max_connec : -1
  }
)
watch(
  () => max_conn_per_torrent_enabled.value,
  newValue => {
    preferenceStore.preferences!.max_connec_per_torrent = newValue ? preferenceStore.preferences!.max_connec_per_torrent : -1
  }
)
watch(
  () => max_uploads_enabled.value,
  newValue => {
    preferenceStore.preferences!.max_uploads = newValue ? preferenceStore.preferences!.max_uploads : -1
  }
)
watch(
  () => max_uploads_per_torrent_enabled.value,
  newValue => {
    preferenceStore.preferences!.max_uploads_per_torrent = newValue ? preferenceStore.preferences!.max_uploads_per_torrent : -1
  }
)
watch(
  () => proxyType.value,
  () => {
    updateProxyType()
  }
)
watch(
  () => proxyAuth.value,
  () => {
    updateProxyType()
  }
)
</script>

<template>
  <v-list>
    <v-list-item>
      <v-select v-model="preferenceStore.preferences!.bittorrent_protocol" hide-details :items="bittorrent_protocol" :label="t('settings.connection.protocol')" />
    </v-list-item>

    <v-divider class="mt-3" />
    <v-list-subheader>{{ t('settings.connection.listeningPort.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="preferenceStore.preferences!.listen_port" type="number" hide-details :label="t('settings.connection.listeningPort.incomingConnectionPort')" />
        </v-col>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="generateRandomPort">{{ t('settings.connection.listeningPort.randomPort') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.upnp" hide-details :label="t('settings.connection.listeningPort.useUPnP')" />
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ t('settings.connection.connectionLimits.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="max_conn_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.max_connec"
              :disabled="!max_conn_enabled"
              type="number"
              hide-details
              :label="t('settings.connection.connectionLimits.globalMaxConnection')" />
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="max_conn_per_torrent_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.max_connec_per_torrent"
              :disabled="!max_conn_per_torrent_enabled"
              type="number"
              hide-details
              :label="t('settings.connection.connectionLimits.perTorrentMaxConnection')" />
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="max_uploads_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.max_uploads"
              :disabled="!max_uploads_enabled"
              type="number"
              hide-details
              :label="t('settings.connection.connectionLimits.globalMaxUploadSlots')" />
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="max_uploads_per_torrent_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.max_uploads_per_torrent"
              :disabled="!max_uploads_per_torrent_enabled"
              type="number"
              hide-details
              :label="t('settings.connection.connectionLimits.perTorrentMaxUploadSlots')" />
          </div>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />
    <v-list-subheader>{{ t('settings.connection.proxy.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="proxyType" hide-details :items="proxyTypes" />
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field
            v-model="preferenceStore.preferences!.proxy_ip"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED"
            hide-details
            :label="t('settings.connection.proxy.host')" />
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field
            v-model="preferenceStore.preferences!.proxy_port"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED"
            type="number"
            hide-details
            :label="t('settings.connection.proxy.port')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_peer_connections"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED"
            hide-details
            :label="t('settings.connection.proxy.peerConnections')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_torrents_only"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED || preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4"
            hide-details
            :label="t('settings.connection.proxy.torrentOnly')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_hostname_lookup"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED || preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4"
            hide-details
            :label="t('settings.connection.proxy.hostNameLookup')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="proxyAuth"
            :disabled="preferenceStore.preferences!.proxy_type === ProxyType.DISABLED || preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4"
            hide-details
            :label="t('settings.connection.proxy.auth.subtitle')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="preferenceStore.preferences!.proxy_username"
            :disabled="
              preferenceStore.preferences!.proxy_type === ProxyType.DISABLED ||
              preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4 ||
              !preferenceStore.preferences!.proxy_auth_enabled
            "
            dense
            hide-details
            :label="t('settings.connection.proxy.auth.username')" />
        </v-col>
        <v-col cols="12" sm="6">
          <PasswordField
            v-model="preferenceStore.preferences!.proxy_password"
            :hide-icon="
              preferenceStore.preferences!.proxy_type === ProxyType.DISABLED ||
              preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4 ||
              !preferenceStore.preferences!.proxy_auth_enabled
            "
            :disabled="
              preferenceStore.preferences!.proxy_type === ProxyType.DISABLED ||
              preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4 ||
              !preferenceStore.preferences!.proxy_auth_enabled
            "
            :label="t('settings.connection.proxy.auth.password')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <h5 class="font-italic">{{ t('settings.connection.proxy.auth.tip') }}</h5>
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ t('settings.connection.ipFiltering.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.ip_filter_enabled" hide-details :label="t('settings.connection.ipFiltering.filterPath')" />
      <v-text-field v-model="preferenceStore.preferences!.ip_filter_path" :disabled="!preferenceStore.preferences!.ip_filter_enabled" hide-details />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.ip_filter_trackers" hide-details :label="t('settings.connection.ipFiltering.applyToTrackers')" />
    </v-list-item>

    <v-list-item>
      <v-list-subheader>{{ t('settings.connection.ipFiltering.bannedIps') }}</v-list-subheader>
    </v-list-item>

    <v-list-item>
      <v-textarea v-model="preferenceStore.preferences!.banned_IPs" auto-grow clearable persistent-hint :hint="t('settings.connection.ipFiltering.bannedIpsHint')" />
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
