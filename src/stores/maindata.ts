import qbit from '@/services/qbit'
import { Category, RawQbitTorrent, ServerState } from '@/types/qbit/models'
import { isFullUpdate } from '@/types/qbit/responses'
import { useIntervalFn } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import { MaybeRefOrGetter, ref, toValue } from 'vue'
import { useAppStore } from './app'
import { useDashboardStore } from './dashboard'
import { useNavbarStore } from './navbar'
import { useTorrentStore } from './torrents'
import { useVueTorrentStore } from './vuetorrent'

export const useMaindataStore = defineStore('maindata', () => {
  const isUpdatingMaindata = ref(false)
  const rid = ref<number>()
  const serverState = ref<Partial<ServerState>>()
  /** Key: Category name */
  const categories = ref<Map<string, Category>>(new Map())
  const tags = ref<string[]>([])
  /** Key: tracker domain, values: torrent hashes */
  const trackers = ref<Map<string, string[]>>(new Map())

  const appStore = useAppStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const torrentStore = useTorrentStore()
  const { _torrents } = storeToRefs(torrentStore)
  const vueTorrentStore = useVueTorrentStore()

  const { resume: forceMaindataSync, pause: stopMaindataSync } = useIntervalFn(updateMaindata, vueTorrentStore.refreshInterval, {
    immediate: false,
    immediateCallback: true
  })

  function getCategoryFromName(categoryName?: string) {
    if (!categoryName) return
    return categories.value.get(categoryName)
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
      const torrents = await qbit.getTorrents({ category: oldCategory })
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

  async function createTags(tags: string[]) {
    await qbit.createTag(tags)
  }

  async function editTag(oldTag: string, newTag: string) {
    if (oldTag === newTag) return

    // Create new tag
    await qbit.createTag([newTag])

    // Get list of torrents in old tag and move them to new tag
    const torrents = await qbit.getTorrents({ tag: oldTag })
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
      rid.value = response.rid

      if (isFullUpdate(response)) {
        serverState.value = response.server_state
        categories.value = new Map(Object.entries(response.categories))
        tags.value = response.tags
        _torrents.value = new Map(Object.entries(response.torrents))
        trackers.value = new Map(Object.entries(response.trackers))
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

      // Categories
      for (const [catName, qbitCat] of Object.entries(response.categories ?? {})) {
        const oldCat = categories.value.get(catName)
        if (oldCat) {
          const newCat = {
            name: qbitCat.name ?? oldCat.name,
            savePath: qbitCat.savePath ?? oldCat.savePath
          }
          categories.value.set(catName, newCat)
        } else {
          categories.value.set(catName, {
            name: qbitCat.name ?? catName,
            savePath: qbitCat.savePath ?? ''
          })
        }
      }
      response.categories_removed?.forEach(categories.value.delete)

      // Tags
      if (response.tags) {
        tags.value = [...tags.value, ...response.tags]
      }
      tags.value = tags.value.filter(tag => !response.tags_removed || !response.tags_removed.includes(tag))

      // Torrents
      for (const [hash, qbitTorrent] of Object.entries(response.torrents ?? {})) {
        const torrent = _torrents.value.get(hash)
        if (torrent) {
          _torrents.value.set(hash, { ...torrent, ...qbitTorrent })
        } else {
          _torrents.value.set(hash, qbitTorrent as RawQbitTorrent)
        }
      }
      response.torrents_removed?.forEach(_torrents.value.delete)

      // Trackers
      for (const [trackerUrl, linkedTorrents] of Object.entries(response.trackers ?? {})) {
        const oldLinkedTorrents = trackers.value.get(trackerUrl) ?? []
        trackers.value.set(trackerUrl, [...oldLinkedTorrents, ...linkedTorrents])
      }
      response.trackers_removed?.forEach(trackers.value.delete)

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
    getCategoryFromName,
    createCategory,
    editCategory,
    deleteCategories,
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
    forceMaindataSync,
    stopMaindataSync,
    $reset: () => {
      stopMaindataSync()
      new Promise<void>(resolve => setTimeout(() => resolve(), isUpdatingMaindata.value ? 1500 : 0)).then(() => {
        rid.value = undefined
        serverState.value = {} as ServerState
        categories.value.clear()
        tags.value = []
        trackers.value.clear()
      })
    }
  }
})
