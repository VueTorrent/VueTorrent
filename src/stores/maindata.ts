import qbit from '@/services/qbit'
import { ServerState } from '@/types/qbit/models'
import { isFullUpdate } from '@/types/qbit/responses'
import { useIntervalFn } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import { ref, shallowRef } from 'vue'
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
  const serverState = shallowRef<Partial<ServerState>>()

  const appStore = useAppStore()
  const categoryStore = useCategoryStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const tagStore = useTagStore()
  const torrentStore = useTorrentStore()
  const trackerStore = useTrackerStore()
  const vueTorrentStore = useVueTorrentStore()
  const { refreshInterval } = storeToRefs(vueTorrentStore)

  const maindataTask = useTask(function* () {
    yield updateMaindata()
  }).drop()

  const { resume: forceMaindataSync, pause: stopMaindataSync } = useIntervalFn(maindataTask.perform, refreshInterval, {
    immediate: false,
    immediateCallback: true
  })

  function syncFromMaindata(fullUpdate: boolean, obj?: Partial<ServerState>) {
    if (fullUpdate) {
      serverState.value = obj
    } else if (obj) {
      serverState.value = { ...serverState.value, ...obj }
    }

    navbarStore.pushTimeData()
    navbarStore.pushDownloadData(serverState.value?.dl_info_speed ?? 0)
    navbarStore.pushUploadData(serverState.value?.up_info_speed ?? 0)
  }

  async function updateMaindata() {
    performance.mark('startMaindata')
    try {
      const response = await qbit.getMaindata(rid.value)
      rid.value = response.rid

      if (isFullUpdate(response)) {
        performance.mark('maindata::serverState')
        syncFromMaindata(true, response.server_state)
        performance.mark('maindata::categories')
        categoryStore.syncFromMaindata(true, Object.entries(response.categories ?? {}))
        performance.mark('maindata::tags')
        tagStore.syncFromMaindata(true, response.tags ?? [])
        performance.mark('maindata::torrents')
        torrentStore.syncFromMaindata(true, Object.entries(response.torrents ?? {}))
        performance.mark('maindata::trackers')
        trackerStore.syncFromMaindata(true, Object.entries(response.trackers ?? {}))
        performance.mark('maindata::endProcess')
        return
      }

      performance.mark('maindata::serverState')
      syncFromMaindata(false, response.server_state)
      performance.mark('maindata::categories')
      categoryStore.syncFromMaindata(false, Object.entries(response.categories ?? {}), response.categories_removed)
      performance.mark('maindata::tags')
      tagStore.syncFromMaindata(false, response.tags ?? [], response.tags_removed)
      performance.mark('maindata::torrents')
      torrentStore.syncFromMaindata(false, Object.entries(response.torrents ?? {}), response.torrents_removed)
      performance.mark('maindata::trackers')
      trackerStore.syncFromMaindata(false, Object.entries(response.trackers ?? {}), response.trackers_removed)
      performance.mark('maindata::endProcess')

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
    } finally {
      performance.mark('endMaindata')
      const measure = performance.measure('maindata', 'startMaindata', 'endMaindata')
      console.log('maindata measure:', measure.duration)
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
