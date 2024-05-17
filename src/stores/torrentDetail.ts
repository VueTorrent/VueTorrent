import qbit from '@/services/qbit'
import { TorrentProperties } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTorrentDetailStore = defineStore('torrentDetail', () => {
  const properties = ref<TorrentProperties>()

  async function fetchProperties(hash: string) {
    properties.value = await qbit.getTorrentProperties(hash)
  }

  return {
    properties,
    fetchProperties,
    $reset: () => {
      properties.value = undefined
    }
  }
})
