<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const resumeTorrents = () => {
  // TODO
}
const pauseTorrents = () => {
  // TODO
}
const deleteTorrents = () => {
  // TODO
}
const openSearchEngine = () => {
  router.push({name: 'searchEngine'})
}
const openRssFeeds = () => {
  router.push({name: 'rssArticles'})
}
const openLogs = () => {
  router.push({name: 'logs'})
}
const openSettings = () => {
  router.push({name: 'settings'})
}
</script>

<template>
  <div>
    <v-tooltip text="Add Torrent" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-plus" v-bind="props" />
      </template>
    </v-tooltip>

    <v-tooltip text="Resume torrents" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-play" v-bind="props" @click="resumeTorrents" />
      </template>
    </v-tooltip>

    <v-tooltip text="Pause torrents" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-pause" v-bind="props" @click="pauseTorrents" />
      </template>
    </v-tooltip>

    <v-tooltip text="Delete torrents" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-delete" v-bind="props" @click="deleteTorrents" />
      </template>
    </v-tooltip>

    <v-tooltip text="Open Search Engine" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-search-web" v-bind="props" @click="openSearchEngine" />
      </template>
    </v-tooltip>

    <v-tooltip text="Open RSS Feeds" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-rss" v-bind="props" @click="openRssFeeds" />
      </template>
    </v-tooltip>

    <v-tooltip text="Open Logs" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-file-document-multiple" v-bind="props" @click="openLogs" />
      </template>
    </v-tooltip>

    <v-tooltip text="Open Settings" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-cog" v-bind="props" @click="openSettings" />
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>

</style>