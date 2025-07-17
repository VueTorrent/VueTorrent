import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import qbit from '@/services/qbit'
import { TorrentProperties } from '@/types/qbit/models'

export const useTorrentDetailStore = defineStore(
  'torrentDetail',
  () => {
    const tab = ref('overview')
    const properties = ref<TorrentProperties>()

    async function fetchProperties(hash: string) {
      properties.value = await qbit.getTorrentProperties(hash)
    }

    return {
      tab,
      properties,
      fetchProperties,
      $reset: () => {
        properties.value = undefined
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, includePaths: ['tab'] }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTorrentDetailStore, import.meta.hot))
}
