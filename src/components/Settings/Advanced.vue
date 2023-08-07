<script setup lang="ts">
import {
  DiskIOMode,
  DiskIOType,
  UploadChokingAlgorithm,
  UploadSlotsBehavior,
  UtpTcpMixedMode
} from '@/constants/qbit/AppPreferences.ts'
import { qbit } from '@/services'
import { usePreferenceStore } from '@/stores'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()
const preferenceStore = usePreferenceStore()

const networkInterfaceOptions = ref([
  { title: t('settings.advanced.qbittorrent.networking.networkInterfaces.any'), value: '' }
])
const ipAddressesOptions = ref([
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.all'), value: '' },
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.allIPv4'), value: '0.0.0.0' },
  { title: t('settings.advanced.qbittorrent.networking.ipAddress.allIPv6'), value: '::' }
])
const diskIoTypeOptions = ref([
  { title: t('constants.diskIoType.default'), value: DiskIOType.DEFAULT },
  { title: t('constants.diskIoType.memoryMappedFiles'), value: DiskIOType.MEMORY_MAPPED_FILES },
  { title: t('constants.diskIoType.posixCompliant'), value: DiskIOType.POSIX_COMPLIANT }
])
const diskIoModeReadOptions = ref([
  { title: t('constants.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
  { title: t('constants.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE }
])
const diskIoModeWriteOptions = ref([
  { title: t('constants.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
  { title: t('constants.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE },
  { title: t('constants.diskIoMode.writeThrough'), value: DiskIOMode.WRITE_THROUGH }
])
const utpTcpMixedModeOptions = ref([
  { title: t('constants.utpTcpMixedMode.preferTcp'), value: UtpTcpMixedMode.PREFER_TCP },
  { title: t('constants.utpTcpMixedMode.peerProportional'), value: UtpTcpMixedMode.PEER_PROPORTIONAL }
])
const uploadSlotsBehaviorOptions = ref([
  { title: t('constants.uploadSlotsBehavior.fixedSlots'), value: UploadSlotsBehavior.FIXED_SLOTS },
  { title: t('constants.uploadSlotsBehavior.uploadRateBased'), value: UploadSlotsBehavior.UPLOAD_RATE_BASED }
])
const uploadChokingAlgorithmOptions = ref([
  { title: t('constants.uploadChokingAlgorithm.roundRobin'), value: UploadChokingAlgorithm.ROUND_ROBIN },
  { title: t('constants.uploadChokingAlgorithm.fastestUpload'), value: UploadChokingAlgorithm.FASTEST_UPLOAD },
  { title: t('constants.uploadChokingAlgorithm.antiLeech'), value: UploadChokingAlgorithm.ANTI_LEECH }
])

onBeforeMount(async () => {
  const networkInterfaces = await qbit.getNetworkInterfaces()
  for (const networkInterface of networkInterfaces) {
    networkInterfaceOptions.value.push({ title: networkInterface.name, value: networkInterface.value })
  }

  const ipAddresses = await qbit.getAddresses(preferenceStore.preferences!.current_network_interface)
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
      target="_blank">{{ t('settings.advanced.openDoc') }}</a>)
    </v-list-subheader>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.memory_working_set_limit"
        type="number"
        hide-details
        :hint="t('settings.advanced.qbittorrent.allocatedRamHint')"
        :label="t('settings.advanced.qbittorrent.allocatedRam')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.save_resume_data_interval"
        type="number"
        :hint="t('settings.advanced.qbittorrent.saveIntervalHint')"
        :label="t('settings.advanced.qbittorrent.saveInterval')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.recheck_completed_torrents"
                  hide-details
                  :label="t('settings.advanced.qbittorrent.recheckOnCompletion')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.refresh_interval"
        type="number"
        :hint="t('settings.advanced.qbittorrent.refreshIntervalHint')"
        :label="t('settings.advanced.qbittorrent.refreshInterval')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.resolve_peer_countries"
                  hide-details
                  :label="t('settings.advanced.qbittorrent.resolveCountries')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.reannounce_when_address_changed"
                  hide-details
                  :label="t('settings.advanced.qbittorrent.reannounceOnIpPortChanged')" />
    </v-list-item>

    <v-list-subheader>{{ t('settings.advanced.qbittorrent.networking.title') }}</v-list-subheader>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.current_network_interface"
        hide-details
        :items="networkInterfaceOptions"
        :label="t('settings.advanced.qbittorrent.networking.networkInterfaces.label')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.current_interface_address"
        hide-details
        :items="ipAddressesOptions"
        :label="t('settings.advanced.qbittorrent.networking.ipAddress.label')" />
    </v-list-item>

    <v-list-subheader>{{ t('settings.advanced.qbittorrent.embeddedTracker.title') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.enable_embedded_tracker"
                  hide-details
                  :label="t('settings.advanced.qbittorrent.embeddedTracker.enable')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.embedded_tracker_port"
        type="number"
        hide-details
        :label="t('settings.advanced.qbittorrent.embeddedTracker.port')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.embedded_tracker_port_forwarding"
        hide-details
        :label="t('settings.advanced.qbittorrent.embeddedTracker.portForward')" />
    </v-list-item>

    <v-divider />

    <v-list-subheader>
      {{ t('settings.advanced.libtorrent.subheader') }} (
      <a href="https://www.libtorrent.org/reference-Settings.html" target="_blank">
        {{ t('settings.advanced.openDoc') }}
      </a>
      )
    </v-list-subheader>

    <v-list-item>
      <v-text-field v-model="preferenceStore.preferences!.async_io_threads"
                    type="number"
                    hide-details
                    :label="t('settings.advanced.libtorrent.asyncIoThreads')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="preferenceStore.preferences!.hashing_threads" type="number"
                    hide-details
                    :label="t('settings.advanced.libtorrent.hashingThreads')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="preferenceStore.preferences!.file_pool_size" type="number"
                    hide-details
                    :label="t('settings.advanced.libtorrent.filePoolSize')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.checking_memory_use"
        type="number"
        :hint="t('settings.advanced.libtorrent.outstandingMemoryHint')"
        :label="t('settings.advanced.libtorrent.outstandingMemory')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.disk_cache"
        type="number"
        :hint="t('settings.advanced.libtorrent.diskCacheHint')"
        :label="t('settings.advanced.libtorrent.diskCache')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.disk_cache_ttl"
        type="number"
        :hint="t('settings.advanced.libtorrent.diskCacheExpiryHint')"
        :label="t('settings.advanced.libtorrent.diskCacheExpiry')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.disk_queue_size"
        type="number"
        :hint="t('settings.advanced.libtorrent.diskQueueSizeHint')"
        :label="t('settings.advanced.libtorrent.diskQueueSize')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.disk_io_type"
        hide-details
        :items="diskIoTypeOptions"
        :label="t('settings.advanced.libtorrent.diskIoType')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.disk_io_read_mode"
        hide-details
        :items="diskIoModeReadOptions"
        :label="t('settings.advanced.libtorrent.diskIoReadMode')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.disk_io_write_mode"
        hide-details
        :items="diskIoModeWriteOptions"
        :label="t('settings.advanced.libtorrent.diskIoWriteMode')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.enable_coalesce_read_write"
                  hide-details
                  :label="t('settings.advanced.libtorrent.coalesceReadsWrites')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.enable_piece_extent_affinity"
                  hide-details
                  :label="t('settings.advanced.libtorrent.pieceExtentAffinity')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.enable_upload_suggestions"
                  hide-details
                  :label="t('settings.advanced.libtorrent.sendUploadPieceSuggestions')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.send_buffer_watermark"
        type="number"
        hide-details
        :hint="t('settings.advanced.libtorrent.sendBufferWatermarkHint')"
        :label="t('settings.advanced.libtorrent.sendBufferWatermark')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.send_buffer_low_watermark"
        type="number"
        hide-details
        :hint="t('settings.advanced.libtorrent.sendBufferLowWatermarkHint')"
        :label="t('settings.advanced.libtorrent.sendBufferLowWatermark')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.send_buffer_watermark_factor"
        type="number"
        hide-details
        :hint="t('settings.advanced.libtorrent.sendBufferWatermarkFactorHint')"
        :label="t('settings.advanced.libtorrent.sendBufferWatermarkFactor')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.connection_speed"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.outgoingConnectionsPerSecond')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.socket_backlog_size"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.socketBacklogSize')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.outgoing_ports_min"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.outgoingPortsMin')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.outgoing_ports_max"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.outgoingPortsMax')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.upnp_lease_duration"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.upnpLeaseDuration')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="preferenceStore.preferences!.peer_tos"
                    type="number"
                    hide-details
                    :label="t('settings.advanced.libtorrent.peerTos')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.utp_tcp_mixed_mode"
        hide-details
        :items="utpTcpMixedModeOptions"
        :label="t('settings.advanced.libtorrent.utpTcpMixedModeAlgorithm')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.idn_support_enabled"
                  hide-details
                  :label="t('settings.advanced.libtorrent.idnSupport')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.enable_multi_connections_from_same_ip"
        hide-details
        :label="t('settings.advanced.libtorrent.allowMultipleConnectionsFromTheSameIPAddress')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.validate_https_tracker_certificate"
        hide-details
        :label="t('settings.advanced.libtorrent.validateHTTPSTrackerCertificate')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.ssrf_mitigation"
                  hide-details
                  :label="t('settings.advanced.libtorrent.mitigateSSRF')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.block_peers_on_privileged_ports"
        hide-details
        :label="t('settings.advanced.libtorrent.blockPeersOnPrivilegedPorts')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.upload_slots_behavior"
        hide-details
        :items="uploadSlotsBehaviorOptions"
        :label="t('settings.advanced.libtorrent.uploadSlotsBehavior')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.upload_choking_algorithm"
        hide-details
        :items="uploadChokingAlgorithmOptions"
        :label="t('settings.advanced.libtorrent.uploadChokingAlgorithm')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.announce_to_all_trackers"
                  hide-details
                  :label="t('settings.advanced.libtorrent.announceAllTrackers')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.announce_to_all_tiers"
                  hide-details
                  :label="t('settings.advanced.libtorrent.announceAllTiers')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="preferenceStore.preferences!.announce_ip" type="number"
                    hide-details
                    :label="t('settings.advanced.libtorrent.announceIP')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.max_concurrent_http_announces"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.maxConcurrentHTTPAnnounces')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.stop_tracker_timeout"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.stopTrackerTimeout')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.peer_turnover"
        type="number"
        hide-details
        :hint="t('settings.advanced.libtorrent.peerTurnoverHint')"
        :label="t('settings.advanced.libtorrent.peerTurnover')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.peer_turnover_cutoff"
        type="number"
        hide-details
        :hint="t('settings.advanced.libtorrent.peerTurnoverCutoffHint')"
        :label="t('settings.advanced.libtorrent.peerTurnoverCutoff')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.peer_turnover_interval"
        type="number"
        :hint="t('settings.advanced.libtorrent.peerTurnoverIntervalHint')"
        :label="t('settings.advanced.libtorrent.peerTurnoverInterval')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.request_queue_size"
        type="number"
        hide-details
        :label="t('settings.advanced.libtorrent.requestQueueSize')" />
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">

</style>