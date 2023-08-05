import { DashboardProperty, TitleOptions } from '@/enums/vuetorrent'
import { Theme } from '@/plugins/vuetify.ts'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'


const desktopPropertiesTemplate = {
  [DashboardProperty.SIZE]: { name: DashboardProperty.SIZE, order: 1, active: true },
  [DashboardProperty.PROGRESS]: { name: DashboardProperty.PROGRESS, order: 2, active: true },
  [DashboardProperty.DOWNLOAD_SPEED]: { name: DashboardProperty.DOWNLOAD_SPEED, order: 3, active: true },
  [DashboardProperty.UPLOAD_SPEED]: { name: DashboardProperty.UPLOAD_SPEED, order: 4, active: true },
  [DashboardProperty.DOWNLOADED]: { name: DashboardProperty.DOWNLOADED, order: 5, active: true },
  [DashboardProperty.SAVE_PATH]: { name: DashboardProperty.SAVE_PATH, order: 6, active: false },
  [DashboardProperty.UPLOADED]: { name: DashboardProperty.UPLOADED, order: 7, active: true },
  [DashboardProperty.ETA]: { name: DashboardProperty.ETA, order: 8, active: true },
  [DashboardProperty.PEERS]: { name: DashboardProperty.PEERS, order: 9, active: true },
  [DashboardProperty.SEEDS]: { name: DashboardProperty.SEEDS, order: 10, active: true },
  [DashboardProperty.STATUS]: { name: DashboardProperty.STATUS, order: 11, active: true },
  [DashboardProperty.RATIO]: { name: DashboardProperty.RATIO, order: 12, active: true },
  [DashboardProperty.TRACKER]: { name: DashboardProperty.TRACKER, order: 13, active: false },
  [DashboardProperty.CATEGORY]: { name: DashboardProperty.CATEGORY, order: 14, active: true },
  [DashboardProperty.TAGS]: { name: DashboardProperty.TAGS, order: 15, active: true },
  [DashboardProperty.ADDED_ON]: { name: DashboardProperty.ADDED_ON, order: 16, active: true },
  [DashboardProperty.AVAILABILITY]: { name: DashboardProperty.AVAILABILITY, order: 17, active: true },
  [DashboardProperty.LAST_ACTIVITY]: { name: DashboardProperty.LAST_ACTIVITY, order: 18, active: false },
  [DashboardProperty.COMPLETED_ON]: { name: DashboardProperty.COMPLETED_ON, order: 19, active: false },
  [DashboardProperty.AMOUNT_LEFT]: { name: DashboardProperty.AMOUNT_LEFT, order: 20, active: false },
  [DashboardProperty.CONTENT_PATH]: { name: DashboardProperty.CONTENT_PATH, order: 21, active: false },
  [DashboardProperty.DOWNLOADED_SESSION]: { name: DashboardProperty.DOWNLOADED_SESSION, order: 22, active: false },
  [DashboardProperty.DOWNLOAD_LIMIT]: { name: DashboardProperty.DOWNLOAD_LIMIT, order: 23, active: false },
  [DashboardProperty.DOWNLOAD_PATH]: { name: DashboardProperty.DOWNLOAD_PATH, order: 24, active: false },
  [DashboardProperty.HASH]: { name: DashboardProperty.HASH, order: 25, active: false },
  [DashboardProperty.INFOHASH_V1]: { name: DashboardProperty.INFOHASH_V1, order: 26, active: false },
  [DashboardProperty.INFOHASH_V2]: { name: DashboardProperty.INFOHASH_V2, order: 27, active: false },
  [DashboardProperty.SEEN_COMPLETE]: { name: DashboardProperty.SEEN_COMPLETE, order: 28, active: false },
  [DashboardProperty.TIME_ACTIVE]: { name: DashboardProperty.TIME_ACTIVE, order: 29, active: false },
  [DashboardProperty.TOTAL_SIZE]: { name: DashboardProperty.TOTAL_SIZE, order: 30, active: false },
  [DashboardProperty.TRACKERS_COUND]: { name: DashboardProperty.TRACKERS_COUND, order: 31, active: false },
  [DashboardProperty.UPLOADED_SESSION]: { name: DashboardProperty.UPLOADED_SESSION, order: 32, active: false },
  [DashboardProperty.UPLOAD_LIMIT]: { name: DashboardProperty.UPLOAD_LIMIT, order: 33, active: false },
  [DashboardProperty.GLOBAL_SPEED]: { name: DashboardProperty.GLOBAL_SPEED, order: 34, active: false },
  [DashboardProperty.GLOBAL_VOLUME]: { name: DashboardProperty.GLOBAL_VOLUME, order: 35, active: false }
}

const mobilePropertiesTemplate = {
  [DashboardProperty.STATUS]: { name: DashboardProperty.STATUS, order: 1, active: true },
  [DashboardProperty.TRACKER]: { name: DashboardProperty.TRACKER, order: 2, active: true },
  [DashboardProperty.CATEGORY]: { name: DashboardProperty.CATEGORY, order: 3, active: true },
  [DashboardProperty.TAGS]: { name: DashboardProperty.TAGS, order: 4, active: true },
  [DashboardProperty.SIZE]: { name: DashboardProperty.SIZE, order: 5, active: true },
  [DashboardProperty.PROGRESS]: { name: DashboardProperty.PROGRESS, order: 6, active: true },
  [DashboardProperty.PROGRESS_BAR]: { name: DashboardProperty.PROGRESS_BAR, order: 7, active: true },
  [DashboardProperty.RATIO]: { name: DashboardProperty.RATIO, order: 8, active: true },
  [DashboardProperty.UPLOADED]: { name: DashboardProperty.UPLOADED, order: 9, active: true },
  [DashboardProperty.ETA]: { name: DashboardProperty.ETA, order: 10, active: true },
  [DashboardProperty.SEEDS]: { name: DashboardProperty.SEEDS, order: 11, active: true },
  [DashboardProperty.PEERS]: { name: DashboardProperty.PEERS, order: 12, active: true },
  [DashboardProperty.DOWNLOAD_SPEED]: { name: DashboardProperty.DOWNLOAD_SPEED, order: 13, active: true },
  [DashboardProperty.UPLOAD_SPEED]: { name: DashboardProperty.UPLOAD_SPEED, order: 14, active: true }
}


export const useVueTorrentStore = defineStore('vuetorrent', () => {
  const language = ref('en')
  const darkMode = ref(false)
  const showFreeSpace = ref(true)
  const showSpeedGraph = ref(true)
  const showSessionStat = ref(true)
  const showAlltimeStat = ref(true)
  const showCurrentSpeed = ref(true)
  const showTrackerFilter = ref(false)
  const showSpeedInTitle = ref(false)
  const deleteWithFiles = ref(false)
  const title = ref<TitleOptions>(TitleOptions.DEFAULT)
  const isDrawerRight = ref(false)
  const isPaginationOnTop = ref(false)
  const paginationSize = ref(15)
  const dateFormat = ref('DD/MM/YYYY, HH:mm:ss')
  const openSideBarOnStart = ref(true)
  const isShutdownButtonVisible = ref(true)
  const useBitSpeed = ref(false)
  const useBinarySize = ref(false)
  const refreshInterval = ref(2000)
  const fileContentInterval = ref(5000)
  const canvasPieceCountThreshold = ref(5000)

  const busyDesktopTorrentProperties = ref({ ...desktopPropertiesTemplate })
  const doneDesktopTorrentProperties = ref({ ...desktopPropertiesTemplate })
  const busyMobileCardProperties = ref({ ...mobilePropertiesTemplate })
  const doneMobileCardProperties = ref({ ...mobilePropertiesTemplate })

  const getCurrentThemeName = computed(() => darkMode.value ? Theme.DARK : Theme.LIGHT)

  const i18n = useI18n()
  const theme = useTheme()

  watch(language, setLanguage)
  watch(darkMode, updateTheme)

  function setLanguage(newLang: string) {
    i18n.locale.value = newLang
  }

  function updateTheme() {
    theme.global.name.value = getCurrentThemeName.value
  }

  function toggleTheme() {
    darkMode.value = !darkMode.value
  }

  return {
    canvasPieceCountThreshold,
    darkMode,
    dateFormat,
    deleteWithFiles,
    fileContentInterval,
    isDrawerRight,
    isPaginationOnTop,
    isShutdownButtonVisible,
    language,
    openSideBarOnStart,
    paginationSize,
    refreshInterval,
    showAlltimeStat,
    showCurrentSpeed,
    showFreeSpace,
    showSessionStat,
    showSpeedGraph,
    showSpeedInTitle,
    showTrackerFilter,
    title,
    useBinarySize,
    useBitSpeed,
    busyDesktopTorrentProperties,
    doneDesktopTorrentProperties,
    busyMobileCardProperties,
    doneMobileCardProperties,
    getCurrentThemeName,
    setLanguage,
    updateTheme,
    toggleTheme
  }
})