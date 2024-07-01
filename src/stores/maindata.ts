import qbit from '@/services/qbit'
import { ServerState } from '@/types/qbit/models'
import { isFullUpdate } from '@/types/qbit/responses'
import { useIntervalFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTask } from 'vue-concurrency'
import { useAppStore } from './app'
import { useCategoryStore } from './categories'
import { useDashboardStore } from './dashboard'
import { useNavbarStore } from './navbar'
import { useTagStore } from './tags'
import { useTorrentStore } from './torrents'
import { useTrackerStore } from './trackers'
import { useVueTorrentStore } from './vuetorrent'

export const useMaindataStore = defineStore('maindata', () => {
  const rid = ref<number>()
  const serverState = ref<Partial<ServerState>>()

  const appStore = useAppStore()
  const categoryStore = useCategoryStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const tagStore = useTagStore()
  const torrentStore = useTorrentStore()
  const trackerStore = useTrackerStore()
  const vueTorrentStore = useVueTorrentStore()

  const maindataTask = useTask(function* () {
    yield updateMaindata()
  }).drop()

  const {
    resume: forceMaindataSync,
    pause: stopMaindataSync
  } = useIntervalFn(maindataTask.perform, vueTorrentStore.refreshInterval, {
    immediate: false,
    immediateCallback: true
  })

  async function updateMaindata() {
    try {
      const response = await qbit.getMaindata(rid.value)
      rid.value = response.rid

      if (isFullUpdate(response)) {
        serverState.value = response.server_state
        categoryStore.syncFromMaindata(true, Object.entries(response.categories))
        tagStore.syncFromMaindata(true, response.tags)
        torrentStore.syncFromMaindata(true, Object.entries(response.torrents))
        trackerStore.syncFromMaindata(true, Object.entries(response.trackers))
        return
      }

      // Server State
      if (response.server_state) {
        const state = response.server_state
        navbarStore.pushTimeData()
        navbarStore.pushDownloadData(state.dl_info_speed ?? serverState.value?.dl_info_speed)
        navbarStore.pushUploadData(state.up_info_speed ?? serverState.value?.up_info_speed)
        serverState.value = { ...serverState.value, ...state }
      }

      categoryStore.syncFromMaindata(false, Object.entries(response.categories ?? {}), response.categories_removed)
      tagStore.syncFromMaindata(false, response.tags, response.tags_removed)
      torrentStore.syncFromMaindata(false, Object.entries(response.torrents ?? {}), response.torrents_removed)
      trackerStore.syncFromMaindata(false, Object.entries(response.trackers ?? {}), response.trackers_removed)

      // filter out deleted torrents from selection
      dashboardStore.selectedTorrents = dashboardStore.selectedTorrents.filter(hash => !response.torrents_removed?.includes(hash))
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.error('No longer authenticated, logging out...')
        await appStore.setAuthStatus(false)
        await vueTorrentStore.redirectToLogin()
      } else {
        console.error(error)
      }
    }
  }

  async function syncTorrentPeers(hash: string, rid?: number) {
    return await qbit.syncTorrentPeers(hash, rid)
  }

  async function addTorrentPeers(hash: string, peers: string[]) {
    await qbit.addTorrentPeers([hash], peers)
  }

  async function banPeers(peers: string[]) {
    await qbit.banPeers(peers)
  }

  async function setDownloadLimit(limit: number, hashes: string[]) {
    return await qbit.setDownloadLimit(hashes, limit)
  }

  async function setUploadLimit(limit: number, hashes: string[]) {
    return await qbit.setUploadLimit(hashes, limit)
  }

  async function setShareLimit(hashes: string[], ratioLimit: number, seedingTimeLimit: number, inactiveSeedingTimeLimit: number) {
    return await qbit.setShareLimit(hashes, ratioLimit, seedingTimeLimit, inactiveSeedingTimeLimit)
  }

  return {
    rid,
    serverState,
    updateMaindata,
    syncTorrentPeers,
    addTorrentPeers,
    banPeers,
    setDownloadLimit,
    setUploadLimit,
    setShareLimit,
    forceMaindataSync,
    stopMaindataSync,
    $reset: () => {
      stopMaindataSync()
      maindataTask.clear()
      rid.value = undefined
      serverState.value = {} as ServerState
    }
  }
})
