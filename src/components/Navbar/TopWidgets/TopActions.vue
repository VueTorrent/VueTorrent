<script setup lang="ts">
import { useAppStore } from '@/stores'

defineEmits(['resumeTorrents', 'pauseTorrents', 'deleteTorrents', 'openSearchEngine', 'openRssArticles', 'openTorrentCreator', 'openCookiesManager', 'openLogs', 'openSettings'])

const appStore = useAppStore()
</script>

<template>
  <v-tooltip :text="$t('topbar.actions.resume')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-play" v-bind="props" @click="$emit('resumeTorrents')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.pause')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-pause" v-bind="props" @click="$emit('pauseTorrents')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.delete')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-delete" v-bind="props" @click="$emit('deleteTorrents')" />
    </template>
  </v-tooltip>

  <v-divider vertical inset />

  <v-tooltip :text="$t('topbar.actions.searchEngine')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-search-web" v-bind="props" @click="$emit('openSearchEngine')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.rssArticles')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-rss" v-bind="props" @click="$emit('openRssArticles')" />
    </template>
  </v-tooltip>

  <v-tooltip v-if="appStore.isFeatureAvailable('5')" :text="$t('topbar.actions.torrentCreator')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-file-plus" v-bind="props" @click="$emit('openTorrentCreator')" />
    </template>
  </v-tooltip>

  <v-tooltip v-if="appStore.isFeatureAvailable('5.1')" :text="$t('topbar.actions.cookies')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-cookie" v-bind="props" @click="$emit('openCookiesManager')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.logs')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-file-document-multiple" v-bind="props" @click="$emit('openLogs')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.settings')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-cog" v-bind="props" @click="$emit('openSettings')" />
    </template>
  </v-tooltip>
</template>

<style scoped></style>
