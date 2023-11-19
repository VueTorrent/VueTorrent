import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const downloadData = ref<number[]>(new Array(15).fill(0))
    const uploadData = ref<number[]>(new Array(15).fill(0))

    function pushDownloadData(data: number) {
      downloadData.value.shift()
      downloadData.value.push(data)
    }

    function pushUploadData(data: number) {
      uploadData.value.shift()
      uploadData.value.push(data)
    }

    return {
      downloadData,
      uploadData,
      pushDownloadData,
      pushUploadData
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
