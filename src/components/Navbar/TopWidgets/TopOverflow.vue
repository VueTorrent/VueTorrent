<script setup lang="ts">
import { useAppStore } from '@/stores'

defineEmits(['resumeTorrents', 'pauseTorrents', 'deleteTorrents', 'openSearchEngine', 'openRssArticles', 'openTorrentCreator', 'openCookiesManager', 'openLogs', 'openSettings'])

const appStore = useAppStore()
</script>

<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item :title="$t('topbar.overflow.resume')" @click="$emit('resumeTorrents')">
        <template v-slot:prepend>
          <v-icon>mdi-play</v-icon>
        </template>
      </v-list-item>

      <v-list-item :title="$t('topbar.overflow.pause')" @click="$emit('pauseTorrents')">
        <template v-slot:prepend>
          <v-icon>mdi-pause</v-icon>
        </template>
      </v-list-item>

      <v-list-item :title="$t('topbar.overflow.delete')" @click="$emit('deleteTorrents')">
        <template v-slot:prepend>
          <v-icon>mdi-delete</v-icon>
        </template>
      </v-list-item>

      <v-divider />

      <v-list-item :title="$t('topbar.overflow.searchEngine')" @click="$emit('openSearchEngine')">
        <template v-slot:prepend>
          <v-icon>mdi-search-web</v-icon>
        </template>
      </v-list-item>

      <v-list-item :title="$t('topbar.overflow.rssArticles')" @click="$emit('openRssArticles')">
        <template v-slot:prepend>
          <v-icon>mdi-rss</v-icon>
        </template>
      </v-list-item>

      <v-list-item v-if="appStore.isFeatureAvailable('5')" :title="$t('topbar.overflow.torrentCreator')" @click="$emit('openTorrentCreator')">
        <template v-slot:prepend>
          <v-icon>mdi-file-plus</v-icon>
        </template>
      </v-list-item>

      <v-list-item v-if="appStore.isFeatureAvailable('5.1')" :title="$t('topbar.overflow.cookies')" @click="$emit('openCookiesManager')">
        <template v-slot:prepend>
          <v-icon>mdi-cookie</v-icon>
        </template>
      </v-list-item>

      <v-list-item :title="$t('topbar.overflow.logs')" @click="$emit('openLogs')">
        <template v-slot:prepend>
          <v-icon>mdi-file-document-multiple</v-icon>
        </template>
      </v-list-item>

      <v-list-item :title="$t('topbar.overflow.settings')" @click="$emit('openSettings')">
        <template v-slot:prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped></style>
