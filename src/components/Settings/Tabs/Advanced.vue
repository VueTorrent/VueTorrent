<template>
  <v-card flat>
    <v-subheader>
      {{ $t('modals.settings.advanced.qbittorrent.subheader') }}
      (<a href="https://github.com/qbittorrent/qBittorrent/wiki/Explanation-of-Options-in-qBittorrent#Advanced" target="_blank">{{ $t('modals.settings.advanced.openDoc') }}</a
      >)
    </v-subheader>

    <v-list-item>
      <v-text-field
        v-model="settings.memory_working_set_limit"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.qbittorrent.allocatedRamHint')"
        :label="$t('modals.settings.advanced.qbittorrent.allocatedRam')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.current_network_interface"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="networkInterfaceOptions"
        :label="$t('modals.settings.advanced.qbittorrent.networkInterfaces.label')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.current_interface_address"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="ipAddressesOptions"
        :label="$t('modals.settings.advanced.qbittorrent.ipAddress.label')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.save_resume_data_interval"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.qbittorrent.saveIntervalHint')"
        :label="$t('modals.settings.advanced.qbittorrent.saveInterval')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.recheck_completed_torrents" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.qbittorrent.recheckOnCompletion')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.refresh_interval"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.qbittorrent.refreshIntervalHint')"
        :label="$t('modals.settings.advanced.qbittorrent.refreshInterval')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.resolve_peer_countries" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.qbittorrent.resolveCountries')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.reannounce_when_address_changed" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.qbittorrent.reannounceOnIpPortChanged')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.enable_embedded_tracker" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.qbittorrent.enableEmbeddedTracker')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.embedded_tracker_port"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.qbittorrent.embeddedTrackerPort')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="settings.embedded_tracker_port_forwarding"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.advanced.qbittorrent.embeddedTrackerPortForwarding')"
      />
    </v-list-item>

    <v-divider />
    <v-subheader>
      {{ $t('modals.settings.advanced.libtorrent.subheader') }}
      (<a href="https://www.libtorrent.org/reference-Settings.html" target="_blank">{{ $t('modals.settings.advanced.openDoc') }}</a
      >)
    </v-subheader>

    <v-list-item>
      <v-text-field v-model="settings.async_io_threads" type="number" dense hide-details outlined class="my-5" :label="$t('modals.settings.advanced.libtorrent.asyncIoThreads')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.hashing_threads" type="number" dense hide-details outlined class="my-5" :label="$t('modals.settings.advanced.libtorrent.hashingThreads')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.file_pool_size" type="number" dense hide-details outlined class="my-5" :label="$t('modals.settings.advanced.libtorrent.filePoolSize')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.checking_memory_use"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.libtorrent.outstandingMemoryHint')"
        :label="$t('modals.settings.advanced.libtorrent.outstandingMemory')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.disk_cache"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.libtorrent.diskCacheHint')"
        :label="$t('modals.settings.advanced.libtorrent.diskCache')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.disk_cache_ttl"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.libtorrent.diskCacheExpiryHint')"
        :label="$t('modals.settings.advanced.libtorrent.diskCacheExpiry')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.disk_queue_size"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.advanced.libtorrent.diskQueueSizeHint')"
        :label="$t('modals.settings.advanced.libtorrent.diskQueueSize')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.disk_io_type"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="diskIoTypeOptions"
        :label="$t('modals.settings.advanced.libtorrent.diskIoType')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.disk_io_read_mode"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="diskIoModeReadOptions"
        :label="$t('modals.settings.advanced.libtorrent.diskIoReadMode')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.disk_io_write_mode"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="diskIoModeWriteOptions"
        :label="$t('modals.settings.advanced.libtorrent.diskIoWriteMode')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.enable_coalesce_read_write" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.coalesceReadsWrites')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.enable_piece_extent_affinity" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.pieceExtentAffinity')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.enable_upload_suggestions" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.sendUploadPieceSuggestions')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.send_buffer_watermark"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.sendBufferWatermarkHint')"
        :label="$t('modals.settings.advanced.libtorrent.sendBufferWatermark')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.send_buffer_low_watermark"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.sendBufferLowWatermarkHint')"
        :label="$t('modals.settings.advanced.libtorrent.sendBufferLowWatermark')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.send_buffer_watermark_factor"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.sendBufferWatermarkFactorHint')"
        :label="$t('modals.settings.advanced.libtorrent.sendBufferWatermarkFactor')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.connection_speed"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.outgoingConnectionsPerSecond')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.socket_backlog_size"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.socketBacklogSize')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.outgoing_ports_min"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.outgoingPortsMin')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.outgoing_ports_max"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.outgoingPortsMax')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.upnp_lease_duration"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.upnpLeaseDuration')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.peer_tos" type="number" dense hide-details outlined class="my-5" :label="$t('modals.settings.advanced.libtorrent.peerTos')" />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.utp_tcp_mixed_mode"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="utpTcpMixedModeOptions"
        :label="$t('modals.settings.advanced.libtorrent.utpTcpMixedModeAlgorithm')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.idn_support_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.idnSupport')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="settings.enable_multi_connections_from_same_ip"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.advanced.libtorrent.allowMultipleConnectionsFromTheSameIPAddress')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="settings.validate_https_tracker_certificate"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.advanced.libtorrent.validateHTTPSTrackerCertificate')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.ssrf_mitigation" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.mitigateSSRF')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="settings.block_peers_on_privileged_ports"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.advanced.libtorrent.blockPeersOnPrivilegedPorts')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.upload_slots_behavior"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="uploadSlotsBehaviorOptions"
        :label="$t('modals.settings.advanced.libtorrent.uploadSlotsBehavior')"
      />
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="settings.upload_choking_algorithm"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="uploadChokingAlgorithmOptions"
        :label="$t('modals.settings.advanced.libtorrent.uploadChokingAlgorithm')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.announce_to_all_trackers" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.announceAllTrackers')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.announce_to_all_tiers" hide-details class="ma-0 pa-0" :label="$t('modals.settings.advanced.libtorrent.announceAllTiers')" />
    </v-list-item>

    <v-list-item>
      <v-text-field v-model="settings.announce_ip" type="number" dense hide-details outlined class="my-5" :label="$t('modals.settings.advanced.libtorrent.announceIP')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.max_concurrent_http_announces"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.maxConcurrentHTTPAnnounces')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.stop_tracker_timeout"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.stopTrackerTimeout')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.peer_turnover"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.peerTurnoverHint')"
        :label="$t('modals.settings.advanced.libtorrent.peerTurnover')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.peer_turnover_cutoff"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.peerTurnoverCutoffHint')"
        :label="$t('modals.settings.advanced.libtorrent.peerTurnoverCutoff')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.peer_turnover_interval"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :hint="$t('modals.settings.advanced.libtorrent.peerTurnoverIntervalHint')"
        :label="$t('modals.settings.advanced.libtorrent.peerTurnoverInterval')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.request_queue_size"
        type="number"
        dense
        hide-details
        outlined
        class="my-5"
        :label="$t('modals.settings.advanced.libtorrent.requestQueueSize')"
      />
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, SettingsTab } from '@/mixins'
import { DiskIOMode, DiskIOType, UploadChokingAlgorithm, UploadSlotsBehavior, UtpTcpMixedMode } from '@/enums/qbit/AppPreferences'
import qbit from '@/services/qbit'

export default defineComponent({
  name: 'Advanced',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      networkInterfaceOptions: [{ text: this.$t('modals.settings.advanced.qbittorrent.networkInterfaces.any'), value: '' }],
      ipAddressesOptions: [
        { text: this.$t('modals.settings.advanced.qbittorrent.ipAddress.all'), value: '' },
        { text: this.$t('modals.settings.advanced.qbittorrent.ipAddress.allIPv4'), value: '0.0.0.0' },
        { text: this.$t('modals.settings.advanced.qbittorrent.ipAddress.allIPv6'), value: '::' }
      ],
      diskIoTypeOptions: [
        { text: this.$t('enums.diskIoType.default'), value: DiskIOType.DEFAULT },
        { text: this.$t('enums.diskIoType.memoryMappedFiles'), value: DiskIOType.MEMORY_MAPPED_FILES },
        { text: this.$t('enums.diskIoType.posixCompliant'), value: DiskIOType.POSIX_COMPLIANT }
      ],
      diskIoModeReadOptions: [
        { text: this.$t('enums.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
        { text: this.$t('enums.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE }
      ],
      diskIoModeWriteOptions: [
        { text: this.$t('enums.diskIoMode.disableOsCache'), value: DiskIOMode.DISABLE_OS_CACHE },
        { text: this.$t('enums.diskIoMode.enableOsCache'), value: DiskIOMode.ENABLE_OS_CACHE },
        { text: this.$t('enums.diskIoMode.writeThrough'), value: DiskIOMode.WRITE_THROUGH }
      ],
      utpTcpMixedModeOptions: [
        { text: this.$t('enums.utpTcpMixedMode.preferTcp'), value: UtpTcpMixedMode.PREFER_TCP },
        { text: this.$t('enums.utpTcpMixedMode.peerProportional'), value: UtpTcpMixedMode.PEER_PROPORTIONAL }
      ],
      uploadSlotsBehaviorOptions: [
        { text: this.$t('enums.uploadSlotsBehavior.fixedSlots'), value: UploadSlotsBehavior.FIXED_SLOTS },
        { text: this.$t('enums.uploadSlotsBehavior.uploadRateBased'), value: UploadSlotsBehavior.UPLOAD_RATE_BASED }
      ],
      uploadChokingAlgorithmOptions: [
        { text: this.$t('enums.uploadChokingAlgorithm.roundRobin'), value: UploadChokingAlgorithm.ROUND_ROBIN },
        { text: this.$t('enums.uploadChokingAlgorithm.fastestUpload'), value: UploadChokingAlgorithm.FASTEST_UPLOAD },
        { text: this.$t('enums.uploadChokingAlgorithm.antiLeech'), value: UploadChokingAlgorithm.ANTI_LEECH }
      ]
    }
  },
  async mounted() {
    const networkInterfaces = await qbit.getNetworkInterfaces()
    for (const networkInterface of networkInterfaces) {
      this.networkInterfaceOptions.push({ text: networkInterface.name, value: networkInterface.value })
    }

    const ipAddresses = await qbit.getAddresses(this.settings.current_network_interface)
    for (const ipAddress of ipAddresses) {
      this.ipAddressesOptions.push({ text: ipAddress, value: ipAddress })
    }
  }
})
</script>
