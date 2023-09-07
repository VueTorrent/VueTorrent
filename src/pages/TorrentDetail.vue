<script setup lang="ts">
import Content from '@/components/TorrentDetail/Content.vue'
import Info from '@/components/TorrentDetail/Info.vue'
import Overview from '@/components/TorrentDetail/Overview.vue'
import Peers from '@/components/TorrentDetail/Peers.vue'
import TagsAndCategories from '@/components/TorrentDetail/TagsAndCategories.vue'
import Trackers from '@/components/TorrentDetail/Trackers.vue'
import { useMaindataStore } from '@/stores'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const maindataStore = useMaindataStore()

const tab = ref('overview')

const torrent = computed(() => maindataStore.getTorrentByHash(route.params.hash as string))

const goHome = () => {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('torrentDetail.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-home" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary" grow show-arrows>
        <v-tab value="overview">{{ t('torrentDetail.tabs.overview') }}</v-tab>
        <v-tab value="info">{{ t('torrentDetail.tabs.info') }}</v-tab>
        <v-tab value="trackers">{{ t('torrentDetail.tabs.trackers') }}</v-tab>
        <v-tab value="peers">{{ t('torrentDetail.tabs.peers') }}</v-tab>
        <v-tab value="content">{{ t('torrentDetail.tabs.content') }}</v-tab>
        <v-tab value="tagsAndCategories">{{ t('torrentDetail.tabs.tagsAndCategories') }}</v-tab>
      </v-tabs>
    </v-row>

    <v-window v-model="tab" v-if="torrent">
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
</template>

<style scoped>

</style>