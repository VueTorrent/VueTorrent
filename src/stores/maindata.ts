import { qbit } from '@/services'
import { Category, ServerState, Torrent, Tracker } from '@/types/qbit/models'
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useMaindataStore = defineStore('maindata', () => {
  const categories = ref<Category[]>([])
  const isUpdatingMainData = ref(false)
  const latestSelectedTorrent = ref<number>()
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

  return { categories, isUpdatingMainData, latestSelectedTorrent, rid, serverState, tags, torrents, trackers, fetchCategories, fetchTags }
})