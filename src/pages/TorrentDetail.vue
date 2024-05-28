<script setup lang="ts">
import RightClickMenu from '@/components/Core/RightClickMenu'
import Content from '@/components/TorrentDetail/Content'
import Info from '@/components/TorrentDetail/Info/Info.vue'
import Overview from '@/components/TorrentDetail/Overview.vue'
import Peers from '@/components/TorrentDetail/Peers.vue'
import TagsAndCategories from '@/components/TorrentDetail/TagsAndCategories.vue'
import Trackers from '@/components/TorrentDetail/Trackers.vue'
import { useContentStore, useDialogStore, useTorrentDetailStore, useTorrentStore } from '@/stores'
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const contentStore = useContentStore()
const dialogStore = useDialogStore()
const torrentStore = useTorrentStore()
const torrentDetailStore = useTorrentDetailStore()

const tabs = [
  { text: t('torrentDetail.tabs.overview'), value: 'overview' },
  { text: t('torrentDetail.tabs.info'), value: 'info' },
  { text: t('torrentDetail.tabs.trackers'), value: 'trackers' },
  { text: t('torrentDetail.tabs.peers'), value: 'peers' },
  { text: t('torrentDetail.tabs.content'), value: 'content' },
  { text: t('torrentDetail.tabs.tagsAndCategories'), value: 'tagsAndCategories' }
]

const tab = ref('overview')

const hash = computed(() => router.currentRoute.value.params.hash as string)
const torrent = computed(() => torrentStore.getTorrentByHash(hash.value))

const goHome = () => {
  router.push({ name: 'dashboard' })
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

watchEffect(() => {
  updateTabHandle()
})

watch(torrent, () => {
  torrentDetailStore.fetchProperties(hash.value)
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  updateTabHandle()
  torrentDetailStore.fetchProperties(hash.value)
  contentStore.updateFileTree()
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
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary" grow show-arrows>
        <v-tab v-for="{ text, value } in tabs" :value="value" :href="`#/torrent/${hash}/${value}`" :text="text" />
      </v-tabs>
    </v-row>

    <v-window v-model="tab" :touch="false" v-if="torrent">
      <v-window-item value="overview">
        <Overview :torrent="torrent" :is-active="tab === 'overview'" />
      </v-window-item>
      <v-window-item value="info">
        <Info :torrent="torrent" :is-active="tab === 'info'" />
      </v-window-item>
      <v-window-item value="trackers">
        <Trackers :torrent="torrent" :is-active="tab === 'trackers'" />
      </v-window-item>
      <v-window-item value="peers">
        <Peers :torrent="torrent" :is-active="tab === 'peers'" />
      </v-window-item>
      <v-window-item value="content">
        <Content :torrent="torrent" :is-active="tab === 'content'" />
      </v-window-item>
      <v-window-item value="tagsAndCategories">
        <TagsAndCategories :torrent="torrent" :is-active="tab === 'tagsAndCategories'" />
      </v-window-item>
    </v-window>
  </div>

  <div :style="`position: absolute; left: ${contentStore.rightClickProperties.offset[0]}px; top: ${contentStore.rightClickProperties.offset[1]}px;`">
    <RightClickMenu v-model="contentStore.rightClickProperties.isVisible" :menu-data="contentStore.menuData" />
  </div>
</template>

<style scoped></style>
