<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { usePreferenceStore } from '@/stores/preferences'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

import Advanced from '@/components/Settings/Advanced.vue'
import BitTorrent from '@/components/Settings/BitTorrent.vue'
import Connection from '@/components/Settings/Connection.vue'
import Downloads from '@/components/Settings/Downloads.vue'
import Speed from '@/components/Settings/Speed.vue'
import TagsAndCategories from '@/components/Settings/TagsAndCategories.vue'
import WebUI from '@/components/Settings/WebUI.vue'
import RGeneral from '@/components/Settings/RSS/General.vue'
import RFeeds from '@/components/Settings/RSS/Feeds.vue'
import RRules from '@/components/Settings/RSS/Rules.vue'
import VGeneral from '@/components/Settings/VueTorrent/General.vue'
import VTorrentCard from '@/components/Settings/VueTorrent/TorrentCard.vue'

const router = useRouter()
const { t } = useI18n()
const dialogStore = useDialogStore()
const preferenceStore = usePreferenceStore()

const tab = ref('vuetorrent')
const innerTabV = ref('general')
const innerTabR = ref('general')

const saveSettings = async () => {
  await preferenceStore.setPreferences()
  toast.success(t('settings.saveSuccess'))
  await preferenceStore.fetchPreferences()

  if (!preferenceStore.preferences!.alternative_webui_enabled) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
    window.location.hash = ''
  } else {
    goHome()
  }
}

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

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
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
        <v-tab value="vuetorrent">{{ t('settings.tabs.vuetorrent') }}</v-tab>
        <v-tab value="downloads">{{ t('settings.tabs.downloads') }}</v-tab>
        <v-tab value="connection">{{ t('settings.tabs.connection') }}</v-tab>
        <v-tab value="speed">{{ t('settings.tabs.speed') }}</v-tab>
        <v-tab value="bittorrent">{{ t('settings.tabs.bittorrent') }}</v-tab>
        <v-tab value="rss">{{ t('settings.tabs.rss') }}</v-tab>
        <v-tab value="webui">{{ t('settings.tabs.webui') }}</v-tab>
        <v-tab value="tagsAndCategories">{{ t('settings.tabs.tagsAndCategories') }}</v-tab>
        <v-tab value="advanced">{{ t('settings.tabs.advanced') }}</v-tab>
      </v-tabs>
    </v-row>

    <v-window v-model="tab">
      <v-window-item value="vuetorrent">
        <v-tabs v-model="innerTabV" grow color="accent" bg-color="transparent" show-arrows>
          <v-tab value="general">
            {{ t('settings.tabs.vuetorrentGeneral') }}
          </v-tab>
          <v-tab value="torrentCard">
            {{ t('settings.tabs.vuetorrentTorrentCard') }}
          </v-tab>
        </v-tabs>
        <v-window v-model="innerTabV">
          <v-window-item value="general">
            <VGeneral />
          </v-window-item>
          <v-window-item value="torrentCard">
            <VTorrentCard />
          </v-window-item>
        </v-window>
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
        <v-tabs v-model="innerTabR" grow color="accent" bg-color="transparent">
          <v-tab value="general">
            {{ t('settings.tabs.rssGeneral') }}
          </v-tab>
          <v-tab value="feeds">
            {{ t('settings.tabs.rssFeeds') }}
          </v-tab>
          <v-tab value="rules">
            {{ t('settings.tabs.rssRules') }}
          </v-tab>
        </v-tabs>
        <v-window v-model="innerTabR">
          <v-window-item value="general">
            <RGeneral />
          </v-window-item>
          <v-window-item value="feeds">
            <RFeeds />
          </v-window-item>
          <v-window-item value="rules">
            <RRules />
          </v-window-item>
        </v-window>
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
