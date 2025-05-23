<script setup lang="ts">
import ImportSettingsDialog from '@/components/Dialogs/ImportSettingsDialog.vue'
import { defaultDateFormat, defaultDurationFormat, FilterType, TitleOptions } from '@/constants/vuetorrent'
import { openLink } from '@/helpers'
import { LOCALES } from '@/locales'
import { backend } from '@/services/backend'
import { Github } from '@/services/Github'
import { useAppStore, useDialogStore, useHistoryStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { DarkLegacy, DarkRedesigned, DarkOled, LightLegacy, LightRedesigned } from '@/themes'
import { storeToRefs } from 'pinia'
import { computed, readonly, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { toast } from 'vue3-toastify'

const { t } = useI18nUtils()
const appStore = useAppStore()
const dialogStore = useDialogStore()
const historyStore = useHistoryStore()
const { filterType } = storeToRefs(useTorrentStore())
const vueTorrentStore = useVueTorrentStore()

const github = new Github()

const titleOptionsList = readonly([
  { title: t('constants.titleOptions.default'), value: TitleOptions.DEFAULT },
  { title: t('constants.titleOptions.global_speed'), value: TitleOptions.GLOBAL_SPEED },
  { title: t('constants.titleOptions.first_torrent_speed'), value: TitleOptions.FIRST_TORRENT_STATUS },
  { title: t('constants.titleOptions.custom'), value: TitleOptions.CUSTOM }
])

const filterInclusionOptions = [
  { title: t('constants.filter_type.conjunctive'), value: FilterType.CONJUNCTIVE, props: { prependIcon: 'mdi-set-center' } },
  { title: t('constants.filter_type.disjunctive'), value: FilterType.DISJUNCTIVE, props: { prependIcon: 'mdi-set-all' } }
]

const lightVariants = readonly([
  { title: t('constants.themes.light.legacy'), value: LightLegacy.id },
  { title: t('constants.themes.light.redesigned'), value: LightRedesigned.id }
])

const darkVariants = readonly([
  { title: t('constants.themes.dark.legacy'), value: DarkLegacy.id },
  { title: t('constants.themes.dark.redesigned'), value: DarkRedesigned.id },
  { title: t('constants.themes.dark.oled'), value: DarkOled.id }
])

type FilterKey = 'state' | 'category' | 'tag' | 'tracker'

const { showFilterState, showFilterCategory, showFilterTag, showFilterTracker } = storeToRefs(useVueTorrentStore())

interface FilterOption {
  title: string
  value: FilterKey
}

const filterOptions: FilterOption[] = [
  { title: t('settings.vuetorrent.general.showFilters.state'), value: 'state' },
  { title: t('settings.vuetorrent.general.showFilters.category'), value: 'category' },
  { title: t('settings.vuetorrent.general.showFilters.tag'), value: 'tag' },
  { title: t('settings.vuetorrent.general.showFilters.tracker'), value: 'tracker' }
]

const filterToggles = {
  state: showFilterState,
  category: showFilterCategory,
  tag: showFilterTag,
  tracker: showFilterTracker
}

const filters = computed({
  get: () => {
    return filterOptions.filter(option => filterToggles[option.value].value).map(option => option.value)
  },
  set(newSelectedValues) {
    filterOptions.forEach(option => {
      filterToggles[option.value].value = newSelectedValues.includes(option.value)
    })
  }
})

const paginationSizes = ref([{ title: t('settings.vuetorrent.general.paginationSize.infinite_scroll'), value: -1 }, 5, 15, 30, 50, 100, 250, 500])

const VERSION_PATTERN = /^v?(?<version>[0-9.]+)(-(?<commits>\d+)-g(?<sha>[0-9a-f]+))?$/
const vueTorrentVersion = computed(() => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_PACKAGE_VERSION
  } else if (import.meta.env.DEV) {
    return 'DEV'
  }

  return null
})
const isStableVersion = computed(() => {
  const matches = vueTorrentVersion.value.match(VERSION_PATTERN)
  if (!matches) return false

  const groups = matches.groups
  return !groups.commits && !groups.sha
})

const paginationSize = computed({
  get: () => {
    if (vueTorrentStore.paginationSize === -1) return t('settings.vuetorrent.general.paginationSize.infinite_scroll')
    return vueTorrentStore.paginationSize.toString()
  },
  set: (v: string) => {
    const input = parseInt(v, 10)
    if (isNaN(input)) return

    if (input <= 0 && input !== -1) {
      vueTorrentStore.paginationSize = -1
    } else {
      vueTorrentStore.paginationSize = input
    }
  }
})

const paginationSizeMessages = computed(() =>
  vueTorrentStore.paginationSize === -1 || vueTorrentStore.paginationSize >= 250 ? t('settings.vuetorrent.general.paginationSize.warning') : ''
)

const resetSettings = () => {
  localStorage.clear()
  sessionStorage.clear()
  location.reload()
}

const downloadSettings = () => {
  const settings = localStorage.getItem('vuetorrent_webuiSettings')
  if (!settings) return

  const jsonString = JSON.stringify(JSON.parse(settings), null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const blobUrl = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = blobUrl
  a.download = 'settings.json'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const importSettings = () => {
  dialogStore.createDialog(ImportSettingsDialog)
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

const checkNewVersion = async () => {
  if (vueTorrentVersion.value === 'DEV') return

  if (backend.isUp) {
    await backend
      .update()
      .then(msg => toast.success(msg, { autoClose: 3000 }))
      .catch(err => toast.error(`${err.status} ${err.message}`, { autoClose: 5000 }))
    return
  }

  const latest = await github.getVersion()
  if (`v${vueTorrentVersion.value}` === latest) {
    toast.success(t('toast.version.latest'))
    return
  }

  toast.info(t('toast.version.new'))
}

function openDateFormatHelp() {
  openLink('https://day.js.org/docs/en/display/format#list-of-all-available-formats')
}

function openDurationFormatHelp() {
  openLink('https://day.js.org/docs/en/durations/format#list-of-all-available-formats')
}
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
          <v-checkbox v-model="vueTorrentStore.isDrawerRight" hide-details density="compact" :label="t('settings.vuetorrent.general.isDrawerRight')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.enableRatioColors" hide-details density="compact" :label="t('settings.vuetorrent.general.enableRatioColors')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.enableHashColors" hide-details density="compact" :label="t('settings.vuetorrent.general.enableHashColors')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.hideChipIfUnset" hide-details density="compact" :label="t('settings.vuetorrent.general.hideChipIfUnset')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.hideColoredChip" hide-details density="compact" :label="t('settings.vuetorrent.general.hideColoredChip')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.displayGraphLimits" hide-details density="compact" :label="t('settings.vuetorrent.general.displayGraphLimits')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.isShutdownButtonVisible" hide-details density="compact" :label="t('settings.vuetorrent.general.isShutdownButtonVisible')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.useEmojiState" hide-details density="compact" :label="t('settings.vuetorrent.general.useEmojiState')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.fetchExternalIpInfo" hide-details density="compact" :label="t('settings.vuetorrent.general.fetchExternalIpInfo')" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.useBinarySize" hide-details density="compact" :label="t('settings.vuetorrent.general.useBinarySize')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.useBitSpeed" hide-details density="compact" :label="t('settings.vuetorrent.general.useBitSpeed')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="vueTorrentStore.expandContent" hide-details density="compact" :label="t('settings.vuetorrent.general.expandContent')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item class="mt-3">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="vueTorrentStore.refreshInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.refreshInterval')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="vueTorrentStore.fileContentInterval" type="number" hide-details suffix="ms" :label="t('settings.vuetorrent.general.fileContentInterval')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="historyStore.historySize" type="number" hide-details :label="t('settings.vuetorrent.general.historySize')" />
        </v-col>

        <v-col cols="12" md="6">
          <v-select v-model="vueTorrentStore.language" flat hide-details :items="LOCALES" :label="t('settings.vuetorrent.general.language')" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="filterType" flat hide-details :items="filterInclusionOptions" :label="t('settings.vuetorrent.general.filterType')" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="filters" :items="filterOptions" :label="t('settings.vuetorrent.general.showFilters.title')" multiple>
            <template v-slot:selection="{ item, index }">
              <span v-if="index === 0 && filters.length === 1">{{ item.title }}</span>
              <span v-else-if="index === 0 && filters.length < 4">{{ t('settings.vuetorrent.general.showFilters.filtersEnabled', filters.length) }}</span>
              <span v-else-if="index === 0 && filters.length <= 4">{{ t('settings.vuetorrent.general.showFilters.allFiltersEnabled', filters.length) }}</span>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select v-model="vueTorrentStore.uiTitleType" flat hide-details :items="titleOptionsList" :label="t('settings.vuetorrent.general.vueTorrentTitle')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="vueTorrentStore.uiTitleType !== TitleOptions.CUSTOM"
            v-model="vueTorrentStore.uiTitleCustom"
            hide-details
            :label="t('settings.vuetorrent.general.customTitle')" />
        </v-col>

        <v-col cols="12" md="6">
          <v-select v-model="vueTorrentStore.theme.light" flat hide-details :items="lightVariants" :label="$t('settings.vuetorrent.general.lightVariants')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="vueTorrentStore.theme.dark" flat hide-details :items="darkVariants" :label="$t('settings.vuetorrent.general.darkVariants')" />
        </v-col>

        <v-col cols="12" md="6">
          <v-combobox
            v-model.number="paginationSize"
            :messages="paginationSizeMessages"
            flat
            :items="paginationSizes"
            :return-object="false"
            :label="t('settings.vuetorrent.general.paginationSize.label')" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vueTorrentStore.dateFormat"
            flat
            hide-details
            :label="t('settings.vuetorrent.general.dateFormat')"
            :placeholder="defaultDateFormat"
            append-inner-icon="mdi-help-circle"
            @click:appendInner="openDateFormatHelp" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vueTorrentStore.durationFormat"
            flat
            hide-details
            :label="t('settings.vuetorrent.general.durationFormat')"
            :placeholder="defaultDurationFormat"
            append-inner-icon="mdi-help-circle"
            @click:appendInner="openDurationFormatHelp" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="6" class="d-flex align-center justify-center">
          <h3>
            {{ t('settings.vuetorrent.general.currentVersion') }}
            <span v-if="!vueTorrentVersion">undefined</span>
            <a v-else-if="vueTorrentVersion === 'DEV'" target="_blank" href="https://github.com/VueTorrent/VueTorrent">{{ vueTorrentVersion }}</a>
            <a v-else-if="isStableVersion" target="_blank" href="https://github.com/VueTorrent/VueTorrent/releases/latest">{{ vueTorrentVersion }}</a>
            <a v-else target="_blank" href="https://github.com/VueTorrent/VueTorrent/releases/tag/latest_nightly">{{ vueTorrentVersion }}</a>
          </h3>
        </v-col>

        <v-col cols="6" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="registerMagnetHandler">{{ t('settings.vuetorrent.general.registerMagnet') }} </v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <h3>
            {{ t('settings.vuetorrent.general.qbittorrentVersion') }}
            <a target="_blank" :href="`https://github.com/qbittorrent/qBittorrent/releases/tag/release-${appStore.version}`">{{ appStore.version }}</a>
          </h3>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="checkNewVersion">{{ t('settings.vuetorrent.general.check_new') }} </v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="importSettings">{{ t('settings.vuetorrent.general.import') }}</v-btn>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="downloadSettings">{{ t('settings.vuetorrent.general.download') }}</v-btn>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-btn color="red" @click="resetSettings">{{ t('settings.vuetorrent.general.resetSettings') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>
