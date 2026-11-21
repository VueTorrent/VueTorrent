import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import qbit from '@/services/qbit'
import { TorrentProperties } from '@/types/qbit/models'

export const useTorrentDetailStore = defineStore(
  'torrentDetail',
  () => {
    const tab = ref('overview')
    const properties = ref<TorrentProperties>()
    const generation = ref(0)

    async function fetchProperties(hash: string) {
      const currentGeneration = generation.value
      const result = await qbit.getTorrentProperties(hash)
      if (currentGeneration !== generation.value) return
      properties.value = result
    }

    return {
      tab,
      properties,
      fetchProperties,
      $reset: () => {
        generation.value++
        properties.value = undefined
      },
    }
  },
  {
    persist: [{ storage: localStorage, pick: ['tab'] }],
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTorrentDetailStore, import.meta.hot))
}
