import { useTorrentBuilder } from '@/composables'
import { SortOptions } from '@/constants/qbit/SortOptions.ts'
import { extractHostname } from '@/helpers'
import { qbit } from '@/services'
import { useAuthStore, useDashboardStore, useNavbarStore, useVueTorrentStore } from '@/stores'
import { Category, ServerState } from '@/types/qbit/models'
import { Torrent } from '@/types/VueTorrent'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMainData = ref(false)
  const rid = ref<number>()
  const serverState = ref<ServerState>()
  const tags = ref<string[]>([])
  const torrents = ref<Torrent[]>([])
  const trackers = ref<string[]>([])

  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const vueTorrentStore = useVueTorrentStore()
  const torrentBuilder = useTorrentBuilder()

  async function fetchCategories() {
    categories.value = await qbit.getCategories()
  }

  async function createCategory(category: Category) {
    await qbit.createCategory(category)
  }

  async function editCategory(category: Category, oldCategory?: string) {
    if (oldCategory) {
      // Create new category
      await qbit.createCategory(category)

      // Move old category torrent to new location
      await qbit.editCategory({ name: oldCategory, savePath: category.savePath })

      // Get list of torrents in old category and move them to new category
      const torrents = await qbit.getTorrents({ sort: SortOptions.DEFAULT, category: oldCategory })
      if (torrents.length > 0) {
        await qbit.setCategory(torrents.map(torrent => torrent.hash), category.name)
      }

      // Delete old category
      await qbit.deleteCategory([oldCategory])
      return torrents.length
    } else {
      await qbit.editCategory(category)
    }
  }

  async function deleteCategories(categoryNames: string[]) {
    await qbit.deleteCategory(categoryNames)
  }

  async function fetchTags() {
    tags.value = await qbit.getAvailableTags()
  }

  async function createTags(tags: string[]) {
    await qbit.createTag(tags)
  }

  async function editTag(oldTag: string, newTag: string) {
    if (oldTag === newTag) return

    // Create new tag
    await qbit.createTag([newTag])

    // Get list of torrents in old tag and move them to new tag
    const torrents = await qbit.getTorrents({ sort: SortOptions.DEFAULT, tag: oldTag })
    if (torrents.length > 0) {
      await qbit.addTorrentTag(torrents.map(torrent => torrent.hash), [newTag])
    }

    // Delete old tag
    await qbit.deleteTags([oldTag])
  }

  async function deleteTags(tags: string[]) {
    await qbit.deleteTags(tags)
  }

  function getTorrentByHash(hash: string) {
    return torrents.value.find(t => t.hash === hash)
  }

  function getTorrentIndexByHash(hash: string) {
    return torrents.value.findIndex(t => t.hash === hash)
  }

  async function updateMaindata() {
    if (isUpdatingMainData.value) return
    isUpdatingMainData.value = true

    try {
      const response = await qbit.getMainData(rid.value || undefined)
      rid.value = response.rid || undefined

      if (response.server_state) {
        serverState.value = response.server_state
        navbarStore.pushDownloadData(response.server_state.dl_info_data)
        navbarStore.pushUploadData(response.server_state.up_info_data)
      }

      // fetch torrent data
      dashboardStore.sortOptions.isCustomSortEnabled = torrentBuilder.computedValues.indexOf(dashboardStore.sortOptions.sortBy) !== -1
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
      torrents.value = data.map(t => torrentBuilder.buildFromQbit(t, vueTorrentStore.dateFormat))

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
      } else {
        console.error(error)
      }
    } finally {
      isUpdatingMainData.value = false
    }
  }

  return { categories, isUpdatingMainData, rid, serverState, tags, torrents, trackers, getTorrentByHash, getTorrentIndexByHash, fetchCategories, createCategory, editCategory, deleteCategories, fetchTags, createTags, editTag, deleteTags, updateMaindata }
})