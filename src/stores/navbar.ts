import { ContentLayout, StopCondition } from '@/constants/qbit/AppPreferences.ts'
import { usePreferenceStore } from '@/stores/preferences.ts'
import { Category } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useNavbarStore = defineStore(
  'navbar',
  () => {
    const preferenceStore = usePreferenceStore()

    const downloadData = ref<number[]>(new Array(15).fill(0))
    const uploadData = ref<number[]>(new Array(15).fill(0))

    const isAddTorrentDialogFirstInit = ref(true)

    const addTorrentDialogFiles = ref<File[]>([])
    const addTorrentDialogUrls = ref('')

    const addTorrentDialogForm = reactive({
      autoTMM: false,
      skipChecking: false,
      sequentialDownload: false,
      firstLastPiecePrio: false,
      startNow: true,
      contentLayout: ContentLayout.ORIGINAL,
      stopCondition: StopCondition.NONE,
      savepath: '',
      category: null as Category | null,
      tags: [] as string[]
    })

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

    function initAddTorrentDialogForm() {
      if (isAddTorrentDialogFirstInit.value) {
        isAddTorrentDialogFirstInit.value = false
        resetAddTorrentDialogForm()
      }
    }

    function resetAddTorrentDialogForm() {
      addTorrentDialogUrls.value = ''
      addTorrentDialogFiles.value = []

      addTorrentDialogForm.autoTMM = preferenceStore.preferences!.auto_tmm_enabled
      addTorrentDialogForm.category = null
      addTorrentDialogForm.contentLayout = preferenceStore.preferences!.torrent_content_layout
      addTorrentDialogForm.firstLastPiecePrio = false
      addTorrentDialogForm.savepath = preferenceStore.preferences!.save_path
      addTorrentDialogForm.sequentialDownload = false
      addTorrentDialogForm.skipChecking = false
      addTorrentDialogForm.startNow = !preferenceStore.preferences!.start_paused_enabled
      addTorrentDialogForm.stopCondition = preferenceStore.preferences!.torrent_stop_condition
      addTorrentDialogForm.tags = []
    }

    return {
      downloadData,
      uploadData,
      isAddTorrentDialogFirstInit,
      addTorrentDialogFiles,
      addTorrentDialogUrls,
      addTorrentDialogForm,
      pendingTorrentsCount,
      pushDownloadData,
      pushUploadData,
      pushTorrentToQueue,
      initAddTorrentDialogForm,
      resetAddTorrentDialogForm
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
