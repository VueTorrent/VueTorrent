<script setup lang="ts">
import { useDialog } from '@/composables'
import { ConnectionStatus } from '@/constants/qbit'
import { useMaindataStore, useVueTorrentStore, useExternalIpStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const externalIpStore = useExternalIpStore()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const connectionStatusColor = computed(() => {
  switch (maindataStore.serverState?.connection_status) {
    case ConnectionStatus.CONNECTED:
      return 'text-success'
    case ConnectionStatus.DISCONNECTED:
      return 'text-error'
    case ConnectionStatus.FIREWALLED:
      return 'text-warning'
    default:
      return 'text-grey'
  }
})

const close = () => {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.status') }}</div>
            <div :class="['ml-2', connectionStatusColor]">
              {{ $t('constants.connectionStatus.' + maindataStore.serverState?.connection_status) }}
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.externalIp') }}</div>
            <div class="ml-2">
              <span v-if="externalIpStore.externalIp">{{ externalIpStore.externalIp }}</span>
              <span v-else class="text-warning">{{ $t('dialogs.connectionStatus.noExternalIp') }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.dht_nodes') }}</div>
            <div class="ml-2">
              {{ maindataStore.serverState?.dht_nodes }}
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.total_peer_connections') }}</div>
            <div class="ml-2">
              {{ maindataStore.serverState?.total_peer_connections }}
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.isp_details') }}</div>
            <div class="ml-2">
              <span v-if="!vuetorrentStore.fetchExternalIpInfo" class="text-grey">{{ $t('dialogs.connectionStatus.fetch_disabled') }}</span>
              <span v-else-if="externalIpStore.ispDetails" class="text-info">{{ externalIpStore.ispDetails }}</span>
              <span v-else class="text-warning">{{ $t('dialogs.connectionStatus.fetch_isp_failed') }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t('dialogs.connectionStatus.geo_details') }}</div>
            <div class="ml-2">
              <span v-if="!vuetorrentStore.fetchExternalIpInfo" class="text-grey">{{ $t('dialogs.connectionStatus.fetch_disabled') }}</span>
              <span v-else-if="externalIpStore.geoDetails" class="text-info">{{ externalIpStore.geoDetails }}</span>
              <span v-else class="text-warning">{{ $t('dialogs.connectionStatus.fetch_geo_failed') }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
