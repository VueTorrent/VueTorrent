import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useTorrentDetailStore } from './torrentDetail'

export const useGlobalStore = defineStore('global', () => {
  const routerDomKey = ref(uuidv4())

  function forceReload() {
    routerDomKey.value = uuidv4()
  }

  return {
    routerDomKey,
    forceReload,
    $reset: () => {
      forceReload()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTorrentDetailStore, import.meta.hot))
}
