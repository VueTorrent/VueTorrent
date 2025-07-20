import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const GRAPH_SIZE = 15

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const { mobile } = useDisplay({ mobileBreakpoint: 'md' })

    const isDrawerOpen = ref(!mobile.value)

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
      _timeData,
      _downloadData,
      _uploadData,
      downloadData,
      uploadData,
      pushTimeData,
      pushDownloadData,
      pushUploadData,
      $reset: () => {
        _timeData.value = new Array(GRAPH_SIZE).fill(new Date().getTime())
        _downloadData.value = new Array(GRAPH_SIZE).fill(0)
        _uploadData.value = new Array(GRAPH_SIZE).fill(0)
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [
        { storage: sessionStorage, excludePaths: ['isDrawerOpen'] },
        { storage: localStorage, includePaths: ['isDrawerOpen'] },
      ],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot))
}
