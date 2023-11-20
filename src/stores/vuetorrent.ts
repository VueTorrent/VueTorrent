import {
  DashboardProperty,
  PropertyData,
  propsData,
  propsMetadata,
  TitleOptions,
  TorrentProperty
} from '@/constants/vuetorrent'
import { Theme } from '@/plugins/vuetify'
import { useMediaQuery } from '@vueuse/core'
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
    const uiTitleType = ref(TitleOptions.DEFAULT)
    const uiTitleCustom = ref('')
    const isDrawerRight = ref(false)
    const isPaginationOnTop = ref(false)
    const paginationSize = ref(15)
    const dateFormat = ref('YYYY-MM-DD HH:mm:ss')
    const openSideBarOnStart = ref(true)
    const isShutdownButtonVisible = ref(false)
    const useBitSpeed = ref(false)
    const useBinarySize = ref(false)
    const refreshInterval = ref(2000)
    const fileContentInterval = ref(5000)
    const canvasRenderThreshold = ref(3000)
    const canvasRefreshThreshold = ref(5000)
    const useIdForRssLinks = ref(false)

    const _busyProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))
    const _doneProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))

    const getCurrentThemeName = computed(() => (darkMode.value ? Theme.DARK : Theme.LIGHT))
    const isInfiniteScrollActive = computed(() => paginationSize.value === -1)

    const busyTorrentProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(_busyProperties.value)) {
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

      for (const [k, v] of Object.entries(_doneProperties.value)) {
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

    watch(language, setLanguage)
    watch(darkMode, updateTheme)
    watch(matchSystemTheme, updateSystemTheme)

    const matches = useMediaQuery('(prefers-color-scheme: dark)')
    watch(matches, handleSystemThemeSwitch)

    function setLanguage(newLang: string) {
      i18n.locale.value = newLang
    }

    function updateTheme() {
      theme.global.name.value = getCurrentThemeName.value
    }

    function updateSystemTheme() {
      handleSystemThemeSwitch(matches.value)
    }

    function handleSystemThemeSwitch(matches: boolean) {
      if (!matchSystemTheme.value) return

      darkMode.value = matches
    }

    function toggleTheme() {
      darkMode.value = !theme.current.value.dark
      if (matchSystemTheme.value) {
        matchSystemTheme.value = false
      }
    }

    async function redirectToLogin() {
      await router.push({ name: 'login', query: { redirect: router.currentRoute.value.path } })
    }

    function updateBusyProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        _busyProperties.value[ppt.name].active = ppt.active
        _busyProperties.value[ppt.name].order = index + 1
      })
    }

    function updateDoneProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        _doneProperties.value[ppt.name].active = ppt.active
        _doneProperties.value[ppt.name].order = index + 1
      })
    }

    function toggleBusyProperty(name: DashboardProperty) {
      _busyProperties.value[name].active = !_busyProperties.value[name].active
    }

    function toggleDoneProperty(name: DashboardProperty) {
      _doneProperties.value[name].active = !_doneProperties.value[name].active
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
      uiTitleType,
      uiTitleCustom,
      useBinarySize,
      useBitSpeed,
      useIdForRssLinks,
      _busyProperties,
      busyTorrentProperties,
      _doneProperties,
      doneTorrentProperties,
      getCurrentThemeName,
      isInfiniteScrollActive,
      setLanguage,
      updateTheme,
      updateSystemTheme,
      toggleTheme,
      redirectToLogin,
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
