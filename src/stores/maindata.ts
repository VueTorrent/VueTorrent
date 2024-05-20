import { useTorrentBuilder } from '@/composables'
import { SortOptions } from '@/constants/qbit'
import { extractHostname } from '@/helpers'
import qbit from '@/services/qbit'
import { Category, ServerState } from '@/types/qbit/models'
import { defineStore, storeToRefs } from 'pinia'
import { MaybeRefOrGetter, ref, toValue } from 'vue'
import { useAuthStore } from './auth'
import { useDashboardStore } from './dashboard'
import { useNavbarStore } from './navbar'
import { useTorrentStore } from './torrents'
import { useVueTorrentStore } from './vuetorrent'

export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMaindata = ref(false)
  const rid = ref<number>()
  const serverState = ref<ServerState>({} as ServerState)
  const tags = ref<string[]>([])
  const trackers = ref<string[]>([])

  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const torrentStore = useTorrentStore()
  const { torrents } = storeToRefs(torrentStore)
  const vueTorrentStore = useVueTorrentStore()
  const torrentBuilder = useTorrentBuilder()

  async function fetchCategories() {
    categories.value = await qbit.getCategories()
  }

  function getCategoryFromName(categoryName?: string) {
    return categories.value.find(c => c.name === categoryName)
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
        await qbit.setCategory(
          torrents.map(torrent => torrent.hash),
          category.name
        )
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
      await qbit.addTorrentTag(
        torrents.map(torrent => torrent.hash),
        [newTag]
      )
    }

    // Delete old tag
    await qbit.deleteTags([oldTag])
  }

  async function deleteTags(tags: string[]) {
    await qbit.deleteTags(tags)
  }

  async function updateMaindata() {
    if (isUpdatingMaindata.value) return
    isUpdatingMaindata.value = true

    try {
      const response = await qbit.getMaindata(rid.value)
      rid.value = response.rid || undefined

      if (response.server_state) {
        serverState.value = { ...serverState.value, ...response.server_state }
        navbarStore.pushTimeData()
        navbarStore.pushDownloadData(serverState.value.dl_info_speed)
        navbarStore.pushUploadData(serverState.value.up_info_speed)
      }

      // fetch torrent data
      torrentStore.sortOptions.isCustomSortEnabled = torrentBuilder.computedValues.indexOf(torrentStore.sortOptions.sortBy) !== -1
      const data = await qbit.getTorrents(torrentStore.getTorrentsPayload)

      if (vueTorrentStore.showTrackerFilter) {
        trackers.value = data
          .map(t => t.tracker)
          .map(url => extractHostname(url))
          .filter((domain, index, self) => index === self.indexOf(domain) && domain)
          .sort()
      }

      // update torrents
      torrents.value = data.map(t => torrentBuilder.buildFromQbit(t))

      // filter out deleted torrents from selection
      const hash_index = torrents.value.map(torrent => torrent.hash)
      dashboardStore.selectedTorrents = dashboardStore.selectedTorrents.filter(hash => hash_index.includes(hash))
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.error('No longer authenticated, logging out...')
        authStore.isAuthenticated = false
        await vueTorrentStore.redirectToLogin()
      } else {
        console.error(error)
      }
    } finally {
      isUpdatingMaindata.value = false
    }
  }

  async function fetchFiles(hash: string, indexes?: number[]) {
    return await qbit.getTorrentFiles(hash, indexes)
  }

  async function fetchPieceState(hash: string) {
    return await qbit.getTorrentPieceStates(hash)
  }

  async function reannounceTorrents(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.reannounceTorrents(toValue(hashes))
  }

  async function toggleSeqDl(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.toggleSequentialDownload(toValue(hashes))
  }

  async function toggleFLPiecePrio(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.toggleFirstLastPiecePriority(toValue(hashes))
  }

  async function toggleAutoTmm(hashes: MaybeRefOrGetter<string[]>, enable: MaybeRefOrGetter<boolean>) {
    await qbit.setAutoTMM(toValue(hashes), toValue(enable))
  }

  async function setSuperSeeding(hashes: MaybeRefOrGetter<string[]>, enable: MaybeRefOrGetter<boolean>) {
    await qbit.setSuperSeeding(toValue(hashes), toValue(enable))
  }

  async function getTorrentTrackers(hash: string) {
    return await qbit.getTorrentTrackers(hash)
  }

  async function addTorrentTrackers(hash: string, trackers: string) {
    await qbit.addTorrentTrackers(hash, trackers)
  }

  async function editTorrentTracker(hash: string, oldUrl: string, newUrl: string) {
    await qbit.editTorrentTracker(hash, oldUrl, newUrl)
  }

  async function removeTorrentTrackers(hash: string, urls: string[]) {
    await qbit.removeTorrentTrackers(hash, urls)
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
    categories,
    isUpdatingMaindata,
    rid,
    serverState,
    tags,
    trackers,
    fetchCategories,
    getCategoryFromName,
    createCategory,
    editCategory,
    deleteCategories,
    fetchTags,
    createTags,
    editTag,
    deleteTags,
    updateMaindata,
    fetchFiles,
    fetchPieceState,
    reannounceTorrents,
    toggleSeqDl,
    toggleFLPiecePrio,
    toggleAutoTmm,
    setSuperSeeding,
    getTorrentTrackers,
    addTorrentTrackers,
    editTorrentTracker,
    removeTorrentTrackers,
    syncTorrentPeers,
    addTorrentPeers,
    banPeers,
    setDownloadLimit,
    setUploadLimit,
    setShareLimit,
    $reset: () => {
      while (isUpdatingMaindata.value) {}
      categories.value = []
      rid.value = undefined
      serverState.value = {} as ServerState
      tags.value = []
      trackers.value = []
    }
  }
})
