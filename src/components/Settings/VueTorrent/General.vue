<script setup lang="ts">
import { titleOptionsList } from '@/constants/vuetorrent'
import { LOCALES } from '@/locales/locales'
import { useAppStore, useVueTorrentStore } from '@/stores'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const paginationSizes = ref([5, 15, 30, 50])
const settingsField = ref('')

const isProduction = computed(() => process.env.NODE_ENV === 'production')
const isDevelopment = computed(() => process.env.NODE_ENV === 'development')

const { t } = useI18n()
const appStore = useAppStore()
const vueTorrentStore = useVueTorrentStore()

const vueTorrentVersion = computed(() => {
  if (isProduction.value) {
    return 'import.meta.env.VITE_PACKAGE_VERSION'
  } else if (isDevelopment.value) {
    return 'DEV'
  }

  return null
})

const importSettings = () => {
  //TODO
}

const exportSettings = () => {
  //TODO
}

const resetSettings = () => {
  window.localStorage.clear()
  location.reload()
}

const registerMagnetHandler = () => {
  if (typeof navigator.registerProtocolHandler !== 'function') {
    toast.error(t('toast.magnetHandlerNotSupported'))
    return
  }

  const templateUrl = location.href.replace('/settings', '/download=%s')
  navigator.registerProtocolHandler('magnet', templateUrl)
}

onBeforeMount(() => {
  appStore.fetchQbitVersion()
})
</script>

<template>
  <v-list>
    <v-list-subheader>{{ t('settings.vuetorrent.general.tip') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showCurrentSpeed" hide-details density="compact" :label="t('settings.vuetorrent.general.showCurrentSpeed')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showSpeedGraph" hide-details density="compact" :label="t('settings.vuetorrent.general.showSpeedGraph')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showAlltimeStat" hide-details density="compact" :label="t('settings.vuetorrent.general.showAlltimeStat')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showSessionStat" hide-details density="compact" :label="t('settings.vuetorrent.general.showSessionStat')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showFreeSpace" hide-details density="compact" :label="t('settings.vuetorrent.general.showFreeSpace')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.showTrackerFilter" hide-details density="compact" :label="t('settings.vuetorrent.general.showTrackerFilter')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.isDrawerRight" hide-details density="compact" :label="t('settings.vuetorrent.general.isDrawerRight')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.isPaginationOnTop" hide-details density="compact" :label="t('settings.vuetorrent.general.isPaginationOnTop')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.matchSystemTheme" hide-details density="compact" :label="t('settings.vuetorrent.general.matchSystemTheme')" />
        </v-col>
        <v-col cols="12" sm="6"> </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.openSideBarOnStart" hide-details density="compact" :label="t('settings.vuetorrent.general.openSideBarOnStart')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.isShutdownButtonVisible" hide-details density="compact" :label="t('settings.vuetorrent.general.isShutdownButtonVisible')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.useBinarySize" hide-details density="compact" :label="t('settings.vuetorrent.general.useBinarySize')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.useBitSpeed" hide-details density="compact" :label="t('settings.vuetorrent.general.useBitSpeed')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="vueTorrentStore.refreshInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.refreshInterval')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="vueTorrentStore.fileContentInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.fileContentInterval')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="vueTorrentStore.canvasRenderThreshold" type="number" :label="t('settings.vuetorrent.general.canvasRenderThreshold')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="vueTorrentStore.canvasRefreshThreshold" type="number" :label="t('settings.vuetorrent.general.canvasRefreshThreshold')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="vueTorrentStore.language" flat hide-details :items="LOCALES" :label="t('settings.vuetorrent.general.language')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="vueTorrentStore.paginationSize" flat hide-details :items="paginationSizes" :label="t('settings.vuetorrent.general.paginationSize')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="vueTorrentStore.title" flat hide-details :items="titleOptionsList" :label="t('settings.vuetorrent.general.vueTorrentTitle')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="vueTorrentStore.dateFormat" placeholder="DD/MM/YYYY, HH:mm:ss" hint="using Dayjs" :label="t('settings.vuetorrent.general.dateFormat')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="6" md="2" class="d-flex align-center justify-end">
          <h3>{{ t('settings.vuetorrent.general.currentVersion') }}</h3>
        </v-col>
        <v-col cols="6" md="2" class="d-flex align-center justify-start">
          <h3>
            <span v-if="!vueTorrentVersion">undefined</span>
            <a v-else-if="vueTorrentVersion === 'DEV'" target="_blank" href="https://github.com/WDaan/VueTorrent/">{{ vueTorrentVersion }}</a>
            <a v-else target="_blank" :href="`https://github.com/WDaan/VueTorrent/releases/tag/v${vueTorrentVersion}`">{{ vueTorrentVersion }}</a>
          </h3>
        </v-col>

        <v-col cols="6" md="2" class="d-flex align-center justify-end">
          <h3>{{ t('settings.vuetorrent.general.qbittorrentVersion') }}</h3>
        </v-col>
        <v-col cols="6" md="2" class="d-flex align-center justify-start">
          <h3>
            <a target="_blank" :href="`https://github.com/qbittorrent/qBittorrent/releases/tag/release-${appStore.version}`">{{ appStore.version }}</a>
          </h3>
        </v-col>

        <v-col cols="12" md="4" class="d-flex align-center justify-center">
          <v-btn @click="registerMagnetHandler">{{ t('settings.vuetorrent.general.registerMagnet') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-textarea v-model="settingsField" />
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn @click="importSettings">{{ t('settings.vuetorrent.general.importSettings') }}</v-btn>
        </v-col>

        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn @click="exportSettings">{{ t('settings.vuetorrent.general.exportSettings') }}</v-btn>
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center">
          <v-btn dark color="red" @click="resetSettings">{{ t('settings.vuetorrent.general.resetSettings') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
