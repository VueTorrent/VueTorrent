<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, watch, watchEffect, onBeforeUnmount } from 'vue'
import { toast } from 'vue3-toastify'
import AddPanel from './components/AddPanel.vue'
import AddTorrentDialog from './components/Dialogs/AddTorrentDialog.vue'
import DnDZone from './components/DnDZone.vue'
import Navbar from './components/Navbar/Navbar.vue'
import Sidebar from './components/Navbar/Sidebar.vue'
import { useBackendSync, useI18nUtils } from './composables'
import { TitleOptions } from './constants/vuetorrent'
import { formatPercent, formatSpeed } from './helpers'
import { backend } from './services/backend'
import {
  useAddTorrentStore,
  useAppStore,
  useDashboardStore,
  useDialogStore,
  useGlobalStore,
  useLogStore,
  useMaindataStore,
  usePreferenceStore,
  useSidebarStore,
  useTorrentStore,
  useVueTorrentStore,
} from './stores'

const { t } = useI18nUtils()
const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const logStore = useLogStore()
const sidebarStore = useSidebarStore()
const maindataStore = useMaindataStore()
const { serverState } = storeToRefs(maindataStore)
const torrentStore = useTorrentStore()
const { torrents } = storeToRefs(torrentStore)
const preferencesStore = usePreferenceStore()
const { routerDomKey } = storeToRefs(useGlobalStore())
const vuetorrentStore = useVueTorrentStore()
const { language, uiTitleCustom, uiTitleType, useBitSpeed } = storeToRefs(vuetorrentStore)

const backendSyncObjects = [
  useBackendSync(dashboardStore, 'vuetorrent_dashboard', {
    whitelist: ['displayMode'],
  }),
  useBackendSync(torrentStore, 'vuetorrent_torrents', {
    whitelist: ['sortCriterias'],
  }),
  useBackendSync(sidebarStore, 'vuetorrent_sidebarSettings', {
    whitelist: ['sortCriterias'],
  }),
  useBackendSync(vuetorrentStore, 'vuetorrent_webuiSettings', {
    blacklist: ['uiTitleCustom'],
  }),
]

async function checkAuthentication() {
  return toast.promise(appStore.fetchAuthStatus(), { pending: t('login.pending') })
}

function blockContextMenu(event: Event) {
  if (!event.target) return

  const targetNode = event.target as Element
  if (targetNode.closest('[data-custom-context-menu]')) {
    event.preventDefault()
    return false
  }
}

function addLaunchQueueConsumer() {
  const win = window as {
    launchQueue?: {
      setConsumer: (callback: (launchParams: { files: Readonly<FileSystemFileHandle[]>; targetURL: string }) => void) => void
    }
  }
  win.launchQueue?.setConsumer(launchParams => {
    if (launchParams.files && launchParams.files.length) {
      void Promise.all(launchParams.files.map(async file => addTorrentStore.pushTorrentToQueue(await file.getFile()))).then(() => dialogStore.createDialog(AddTorrentDialog))
    }
  })
}

onBeforeMount(() => {
  vuetorrentStore.updateTheme()
  vuetorrentStore.setLanguage(language.value)
  addLaunchQueueConsumer()
  void checkAuthentication()

  document.addEventListener('contextmenu', blockContextMenu)
})

onMounted(() => {
  // Global error handler flag
  sessionStorage.setItem('vuetorrent_mounted', 'true')
})

onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', blockContextMenu)
})

watch(
  () => appStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      maindataStore.forceMaindataSync()
      await preferencesStore.fetchPreferences()
      await logStore.cleanAndFetchLogs()

      void backend.ping().then(async ok => {
        if (ok) {
          await Promise.allSettled(backendSyncObjects.map(obj => obj.loadState()))
          backendSyncObjects.forEach(obj => obj.registerWatcher())
        }
      })
    } else {
      maindataStore.stopMaindataSync()
      backendSyncObjects.forEach(obj => obj.cancelWatcher())
    }
  },
  {
    immediate: true,
  }
)

watchEffect(() => {
  const appInstanceName = preferencesStore.preferences?.app_instance_name
  const baseName = appInstanceName && appInstanceName.length ? appInstanceName : 'VueTorrent'

  const mode = uiTitleType.value
  switch (mode) {
    case TitleOptions.GLOBAL_SPEED: {
      const dl_speed = formatSpeed(serverState.value?.dl_info_speed ?? 0, useBitSpeed.value)
      const ul_speed = formatSpeed(serverState.value?.up_info_speed ?? 0, useBitSpeed.value)
      document.title = `[D: ${dl_speed}, U: ${ul_speed}] ${baseName}`
      break
    }
    case TitleOptions.FIRST_TORRENT_STATUS: {
      const torrent = torrents.value.at(0)
      if (torrent) {
        const dl_speed = formatSpeed(torrent.dlspeed, useBitSpeed.value)
        const ul_speed = formatSpeed(torrent.upspeed, useBitSpeed.value)
        const progress = formatPercent(torrent.progress)
        document.title = `[D: ${dl_speed}, U: ${ul_speed}, ${progress}] ${baseName}`
      } else {
        document.title = `[N/A] ${baseName}`
      }
      break
    }
    case TitleOptions.CUSTOM:
      document.title = uiTitleCustom.value
      break
    case TitleOptions.DEFAULT:
      document.title = baseName
      break
  }
})
</script>

<template>
  <v-app class="text-noselect">
    <component :is="dialog.component" v-for="dialog in dialogStore.dialogs.values()" :key="dialog.guid" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <Sidebar v-if="appStore.isAuthenticated" />
    <Navbar v-if="appStore.isAuthenticated" />
    <v-main>
      <router-view :key="routerDomKey" />
    </v-main>
    <AddPanel v-if="appStore.isAuthenticated" />
    <DnDZone />
  </v-app>
</template>
