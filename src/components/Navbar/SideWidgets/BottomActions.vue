<script setup lang="ts">
import ConnectionStatusDialog from '@/components/Dialogs/ConnectionStatusDialog.vue'
import { ConnectionStatus } from '@/constants/qbit'
import { ThemeMode } from '@/constants/vuetorrent'
import { useAppStore, useDialogStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { toast } from 'vue3-toastify'

const { t } = useI18nUtils()
const appStore = useAppStore()
const dialogStore = useDialogStore()
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
    case ConnectionStatus.UNKNOWN:
    default:
      return 'mdi-help-network'
  }
})
const connectionStatusText = computed(() => {
  let key
  switch (maindataStore.serverState?.connection_status) {
    case ConnectionStatus.CONNECTED:
    case ConnectionStatus.FIREWALLED:
    case ConnectionStatus.DISCONNECTED:
      key = maindataStore.serverState.connection_status
      break
    case ConnectionStatus.UNKNOWN:
    default:
      key = 'unknown'
  }

  return t('navbar.side.bottom_actions.conn_status', { status: t(`constants.connectionStatus.${key}`) })
})

const themeIcon = computed(() => {
  switch (vueTorrentStore.theme.mode) {
    case ThemeMode.DARK:
      return 'mdi-brightness-4'
    case ThemeMode.SYSTEM:
      return 'mdi-theme-light-dark'
    default:
      return 'mdi-brightness-7'
  }
})

const logout = async () => {
  await appStore.logout()
  await vueTorrentStore.redirectToLogin()
}
const toggleAltSpeed = () => {
  appStore.toggleAlternativeMode()
}

function openConnectionStatusDialog() {
  dialogStore.createDialog(ConnectionStatusDialog)
}

function openConfirmShutdownDialog() {
  dialogStore.confirmAction({
    title: t('dialogs.shutdown.title'),
    text: t('dialogs.shutdown.content'),
    yesColor: "error",
    onConfirm: async () => {
      if (await appStore.shutdownQbit()) {
        await appStore.setAuthStatus(false)
        await vueTorrentStore.redirectToLogin()
        toast.success(t('dialogs.shutdown.success'))
      } else {
        toast.error(t('dialogs.shutdown.error'))
      }
    }
  })
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
          <v-btn
            variant="plain"
            :color="isAltSpeedEnabled ? 'accent' : undefined"
            :icon="isAltSpeedEnabled ? 'mdi-speedometer-slow' : 'mdi-speedometer'"
            v-bind="props"
            @click="toggleAltSpeed" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="connectionStatusText" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="connectionStatusIcon" v-bind="props" @click="openConnectionStatusDialog" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.dark_mode', vueTorrentStore.theme.mode)" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="themeIcon" v-bind="props" @click="vueTorrentStore.toggleTheme()" />
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row no-gutters v-if="vueTorrentStore.isShutdownButtonVisible">
    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.side.bottom_actions.shutdown')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn block color="error" rounded="0" v-bind="props" @click="openConfirmShutdownDialog">
            <v-icon size="x-large">mdi-power</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
