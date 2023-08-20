<script setup lang="ts">
import ConfirmShutdownDialog from '@/components/Dialogs/ConfirmShutdownDialog.vue'
import { ConnectionStatus } from '@/constants/qbit'
import { useAppStore, useAuthStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()
const maindataStore = useMaindataStore()
const vueTorrentStore = useVueTorrentStore()

const isAltSpeedEnabled = computed(() => !!maindataStore.serverState?.use_alt_speed_limits)
const connectionStatusIcon = computed(() => {
  switch (maindataStore.serverState?.connection_status) {
    case ConnectionStatus.CONNECTED:
      return 'mdi-check-network'
    case ConnectionStatus.FIREWALLED:
      return 'mdi-close-network'
    case ConnectionStatus.DISCONNECTED:
      return 'mdi-network-off'
    default:
      return 'mdi-help-network'
  }
})

const shutdownDialog = ref(false)

const logout = async () => {
  await authStore.logout()
  await vueTorrentStore.redirectToLogin()
}
const toggleAltSpeed = () => {
  appStore.toggleAlternativeMode()
}
</script>

<template>
  <v-row no-gutters>
    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.logout')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" icon="mdi-exit-to-app" v-bind="props" @click="logout" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.alt_speed')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :color="isAltSpeedEnabled ? 'accent' : undefined" :icon="isAltSpeedEnabled ? 'mdi-speedometer-slow' : 'mdi-speedometer'" v-bind="props" @click="toggleAltSpeed" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.conn_status')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="connectionStatusIcon" v-bind="props" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.dark_mode', Number(vueTorrentStore.darkMode))" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="vueTorrentStore.darkMode ? 'mdi-brightness-4' : 'mdi-brightness-6'" v-bind="props" @click="vueTorrentStore.toggleTheme()" />
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row no-gutters v-if="vueTorrentStore.isShutdownButtonVisible">
    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.shutdown')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn block color="error" rounded="0" v-bind="props">
            <v-icon size="x-large">mdi-power</v-icon>
            <ConfirmShutdownDialog v-model="shutdownDialog" />
          </v-btn>
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>