<script setup lang="ts">
import { TitleOptions } from '@/constants/vuetorrent'
import { LOCALES } from '@/locales'
import { useAppStore, useHistoryStore, useVueTorrentStore } from '@/stores'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const appStore = useAppStore()
const historyStore = useHistoryStore()
const vueTorrentStore = useVueTorrentStore()

const titleOptionsList = [
  { title: t('constants.titleOptions.default'), value: TitleOptions.DEFAULT },
  { title: t('constants.titleOptions.global_speed'), value: TitleOptions.GLOBAL_SPEED },
  { title: t('constants.titleOptions.first_torrent_speed'), value: TitleOptions.FIRST_TORRENT_STATUS },
  { title: t('constants.titleOptions.custom'), value: TitleOptions.CUSTOM }
]

const paginationSizes = ref([
  { title: t('settings.vuetorrent.general.paginationSize.infinite_scroll'), value: -1 },
  5,
  15,
  30,
  50,
  100,
  250,
  500
])

const theme = computed({
  get() {
    if (vueTorrentStore.matchSystemTheme) return 'auto'
    else if (vueTorrentStore.darkMode) return 'dark'
    else return 'light'
  },
  set(v: string) {
    if (v === 'auto') vueTorrentStore.matchSystemTheme = true
    else {
      vueTorrentStore.matchSystemTheme = false
      vueTorrentStore.darkMode = v === 'dark'
    }
  }
})

const themeOptions = [
  { title: t('constants.theme.auto'), value: 'auto' },
  { title: t('constants.theme.light'), value: 'light' },
  { title: t('constants.theme.dark'), value: 'dark' }
]

const vueTorrentVersion = computed(() => {
  if (import.meta.env.PROD) {
    return 'import.meta.env.VITE_PACKAGE_VERSION'
  } else if (import.meta.env.DEV) {
    return 'DEV'
  }

  return null
})

const resetSettings = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  location.reload()
}

const registerMagnetHandler = () => {
  if (typeof navigator.registerProtocolHandler !== 'function') {
    toast.error(t('toast.magnet_handler.not_supported'))
    return
  }

  const templateUrl = location.href.replace('/settings', '/magnet/%s')
  navigator.registerProtocolHandler('magnet', templateUrl)
  toast.success(t('toast.magnet_handler.registered'))
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
        <v-col cols="12" md="4">
          <v-text-field v-model="vueTorrentStore.refreshInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.refreshInterval')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="vueTorrentStore.fileContentInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.fileContentInterval')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="historyStore.historySize" type="number" hide-details :label="t('settings.vuetorrent.general.historySize')" />
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
          <v-select v-model="vueTorrentStore.paginationSize" flat hide-details :items="paginationSizes" :label="t('settings.vuetorrent.general.paginationSize.label')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="vueTorrentStore.uiTitleType" flat hide-details :items="titleOptionsList" :label="t('settings.vuetorrent.general.vueTorrentTitle')" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            :disabled="vueTorrentStore.uiTitleType !== TitleOptions.CUSTOM"
            v-model="vueTorrentStore.uiTitleCustom"
            :label="t('settings.vuetorrent.general.customTitle')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" md="3" class="d-flex align-center justify-center">
          <h3>
            {{ t('settings.vuetorrent.general.currentVersion') }}
            <span v-if="!vueTorrentVersion">undefined</span>
            <a v-else-if="vueTorrentVersion === 'DEV'" target="_blank" href="https://github.com/WDaan/VueTorrent/">{{ vueTorrentVersion }}</a>
            <a v-else target="_blank" :href="`https://github.com/WDaan/VueTorrent/releases/tag/v${vueTorrentVersion}`">{{ vueTorrentVersion }}</a>
          </h3>
        </v-col>

        <v-col cols="12" md="3" class="d-flex align-center justify-center">
          <h3>
            {{ t('settings.vuetorrent.general.qbittorrentVersion') }}
            <a target="_blank" :href="`https://github.com/qbittorrent/qBittorrent/releases/tag/release-${appStore.version}`">{{ appStore.version }}</a>
          </h3>
        </v-col>

        <v-col cols="12" md="3">
          <v-select v-model="theme" :items="themeOptions" :label="t('settings.vuetorrent.general.theme')" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="vueTorrentStore.dateFormat" placeholder="DD/MM/YYYY, HH:mm:ss" hint="using Dayjs" :label="t('settings.vuetorrent.general.dateFormat')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="registerMagnetHandler">{{ t('settings.vuetorrent.general.registerMagnet') }} </v-btn>
        </v-col>

        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn color="red" @click="resetSettings">{{ t('settings.vuetorrent.general.resetSettings') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
