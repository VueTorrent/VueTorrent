<script setup lang="ts">
defineEmits(['resumeTorrents', 'pauseTorrents', 'deleteTorrents', 'openSearchEngine', 'openRssFeeds', 'openLogs', 'openSettings'])
</script>

<template>
  <v-tooltip :text="$t('topbar.actions.resume')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-play" v-bind="props" @click="$emit('resumeTorrents', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.pause')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-pause" v-bind="props" @click="$emit('pauseTorrents', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.delete')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-delete" v-bind="props" @click="$emit('deleteTorrents', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.searchEngine')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-search-web" v-bind="props" @click="$emit('openSearchEngine', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.rssFeeds')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-rss" v-bind="props" @click="$emit('openRssFeeds', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.logs')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-file-document-multiple" v-bind="props" @click="$emit('openLogs', $event.target.value)" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.settings')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-cog" v-bind="props" @click="$emit('openSettings', $event.target.value)" />
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>