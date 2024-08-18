<script setup lang="ts">
import AddPanel from '@/components/AddPanel.vue'
import AddTorrentDialog from '@/components/Dialogs/AddTorrentDialog.vue'
import DnDZone from '@/components/DnDZone.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import { TitleOptions } from '@/constants/vuetorrent'
import { formatPercent, formatSpeed } from '@/helpers'
import { backend } from '@/services/backend'
import { useAddTorrentStore, useAppStore, useDialogStore, useLogStore, useMaindataStore, usePreferenceStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const dialogStore = useDialogStore()
const logStore = useLogStore()
const maindataStore = useMaindataStore()
const { serverState } = storeToRefs(maindataStore)
const { torrents } = storeToRefs(useTorrentStore())
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()
const { language, uiTitleCustom, uiTitleType, useBitSpeed } = storeToRefs(vuetorrentStore)

const checkAuthentication = async () => {
  const promise = appStore.fetchAuthStatus()
  const timer = setTimeout(() => toast.promise(promise, { pending: t('login.pending') }), 1000)
  promise.then(() => clearTimeout(timer))
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

function addLaunchQueueConsumer() {
  const win = window as { launchQueue?: { setConsumer: (callback: (launchParams: { files: Readonly<FileSystemFileHandle[]>; targetURL: string }) => void) => void } }
  win.launchQueue?.setConsumer(async launchParams => {
    if (launchParams.files && launchParams.files.length) {
      addTorrentStore.isFirstInit = false
      await Promise.all(launchParams.files.map(async file => addTorrentStore.pushTorrentToQueue(await file.getFile())))
      dialogStore.createDialog(AddTorrentDialog)
    }
  })
}

onBeforeMount(() => {
  backend.init(vuetorrentStore.backendUrl)
  backend.ping()
  vuetorrentStore.updateTheme()
  vuetorrentStore.setLanguage(language.value)
  checkAuthentication()
  blockContextMenu()
  addLaunchQueueConsumer()
})

onMounted(() => {
  // Global error handler flag
  sessionStorage.setItem('vuetorrent_mounted', 'true')
})

watch(
  () => appStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      maindataStore.forceMaindataSync()
      await preferencesStore.fetchPreferences()
      await logStore.cleanAndFetchLogs()
      addTorrentStore.initForm()
    } else {
      maindataStore.stopMaindataSync()
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
    <component v-for="dialog in dialogStore.dialogs.values()" :is="dialog.component" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <Navbar v-if="appStore.isAuthenticated" />
    <v-main>
      <router-view />
    </v-main>
    <AddPanel v-if="appStore.isAuthenticated" />
    <DnDZone />
  </v-app>
</template>
