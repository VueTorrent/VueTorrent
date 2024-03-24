import { DashboardProperty, PropertyData, propsData, propsMetadata, TitleOptions, TorrentProperty, VuetorrentTheme } from '@/constants/vuetorrent'
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
    const vuetorrentTheme = ref<VuetorrentTheme>(VuetorrentTheme.SYSTEM)
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
    const hideChipIfUnset = ref(false)
    const enableHashColors = ref(true)
    const paginationSize = ref(15)
    const dateFormat = ref('YYYY-MM-DD HH:mm:ss')
    const openSideBarOnStart = ref(true)
    const isShutdownButtonVisible = ref(false)
    const useBitSpeed = ref(false)
    const useBinarySize = ref(false)
    const refreshInterval = ref(2000)
    const fileContentInterval = ref(5000)
    const useIdForRssLinks = ref(false)

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

    const i18n = useI18n()
    const router = useRouter()
    const theme = useTheme()

    watch(language, setLanguage)

    const mediaQueryPreferDark = useMediaQuery('(prefers-color-scheme: dark)')
    watch(mediaQueryPreferDark, updateTheme)

    function setLanguage(newLang: string) {
      i18n.locale.value = newLang
    }

    function updateTheme() {
      switch (vuetorrentTheme.value) {
        case VuetorrentTheme.LIGHT:
          theme.global.name.value = Theme.LIGHT
          break
        case VuetorrentTheme.DARK:
          theme.global.name.value = Theme.DARK
          break
        case VuetorrentTheme.SYSTEM:
          theme.global.name.value = mediaQueryPreferDark.value ? Theme.DARK : Theme.LIGHT
      }
    }

    function toggleTheme() {
      switch (vuetorrentTheme.value) {
        // if light, switch to dark
        case VuetorrentTheme.LIGHT:
          vuetorrentTheme.value = VuetorrentTheme.DARK
          updateTheme()
          break
        // if dark, switch to system
        case VuetorrentTheme.DARK:
          vuetorrentTheme.value = VuetorrentTheme.SYSTEM
          updateTheme()
          break
        // if system, switch to light
        case VuetorrentTheme.SYSTEM:
          vuetorrentTheme.value = VuetorrentTheme.LIGHT
          updateTheme()
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
      vuetorrentTheme,
      dateFormat,
      deleteWithFiles,
      fileContentInterval,
      isDrawerRight,
      isPaginationOnTop,
      hideChipIfUnset,
      enableHashColors,
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
      uiTitleType,
      uiTitleCustom,
      useBinarySize,
      useBitSpeed,
      useIdForRssLinks,
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
      $reset: () => {
        language.value = 'en'
        vuetorrentTheme.value = VuetorrentTheme.SYSTEM
        showFreeSpace.value = true
        showSpeedGraph.value = true
        showSessionStat.value = true
        showAlltimeStat.value = true
        showCurrentSpeed.value = true
        showTrackerFilter.value = false
        showSpeedInTitle.value = false
        deleteWithFiles.value = false
        uiTitleType.value = TitleOptions.DEFAULT
        uiTitleCustom.value = ''
        isDrawerRight.value = false
        isPaginationOnTop.value = false
        hideChipIfUnset.value = false
        enableHashColors.value = true
        paginationSize.value = 15
        dateFormat.value = 'YYYY-MM-DD HH:mm:ss'
        openSideBarOnStart.value = true
        isShutdownButtonVisible.value = false
        useBitSpeed.value = false
        useBinarySize.value = false
        refreshInterval.value = 2000
        fileContentInterval.value = 5000
        useIdForRssLinks.value = false

        _busyProperties.value = JSON.parse(JSON.stringify(propsData))
        _doneProperties.value = JSON.parse(JSON.stringify(propsData))

        _busyGridProperties.value = JSON.parse(JSON.stringify(propsData))
        _doneGridProperties.value = JSON.parse(JSON.stringify(propsData))

        _tableProperties.value = JSON.parse(JSON.stringify(propsData))
      }
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
