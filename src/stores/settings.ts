import type WebUISettings from '@/types/vuetorrent/WebUISettings'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { TitleOptions, DashboardProperty } from '@/enums/vuetorrent'

const desktopPropertiesTemplate = [
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.DOWNLOAD_SPEED, active: true },
  { name: DashboardProperty.UPLOAD_SPEED, active: true },
  { name: DashboardProperty.DOWNLOADED, active: true },
  { name: DashboardProperty.SAVE_PATH, active: false },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.TRACKER, active: false },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.ADDED_ON, active: true },
  { name: DashboardProperty.AVAILABILITY, active: true },
  { name: DashboardProperty.LAST_ACTIVITY, active: false },
  { name: DashboardProperty.COMPLETED_ON, active: false },
  { name: DashboardProperty.AMOUNT_LEFT, active: false },
  { name: DashboardProperty.CONTENT_PATH, active: false },
  { name: DashboardProperty.DOWNLOADED_SESSION, active: false },
  { name: DashboardProperty.DOWNLOAD_LIMIT, active: false },
  { name: DashboardProperty.DOWNLOAD_PATH, active: false },
  { name: DashboardProperty.HASH, active: false },
  { name: DashboardProperty.INFOHASH_V1, active: false },
  { name: DashboardProperty.INFOHASH_V2, active: false },
  { name: DashboardProperty.SEEN_COMPLETE, active: false },
  { name: DashboardProperty.TIME_ACTIVE, active: false },
  { name: DashboardProperty.TOTAL_SIZE, active: false },
  { name: DashboardProperty.TRACKERS_COUND, active: false },
  { name: DashboardProperty.UPLOADED_SESSION, active: false },
  { name: DashboardProperty.UPLOAD_LIMIT, active: false },
  { name: DashboardProperty.GLOBAL_SPEED, active: false },
  { name: DashboardProperty.GLOBAL_VOLUME, active: false }
]

const mobilePropertiesTemplate = [
  { name: DashboardProperty.STATUS, active: true },
  { name: DashboardProperty.TRACKER, active: true },
  { name: DashboardProperty.CATEGORY, active: true },
  { name: DashboardProperty.TAGS, active: true },
  { name: DashboardProperty.SIZE, active: true },
  { name: DashboardProperty.PROGRESS, active: true },
  { name: DashboardProperty.RATIO, active: true },
  { name: DashboardProperty.UPLOADED, active: true },
  { name: DashboardProperty.ETA, active: true },
  { name: DashboardProperty.SEEDS, active: true },
  { name: DashboardProperty.PEERS, active: true },
  { name: DashboardProperty.DOWNLOAD_SPEED, active: true },
  { name: DashboardProperty.UPLOAD_SPEED, active: true }
]

export const useWebUISettingsStore = defineStore('webUISettings', () => {
  const webUISettings = useStorage<WebUISettings>('webUISettings', {
    lang: 'en',
    darkTheme: false,
    showFreeSpace: true,
    showSpeedGraph: true,
    showSessionStat: true,
    showAlltimeStat: true,
    showCurrentSpeed: true,
    showTrackerFilter: false,
    showSpeedInTitle: false,
    deleteWithFiles: false,
    title: TitleOptions.DEFAULT,
    rightDrawer: false,
    topPagination: false,
    paginationSize: 15,
    dateFormat: 'DD/MM/YYYY, HH:mm:ss',
    openSideBarOnStart: true,
    showShutdownButton: true,
    busyDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate)),
    doneDesktopTorrentProperties: JSON.parse(JSON.stringify(desktopPropertiesTemplate)),
    busyMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate)),
    doneMobileCardProperties: JSON.parse(JSON.stringify(mobilePropertiesTemplate))
  }).value

  const title = useTitle()

  title.value = webUISettings.title

  return {
    webUISettings
  }
})
