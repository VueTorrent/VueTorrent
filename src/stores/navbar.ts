import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useVueTorrentStore } from './vuetorrent'

const GRAPH_SIZE = 15

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const vueTorrentStore = useVueTorrentStore()

    const isDrawerOpen = ref(vueTorrentStore.openSideBarOnStart)

    const _timeData = ref<number[]>(new Array(GRAPH_SIZE).fill(new Date().getTime()))
    const _downloadData = ref<number[]>(new Array(GRAPH_SIZE).fill(0))
    const _uploadData = ref<number[]>(new Array(GRAPH_SIZE).fill(0))

    const downloadData = computed(() => _timeData.value.map((e, i) => [e, _downloadData.value[i]]))
    const uploadData = computed(() => _timeData.value.map((e, i) => [e, _uploadData.value[i]]))

    function pushTimeData() {
      _timeData.value.shift()
      _timeData.value.push(new Date().getTime())
    }

    function pushDownloadData(data?: number) {
      _downloadData.value.shift()
      _downloadData.value.push(data ?? 0)
    }

    function pushUploadData(data?: number) {
      _uploadData.value.shift()
      _uploadData.value.push(data ?? 0)
    }

    return {
      isDrawerOpen,
      downloadData,
      uploadData,
      pushTimeData,
      pushDownloadData,
      pushUploadData,
      $reset: () => {
        _timeData.value = new Array(GRAPH_SIZE).fill(new Date().getTime())
        _downloadData.value = new Array(GRAPH_SIZE).fill(0)
        _uploadData.value = new Array(GRAPH_SIZE).fill(0)
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
