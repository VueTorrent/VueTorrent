import { propsData, propsMetadata, DashboardProperty, TitleOptions } from '@/constants/vuetorrent'
import { formatPercent, formatSpeed } from '@/helpers'
import { Theme } from '@/plugins/vuetify'
import { useMaindataStore } from '@/stores/maindata'
import { PropertyData, TorrentProperty } from '@/types/vuetorrent'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

export const useVueTorrentStore = defineStore(
  'vuetorrent',
  () => {
    const language = ref('en')
    const matchSystemTheme = ref(true)
    const darkMode = ref(false)
    const showFreeSpace = ref(true)
    const showSpeedGraph = ref(true)
    const showSessionStat = ref(true)
    const showAlltimeStat = ref(true)
    const showCurrentSpeed = ref(true)
    const showTrackerFilter = ref(false)
    const showSpeedInTitle = ref(false)
    const deleteWithFiles = ref(false)
    const title = ref(TitleOptions.DEFAULT)
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
    const canvasRenderThreshold = ref(3000)
    const canvasRefreshThreshold = ref(5000)

    const busyProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))
    const doneProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))

    const getCurrentThemeName = computed(() => (darkMode.value ? Theme.DARK : Theme.LIGHT))
    const currentSystemTheme = computed(() => (window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT))

    const busyTorrentProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(busyProperties.value)) {
        formattedPpt[v.order - 1] = {
          name: k as DashboardProperty,
          ...v,
          ...propsMetadata[k]
        }
      }
      return formattedPpt
    })
    const doneTorrentProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(doneProperties.value)) {
        formattedPpt[v.order - 1] = {
          name: k as DashboardProperty,
          ...v,
          ...propsMetadata[k]
        }
      }
      return formattedPpt
    })

    const i18n = useI18n()
    const router = useRouter()
    const theme = useTheme()
    const maindataStore = useMaindataStore()

    watch(language, setLanguage)
    watch(darkMode, updateTheme)
    watch(matchSystemTheme, updateTheme)

    function setLanguage(newLang: string) {
      i18n.locale.value = newLang
    }

    function updateTheme() {
      theme.global.name.value = matchSystemTheme.value ? currentSystemTheme.value : getCurrentThemeName.value
    }

    function toggleTheme() {
      darkMode.value = !theme.current.value.dark
      if (matchSystemTheme.value) {
        matchSystemTheme.value = false
      }
    }

    async function redirectToLogin() {
      await router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
    }

    function updateTitle() {
      const mode = title.value
      switch (mode) {
        case TitleOptions.GLOBAL_SPEED:
          document.title =
            '[' +
            `D: ${formatSpeed(maindataStore.serverState?.dl_info_speed ?? 0, useBitSpeed.value)}, ` +
            `U: ${formatSpeed(maindataStore.serverState?.up_info_speed ?? 0, useBitSpeed.value)}` +
            '] VueTorrent'
          break
        case TitleOptions.FIRST_TORRENT_STATUS:
          const torrent = maindataStore.torrents.at(0)
          if (torrent) {
            document.title =
              '[' +
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

    function updateBusyProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        busyProperties.value[ppt.name].active = ppt.active
        busyProperties.value[ppt.name].order = index + 1
      })
    }
    function updateDoneProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        doneProperties.value[ppt.name].active = ppt.active
        doneProperties.value[ppt.name].order = index + 1
      })
    }

    function toggleBusyProperty(name: DashboardProperty) {
      busyProperties.value[name].active = !busyProperties.value[name].active
    }
    function toggleDoneProperty(name: DashboardProperty) {
      doneProperties.value[name].active = !doneProperties.value[name].active
    }

    return {
      canvasRenderThreshold,
      canvasRefreshThreshold,
      darkMode,
      dateFormat,
      deleteWithFiles,
      fileContentInterval,
      isDrawerRight,
      isPaginationOnTop,
      isShutdownButtonVisible,
      language,
      matchSystemTheme,
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
      updateTitle,
      updateBusyProperties,
      updateDoneProperties,
      toggleBusyProperty,
      toggleDoneProperty
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
