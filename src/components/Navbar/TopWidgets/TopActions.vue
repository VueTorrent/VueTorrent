<script setup lang="ts">
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useDashboardStore } from '@/stores'
import { ref } from 'vue'

defineEmits(['resumeTorrents', 'pauseTorrents', 'openSearchEngine', 'openrssArticles', 'openLogs', 'openSettings'])

const dashboardStore = useDashboardStore()

const deleteTorrentDialogVisible = ref(false)
const deleteHashes = ref<string[]>()
function onDelete() {
  deleteTorrentDialogVisible.value = true
  deleteHashes.value = [...dashboardStore.selectedTorrents]
}
</script>

<template>
  <v-tooltip :text="$t('topbar.actions.resume')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-play" v-bind="props" @click="$emit('resumeTorrents')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.pause')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-pause" v-bind="props" @click="$emit('pauseTorrents')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.delete')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="onDelete">
        <v-icon>mdi-delete</v-icon>
        <ConfirmDeleteDialog v-if="deleteTorrentDialogVisible"
                             v-model="deleteTorrentDialogVisible"
                             :hashes="deleteHashes"
                             disable-activator />
      </v-btn>
    </template>
  </v-tooltip>

  <v-divider vertical inset />

  <v-tooltip :text="$t('topbar.actions.searchEngine')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-search-web" v-bind="props" @click="$emit('openSearchEngine')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.rssArticles')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-rss" v-bind="props" @click="$emit('openrssArticles')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.logs')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-file-document-multiple" v-bind="props" @click="$emit('openLogs')" />
    </template>
  </v-tooltip>

  <v-tooltip :text="$t('topbar.actions.settings')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-cog" v-bind="props" @click="$emit('openSettings')" />
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>