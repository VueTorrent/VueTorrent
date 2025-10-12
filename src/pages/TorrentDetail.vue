<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import RightClickMenu from '@/components/Core/RightClickMenu'
import Content from '@/components/TorrentDetail/Content'
import Info from '@/components/TorrentDetail/Info/Info.vue'
import Overview from '@/components/TorrentDetail/Overview.vue'
import Peers from '@/components/TorrentDetail/Peers.vue'
import TagsAndCategories from '@/components/TorrentDetail/TagsAndCategories.vue'
import Trackers from '@/components/TorrentDetail/Trackers.vue'
import { useI18nUtils } from '@/composables'
import { useContentStore, useDialogStore, useGlobalStore, useTorrentDetailStore, useTorrentStore, useVueTorrentStore } from '@/stores'

const router = useRouter()
const { t } = useI18nUtils()
const contentStore = useContentStore()
const dialogStore = useDialogStore()
const globalStore = useGlobalStore()
const torrentStore = useTorrentStore()
const torrentDetailStore = useTorrentDetailStore()
const { tab } = storeToRefs(torrentDetailStore)
const { keepDefaultTransitions } = storeToRefs(useVueTorrentStore())

const tabs = [
  { text: t('torrentDetail.tabs.overview'), value: 'overview' },
  { text: t('torrentDetail.tabs.info'), value: 'info' },
  { text: t('torrentDetail.tabs.trackers'), value: 'trackers' },
  { text: t('torrentDetail.tabs.peers'), value: 'peers' },
  { text: t('torrentDetail.tabs.content'), value: 'content' },
  { text: t('torrentDetail.tabs.tagsAndCategories'), value: 'tagsAndCategories' },
]

const hash = computed(() => router.currentRoute.value.params.hash as string)
const torrent = computed(() => torrentStore.getTorrentByHash(hash.value))
const torrentIndex = computed(() => torrentStore.getTorrentIndexByHash(hash.value))
const isTorrentNotInFilter = computed(() => torrentIndex.value === -1)
const isTorrentFilterEmpty = computed(() => torrentStore.processedTorrents.length === 0)
const isFirstTorrent = computed(() => torrentIndex.value === 0)
const isLastTorrent = computed(() => torrentIndex.value === torrentStore.processedTorrents.length - 1)

function goToTorrentIndex(index: number) {
  void router.push({ name: 'torrentDetail', params: { hash: torrentStore.processedTorrents[index].hash } }).then(res => !res && globalStore.forceReload())
}

function goToFirstTorrent() {
  goToTorrentIndex(0)
}

function goToPreviousTorrent() {
  goToTorrentIndex(torrentIndex.value - 1)
}

function goToNextTorrent() {
  goToTorrentIndex(torrentIndex.value + 1)
}

function goToLastTorrent() {
  goToTorrentIndex(torrentStore.processedTorrents.length - 1)
}

function goHome() {
  void router.push({ name: 'dashboard' })
}

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) {
    return false
  }

  if (e.key === 'Escape') {
    goHome()
  }
}

function updateTabHandle() {
  const tabRouteParam = router.currentRoute.value.params.tab as string
  if (tabRouteParam) {
    tab.value = tabRouteParam
  }
}

watch(router.currentRoute, updateTabHandle, {
  immediate: true,
})

watch(torrent, () => {
  void torrentDetailStore.fetchProperties(hash.value)
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  void torrentDetailStore.fetchProperties(hash.value)
  contentStore.updateFileTreeTask.perform()
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
  torrentDetailStore.$reset()
})
</script>

<template>
  <div class="pa-3 text-select">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('torrentDetail.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-skip-previous" :disabled="isTorrentFilterEmpty || isFirstTorrent" variant="plain" @click="goToFirstTorrent" />
          <v-btn icon="mdi-arrow-left" :disabled="isTorrentNotInFilter || isFirstTorrent" variant="plain" @click="goToPreviousTorrent" />
          <v-btn icon="mdi-arrow-right" :disabled="isTorrentNotInFilter || isLastTorrent" variant="plain" @click="goToNextTorrent" />
          <v-btn icon="mdi-skip-next" :disabled="isTorrentFilterEmpty || isLastTorrent" variant="plain" @click="goToLastTorrent" />
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary" grow show-arrows>
        <v-tab v-for="{ text, value } in tabs" :key="value" :value="value" :text="text" replace :to="{ name: 'torrentDetail', params: { hash, tab: value } }" />
      </v-tabs>
    </v-row>

    <v-window v-if="torrent" v-model="tab" :touch="false">
      <v-window-item value="overview" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Overview :torrent="torrent" :is-active="tab === 'overview'" />
      </v-window-item>
      <v-window-item value="info" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Info :torrent="torrent" :is-active="tab === 'info'" />
      </v-window-item>
      <v-window-item value="trackers" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Trackers :torrent="torrent" :is-active="tab === 'trackers'" />
      </v-window-item>
      <v-window-item value="peers" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Peers :torrent="torrent" :is-active="tab === 'peers'" />
      </v-window-item>
      <v-window-item value="content" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Content :torrent="torrent" :is-active="tab === 'content'" />
      </v-window-item>
      <v-window-item value="tagsAndCategories" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <TagsAndCategories :torrent="torrent" :is-active="tab === 'tagsAndCategories'" />
      </v-window-item>
    </v-window>
  </div>

  <div :style="`position: absolute; left: ${contentStore.rightClickProperties.offset[0]}px; top: ${contentStore.rightClickProperties.offset[1]}px;`">
    <RightClickMenu v-model="contentStore.rightClickProperties.isVisible" :menu-data="contentStore.menuData" />
  </div>
</template>
