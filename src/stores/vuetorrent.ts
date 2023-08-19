import { DashboardProperty, DashboardPropertyType, TitleOptions } from '@/constants/vuetorrent'
import { formatPercent, formatSpeed } from '@/helpers'
import { Theme } from '@/plugins/vuetify'
import { useMaindataStore } from '@/stores/maindata'
import { TorrentProperty } from '@/types/VueTorrent'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'


const propertiesTemplate: TorrentProperty[] = [
  {
    active: true,
    name: DashboardProperty.SIZE,
    order: 1,
    props: { title: 'size', value: 'size' },
    type: DashboardPropertyType.DATA
  },
  {
    active: true,
    name: DashboardProperty.PROGRESS,
    order: 2,
    props: { title: 'progress', value: 'progress' },
    type: DashboardPropertyType.PERCENT
  },
  {
    active: true,
    name: DashboardProperty.DOWNLOAD_SPEED,
    order: 3,
    props: { title: 'download_speed', value: 'dlspeed' },
    type: DashboardPropertyType.SPEED
  },
  {
    active: true,
    name: DashboardProperty.UPLOAD_SPEED,
    order: 4,
    props: { title: 'upload_speed', value: 'upspeed' },
    type: DashboardPropertyType.SPEED
  },
  {
    active: true,
    name: DashboardProperty.DOWNLOADED,
    order: 5,
    props: { title: 'downloaded', value: 'downloaded' },
    type: DashboardPropertyType.DATA
  },
  {
    active: false,
    name: DashboardProperty.SAVE_PATH,
    order: 6,
    props: { title: 'save_path', value: 'savePath' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: true,
    name: DashboardProperty.UPLOADED,
    order: 7,
    props: { title: 'uploaded', value: 'uploaded' },
    type: DashboardPropertyType.DATA
  },
  {
    active: true,
    name: DashboardProperty.ETA,
    order: 8,
    props: { title: 'eta', value: 'eta' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: true,
    name: DashboardProperty.PEERS,
    order: 9,
    props: { title: 'peers', value: 'num_leechs', total: 'available_peers' },
    type: DashboardPropertyType.AMOUNT
  },
  {
    active: true,
    name: DashboardProperty.SEEDS,
    order: 10,
    props: { title: 'seeds', value: 'num_seeds', total: 'available_seeds' },
    type: DashboardPropertyType.AMOUNT
  },
  {
    active: true,
    name: DashboardProperty.STATUS,
    order: 11,
    props: { title: 'status', value: 'statusString' },
    type: DashboardPropertyType.CHIP
  },
  {
    active: true,
    name: DashboardProperty.RATIO,
    order: 12,
    props: { title: 'ratio', value: 'ratio' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.TRACKER,
    order: 13,
    props: { title: 'tracker', value: 'trackerString' },
    type: DashboardPropertyType.CHIP
  },
  {
    active: true,
    name: DashboardProperty.CATEGORY,
    order: 14,
    props: { title: 'category', value: 'category' },
    type: DashboardPropertyType.CHIP
  },
  {
    active: true,
    name: DashboardProperty.TAGS,
    order: 15,
    props: { title: 'tags', value: 'tags' },
    type: DashboardPropertyType.CHIP
  },
  {
    active: true,
    name: DashboardProperty.ADDED_ON,
    order: 16,
    props: { title: 'added_on', value: 'added_on' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: true,
    name: DashboardProperty.AVAILABILITY,
    order: 17,
    props: { title: 'availability', value: 'availability' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.LAST_ACTIVITY,
    order: 18,
    props: { title: 'last_activity', value: 'last_activity' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.COMPLETED_ON,
    order: 19,
    props: { title: 'completed_on', value: 'completed_on' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.AMOUNT_LEFT,
    order: 20,
    props: { title: 'amount_left', value: 'amount_left' },
    type: DashboardPropertyType.DATA
  },
  {
    active: false,
    name: DashboardProperty.CONTENT_PATH,
    order: 21,
    props: { title: 'content_path', value: 'content_path' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.DOWNLOADED_SESSION,
    order: 22,
    props: { title: 'downloaded_session', value: 'downloaded_session' },
    type: DashboardPropertyType.DATA
  },
  {
    active: false,
    name: DashboardProperty.DOWNLOAD_LIMIT,
    order: 23,
    props: { title: 'download_limit', value: 'dl_limit' },
    type: DashboardPropertyType.SPEED
  },
  {
    active: false,
    name: DashboardProperty.DOWNLOAD_PATH,
    order: 24,
    props: { title: 'download_path', value: 'download_path' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.HASH,
    order: 25,
    props: { title: 'hash', value: 'hash' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.INFOHASH_V1,
    order: 26,
    props: { title: 'infohash_v1', value: 'infohash_v1' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.INFOHASH_V2,
    order: 27,
    props: { title: 'infohash_v2', value: 'infohash_v2' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.SEEN_COMPLETE,
    order: 28,
    props: { title: 'seen_complete', value: 'seen_complete' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.TIME_ACTIVE,
    order: 29,
    props: { title: 'time_active', value: 'time_active' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.TOTAL_SIZE,
    order: 30,
    props: { title: 'total_size', value: 'total_size' },
    type: DashboardPropertyType.DATA
  },
  {
    active: false,
    name: DashboardProperty.TRACKERS_COUNT,
    order: 31,
    props: { title: 'trackers_count', value: 'trackers_count' },
    type: DashboardPropertyType.TEXT
  },
  {
    active: false,
    name: DashboardProperty.UPLOADED_SESSION,
    order: 32,
    props: { title: 'uploaded_session', value: 'uploaded_session' },
    type: DashboardPropertyType.DATA
  },
  {
    active: false,
    name: DashboardProperty.UPLOAD_LIMIT,
    order: 33,
    props: { title: 'upload_limit', value: 'up_limit' },
    type: DashboardPropertyType.SPEED
  },
  {
    active: false,
    name: DashboardProperty.GLOBAL_SPEED,
    order: 34,
    props: { title: 'global_speed', value: 'globalSpeed' },
    type: DashboardPropertyType.SPEED
  },
  {
    active: false,
    name: DashboardProperty.GLOBAL_VOLUME,
    order: 35,
    props: { title: 'global_volume', value: 'globalVolume' },
    type: DashboardPropertyType.DATA
  }
]

export const useVueTorrentStore = defineStore('vuetorrent',
  () => {
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

    const busyTorrentProperties = ref([...propertiesTemplate])
    const doneTorrentProperties = ref([...propertiesTemplate])

    const getCurrentThemeName = computed(() => darkMode.value ? Theme.DARK : Theme.LIGHT)

    const i18n = useI18n()
    const router = useRouter()
    const theme = useTheme()
    const maindataStore = useMaindataStore()

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

    async function redirectToLogin() {
      await router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
    }

    function updateTitle() {
      const mode = title.value
      switch (mode) {
        case TitleOptions.GLOBAL_SPEED:
          document.title = '[' +
            `D: ${formatSpeed(maindataStore.serverState?.dl_info_speed ?? 0, useBitSpeed.value)}, ` +
            `U: ${formatSpeed(maindataStore.serverState?.up_info_speed ?? 0, useBitSpeed.value)}` +
            '] VueTorrent'
          break
        case TitleOptions.FIRST_TORRENT_STATUS:
          const torrent = maindataStore.torrents.at(0)
          if (torrent) {
            document.title = '[' +
              `D: ${formatSpeed(torrent.dlspeed, useBitSpeed.value)}, ` +
              `U: ${formatSpeed(torrent.upspeed, useBitSpeed.value)}, ` +
              `${formatPercent(torrent.progress)}` +
              '] VueTorrent'
          } else {
            document.title = '[N/A] VueTorrent'
          }
          break
        case TitleOptions.DEFAULT:
        default:
          document.title = 'VueTorrent'
          break
      }
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
      busyTorrentProperties,
      doneTorrentProperties,
      getCurrentThemeName,
      setLanguage,
      updateTheme,
      toggleTheme,
      redirectToLogin,
      updateTitle
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          key: 'vuetorrent_webuiSettings'
        }
      ]
    }
  }
)