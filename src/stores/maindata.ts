import { useSearchQuery, useTorrentBuilder } from '@/composables'
import { FilePriority, TorrentState } from '@/constants/qbit'
import { SortOptions } from '@/constants/qbit/SortOptions'
import { extractHostname } from '@/helpers'
import { uuidFromRaw } from '@/helpers/text'
import { qbit } from '@/services'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { useNavbarStore } from '@/stores/navbar'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { Category, ServerState } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { Torrent } from '@/types/vuetorrent'
import { defineStore } from 'pinia'
import { computed, MaybeRefOrGetter, ref, toValue } from 'vue'

export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMaindata = ref(false)
  const rid = ref<number>()
  const serverState = ref<ServerState>()
  const tags = ref<string[]>([])
  const torrents = ref<Torrent[]>([])
  const trackers = ref<string[]>([])

  const isTextFilterActive = ref(true)
  const isStatusFilterActive = ref(true)
  const isCategoryFilterActive = ref(true)
  const isTagFilterActive = ref(true)
  const isTrackerFilterActive = ref(true)

  const textFilter = ref('')
  const statusFilter = ref<TorrentState[]>([])
  const categoryFilter = ref<string[]>([])
  const tagFilter = ref<(string | null)[]>([])
  const trackerFilter = ref<(string | null)[]>([])

  const torrentsWithFilters = computed(() => {
    return torrents.value.filter(torrent => {
      if (statusFilter.value.length > 0 && isStatusFilterActive.value && !statusFilter.value.includes(torrent.state)) return false
      if (categoryFilter.value.length > 0 && isCategoryFilterActive.value && !categoryFilter.value.includes(torrent.category)) return false
      if (tagFilter.value.length > 0 && isTagFilterActive.value) {
        if (torrent.tags.length === 0 && tagFilter.value.includes(null)) return true
        if (!torrent.tags.some(tag => tagFilter.value.includes(tag))) return false
      }
      if (trackerFilter.value.length > 0 && isTrackerFilterActive.value && !trackerFilter.value.includes(extractHostname(torrent.tracker))) return false

      return true
    })
  })
  const filteredTorrents = computed(() => searchQuery.results.value)

  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()
  const navbarStore = useNavbarStore()
  const vueTorrentStore = useVueTorrentStore()
  const torrentBuilder = useTorrentBuilder()

  const searchQuery = useSearchQuery(
    torrentsWithFilters,
    () => isTextFilterActive.value ? textFilter.value : null,
    torrent => torrent.name,
    results => {
      if (dashboardStore.sortOptions.isCustomSortEnabled) {
        if (dashboardStore.sortOptions.sortBy === 'priority') {
          results.sort((a, b) => {
            if (a.priority > 0 && b.priority > 0) return a.priority - b.priority
            else if (a.priority <= 0 && b.priority <= 0) return a.added_on - b.added_on
            else if (a.priority <= 0) return 1
            else return -1
          })
        } else {
          results.sort((a, b) => a[dashboardStore.sortOptions.sortBy] - b[dashboardStore.sortOptions.sortBy] || a.added_on - b.added_on)
        }
        if (dashboardStore.sortOptions.reverseOrder) results.reverse()
      }
      return results
    }
  )

  async function fetchCategories() {
    categories.value = await qbit.getCategories()
  }

  function getCategoryFromName(categoryName?: string) {
    return categories.value.find(c => c.name === categoryName)
  }

  async function createCategory(category: Category) {
    await qbit.createCategory(category)
  }

  async function setTorrentCategory(hashes: string[], category: string) {
    await qbit.setCategory(hashes, category)
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

  async function addTorrentTags(hashes: string[], tags: string[]) {
    await qbit.addTorrentTag(hashes, tags)
  }

  async function removeTorrentTags(hashes: string[], tags: string[]) {
    await qbit.removeTorrentTag(hashes, tags)
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

  function getTorrentByHash(hash: string) {
    return torrents.value.find(t => t.hash === hash)
  }

  function getTorrentIndexByHash(hash: string) {
    return filteredTorrents.value.findIndex(t => t.hash === hash)
  }

  async function deleteTorrents(hashes: string[], deleteWithFiles: boolean) {
    await qbit.deleteTorrents(hashes, deleteWithFiles)
  }

  async function moveTorrents(hashes: string[], newPath: string) {
    await qbit.setTorrentLocation(hashes, newPath)
  }

  async function updateMaindata() {
    if (isUpdatingMaindata.value) return
    isUpdatingMaindata.value = true

    try {
      const response = await qbit.getMaindata(rid.value)
      rid.value = response.rid || undefined

      if (response.server_state) {
        serverState.value = { ...serverState.value, ...response.server_state }
        navbarStore.pushDownloadData(serverState.value.dl_info_speed)
        navbarStore.pushUploadData(serverState.value.up_info_speed)
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

      // update torrents
      torrents.value = data.map(t => torrentBuilder.buildFromQbit(t))

      if (import.meta.env.DEV && import.meta.env.VITE_USE_FAKE_TORRENTS === 'true') {
        const count = Number(import.meta.env.VITE_FAKE_TORRENT_COUNT)
        const fakeTorrents: Partial<Torrent> = (await import('../../__mocks__/torrents.json')).default

        for (let i = 1; i <= count; i++) {
          torrents.value.push(torrentBuilder.buildFromFaker({ ...fakeTorrents.at(i), hash: uuidFromRaw(BigInt(i)) }, i))
        }
      }

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
      isUpdatingMaindata.value = false
    }
  }

  async function addTorrents(payload: AddTorrentPayload, torrents: File[]) {
    return await qbit.addTorrents(payload, torrents)
  }

  async function getTorrentProperties(hash: string) {
    return await qbit.getTorrentProperties(hash)
  }

  async function fetchFiles(hash: string, indexes?: number[]) {
    return await qbit.getTorrentFiles(hash, indexes)
  }

  async function renameTorrent(hash: string, newName: string) {
    await qbit.setTorrentName(hash, newName)
  }

  async function renameTorrentFile(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFile(hash, oldPath, newPath)
  }

  async function renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFolder(hash, oldPath, newPath)
  }

  async function fetchPieceState(hash: string) {
    return await qbit.getTorrentPieceStates(hash)
  }

  async function resumeTorrents(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.resumeTorrents(toValue(hashes))
  }

  async function forceResumeTorrents(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.forceStartTorrents(toValue(hashes))
  }

  async function pauseTorrents(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.pauseTorrents(toValue(hashes))
  }

  async function recheckTorrents(hashes: MaybeRefOrGetter<string[]>) {
    await qbit.recheckTorrents(toValue(hashes))
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

  async function setTorrentPriority(hashes: string[], priority: 'increasePrio' | 'decreasePrio' | 'topPrio' | 'bottomPrio') {
    await qbit.setTorrentPriority(hashes, priority)
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

  async function getTorrentPeers(hash: string) {
    return await qbit.getTorrentPeers(hash)
  }

  async function addTorrentPeers(hash: string, peers: string[]) {
    await qbit.addTorrentPeers([hash], peers)
  }

  async function banPeers(peers: string[]) {
    await qbit.banPeers(peers)
  }

  async function setTorrentFilePriority(hash: string, ids: number[], priority: FilePriority) {
    await qbit.setTorrentFilePriority(hash, ids, priority)
  }

  async function exportTorrent(hash: string) {
    return await qbit.exportTorrent(hash)
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
    torrents,
    filteredTorrents,
    trackers,
    isTextFilterActive,
    textFilter,
    isStatusFilterActive,
    statusFilter,
    isCategoryFilterActive,
    categoryFilter,
    isTagFilterActive,
    tagFilter,
    isTrackerFilterActive,
    trackerFilter,
    getTorrentByHash,
    getTorrentIndexByHash,
    deleteTorrents,
    fetchCategories,
    getCategoryFromName,
    createCategory,
    setTorrentCategory,
    editCategory,
    deleteCategories,
    fetchTags,
    createTags,
    addTorrentTags,
    removeTorrentTags,
    editTag,
    deleteTags,
    moveTorrents,
    updateMaindata,
    addTorrents,
    getTorrentProperties,
    fetchFiles,
    renameTorrent,
    renameTorrentFile,
    renameTorrentFolder,
    fetchPieceState,
    resumeTorrents,
    forceResumeTorrents,
    pauseTorrents,
    recheckTorrents,
    reannounceTorrents,
    toggleSeqDl,
    toggleFLPiecePrio,
    toggleAutoTmm,
    setSuperSeeding,
    setTorrentPriority,
    getTorrentTrackers,
    addTorrentTrackers,
    editTorrentTracker,
    removeTorrentTrackers,
    getTorrentPeers,
    addTorrentPeers,
    banPeers,
    setTorrentFilePriority,
    exportTorrent,
    setDownloadLimit,
    setUploadLimit,
    setShareLimit
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'vuetorrent_maindata',
        paths: [
          'isTextFilterActive',
          'textFilter',
          'isStatusFilterActive',
          'statusFilter',
          'isCategoryFilterActive',
          'categoryFilter',
          'isTagFilterActive',
          'tagFilter',
          'isTrackerFilterActive',
          'trackerFilter'
        ]
      }
    ]
  }
})
