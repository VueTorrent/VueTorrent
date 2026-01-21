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
import { TorrentDetailTab } from '@/constants/vuetorrent'
import { useContentStore, useDialogStore, useGlobalStore, useTorrentDetailStore, useTorrentStore, useVueTorrentStore } from '@/stores'

const router = useRouter()
const { t } = useI18nUtils()
const contentStore = useContentStore()
const dialogStore = useDialogStore()
const globalStore = useGlobalStore()
const torrentStore = useTorrentStore()
const torrentDetailStore = useTorrentDetailStore()
const { tab } = storeToRefs(torrentDetailStore)
const { keepDefaultTransitions, defaultTorrentDetailTab } = storeToRefs(useVueTorrentStore())

const tabs = [
  { text: t('torrentDetail.tabs.overview'), value: TorrentDetailTab.OVERVIEW },
  { text: t('torrentDetail.tabs.info'), value: TorrentDetailTab.INFO },
  { text: t('torrentDetail.tabs.trackers'), value: TorrentDetailTab.TRACKERS },
  { text: t('torrentDetail.tabs.peers'), value: TorrentDetailTab.PEERS },
  { text: t('torrentDetail.tabs.content'), value: TorrentDetailTab.CONTENT },
  { text: t('torrentDetail.tabs.tagsAndCategories'), value: TorrentDetailTab.TAGS_AND_CATEGORIES },
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
  } else if (defaultTorrentDetailTab.value !== TorrentDetailTab.LAST_OPENED) {
    tab.value = defaultTorrentDetailTab.value
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
    <div class="d-flex align-center">
      <div class="text-h5 ml-2 text-truncate">
        {{ torrent?.name ?? t('torrentDetail.error.title') }}
      </div>
      <v-spacer />
      <div class="d-flex justify-end">
        <v-btn :disabled="isTorrentFilterEmpty || isFirstTorrent" icon="mdi-skip-previous" variant="plain" @click="goToFirstTorrent" />
        <v-btn :disabled="isTorrentNotInFilter || isFirstTorrent" icon="mdi-arrow-left" variant="plain" @click="goToPreviousTorrent" />
        <v-btn :disabled="isTorrentNotInFilter || isLastTorrent" icon="mdi-arrow-right" variant="plain" @click="goToNextTorrent" />
        <v-btn :disabled="isTorrentFilterEmpty || isLastTorrent" icon="mdi-skip-next" variant="plain" @click="goToLastTorrent" />
        <v-btn icon="mdi-close" variant="plain" @click="goHome" />
      </div>
    </div>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary" grow show-arrows>
        <v-tab v-for="{ text, value } in tabs" :key="value" :value="value" :text="text" replace :to="{ name: 'torrentDetail', params: { hash, tab: value } }" />
      </v-tabs>
    </v-row>

    <v-window v-if="torrent" v-model="tab" :touch="false">
      <v-window-item :value="TorrentDetailTab.OVERVIEW" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Overview :torrent="torrent" :is-active="tab === TorrentDetailTab.OVERVIEW" />
      </v-window-item>
      <v-window-item :value="TorrentDetailTab.INFO" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Info :torrent="torrent" :is-active="tab === TorrentDetailTab.INFO" />
      </v-window-item>
      <v-window-item :value="TorrentDetailTab.TRACKERS" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Trackers :torrent="torrent" :is-active="tab === TorrentDetailTab.TRACKERS" />
      </v-window-item>
      <v-window-item :value="TorrentDetailTab.PEERS" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Peers :torrent="torrent" :is-active="tab === TorrentDetailTab.PEERS" />
      </v-window-item>
      <v-window-item :value="TorrentDetailTab.CONTENT" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <Content :torrent="torrent" :is-active="tab === TorrentDetailTab.CONTENT" />
      </v-window-item>
      <v-window-item :value="TorrentDetailTab.TAGS_AND_CATEGORIES" :transition="keepDefaultTransitions" :reverse-transition="keepDefaultTransitions">
        <TagsAndCategories :torrent="torrent" :is-active="tab === TorrentDetailTab.TAGS_AND_CATEGORIES" />
      </v-window-item>
    </v-window>
  </div>

  <v-empty-state v-if="!hash || !torrent" :headline="t('torrentDetail.error.headline')" :title="t('torrentDetail.error.content')" icon="mdi-alert-circle-outline" />

  <div :style="`position: absolute; left: ${contentStore.rightClickProperties.offset[0]}px; top: ${contentStore.rightClickProperties.offset[1]}px;`">
    <RightClickMenu v-model="contentStore.rightClickProperties.isVisible" :menu-data="contentStore.menuData" />
  </div>
</template>
