import { qbit } from '@/services'
import { Category, ServerState, Torrent, Tracker } from '@/types/qbit/models'
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMainData = ref(false)
  const rid = ref(0)
  const serverState = ref<ServerState>()
  const tags = ref<string[]>([])
  const torrents = ref<Torrent[]>([])
  const trackers = ref<Tracker[]>([])

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
    //TODO
  }

  return { categories, isUpdatingMainData, rid, serverState, tags, torrents, trackers, getTorrentByHash, getTorrentIndexByHash, fetchCategories, fetchTags }
})