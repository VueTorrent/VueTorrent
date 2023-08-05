import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useNavbarStore = defineStore('navbar', () => {
  const downloadData = ref<number[]>([])
  const uploadData = ref<number[]>([])

  function pushDownloadData(data: number) {
    if (downloadData.value.length > 10) downloadData.value.splice(0, 1, data)
    else downloadData.value.push(data)
  }

  function pushUploadData(data: number) {
    if (uploadData.value.length > 10) uploadData.value.splice(0, 1, data)
    else uploadData.value.push(data)
  }

  return {downloadData, uploadData, pushDownloadData, pushUploadData}
})