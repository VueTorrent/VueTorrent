import {
  DashboardProperty,
  defaultDateFormat,
  defaultDurationFormat,
  PropertyData,
  propsData,
  propsMetadata,
  ThemeMode,
  TitleOptions,
  TorrentProperty
} from '@/constants/vuetorrent'
import { DarkLegacy, LightLegacy } from '@/themes'
import { useMediaQuery } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useI18nUtils } from '@/composables'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

export const useVueTorrentStore = defineStore(
  'vuetorrent',
  () => {
    const language = ref('en')
    const theme = reactive({
      mode: ThemeMode.SYSTEM,
      light: LightLegacy.id,
      dark: DarkLegacy.id
    })
    const showFreeSpace = ref(true)
    const showFilterState = ref(true)
    const showFilterCategory = ref(true)
    const showFilterTag = ref(true)
    const showFilterTracker = ref(true)
    const showSpeedGraph = ref(true)
    const showSessionStat = ref(true)
    const showAlltimeStat = ref(true)
    const showCurrentSpeed = ref(true)
    const showSpeedInTitle = ref(false)
    /** @deprecated */
    const deleteWithFiles = ref(false)
    const uiTitleType = ref(TitleOptions.DEFAULT)
    const uiTitleCustom = ref('')
    const isDrawerRight = ref(false)
    const hideChipIfUnset = ref(false)
    const enableRatioColors = ref(true)
    const enableHashColors = ref(true)
    const paginationSize = ref(15)
    const dateFormat = ref(defaultDateFormat)
    const durationFormat = ref(defaultDurationFormat)
    const isShutdownButtonVisible = ref(false)
    const useBitSpeed = ref(false)
    const expandContent = ref(true)
    const useBinarySize = ref(false)
    const refreshInterval = ref(2000)
    const fileContentInterval = ref(5000)
    const useIdForRssLinks = ref(false)
    const hideColoredChip = ref(false)
    const displayGraphLimits = ref(true)
    const useEmojiState = ref(true)
    const fetchExternalIpInfo = ref(false)

    const _busyProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))
    const _doneProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))

    const _busyGridProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))
    const _doneGridProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))

    const _tableProperties = ref<PropertyData>(JSON.parse(JSON.stringify(propsData)))

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

    const busyGridProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(_busyGridProperties.value)) {
        formattedPpt[v.order - 1] = {
          name: k as DashboardProperty,
          ...v,
          ...propsMetadata[k]
        }
      }
      return formattedPpt
    })
    const doneGridProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(_doneGridProperties.value)) {
        formattedPpt[v.order - 1] = {
          name: k as DashboardProperty,
          ...v,
          ...propsMetadata[k]
        }
      }
      return formattedPpt
    })

    const tableProperties = computed<TorrentProperty[]>(() => {
      const formattedPpt: TorrentProperty[] = new Array(Object.keys(propsData).length)

      for (const [k, v] of Object.entries(_tableProperties.value)) {
        formattedPpt[v.order - 1] = {
          name: k as DashboardProperty,
          ...v,
          ...propsMetadata[k]
        }
      }
      return formattedPpt
    })

    const { locale } = useI18nUtils()
    const router = useRouter()
    const { global } = useTheme()

    watch(language, setLanguage)

    const mediaQueryPreferDark = useMediaQuery('(prefers-color-scheme: dark)')
    watch(mediaQueryPreferDark, updateTheme)

    function setLanguage(newLang: string) {
      locale.value = newLang
    }

    function updateTheme() {
      switch (theme.mode) {
        case ThemeMode.LIGHT:
          global.name.value = theme.light
          break
        case ThemeMode.DARK:
          global.name.value = theme.dark
          break
        case ThemeMode.SYSTEM:
          global.name.value = mediaQueryPreferDark.value ? theme.dark : theme.light
      }
    }

    function toggleTheme() {
      switch (theme.mode) {
        // if light, switch to dark
        case ThemeMode.LIGHT:
          theme.mode = ThemeMode.DARK
          break
        // if dark, switch to system
        case ThemeMode.DARK:
          theme.mode = ThemeMode.SYSTEM
          break
        // if system, switch to light
        case ThemeMode.SYSTEM:
          theme.mode = ThemeMode.LIGHT
      }
    }
    watch(theme, updateTheme)

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

    function updateBusyGridProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        _busyGridProperties.value[ppt.name].active = ppt.active
        _busyGridProperties.value[ppt.name].order = index + 1
      })
    }

    function updateDoneGridProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        _doneGridProperties.value[ppt.name].active = ppt.active
        _doneGridProperties.value[ppt.name].order = index + 1
      })
    }

    function updateTableProperties(values: TorrentProperty[]) {
      values.forEach((ppt, index) => {
        _tableProperties.value[ppt.name].active = ppt.active
        _tableProperties.value[ppt.name].order = index + 1
      })
    }

    function toggleBusyProperty(name: DashboardProperty) {
      _busyProperties.value[name].active = !_busyProperties.value[name].active
    }

    function toggleDoneProperty(name: DashboardProperty) {
      _doneProperties.value[name].active = !_doneProperties.value[name].active
    }

    function toggleBusyGridProperty(name: DashboardProperty) {
      _busyGridProperties.value[name].active = !_busyGridProperties.value[name].active
    }

    function toggleDoneGridProperty(name: DashboardProperty) {
      _doneGridProperties.value[name].active = !_doneGridProperties.value[name].active
    }

    function toggleTableProperty(name: DashboardProperty) {
      _tableProperties.value[name].active = !_tableProperties.value[name].active
    }

    return {
      theme,
      dateFormat,
      durationFormat,
      deleteWithFiles,
      fileContentInterval,
      isDrawerRight,
      hideChipIfUnset,
      enableRatioColors,
      enableHashColors,
      isShutdownButtonVisible,
      language,
      paginationSize,
      refreshInterval,
      showAlltimeStat,
      showCurrentSpeed,
      showFreeSpace,
      showFilterState,
      showFilterCategory,
      showFilterTag,
      showFilterTracker,
      showSessionStat,
      showSpeedGraph,
      showSpeedInTitle,
      uiTitleType,
      uiTitleCustom,
      useBinarySize,
      useBitSpeed,
      useIdForRssLinks,
      hideColoredChip,
      _busyProperties,
      busyTorrentProperties,
      _doneProperties,
      doneTorrentProperties,
      _busyGridProperties,
      busyGridProperties,
      _doneGridProperties,
      doneGridProperties,
      _tableProperties,
      tableProperties,
      isInfiniteScrollActive,
      displayGraphLimits,
      useEmojiState,
      fetchExternalIpInfo,
      setLanguage,
      updateTheme,
      toggleTheme,
      redirectToLogin,
      updateBusyProperties,
      updateDoneProperties,
      updateBusyGridProperties,
      updateDoneGridProperties,
      updateTableProperties,
      toggleBusyProperty,
      toggleDoneProperty,
      toggleBusyGridProperty,
      toggleDoneGridProperty,
      toggleTableProperty,
      expandContent,
      $reset: () => {
        language.value = 'en'
        theme.mode = ThemeMode.SYSTEM
        theme.light = LightLegacy.id
        theme.dark = DarkLegacy.id
        showFreeSpace.value = true
        showFilterState.value = true
        showFilterCategory.value = true
        showFilterTag.value = true
        showFilterTracker.value = true
        showSpeedGraph.value = true
        showSessionStat.value = true
        showAlltimeStat.value = true
        showCurrentSpeed.value = true
        showSpeedInTitle.value = false
        deleteWithFiles.value = false
        uiTitleType.value = TitleOptions.DEFAULT
        uiTitleCustom.value = ''
        isDrawerRight.value = false
        hideChipIfUnset.value = false
        enableRatioColors.value = true
        enableHashColors.value = true
        paginationSize.value = 15
        dateFormat.value = defaultDateFormat
        durationFormat.value = defaultDurationFormat
        isShutdownButtonVisible.value = false
        useBitSpeed.value = false
        useBinarySize.value = false
        refreshInterval.value = 2000
        fileContentInterval.value = 5000
        useIdForRssLinks.value = false
        hideColoredChip.value = false
        displayGraphLimits.value = true
        useEmojiState.value = true
        fetchExternalIpInfo.value = false
        expandContent.value = true

        _busyProperties.value = JSON.parse(JSON.stringify(propsData))
        _doneProperties.value = JSON.parse(JSON.stringify(propsData))

        _busyGridProperties.value = JSON.parse(JSON.stringify(propsData))
        _doneGridProperties.value = JSON.parse(JSON.stringify(propsData))

        _tableProperties.value = JSON.parse(JSON.stringify(propsData))
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, key: 'webuiSettings' }]
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVueTorrentStore, import.meta.hot))
}
