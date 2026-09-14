<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, watch, watchEffect, onBeforeUnmount } from 'vue'
import { toast } from 'vue3-toastify'
import AddPanel from './components/AddPanel.vue'
import DnDZone from './components/DnDZone.vue'
import Navbar from './components/Navbar/Navbar.vue'
import Sidebar from './components/Navbar/Sidebar.vue'
import { useBackendSync, useI18nUtils, useNumberFormatter } from './composables'
import { TitleOptions } from './constants/vuetorrent'
import { formatPercent } from './helpers'
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
const { formatSpeed } = useNumberFormatter()

const addTorrentStore = useAddTorrentStore()
const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const { routerDomKey } = storeToRefs(useGlobalStore())
const logStore = useLogStore()
const maindataStore = useMaindataStore()
const { serverState } = storeToRefs(maindataStore)
const sidebarStore = useSidebarStore()
const torrentStore = useTorrentStore()
const { torrents } = storeToRefs(torrentStore)
const preferencesStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()
const { language, uiTitleCustom, uiTitleType } = storeToRefs(vuetorrentStore)

const backendSyncObjects = [
  useBackendSync(dashboardStore, 'vuetorrent_dashboard', {
    whitelist: ['displayMode'],
  }),
  useBackendSync(torrentStore, 'vuetorrent_torrents', {
    whitelist: ['sortCriterias'],
  }),
  useBackendSync(sidebarStore, 'vuetorrent_sidebarSettings'),
  useBackendSync(vuetorrentStore, 'vuetorrent_webuiSettings', {
    blacklist: ['uiTitleCustom'],
  }),
]

async function checkAuthentication() {
  const authStatus = appStore.fetchAuthStatus()
  const timer = setTimeout(() => {
    toast.loading(t('login.pending'), {
      toastId: 'login-pending',
      onOpen: () => {
        void authStatus.finally(() => toast.remove('login-pending'))
      },
    })
  }, 1000)
  await authStatus.finally(() => clearTimeout(timer))
}

function blockContextMenu(event: Event) {
  if (!event.target) return

  const targetNode = event.target as Element
  if (targetNode.closest('[data-custom-context-menu]')) {
    event.preventDefault()
    return false
  }
}

// PWA file handler
function addLaunchQueueConsumer() {
  const win = window as {
    launchQueue?: {
      setConsumer: (callback: (launchParams: { files: Readonly<FileSystemFileHandle[]>; targetURL: string }) => void) => void
    }
  }
  win.launchQueue?.setConsumer(launchParams => {
    if (launchParams.files && launchParams.files.length) {
      void Promise.all(launchParams.files.map(async file => addTorrentStore.pushTorrentToQueue(await file.getFile()))).then(dialogStore.initAndOpenAddTorrentDialog)
    }
  })
}

onBeforeMount(() => {
  vuetorrentStore.updateTheme()
  vuetorrentStore.setLanguage(language.value)
  addLaunchQueueConsumer()

  document.addEventListener('contextmenu', blockContextMenu)
})

onMounted(() => {
  // Global error handler flag
  sessionStorage.setItem('vuetorrent_mounted', 'true')

  void checkAuthentication()
})

onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', blockContextMenu)
})

watch(
  () => appStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      maindataStore.startMaindataSync()
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
      const dl_speed = formatSpeed({ speed: serverState.value?.dl_info_speed })
      const ul_speed = formatSpeed({ speed: serverState.value?.up_info_speed })
      document.title = `[D: ${dl_speed}, U: ${ul_speed}] ${baseName}`
      break
    }
    case TitleOptions.FIRST_TORRENT_STATUS: {
      const torrent = torrents.value.at(0)
      if (torrent) {
        const dl_speed = formatSpeed({ speed: torrent.dlspeed })
        const ul_speed = formatSpeed({ speed: torrent.upspeed })
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
    <component :is="dialog.component" v-for="dialog in dialogStore.dialogList" :key="dialog.guid" v-bind="{ guid: dialog.guid, ...dialog.props }" />
    <Sidebar v-if="appStore.isAuthenticated" />
    <Navbar v-if="appStore.isAuthenticated" />
    <v-main>
      <router-view :key="routerDomKey" />
    </v-main>
    <AddPanel v-if="appStore.isAuthenticated" />
    <DnDZone />
  </v-app>
</template>
