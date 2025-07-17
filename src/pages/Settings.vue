<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import EnhancedEdition from '@/components/Settings/addons/EnhancedEdition.vue'
import Advanced from '@/components/Settings/Advanced.vue'
import Behavior from '@/components/Settings/Behavior.vue'
import BitTorrent from '@/components/Settings/BitTorrent.vue'
import Connection from '@/components/Settings/Connection.vue'
import Downloads from '@/components/Settings/Downloads.vue'
import RSS from '@/components/Settings/RSS.vue'
import Speed from '@/components/Settings/Speed.vue'
import TagsAndCategories from '@/components/Settings/TagsAndCategories.vue'
import VGeneral from '@/components/Settings/VueTorrent/General.vue'
import VTorrentCardGrid from '@/components/Settings/VueTorrent/TorrentCard/Grid.vue'
import VTorrentCardList from '@/components/Settings/VueTorrent/TorrentCard/List.vue'
import VTorrentCardTable from '@/components/Settings/VueTorrent/TorrentCard/Table.vue'
import WebUI from '@/components/Settings/WebUI.vue'
import { useI18nUtils } from '@/composables'
import { useDialogStore, usePreferenceStore } from '@/stores'

const router = useRouter()
const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const preferenceStore = usePreferenceStore()

const tabs = [
  { text: t('settings.tabs.vuetorrent.title'), value: 'vuetorrent' },
  { text: t('settings.tabs.behavior'), value: 'behavior' },
  { text: t('settings.tabs.downloads'), value: 'downloads' },
  { text: t('settings.tabs.connection'), value: 'connection' },
  { text: t('settings.tabs.speed'), value: 'speed' },
  { text: t('settings.tabs.bittorrent'), value: 'bittorrent' },
  { text: t('settings.tabs.rss'), value: 'rss' },
  { text: t('settings.tabs.webui'), value: 'webui' },
  { text: t('settings.tabs.tagsAndCategories'), value: 'tagsAndCategories' },
  { text: t('settings.tabs.advanced'), value: 'advanced' },
]

const tabsV = [
  { text: t('settings.tabs.vuetorrent.general'), value: 'general' },
  { text: t('settings.tabs.vuetorrent.torrent_card.list'), value: 'torrentCardList' },
  { text: t('settings.tabs.vuetorrent.torrent_card.grid'), value: 'torrentCardGrid' },
  { text: t('settings.tabs.vuetorrent.torrent_card.table'), value: 'torrentCardTable' },
]

const tab = ref('vuetorrent')
const innerTabV = ref('general')

const isEnhancedEdition = computed(() => preferenceStore.preferences && Object.keys(preferenceStore.preferences).includes('public_trackers'))

async function saveSettings() {
  await preferenceStore.setPreferences()
  toast.success(t('settings.saveSuccess'))
  await preferenceStore.fetchPreferences()

  if (!preferenceStore.preferences!.alternative_webui_enabled) {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }
    }
    location.hash = ''
    location.reload()
  }
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
  const subtabRouteParam = router.currentRoute.value.params.subtab as string
  if (tabRouteParam) {
    if (tabRouteParam === 'vuetorrent' && subtabRouteParam) {
      innerTabV.value = subtabRouteParam
    }
    tab.value = tabRouteParam
  }
}

watchEffect(() => {
  updateTabHandle()
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  updateTabHandle()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('settings.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn color="accent" icon="mdi-content-save" variant="plain" @click="saveSettings" />
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary" grow show-arrows>
        <v-tab
          v-if="isEnhancedEdition"
          value="enhancedEdition"
          :text="$t('settings.tabs.addons.enhanced_edition')"
          replace
          :to="{ name: 'settings', params: { tab: 'enhancedEdition' } }" />
        <v-tab v-for="{ text, value } in tabs" :key="value" :value="value" :text="text" replace :to="{ name: 'settings', params: { tab: value } }" />
      </v-tabs>
    </v-row>

    <v-window v-model="tab" :touch="false">
      <v-window-item value="enhancedEdition">
        <EnhancedEdition />
      </v-window-item>

      <v-window-item value="vuetorrent">
        <v-tabs v-model="innerTabV" grow color="accent" show-arrows>
          <v-tab v-for="{ text, value } in tabsV" :key="value" :value="value" :text="text" replace :to="{ name: 'settings', params: { tab: 'vuetorrent', subtab: value } }" />
        </v-tabs>

        <v-window v-model="innerTabV" :touch="false">
          <v-window-item value="general">
            <VGeneral />
          </v-window-item>
          <v-window-item value="torrentCardList">
            <VTorrentCardList />
          </v-window-item>
          <v-window-item value="torrentCardGrid">
            <VTorrentCardGrid />
          </v-window-item>
          <v-window-item value="torrentCardTable">
            <VTorrentCardTable />
          </v-window-item>
        </v-window>
      </v-window-item>

      <v-window-item value="behavior">
        <Behavior />
      </v-window-item>

      <v-window-item value="downloads">
        <Downloads />
      </v-window-item>

      <v-window-item value="connection">
        <Connection />
      </v-window-item>

      <v-window-item value="speed">
        <Speed />
      </v-window-item>

      <v-window-item value="bittorrent">
        <BitTorrent />
      </v-window-item>

      <v-window-item value="rss">
        <RSS />
      </v-window-item>

      <v-window-item value="webui">
        <WebUI />
      </v-window-item>

      <v-window-item value="tagsAndCategories">
        <TagsAndCategories />
      </v-window-item>

      <v-window-item value="advanced">
        <Advanced />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped></style>
