<script setup lang="ts">
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { SearchEngineColumn } from '@/constants/vuetorrent'
import { useAppStore, useVueTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const appStore = useAppStore()
const vueTorrentStore = useVueTorrentStore()

const sortColumnOptions = computed(() => [
  { title: t('settings.vuetorrent.searchEngine.sortNone'), value: SearchEngineColumn.NONE },
  { title: t('searchEngine.headers.fileName'), value: SearchEngineColumn.FILE_NAME },
  { title: t('searchEngine.headers.fileSize'), value: SearchEngineColumn.FILE_SIZE },
  { title: t('searchEngine.headers.nbSeeders'), value: SearchEngineColumn.NB_SEEDERS },
  { title: t('searchEngine.headers.nbLeechers'), value: SearchEngineColumn.NB_LEECHERS },
  ...(appStore.usesQbit5
    ? [
        { title: t('searchEngine.headers.engineName'), value: SearchEngineColumn.ENGINE_NAME },
        { title: t('searchEngine.headers.pubDate'), value: SearchEngineColumn.PUB_DATE },
      ]
    : [{ title: t('searchEngine.headers.siteUrl'), value: SearchEngineColumn.SITE_URL }]),
])

const sortOrderOptions = computed(() => [
  { title: t('settings.vuetorrent.searchEngine.sortAsc'), value: 'asc' },
  { title: t('settings.vuetorrent.searchEngine.sortDesc'), value: 'desc' },
])
</script>

<template>
  <v-list>
    <v-list-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="vueTorrentStore.searchEngineDefaultSortBy"
            flat
            hide-details
            :items="sortColumnOptions"
            :label="t('settings.vuetorrent.searchEngine.defaultSortBy')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="vueTorrentStore.searchEngineDefaultSortOrder"
            flat
            hide-details
            :disabled="vueTorrentStore.searchEngineDefaultSortBy === SearchEngineColumn.NONE"
            :items="sortOrderOptions"
            :label="t('settings.vuetorrent.searchEngine.defaultSortOrder')" />
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>
