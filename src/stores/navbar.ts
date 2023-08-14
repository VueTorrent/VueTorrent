import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNavbarStore = defineStore('navbar', () => {
  const downloadData = ref<number[]>(new Array(10).fill(0))
  const uploadData = ref<number[]>(new Array(10).fill(0))

  const addTorrentDialogVisible = ref(false)
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

  function showAddTorrentDialog() {
    addTorrentDialogVisible.value = true
  }

  function pushTorrentToQueue(torrentDescriptor: File | string) {
    if (torrentDescriptor instanceof File) {
      addTorrentDialogFiles.value.push(torrentDescriptor)
    } else {
      addTorrentDialogUrls.value += `${torrentDescriptor}\n`
    }
  }

  return { downloadData, uploadData, addTorrentDialogVisible, addTorrentDialogFiles, addTorrentDialogUrls, pendingTorrentsCount, pushDownloadData, pushUploadData, showAddTorrentDialog, pushTorrentToQueue }
}, {
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
})