import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useVueTorrentStore } from './vuetorrent'

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const vueTorrentStore = useVueTorrentStore()

    const isDrawerOpen = ref(vueTorrentStore.openSideBarOnStart)

    const _timeData = ref<(number | null)[]>(new Array(15).fill(null))
    const _downloadData = ref<(number | null)[]>(new Array(15).fill(null))
    const _uploadData = ref<(number | null)[]>(new Array(15).fill(null))

    const downloadData = computed(() => _timeData.value.map((e, i) => [e, _downloadData.value[i]]))
    const uploadData = computed(() => _timeData.value.map((e, i) => [e, _uploadData.value[i]]))

    function pushTimeData() {
      _timeData.value.shift()
      _timeData.value.push(new Date().getTime())
    }

    function pushDownloadData(data: number) {
      _downloadData.value.shift()
      _downloadData.value.push(data)
    }

    function pushUploadData(data: number) {
      _uploadData.value.shift()
      _uploadData.value.push(data)
    }

    return {
      isDrawerOpen,
      downloadData,
      uploadData,
      pushTimeData,
      pushDownloadData,
      pushUploadData,
      $reset: () => {
        _downloadData.value = new Array(15).fill(null)
        _uploadData.value = new Array(15).fill(null)
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }]
    }
  }
)
