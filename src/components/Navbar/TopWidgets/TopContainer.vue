<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopActions from './TopActions.vue'
import TopOverflow from './TopOverflow.vue'
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/Confirm/ConfirmDeleteDialog.vue'
import { useI18nUtils } from '@/composables'
import { useDashboardStore, useDialogStore, useRssStore, useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const route = useRoute()
const router = useRouter()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const rssStore = useRssStore()
const torrentStore = useTorrentStore()

const isOnTorrentDetail = computed(() => route.name === 'torrentDetail')
const hashes = computed(() => (isOnTorrentDetail.value ? [route.params.hash as string] : dashboardStore.selectedTorrents))

function openAddTorrentDialog() {
  dialogStore.createDialog(AddTorrentDialog)
}

async function resumeTorrents() {
  if (!hashes.value.length) {
    dialogStore.confirmAction({
      title: t('dialogs.confirm.startAll'),
      yesColor: 'accent',
      onConfirm: async () => {
        await torrentStore.resumeAllTorrents()
      },
    })
  } else {
    await torrentStore.resumeTorrents(hashes.value)
  }
}

async function pauseTorrents() {
  if (!hashes.value.length) {
    dialogStore.confirmAction({
      title: t('dialogs.confirm.stopAll'),
      yesColor: 'accent',
      onConfirm: async () => {
        await torrentStore.pauseAllTorrents()
      },
    })
  } else {
    await torrentStore.pauseTorrents(hashes.value)
  }
}

function deleteTorrents() {
  if (!hashes.value.length) return

  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...hashes.value] })
}

function openSearchEngine() {
  void router.push({ name: 'searchEngine' })
}

function openRssArticles() {
  void router.push({ name: 'rssArticles', params: { tab: rssStore.lastView } })
}

function openTorrentCreator() {
  void router.push({ name: 'torrentCreator' })
}

function openCookiesManager() {
  void router.push({ name: 'cookiesManager' })
}

function openLogs() {
  void router.push({ name: 'logs' })
}

function openSettings() {
  void router.push({ name: 'settings' })
}
</script>

<template>
  <v-tooltip :text="$t('topbar.addTorrents')" location="bottom">
    <template #activator="{ props }">
      <v-btn icon="mdi-plus" v-bind="props" @click="openAddTorrentDialog" />
    </template>
  </v-tooltip>

  <v-divider inset vertical />

  <TopOverflow
    v-if="$vuetify.display.smAndDown"
    @delete-torrents="deleteTorrents"
    @open-logs="openLogs"
    @open-search-engine="openSearchEngine"
    @open-settings="openSettings"
    @open-rss-articles="openRssArticles"
    @open-torrent-creator="openTorrentCreator"
    @open-cookies-manager="openCookiesManager"
    @pause-torrents="pauseTorrents"
    @resume-torrents="resumeTorrents" />
  <TopActions
    v-else
    @delete-torrents="deleteTorrents"
    @open-logs="openLogs"
    @open-search-engine="openSearchEngine"
    @open-settings="openSettings"
    @open-rss-articles="openRssArticles"
    @open-torrent-creator="openTorrentCreator"
    @open-cookies-manager="openCookiesManager"
    @pause-torrents="pauseTorrents"
    @resume-torrents="resumeTorrents" />
</template>

<style scoped></style>
