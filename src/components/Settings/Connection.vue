<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import AutofillableField from '@/components/Core/AutofillableField.vue'
import PasswordField from '@/components/Core/PasswordField.vue'
import { useI18nUtils } from '@/composables'
import { BitTorrentProtocol, ProxyType } from '@/constants/qbit/AppPreferences'
import { useAppStore, usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const appStore = useAppStore()
const preferenceStore = usePreferenceStore()

const proxyTypes = ref([
  { title: t('common.none'), value: ProxyType.NONE },
  { title: t('constants.proxy_type.socks4'), value: ProxyType.SOCKS4 },
  { title: t('constants.proxy_type.socks5'), value: ProxyType.SOCKS5 },
  { title: t('constants.proxy_type.http'), value: ProxyType.HTTP },
])
const isProxyDisabled = computed(() => preferenceStore.preferences!.proxy_type === ProxyType.NONE)
const isProxySocks4 = computed(() => preferenceStore.preferences!.proxy_type === ProxyType.SOCKS4)
const isProxyAuthDisabled = computed(() => isProxyDisabled.value || isProxySocks4.value)

const bittorrent_protocol = ref([
  { title: t('constants.bittorrentProtocols.tcp_utp'), value: BitTorrentProtocol.TCP_uTP },
  { title: t('constants.bittorrentProtocols.tcp'), value: BitTorrentProtocol.TCP },
  { title: t('constants.bittorrentProtocols.utp'), value: BitTorrentProtocol.uTP },
])
const max_conn_enabled = ref(false)
const max_conn_per_torrent_enabled = ref(false)
const max_uploads_enabled = ref(false)
const max_uploads_per_torrent_enabled = ref(false)

const portRule = [(v: number) => (v >= 0 && v <= 65535) || t('settings.connection.i2p.rule')]

function generateRandomPort() {
  // source: https://github.com/qbittorrent/qBittorrent/blob/d83b2a61311b0dc3bc31ee52d1b9eaac715c3cdf/src/webui/www/private/views/preferences.html#L1729-L1734
  const min = 1024
  const max = 65535
  preferenceStore.preferences!.listen_port = Math.floor(Math.random() * (max - min + 1) + min)
}

onBeforeMount(() => {
  max_conn_enabled.value = preferenceStore.preferences!.max_connec > 0
  max_conn_per_torrent_enabled.value = preferenceStore.preferences!.max_connec_per_torrent > 0
  max_uploads_enabled.value = preferenceStore.preferences!.max_uploads > 0
  max_uploads_per_torrent_enabled.value = preferenceStore.preferences!.max_uploads_per_torrent > 0
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
          <v-text-field
            v-model.number="preferenceStore.preferences!.listen_port"
            type="number"
            hide-details
            :label="t('settings.connection.listeningPort.incomingConnectionPort')" />
        </v-col>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="generateRandomPort">
            {{ t('settings.connection.listeningPort.randomPort') }}
          </v-btn>
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
              v-model.number="preferenceStore.preferences!.max_connec"
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
              v-model.number="preferenceStore.preferences!.max_connec_per_torrent"
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
              v-model.number="preferenceStore.preferences!.max_uploads"
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
              v-model.number="preferenceStore.preferences!.max_uploads_per_torrent"
              :disabled="!max_uploads_per_torrent_enabled"
              type="number"
              hide-details
              :label="t('settings.connection.connectionLimits.perTorrentMaxUploadSlots')" />
          </div>
        </v-col>
      </v-row>
    </v-list-item>

    <template v-if="appStore.usesQbit5">
      <v-divider class="mt-3" />
      <v-list-subheader>{{ t('settings.connection.i2p.subheader') }}</v-list-subheader>

      <v-list-item>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-checkbox v-model="preferenceStore.preferences!.i2p_enabled" hide-details :label="t('settings.connection.i2p.enabled')" />
          </v-col>

          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="preferenceStore.preferences!.i2p_address"
              :disabled="!preferenceStore.preferences!.i2p_enabled"
              hide-details
              :label="t('settings.connection.i2p.address')" />
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="preferenceStore.preferences!.i2p_port"
              :disabled="!preferenceStore.preferences!.i2p_enabled"
              :rules="portRule"
              type="number"
              min="0"
              max="65535"
              :label="t('settings.connection.i2p.port')" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-checkbox
              v-model="preferenceStore.preferences!.i2p_mixed_mode"
              :disabled="!preferenceStore.preferences!.i2p_enabled"
              hide-details
              :label="t('settings.connection.i2p.mixedMode')" />
          </v-col>

          <v-col cols="12" class="pt-0">
            <h5 class="text-warning font-italic">
              {{ t('settings.connection.i2p.disclaimer') }}
            </h5>
          </v-col>
        </v-row>
      </v-list-item>
    </template>

    <v-divider class="mt-3" />
    <v-list-subheader>{{ t('settings.connection.proxy.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" md="4">
          <v-select v-model="preferenceStore.preferences!.proxy_type" hide-details :items="proxyTypes" />
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field v-model="preferenceStore.preferences!.proxy_ip" :disabled="isProxyDisabled" hide-details :label="t('settings.connection.proxy.host')" />
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.proxy_port"
            :disabled="isProxyDisabled"
            type="number"
            hide-details
            :label="t('settings.connection.proxy.port')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="3">
          <v-checkbox v-model="preferenceStore.preferences!.proxy_bittorrent" :disabled="isProxyDisabled" hide-details :label="t('settings.connection.proxy.bittorrent')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_peer_connections"
            :disabled="isProxyDisabled || !preferenceStore.preferences!.proxy_bittorrent"
            hide-details
            :label="t('settings.connection.proxy.peerConnections')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-checkbox v-model="preferenceStore.preferences!.proxy_rss" :disabled="isProxyAuthDisabled" :label="t('settings.connection.proxy.rss')" hide-details />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-checkbox v-model="preferenceStore.preferences!.proxy_misc" :disabled="isProxyAuthDisabled" :label="t('settings.connection.proxy.misc')" hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_hostname_lookup"
            :disabled="isProxyAuthDisabled"
            hide-details
            :label="t('settings.connection.proxy.hostNameLookup')" />
        </v-col>

        <v-col cols="12">
          <v-checkbox
            v-model="preferenceStore.preferences!.proxy_auth_enabled"
            :disabled="isProxyAuthDisabled"
            hide-details
            :label="t('settings.connection.proxy.auth.subtitle')" />
        </v-col>
        <v-col cols="12" sm="6">
          <AutofillableField
            id="proxy-username"
            v-model="preferenceStore.preferences!.proxy_username"
            :disabled="isProxyAuthDisabled || !preferenceStore.preferences!.proxy_auth_enabled"
            :title="t('settings.connection.proxy.auth.username')"
            autocomplete="username"
            autofocus
            name="proxy-username" />
        </v-col>
        <v-col cols="12" sm="6">
          <PasswordField
            id="proxy-password"
            v-model="preferenceStore.preferences!.proxy_password"
            :disabled="isProxyAuthDisabled || !preferenceStore.preferences!.proxy_auth_enabled"
            :hide-icon="isProxyAuthDisabled || !preferenceStore.preferences!.proxy_auth_enabled"
            :title="t('settings.connection.proxy.auth.password')"
            autocomplete="current-password"
            name="proxy-password" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <h5 class="font-italic">
        {{ t('settings.connection.proxy.auth.tip') }}
      </h5>
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
