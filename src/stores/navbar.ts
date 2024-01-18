import { useVueTorrentStore } from './vuetorrent'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const vueTorrentStore = useVueTorrentStore()

    const isDrawerOpen = ref(vueTorrentStore.openSideBarOnStart)

    const downloadData = ref<(number | null)[]>(new Array(15).fill(null))
    const uploadData = ref<(number | null)[]>(new Array(15).fill(null))

    function pushDownloadData(data: number) {
      downloadData.value.shift()
      downloadData.value.push(data)
    }

    function pushUploadData(data: number) {
      uploadData.value.shift()
      uploadData.value.push(data)
    }

    return {
      isDrawerOpen,
      downloadData,
      uploadData,
      pushDownloadData,
      pushUploadData,
      $reset: () => {
        downloadData.value = new Array(15).fill(null)
        uploadData.value = new Array(15).fill(null)
      }
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          key: 'vuetorrent_navbar'
        }
      ]
    }
  }
)
