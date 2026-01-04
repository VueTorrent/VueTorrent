<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import HistoryField from '@/components/Core/HistoryField.vue'
import PluginManagerDialog from '@/components/Dialogs/PluginManagerDialog.vue'
import { useI18nUtils, useSearchQuery } from '@/composables'
import { HistoryKey } from '@/constants/vuetorrent'
import { comparators, formatData, formatTimeSec, openLink } from '@/helpers'
import { useAddTorrentStore, useAppStore, useDialogStore, useSearchEngineStore, useVueTorrentStore } from '@/stores'
import { SearchData, SearchResult } from '@/types/vuetorrent'

const { mobile } = useDisplay()
const router = useRouter()
const { t } = useI18nUtils()
const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const dialogStore = useDialogStore()
const searchEngineStore = useSearchEngineStore()
const { searchData } = storeToRefs(searchEngineStore)
const { useBinarySize, dateFormat } = storeToRefs(useVueTorrentStore())

const queryInput = ref<typeof HistoryField>()

const pluginManagerDialogVisible = ref(false)
const tabIndex = ref(0)

const headers = computed(() => [
  { title: t('searchEngine.headers.fileName'), key: 'fileName' },
  { title: t('searchEngine.headers.fileSize'), key: 'fileSize' },
  { title: t('searchEngine.headers.nbSeeders'), key: 'nbSeeders' },
  { title: t('searchEngine.headers.nbLeechers'), key: 'nbLeechers' },
  ...(appStore.usesQbit5
    ? [
        { title: t('searchEngine.headers.engineName'), key: 'engineName' },
        { title: t('searchEngine.headers.pubDate'), key: 'pubDate' },
      ]
    : [{ title: t('searchEngine.headers.siteUrl'), key: 'siteUrl' }]),
  { title: '', key: 'actions', sortable: false },
])
const categories = [
  { title: t('searchEngine.filters.category.movies'), value: 'movies' },
  { title: t('searchEngine.filters.category.tv'), value: 'tv' },
  { title: t('searchEngine.filters.category.music'), value: 'music' },
  { title: t('searchEngine.filters.category.games'), value: 'games' },
  { title: t('searchEngine.filters.category.anime'), value: 'anime' },
  { title: t('searchEngine.filters.category.software'), value: 'software' },
  { title: t('searchEngine.filters.category.pictures'), value: 'pictures' },
  { title: t('searchEngine.filters.category.books'), value: 'books' },
]
  .sort((a, b) => comparators.text.asc(a.title, b.title))
  .toSpliced(0, 0, { title: t('searchEngine.filters.category.all'), value: 'all' })

const plugins = computed(() => [
  { title: t('searchEngine.filters.plugins.all'), value: 'all' },
  { title: t('searchEngine.filters.plugins.enabled'), value: 'enabled' },
  ...searchEngineStore.searchPlugins
    .filter(plugin => plugin.enabled)
    .map(plugin => plugin.name)
    .sort(comparators.text.asc)
    .map(name => ({ title: name, value: name })),
])

const selectedTab = computed<SearchData>(() => searchData.value[tabIndex.value] ?? {})
const { results: filteredResults } = useSearchQuery(
  () => selectedTab.value.results,
  () => selectedTab.value.filters?.title,
  result => result.fileName
)

function createNewTab() {
  searchEngineStore.createNewTab()
  tabIndex.value = searchData.value.length - 1
  queryInput.value?.focus()
}

function deleteTab() {
  if (searchData.value.length === 1) return
  searchEngineStore.deleteTab(selectedTab.value.uniqueId)
  tabIndex.value = Math.min(tabIndex.value, searchData.value.length - 1)
}

function pushToQueue(result: SearchResult) {
  addTorrentStore.pushTorrentToQueue(result.fileUrl)
}

function downloadTorrent(result: SearchResult) {
  void searchEngineStore.downloadTorrent(result.fileUrl, result.engineName!).then(() => (result.downloaded = true))
}

function openResultLink(result: SearchResult) {
  openLink(result.descrLink)
}

async function runNewSearch() {
  await searchEngineStore.runNewSearch(selectedTab.value)
  selectedTab.value.timer = setInterval(() => void refreshResults(selectedTab.value), 1000)
  queryInput.value?.saveValueToHistory()
}

async function stopSearch(tab: SearchData) {
  await searchEngineStore.stopSearch(tab)
  if (tab.timer) {
    clearInterval(tab.timer)
  }
}

function stopAllSearch() {
  void Promise.allSettled(searchData.value.map(stopSearch))
}

async function refreshResults(tab: SearchData) {
  if ((await searchEngineStore.refreshResults(tab)) === 'Stopped') {
    await stopSearch(tab)
  }
}

function goHome() {
  void router.push({ name: 'dashboard' })
}

function openPluginManagerDialog() {
  dialogStore.createDialog(PluginManagerDialog)
}

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog || pluginManagerDialogVisible.value) {
    return false
  }

  if (e.key === 'Escape') {
    goHome()
  }
}

onBeforeMount(async () => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  if (searchData.value.length === 0) {
    searchEngineStore.createNewTab()
  } else {
    searchData.value.forEach((tab: SearchData) => {
      if (tab.id && tab.id !== 0) {
        tab.timer = setInterval(() => void searchEngineStore.refreshResults(tab), 1000)
      }
    })
  }
  await searchEngineStore.fetchSearchPlugins()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
  searchData.value.forEach((tab: SearchData) => {
    if (tab.timer) clearInterval(tab.timer)
  })
})
</script>

<template>
  <div class="pa-3">
    <div class="d-flex align-center">
      <div class="text-h5 ml-2">
        {{ t('searchEngine.title') }}
      </div>
      <v-spacer />
      <div class="d-flex justify-end">
        <v-btn color="error" icon="mdi-stop" variant="plain" @click="stopAllSearch" />
        <v-btn color="primary" icon="mdi-toy-brick" variant="plain" @click="openPluginManagerDialog" />
        <v-btn icon="mdi-close" variant="plain" @click="goHome" />
      </div>
    </div>

    <v-row class="ma-0 pa-0">
      <v-container class="d-flex align-center justify-center ma-0 pa-0 bg-primary" fluid>
        <v-tabs v-model="tabIndex" class="overflow-auto" bg-color="primary" show-arrows>
          <v-tab v-for="tab in searchData" :key="tab.uniqueId">
            <h4>{{ !tab.lastQuery || tab.lastQuery.length === 0 ? t('searchEngine.tabHeaderEmpty') : tab.lastQuery }}</h4>
          </v-tab>
        </v-tabs>

        <v-spacer />

        <v-btn icon="mdi-plus-circle-outline" variant="plain" color="accent" @click="createNewTab" />
        <v-btn icon="mdi-minus-circle-outline" variant="plain" color="error" :disabled="searchData.length === 1" @click="deleteTab" />
      </v-container>
    </v-row>

    <v-list>
      <v-list-item>
        <v-row class="mt-1">
          <v-col cols="12" md="6">
            <HistoryField
              ref="queryInput"
              v-model="selectedTab.query"
              :history-key="HistoryKey.SEARCH_ENGINE_QUERY"
              autofocus
              density="compact"
              hide-details
              clearable
              :label="t('searchEngine.query')"
              @keydown.enter.prevent="runNewSearch" />
          </v-col>

          <v-col cols="6" sm="5" md="2">
            <v-select
              v-model="selectedTab.filters.category"
              height="1"
              variant="outlined"
              density="compact"
              hide-details
              :items="categories"
              :label="t('searchEngine.filters.category.label')" />
          </v-col>
          <v-col cols="6" sm="5" md="2">
            <v-select
              v-model="selectedTab.filters.plugin"
              flat
              density="compact"
              hide-details
              variant="outlined"
              :items="plugins"
              :label="t('searchEngine.filters.plugins.label')" />
          </v-col>

          <v-col cols="12" sm="2" class="d-flex align-center justify-center">
            <v-btn v-if="selectedTab.id === 0" color="accent" flat class="mx-auto px-4" @click="runNewSearch">
              {{ t('searchEngine.runSearch') }}
            </v-btn>
            <v-btn v-else color="warning" flat class="mx-auto px-4" @click="stopSearch(selectedTab)">
              {{ t('searchEngine.stopSearch') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item class="text-select">
        <v-data-table
          v-if="mobile"
          v-model:items-per-page="selectedTab.itemsPerPage"
          :mobile="true"
          :headers="headers"
          :items="filteredResults"
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }">
          <template #top>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="selectedTab.filters.title" density="compact" hide-details :label="t('searchEngine.filters.title.label')" />
              </v-col>
            </v-row>
          </template>
          <template #item="{ item, index }">
            <v-divider v-if="index !== 0" />
            <v-row class="row-mobile ma-0 pa-3">
              <v-col cols="6" class="item-header-large">
                {{ t('searchEngine.headers.fileName') }}
              </v-col>
              <v-col cols="6" class="item-value-large">
                {{ item.fileName }}
              </v-col>

              <template v-if="appStore.usesQbit5">
                <v-col cols="6" class="item-header-large">
                  {{ t('searchEngine.headers.engineName') }}
                </v-col>
                <v-col cols="6" class="item-value-large">
                  {{ item.engineName }}
                </v-col>

                <v-col cols="6" class="item-header-large">
                  {{ t('searchEngine.headers.pubDate') }}
                </v-col>
                <v-col cols="6" class="item-value-large">
                  {{ item.pubDate === -1 ? t('common.NA') : formatTimeSec(item.pubDate!, dateFormat) }}
                </v-col>
              </template>
              <template v-else>
                <v-col cols="6" class="item-header-large">
                  {{ t('searchEngine.headers.siteUrl') }}
                </v-col>
                <v-col cols="6" class="item-value-large">
                  {{ item.siteUrl }}
                </v-col>
              </template>

              <v-col cols="3" class="item-container">
                <div class="item-header-small">
                  {{ t('searchEngine.headers.fileSize') }}
                </div>
                <div class="item-value-small">
                  {{ formatData(item.fileSize, useBinarySize) }}
                </div>
              </v-col>
              <v-col cols="3" class="item-container">
                <div class="item-header-small">
                  {{ t('searchEngine.headers.nbSeeders') }}
                </div>
                <div class="item-value-small">
                  {{ item.nbSeeders }}
                </div>
              </v-col>
              <v-col cols="3" class="item-container">
                <div class="item-header-small">
                  {{ t('searchEngine.headers.nbLeechers') }}
                </div>
                <div class="item-value-small">
                  {{ item.nbLeechers }}
                </div>
              </v-col>
              <v-col cols="3" class="item-actions">
                <v-btn icon="mdi-open-in-new" variant="flat" density="compact" @click.stop="openResultLink(item)" />
                <v-btn icon="mdi-plus-box-multiple" variant="text" density="compact" @click="pushToQueue(item)" />
                <v-btn
                  v-if="appStore.usesQbit5"
                  :icon="item.downloaded ? 'mdi-check' : 'mdi-download'"
                  :color="item.downloaded && 'accent'"
                  variant="text"
                  density="compact"
                  @click="downloadTorrent(item)" />
              </v-col>
            </v-row>
          </template>
        </v-data-table>
        <v-data-table
          v-else
          v-model:items-per-page="selectedTab.itemsPerPage"
          :mobile="false"
          :headers="headers"
          :items="filteredResults"
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }">
          <template #top>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="selectedTab.filters.title" density="compact" hide-details :label="t('searchEngine.filters.title.label')" />
              </v-col>
            </v-row>
          </template>
          <template #[`item.fileSize`]="{ item }">
            {{ formatData(item.fileSize, useBinarySize) }}
          </template>
          <template #[`item.pubDate`]="{ value }">
            {{ value === -1 ? t('common.NA') : formatTimeSec(value, dateFormat) }}
          </template>
          <template #[`item.actions`]="{ item }">
            <v-tooltip :text="t('searchEngine.tooltip.open_link')" location="top">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-open-in-new" variant="flat" density="compact" @click.stop="openResultLink(item)" />
              </template>
            </v-tooltip>

            <v-tooltip :text="t('searchEngine.tooltip.append_queue')" location="top">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-plus-box-multiple" variant="text" density="compact" @click="pushToQueue(item)" />
              </template>
            </v-tooltip>

            <v-tooltip :text="t('searchEngine.tooltip.download')" location="top">
              <template #activator="{ props }">
                <v-btn
                  v-if="appStore.usesQbit5"
                  v-bind="props"
                  :icon="item.downloaded ? 'mdi-check' : 'mdi-download'"
                  :color="item.downloaded && 'accent'"
                  variant="text"
                  density="compact"
                  @click="downloadTorrent(item)" />
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped lang="scss">
.v-row.row-mobile {
  & > .v-col {
    padding: 8px 0;
    display: flex;
    flex-wrap: wrap;
  }

  .item-header-large,
  .item-value-large,
  .item-actions {
    align-content: center;
    justify-content: start;
  }

  .item-container {
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
}
</style>
