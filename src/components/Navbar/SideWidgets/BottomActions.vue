<script setup lang="ts">
import { ConnectionStatus } from '@/constants/qbit'
import { useAppStore, useAuthStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

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
const shutdown = async () => {
  if (await appStore.shutdownQbit()) {
    authStore.setAuthStatus(false)
    await vueTorrentStore.redirectToLogin()
    toast.success(t('dialogs.shutdown.success'))
  } else {
    toast.error(t('dialogs.shutdown.error'))
  }

  shutdownDialog.value = false
}
</script>

<template>
  <v-row no-gutters>
    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.bottom_actions.logout')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" icon="mdi-exit-to-app" v-bind="props" @click="logout" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.bottom_actions.alt_speed')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :color="isAltSpeedEnabled ? 'accent' : undefined" :icon="isAltSpeedEnabled ? 'mdi-speedometer-slow' : 'mdi-speedometer'" v-bind="props" @click="toggleAltSpeed" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.bottom_actions.conn_status')" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="connectionStatusIcon" v-bind="props" />
        </template>
      </v-tooltip>
    </v-col>

    <v-col class="d-flex justify-center">
      <v-tooltip :text="t('navbar.bottom_actions.dark_mode', Number(vueTorrentStore.darkMode))" location="top">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" :icon="vueTorrentStore.darkMode ? 'mdi-brightness-4' : 'mdi-brightness-6'" v-bind="props" @click="vueTorrentStore.toggleTheme()" />
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row no-gutters v-if="vueTorrentStore.isShutdownButtonVisible">
    <v-col class="d-flex justify-center">
      <v-dialog v-model="shutdownDialog" max-width="500px">
        <template v-slot:activator="{props: propsDialog}">
          <v-tooltip :text="t('navbar.bottom_actions.shutdown')" location="top">
            <template v-slot:activator="{ props: propsTooltip }">
              <v-btn block color="error" rounded="0" icon="mdi-power" v-bind="{...propsDialog, ...propsTooltip}" />
            </template>
          </v-tooltip>
        </template>
        <v-card :title="t('dialogs.shutdown.title')" :text="t('dialogs.shutdown.content')">
          <v-card-actions class="justify-end">
            <v-spacer />
            <v-btn class="accent white--text elevation-0 px-4" @click="shutdown">
              {{ t('common.yes') }}
            </v-btn>
            <v-btn class="error white--text elevation-0 px-4" @click="shutdownDialog = false">
              {{ t('common.no') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>