import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const downloadData = ref<number[]>(new Array(15).fill(0))
    const uploadData = ref<number[]>(new Array(15).fill(0))

    const addTorrentDialogFiles = ref<File[]>([])
    const addTorrentDialogUrls = ref('')

    const pendingTorrentsCount = computed(() => addTorrentDialogFiles.value.length + addTorrentDialogUrls.value.split('\n').filter(url => url.trim() !== '').length)

    function pushDownloadData(data: number) {
      downloadData.value.shift()
      downloadData.value.push(data)
    }

    function pushUploadData(data: number) {
      uploadData.value.shift()
      uploadData.value.push(data)
    }

    function pushTorrentToQueue(torrentDescriptor: File | string) {
      if (torrentDescriptor instanceof File) {
        addTorrentDialogFiles.value.push(torrentDescriptor)
      } else {
        if (addTorrentDialogUrls.value !== '') {
          addTorrentDialogUrls.value += '\n'
        }
        addTorrentDialogUrls.value += torrentDescriptor
      }
    }

    return {
      downloadData,
      uploadData,
      addTorrentDialogFiles,
      addTorrentDialogUrls,
      pendingTorrentsCount,
      pushDownloadData,
      pushUploadData,
      pushTorrentToQueue
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          key: 'vuetorrent_navbar',
          paths: ['downloadData', 'uploadData']
        }
      ]
    }
  }
)
