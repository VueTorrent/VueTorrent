<script setup lang="ts">
import AddPanel from '@/components/AddPanel.vue'
import DnDZone from '@/components/DnDZone.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import { TitleOptions } from '@/constants/vuetorrent'
import { formatPercent, formatSpeed } from '@/helpers'
import { backend } from '@/services/backend'
import { useAddTorrentStore, useAppStore, useAuthStore, useDialogStore, useLogStore, useMaindataStore, usePreferenceStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onBeforeMount, watch, watchEffect } from 'vue'

const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const authStore = useAuthStore()
const dialogStore = useDialogStore()
const logStore = useLogStore()
const maindataStore = useMaindataStore()
const { serverState } = storeToRefs(maindataStore)
const { torrents } = storeToRefs(useTorrentStore())
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()
const { language, uiTitleCustom, uiTitleType, useBitSpeed } = storeToRefs(vuetorrentStore)

const checkAuthentication = async () => {
  await authStore.updateAuthStatus()
}

const blockContextMenu = () => {
  document.addEventListener('contextmenu', event => {
    if (!event.target) return

    const targetNode = event.target as Element
    const nodeName = targetNode.nodeName.toLowerCase()
    const nodeType = targetNode.getAttribute('type')?.toLowerCase() ?? ''

    if (['textarea', 'a', 'img'].includes(nodeName)) return
    if (nodeName === 'input' && ['text', 'password', 'email', 'number'].includes(nodeType)) return

    event.preventDefault()
    return false
  })
}

onBeforeMount(() => {
  backend.init(vuetorrentStore.backendUrl)
  backend.ping()
  vuetorrentStore.updateTheme()
  vuetorrentStore.setLanguage(language.value)
  checkAuthentication()
  blockContextMenu()
})

watch(
  () => authStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      appStore.pushInterval(() => maindataStore.updateMaindata(), vuetorrentStore.refreshInterval)
      await maindataStore.updateMaindata()
      await preferencesStore.fetchPreferences()
      await logStore.cleanAndFetchLogs()
      await maindataStore.fetchCategories()
      await maindataStore.fetchTags()
      addTorrentStore.initForm()
    } else {
      appStore.clearIntervals()
    }
  },
  {
    immediate: true
  }
)

watchEffect(() => {
  const mode = uiTitleType.value
  switch (mode) {
    case TitleOptions.GLOBAL_SPEED:
      document.title =
        '[' +
        `D: ${formatSpeed(serverState.value?.dl_info_speed ?? 0, useBitSpeed.value)}, ` +
        `U: ${formatSpeed(serverState.value?.up_info_speed ?? 0, useBitSpeed.value)}` +
        '] VueTorrent'
      break
    case TitleOptions.FIRST_TORRENT_STATUS:
      const torrent = torrents.value.at(0)
      if (torrent) {
        document.title =
          '[' +
          `D: ${formatSpeed(torrent.dlspeed, useBitSpeed.value)}, ` +
          `U: ${formatSpeed(torrent.upspeed, useBitSpeed.value)}, ` +
          `${formatPercent(torrent.progress)}` +
          '] VueTorrent'
      } else {
        document.title = '[N/A] VueTorrent'
      }
      break
    case TitleOptions.CUSTOM:
      document.title = uiTitleCustom.value
      break
    case TitleOptions.DEFAULT:
    default:
      document.title = 'VueTorrent'
      break
  }
})
</script>

<template>
  <v-app class="text-noselect">
    <component v-for="dialog in dialogStore.dialogs" :is="dialog.component" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <Navbar v-if="authStore.isAuthenticated" />
    <v-main>
      <router-view />
    </v-main>
    <AddPanel v-if="authStore.isAuthenticated" />
    <DnDZone />
  </v-app>
</template>
