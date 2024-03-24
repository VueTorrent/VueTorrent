<script setup lang="ts">
import { useDialog } from '@/composables'
import { ConnectionStatus } from '@/constants/qbit'
import { useLogStore, useMaindataStore } from '@/stores'
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const logStore = useLogStore()
const maindataStore = useMaindataStore()

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

const geoDetails = ref<string | null>(null);

const close = () => {
  isOpened.value = false
}

onMounted(() => {
  getGeoDetails();
});

const getGeoDetails = () => {
  const externalIp = logStore.externalIp;
  fetch('https://ipinfo.io/' + externalIp + '/json')
    .then(response => response.json())
    .then(data => {
      geoDetails.value = data.city + ', ' + data.region + ', ' + data.country + ' | ' + data.org;
      console.log('Geolocation Details:', geoDetails.value);
    })
    .catch(error => {
      console.error('Error fetching geolocation details:', error);
    });
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
              <span v-if="logStore.externalIp">{{ logStore.externalIp }}</span>
              <span v-else class="text-warning">{{ $t('dialogs.connectionStatus.noExternalIp') }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div>{{ $t("Geolocation Details") }}</div>
            <div class="ml-2"></div>
              <span v-if="geoDetails">{{ geoDetails }}</span>
              <span v-else>{{ ('Fetching geolocation details failed') }}</span>
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
