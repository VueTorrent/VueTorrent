import { usePreferenceStore } from '@/stores/preferences.ts'
import { AddTorrentPayload } from '@/types/qbit/payloads'
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
    const addTorrentDialogUrls = ref<string>('')

    const addTorrentDialogForm = reactive<AddTorrentPayload>({})

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

      addTorrentDialogForm.addToTopOfQueue = preferenceStore.preferences!.add_to_top_of_queue
      addTorrentDialogForm.autoTMM = preferenceStore.preferences!.auto_tmm_enabled
      addTorrentDialogForm.category = undefined
      addTorrentDialogForm.contentLayout = preferenceStore.preferences!.torrent_content_layout
      addTorrentDialogForm.cookie = undefined
      addTorrentDialogForm.dlLimit = preferenceStore.preferences!.dl_limit
      addTorrentDialogForm.firstLastPiecePrio = false
      addTorrentDialogForm.inactiveSeedingTimeLimit = undefined
      addTorrentDialogForm.paused = preferenceStore.preferences!.start_paused_enabled
      addTorrentDialogForm.ratioLimit = undefined
      addTorrentDialogForm.rename = undefined
      addTorrentDialogForm.savepath = preferenceStore.preferences!.save_path
      addTorrentDialogForm.seedingTimeLimit = undefined
      addTorrentDialogForm.sequentialDownload = false
      addTorrentDialogForm.skip_checking = false
      addTorrentDialogForm.stopCondition = preferenceStore.preferences!.torrent_stop_condition
      addTorrentDialogForm.tags = undefined
      addTorrentDialogForm.upLimit = preferenceStore.preferences!.up_limit
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
