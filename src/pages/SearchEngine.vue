<script setup lang="ts">
import HistoryField from '@/components/Core/HistoryField.vue'
import PluginManagerDialog from '@/components/Dialogs/PluginManagerDialog.vue'
import { useSearchQuery } from '@/composables'
import { HistoryKey } from '@/constants/vuetorrent'
import { formatData } from '@/helpers'
import { useAddTorrentStore, useDialogStore, useSearchEngineStore, useVueTorrentStore } from '@/stores'
import { SearchPlugin, SearchResult } from '@/types/qbit/models'
import { SearchData } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()
const searchEngineStore = useSearchEngineStore()
const vuetorrentStore = useVueTorrentStore()

const queryInput = ref<typeof HistoryField>()

const pluginManagerDialogVisible = ref(false)
const tabIndex = ref(0)
const { searchData } = storeToRefs(searchEngineStore)

const headers = [
  { title: t('searchEngine.headers.fileName'), key: 'fileName' },
  { title: t('searchEngine.headers.fileSize'), key: 'fileSize' },
  { title: t('searchEngine.headers.nbSeeders'), key: 'nbSeeders' },
  { title: t('searchEngine.headers.nbLeechers'), key: 'nbLeechers' },
  { title: t('searchEngine.headers.siteUrl'), key: 'siteUrl' },
  { title: '', key: 'actions', sortable: false }
]
const cats = [
  { title: t('searchEngine.filters.category.movies'), value: 'movies' },
  { title: t('searchEngine.filters.category.tv'), value: 'tv' },
  { title: t('searchEngine.filters.category.music'), value: 'music' },
  { title: t('searchEngine.filters.category.games'), value: 'games' },
  { title: t('searchEngine.filters.category.anime'), value: 'anime' },
  { title: t('searchEngine.filters.category.software'), value: 'software' },
  { title: t('searchEngine.filters.category.pictures'), value: 'pictures' },
  { title: t('searchEngine.filters.category.books'), value: 'books' }
]
cats.sort((a, b) => a.title.localeCompare(b.title))
const categories = [{ title: t('searchEngine.filters.category.all'), value: 'all' }, ...cats]

const plugins = computed(() => {
  const plugins = [
    { title: t('searchEngine.filters.plugins.all'), value: 'all' },
    { title: t('searchEngine.filters.plugins.enabled'), value: 'enabled' }
  ]

  searchEngineStore.searchPlugins
    .filter((plugin: SearchPlugin) => plugin.enabled)
    .forEach((plugin: SearchPlugin) => {
      plugins.push({ title: plugin.name, value: plugin.name })
    })

  return plugins
})

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

function downloadTorrent(result: SearchResult) {
  addTorrentStore.pushTorrentToQueue(result.fileUrl)
}

function openLink(result: SearchResult) {
  window.open(result.descrLink, '_blank', 'noreferrer')
}

async function runNewSearch() {
  await searchEngineStore.runNewSearch(selectedTab.value)
  selectedTab.value.timer = setInterval(() => refreshResults(selectedTab.value), 1000)
  queryInput.value?.saveValueToHistory()
}

async function stopSearch(tab: SearchData) {
  await searchEngineStore.stopSearch(tab)
  !!tab.timer && clearInterval(tab.timer)
}

function stopAllSearch() {
  searchData.value.forEach(stopSearch)
}

async function refreshResults(tab: SearchData) {
  if ((await searchEngineStore.refreshResults(tab)) === 'Stopped') {
    await stopSearch(tab)
  }
}

const goHome = () => {
  router.push({ name: 'dashboard' })
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
        tab.timer = setInterval(() => searchEngineStore.refreshResults(tab), 1000)
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
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('searchEngine.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-stop" variant="plain" color="error" @click="stopAllSearch" />
          <v-btn icon="mdi-toy-brick" variant="plain" color="primary" @click="openPluginManagerDialog" />
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-container class="d-flex align-center justify-center ma-0 pa-0 bg-primary" fluid>
        <v-tabs v-model="tabIndex" class="overflow-auto" bg-color="primary" show-arrows>
          <v-tab v-for="tab in searchData" :key="tab.uniqueId">
            <h4>{{ !tab.query || tab.query.length === 0 ? $t('searchEngine.tabHeaderEmpty') : tab.query }}</h4>
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
              v-model="selectedTab.query"
              :history-key="HistoryKey.SEARCH_ENGINE_QUERY"
              ref="queryInput"
              autofocus
              density="compact"
              hide-details
              clearable
              :label="$t('searchEngine.query')"
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
              :label="$t('searchEngine.filters.category.label')" />
          </v-col>
          <v-col cols="6" sm="5" md="2">
            <v-select
              v-model="selectedTab.filters.plugin"
              flat
              density="compact"
              hide-details
              variant="outlined"
              :items="plugins"
              :label="$t('searchEngine.filters.plugins.label')" />
          </v-col>

          <v-col cols="12" sm="2" class="d-flex align-center justify-center">
            <v-btn v-if="selectedTab.id === 0" color="accent" flat class="mx-auto px-4" @click="runNewSearch">
              {{ $t('searchEngine.runSearch') }}
            </v-btn>
            <v-btn v-else color="warning" flat class="mx-auto px-4" @click="stopSearch(selectedTab)">
              {{ $t('searchEngine.stopSearch') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item class="text-select">
        <v-data-table
          :mobile="null"
          :headers="headers"
          :items="filteredResults"
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
          :items-per-page.sync="selectedTab.itemsPerPage">
          <template v-slot:top>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="selectedTab.filters.title" density="compact" hide-details :label="$t('searchEngine.filters.title.label')" />
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.fileSize`]="{ item }">
            {{ formatData(item.fileSize, vuetorrentStore.useBinarySize) }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon="mdi-open-in-new" variant="flat" density="compact" @click.stop="openLink(item)" />
            <v-btn icon="mdi-download" variant="flat" density="compact" @click="downloadTorrent(item)"></v-btn>
          </template>
        </v-data-table>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
