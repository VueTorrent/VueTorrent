<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import {
  DiskIOMode,
  DiskIOType,
  ResumeDataStorageType,
  TorrentContentRemoveOption,
  UploadChokingAlgorithm,
  UploadSlotsBehavior,
  UtpTcpMixedMode,
} from '@/constants/qbit/AppPreferences'
import qbit from '@/services/qbit'
import { useAppStore, usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const appStore = useAppStore()
const { preferences: pref } = storeToRefs(usePreferenceStore())

const resumeDataStorageTypeOptions = [
  { title: t('settings.advanced.qbittorrent.resumeDataStorageType.legacy'), value: ResumeDataStorageType.LEGACY },
  { title: t('settings.advanced.qbittorrent.resumeDataStorageType.sqlite'), value: ResumeDataStorageType.SQLITE },
]
const torrentContentRemovingMode = [
  { title: t('constants.torrentContentRemovingMode.delete'), value: TorrentContentRemoveOption.DELETE },
  { title: t('constants.torrentContentRemovingMode.moveToTrash'), value: TorrentContentRemoveOption.MOVE_TO_TRASH },
]
const networkInterfaceOptions = ref([
  {
    title: t('settings.advanced.qbittorrent.networking.networkInterfaces.any'),
    value: '',
  },
])
const ipAddressesOptions = ref([
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.all'), value: '' },
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.allIPv4'), value: '0.0.0.0' },
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.allIPv6'), value: '::' },
])
const diskIoTypeOptions = [
  { title: t('constants.diskIoType.default'), value: DiskIOType.DEFAULT },
  { title: t('constants.diskIoType.memoryMappedFiles'), value: DiskIOType.MEMORY_MAPPED_FILES },
  { title: t('constants.diskIoType.posixCompliant'), value: DiskIOType.POSIX_COMPLIANT },
  { title: t('constants.diskIoType.simplePreadPwrite'), value: DiskIOType.SIMPLE_PREAD_PWRITE },
]
const diskIoModeReadOptions = [
  { title: t('constants.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
  { title: t('constants.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE },
]
const diskIoModeWriteOptions = [
  { title: t('constants.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
  { title: t('constants.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE },
  { title: t('constants.diskIoMode.writeThrough'), value: DiskIOMode.WRITE_THROUGH },
]
const utpTcpMixedModeOptions = [
  { title: t('constants.utpTcpMixedMode.preferTcp'), value: UtpTcpMixedMode.PREFER_TCP },
  { title: t('constants.utpTcpMixedMode.peerProportional'), value: UtpTcpMixedMode.PEER_PROPORTIONAL },
]
const uploadSlotsBehaviorOptions = [
  { title: t('constants.uploadSlotsBehavior.fixedSlots'), value: UploadSlotsBehavior.FIXED_SLOTS },
  { title: t('constants.uploadSlotsBehavior.uploadRateBased'), value: UploadSlotsBehavior.UPLOAD_RATE_BASED },
]
const uploadChokingAlgorithmOptions = [
  { title: t('constants.uploadChokingAlgorithm.roundRobin'), value: UploadChokingAlgorithm.ROUND_ROBIN },
  { title: t('constants.uploadChokingAlgorithm.fastestUpload'), value: UploadChokingAlgorithm.FASTEST_UPLOAD },
  { title: t('constants.uploadChokingAlgorithm.antiLeech'), value: UploadChokingAlgorithm.ANTI_LEECH },
]

const i2pQuantityRules = [(v: number) => (v >= 1 && v <= 16) || t('settings.advanced.libtorrent.i2p.invalidQuantity')]

const i2pLengthRules = [(v: number) => (v >= 0 && v <= 7) || t('settings.advanced.libtorrent.i2p.invalidLength')]

const sslRules = [(v: number) => (v >= 0 && v <= 65535) || t('settings.advanced.libtorrent.ssl.rule')]

const torrentFileSizeLimit = computed({
  get: () => pref.value!.torrent_file_size_limit / 1024 / 1024,
  set: (value: number) => (pref.value!.torrent_file_size_limit = value * 1024 * 1024),
})

const diskQueueSize = computed({
  get: () => pref.value!.disk_queue_size / 1024,
  set: (value: number) => (pref.value!.disk_queue_size = value * 1024),
})

const socketSendBufferSize = computed({
  get: () => pref.value!.socket_send_buffer_size / 1024,
  set: (value: number) => (pref.value!.socket_send_buffer_size = value * 1024),
})

const socketReceiveBufferSize = computed({
  get: () => pref.value!.socket_receive_buffer_size / 1024,
  set: (value: number) => (pref.value!.socket_receive_buffer_size = value * 1024),
})

onBeforeMount(async () => {
  const networkInterfaces = await qbit.getNetworkInterfaces()
  for (const networkInterface of networkInterfaces) {
    networkInterfaceOptions.value.push({ title: networkInterface.name, value: networkInterface.value })
  }

  const ipAddresses = await qbit.getAddresses(pref.value!.current_network_interface)
  for (const ipAddress of ipAddresses) {
    ipAddressesOptions.value.push({ title: ipAddress, value: ipAddress })
  }
})
</script>

<template>
  <v-list>
    <v-list-subheader>
      {{ t('settings.advanced.qbittorrent.subheader') }} (<a
        href="https://github.com/qbittorrent/qBittorrent/wiki/Explanation-of-Options-in-qBittorrent#Advanced"
        target="_blank"
        >{{ t('settings.advanced.openDoc') }}</a
      >)
    </v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="pref!.resume_data_storage_type"
            hide-details
            :items="resumeDataStorageTypeOptions"
            :label="t('settings.advanced.qbittorrent.resumeDataStorageType.label')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model.number="pref!.save_resume_data_interval"
            type="number"
            hide-details
            :suffix="t('units.minutes', pref!.save_resume_data_interval)"
            :label="t('settings.advanced.qbittorrent.saveInterval')" />
        </v-col>

        <template v-if="appStore.usesQbit5">
          <v-col cols="12">
            <v-select
              v-model="pref!.torrent_content_remove_option"
              :items="torrentContentRemovingMode"
              hide-details
              :label="t('settings.advanced.qbittorrent.torrentContentRemovingMode')" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pref!.app_instance_name" hide-details :label="t('settings.advanced.qbittorrent.appInstanceName')" />
          </v-col>
        </template>

        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.memory_working_set_limit" type="number" hide-details suffix="MiB" :label="t('settings.advanced.qbittorrent.allocatedRam')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="torrentFileSizeLimit" type="number" hide-details suffix="MiB" :label="t('settings.advanced.qbittorrent.torrentFileSizeLimit')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.recheck_completed_torrents" hide-details :label="t('settings.advanced.qbittorrent.recheckOnCompletion')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.refresh_interval" type="number" hide-details suffix="ms" :label="t('settings.advanced.qbittorrent.refreshInterval')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.resolve_peer_countries" hide-details :label="t('settings.advanced.qbittorrent.resolveCountries')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.reannounce_when_address_changed" hide-details :label="t('settings.advanced.qbittorrent.reannounceOnIpPortChanged')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10" />
    <v-list-subheader>{{ t('settings.advanced.qbittorrent.networking.title') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="pref!.current_network_interface"
            hide-details
            :items="networkInterfaceOptions"
            :label="t('settings.advanced.qbittorrent.networking.networkInterfaces.label')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="pref!.current_interface_address" hide-details :items="ipAddressesOptions" :label="t('settings.advanced.qbittorrent.networking.ipAddress.label')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 mt-3" />
    <v-list-subheader>{{ t('settings.advanced.qbittorrent.embeddedTracker.title') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-checkbox v-model="pref!.enable_embedded_tracker" hide-details :label="t('settings.advanced.qbittorrent.embeddedTracker.enable')" />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model.number="pref!.embedded_tracker_port"
            :disabled="!pref!.enable_embedded_tracker"
            type="number"
            hide-details
            :label="t('settings.advanced.qbittorrent.embeddedTracker.port')" />
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-checkbox v-model="pref!.embedded_tracker_port_forwarding" hide-details :label="t('settings.advanced.qbittorrent.embeddedTracker.portForward')" />
        </v-col>
      </v-row>
    </v-list-item>

    <template v-if="appStore.usesQbit5">
      <v-divider class="mx-10" />
      <v-list-item>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              v-model="pref!.mark_of_the_web"
              density="compact"
              persistent-hint
              :label="t('settings.advanced.qbittorrent.enableMarkOfTheWeb')"
              :hint="t('settings.advanced.qbittorrent.enableMarkOfTheWebHint')" />
          </v-col>

          <v-col cols="12" class="pt-0">
            <v-text-field
              v-model="pref!.python_executable_path"
              hide-details
              :label="t('settings.advanced.qbittorrent.pythonExecutablePath')"
              :hint="t('settings.advanced.qbittorrent.pythonExecutablePathHint')" />
          </v-col>
        </v-row>
      </v-list-item>
    </template>

    <v-divider class="mt-3" />

    <v-list-subheader>
      {{ t('settings.advanced.libtorrent.subheader') }} (
      <a href="https://www.libtorrent.org/reference-Settings.html" target="_blank">
        {{ t('settings.advanced.openDoc') }}
      </a>
      )
    </v-list-subheader>

    <v-list-subheader>{{ t('settings.advanced.libtorrent.threads.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.async_io_threads" type="number" hide-details :label="t('settings.advanced.libtorrent.threads.asyncIoThreads')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.hashing_threads" type="number" hide-details :label="t('settings.advanced.libtorrent.threads.hashingThreads')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.file_pool_size" type="number" hide-details :label="t('settings.advanced.libtorrent.threads.filePoolSize')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.checking_memory_use" type="number" hide-details suffix="MiB" :label="t('settings.advanced.libtorrent.threads.outstandingMemory')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 mt-3" />
    <v-list-subheader>{{ t('settings.advanced.libtorrent.disk.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.disk_cache" type="number" hide-details suffix="MiB" :label="t('settings.advanced.libtorrent.disk.diskCache')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model.number="pref!.disk_cache_ttl"
            type="number"
            hide-details
            :suffix="t('units.seconds', pref!.disk_cache_ttl)"
            :label="t('settings.advanced.libtorrent.disk.diskCacheExpiry')" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model.number="diskQueueSize" type="number" hide-details suffix="kiB" :label="t('settings.advanced.libtorrent.disk.diskQueueSize')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-select v-model="pref!.disk_io_type" hide-details :items="diskIoTypeOptions" :label="t('settings.advanced.libtorrent.disk.diskIoType')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select v-model="pref!.disk_io_read_mode" hide-details :items="diskIoModeReadOptions" :label="t('settings.advanced.libtorrent.disk.diskIoReadMode')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select v-model="pref!.disk_io_write_mode" hide-details :items="diskIoModeWriteOptions" :label="t('settings.advanced.libtorrent.disk.diskIoWriteMode')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 my-3" />

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.bdecode_depth_limit" type="number" hide-details :label="t('settings.advanced.libtorrent.threads.bdecodeDepthLimit')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.bdecode_token_limit" type="number" hide-details :label="t('settings.advanced.libtorrent.threads.bdecodeTokenLimit')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.enable_coalesce_read_write" hide-details :label="t('settings.advanced.libtorrent.coalesceReadsWrites')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.enable_piece_extent_affinity" hide-details :label="t('settings.advanced.libtorrent.pieceExtentAffinity')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.enable_upload_suggestions" hide-details :label="t('settings.advanced.libtorrent.sendUploadPieceSuggestions')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field v-model.number="pref!.send_buffer_watermark" type="number" hide-details suffix="kiB" :label="t('settings.advanced.libtorrent.sendBufferWatermark')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pref!.send_buffer_low_watermark"
            type="number"
            hide-details
            suffix="kiB"
            :label="t('settings.advanced.libtorrent.sendBufferLowWatermark')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pref!.send_buffer_watermark_factor"
            type="number"
            hide-details
            suffix="%"
            :label="t('settings.advanced.libtorrent.sendBufferWatermarkFactor')" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model.number="pref!.connection_speed" type="number" hide-details :label="t('settings.advanced.libtorrent.outgoingConnectionsPerSecond')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="socketSendBufferSize"
            type="number"
            :label="t('settings.advanced.libtorrent.socketSendBufferSize')"
            :hint="t('settings.advanced.libtorrent.socketSendBufferSizeHint')"
            suffix="kiB" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="socketReceiveBufferSize"
            type="number"
            :label="t('settings.advanced.libtorrent.socketReceiveBufferSize')"
            :hint="t('settings.advanced.libtorrent.socketReceiveBufferSizeHint')"
            suffix="kiB" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field v-model.number="pref!.socket_backlog_size" type="number" hide-details :label="t('settings.advanced.libtorrent.socketBacklogSize')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 mt-3" />
    <v-list-subheader>{{ t('settings.advanced.libtorrent.networking.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.outgoing_ports_min" type="number" hide-details :label="t('settings.advanced.libtorrent.networking.outgoingPortsMin')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.outgoing_ports_max" type="number" hide-details :label="t('settings.advanced.libtorrent.networking.outgoingPortsMax')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.upnp_lease_duration" type="number" hide-details :label="t('settings.advanced.libtorrent.networking.upnpLeaseDuration')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.peer_tos" type="number" hide-details :label="t('settings.advanced.libtorrent.networking.peerTos')" />
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="pref!.utp_tcp_mixed_mode"
            hide-details
            :items="utpTcpMixedModeOptions"
            :label="t('settings.advanced.libtorrent.networking.utpTcpMixedModeAlgorithm')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 mt-3" />
    <v-list-subheader>{{ t('settings.advanced.libtorrent.security.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.idn_support_enabled" hide-details :label="t('settings.advanced.libtorrent.security.idnSupport')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox
            v-model="pref!.enable_multi_connections_from_same_ip"
            hide-details
            :label="t('settings.advanced.libtorrent.security.allowMultipleConnectionsFromTheSameIPAddress')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.validate_https_tracker_certificate" hide-details :label="t('settings.advanced.libtorrent.security.validateHTTPSTrackerCertificate')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.ssrf_mitigation" hide-details :label="t('settings.advanced.libtorrent.security.mitigateSSRF')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-checkbox v-model="pref!.block_peers_on_privileged_ports" hide-details :label="t('settings.advanced.libtorrent.security.blockPeersOnPrivilegedPorts')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 my-3" />

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select v-model="pref!.upload_slots_behavior" hide-details :items="uploadSlotsBehaviorOptions" :label="t('settings.advanced.libtorrent.uploadSlotsBehavior')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="pref!.upload_choking_algorithm"
            hide-details
            :items="uploadChokingAlgorithmOptions"
            :label="t('settings.advanced.libtorrent.uploadChokingAlgorithm')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.announce_to_all_trackers" hide-details :label="t('settings.advanced.libtorrent.announceAllTrackers')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="pref!.announce_to_all_tiers" hide-details :label="t('settings.advanced.libtorrent.announceAllTiers')" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="pref!.announce_ip" hide-details :label="t('settings.advanced.libtorrent.announceIP')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.max_concurrent_http_announces" type="number" hide-details :label="t('settings.advanced.libtorrent.maxConcurrentHTTPAnnounces')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model.number="pref!.stop_tracker_timeout" type="number" hide-details :label="t('settings.advanced.libtorrent.stopTrackerTimeout')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field v-model.number="pref!.peer_turnover" type="number" hide-details suffix="%" :label="t('settings.advanced.libtorrent.peerTurnover')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field v-model.number="pref!.peer_turnover_cutoff" type="number" hide-details suffix="%" :label="t('settings.advanced.libtorrent.peerTurnoverCutoff')" />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pref!.peer_turnover_interval"
            type="number"
            hide-details
            :suffix="t('units.seconds', pref!.peer_turnover_interval)"
            :label="t('settings.advanced.libtorrent.peerTurnoverInterval')" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model.number="pref!.request_queue_size" type="number" hide-details :label="t('settings.advanced.libtorrent.requestQueueSize')" />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="pref!.dht_bootstrap_nodes"
            :label="t('settings.advanced.libtorrent.dhtBootstrapNodes')"
            :hint="t('settings.advanced.libtorrent.dhtBootstrapNodesHint')" />
        </v-col>
      </v-row>
    </v-list-item>

    <template v-if="appStore.usesQbit5">
      <v-divider class="mb-3" />

      <v-list-item>
        <v-row>
          <v-col cols="12">
            <h5 class="font-italic">
              {{ t('settings.advanced.libtorrent.i2p.restartNeeded') }}
            </h5>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="pref!.i2p_inbound_quantity"
              :rules="i2pQuantityRules"
              type="number"
              min="1"
              max="16"
              :label="t('settings.advanced.libtorrent.i2p.inboundQuantity')" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="pref!.i2p_outbound_quantity"
              :rules="i2pQuantityRules"
              type="number"
              min="1"
              max="16"
              :label="t('settings.advanced.libtorrent.i2p.outboundQuantity')" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pref!.i2p_inbound_length" :rules="i2pLengthRules" type="number" min="0" max="7" :label="t('settings.advanced.libtorrent.i2p.inboundLength')" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pref!.i2p_outbound_length" :rules="i2pLengthRules" type="number" min="0" max="7" :label="t('settings.advanced.libtorrent.i2p.outboundLength')" />
          </v-col>
        </v-row>

        <v-divider class="mt-5" thickness="3" />

        <v-row>
          <v-col cols="12" class="pb-0">
            <v-checkbox v-model="pref!.ssl_enabled" hide-details :label="t('settings.advanced.libtorrent.ssl.enabled')" />
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field
              v-model="pref!.ssl_listen_port"
              :rules="sslRules"
              type="number"
              min="0"
              max="65535"
              :label="t('settings.advanced.libtorrent.ssl.listenPort')"
              :hint="t('settings.advanced.libtorrent.ssl.listenPortHint')" />
          </v-col>
        </v-row>
      </v-list-item>
    </template>
  </v-list>
</template>
