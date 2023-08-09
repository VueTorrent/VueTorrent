import { extractHostname } from '@/helpers'
import { Torrent } from '@/models'
import { qbit } from '@/services'
import { useAuthStore, useDashboardStore, useNavbarStore, useVueTorrentStore } from '@/stores'
import { Category, ServerState } from '@/types/qbit/models'
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMainData = ref(false)
  const rid = ref<number>()
  const serverState = ref<ServerState>()
  const tags = ref<string[]>([])
  const torrents = ref<Torrent[]>([])
  const trackers = ref<string[]>([])

  async function fetchCategories() {
    categories.value = await qbit.getCategories()
  }

  async function fetchTags() {
    tags.value = await qbit.getAvailableTags()
  }

  function getTorrentByHash(hash: string) {
    return torrents.value.find(t => t.hash === hash)
  }

  function getTorrentIndexByHash(hash: string) {
    return torrents.value.findIndex(t => t.hash === hash)
  }

  async function updateMainData() {
    if (isUpdatingMainData.value) return
    isUpdatingMainData.value = true

    const authStore = useAuthStore()
    const navbarStore = useNavbarStore()
    const dashboardStore = useDashboardStore()
    const vueTorrentStore = useVueTorrentStore()

    try {
      const response = await qbit.getMainData(rid.value || undefined)
      rid.value = response.rid || undefined

      if (response.server_state) {
        serverState.value = response.server_state
        navbarStore.pushDownloadData(response.server_state.dl_info_data)
        navbarStore.pushUploadData(response.server_state.up_info_data)
      }

      // fetch torrent data
      dashboardStore.sortOptions.isCustomSortEnabled = Torrent.computedValues.indexOf(dashboardStore.sortOptions.sortBy) !== -1
      let data = await qbit.getTorrents(dashboardStore.getTorrentsPayload)

      if (vueTorrentStore.showTrackerFilter) {
        trackers.value = data
        .map(t => t.tracker)
        .map(url => extractHostname(url))
        .filter((domain, index, self) => index === self.indexOf(domain) && domain)
        .sort()
      }

      if (vueTorrentStore.showTrackerFilter && dashboardStore.sortOptions.trackerFilter !== null) {
        // don't calculate trackers when disabled
        data = data.filter(d => extractHostname(d.tracker) === dashboardStore.sortOptions.trackerFilter)
      }

      // update torrents
      torrents.value = data.map(t => new Torrent(t, vueTorrentStore.dateFormat))

      // TODO: load fake torrents if enabled
      // if (!isProduction()) {
      //   if (import.meta.env.VITE_USE_FAKE_TORRENTS === 'false') return
      //   const count = import.meta.env.VITE_FAKE_TORRENT_COUNT
      //   store.state.torrents.push(...generateMultiple(count))
      // }

      // filter out deleted torrents from selection
      const hash_index = torrents.value.map(torrent => torrent.hash)
      dashboardStore.selectedTorrents = dashboardStore.selectedTorrents.filter(hash => hash_index.includes(hash))

      vueTorrentStore.updateTitle()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.error('No longer authenticated, logging out...')
        authStore.setAuthStatus(false)
        await vueTorrentStore.redirectToLogin()
      }
    } finally {
      isUpdatingMainData.value = false
    }
  }

  return { categories, isUpdatingMainData, rid, serverState, tags, torrents, trackers, getTorrentByHash, getTorrentIndexByHash, fetchCategories, fetchTags, updateMainData }
})