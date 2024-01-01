import { usePreferenceStore } from './preferences'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAddTorrentStore = defineStore(
  'addTorrents',
  () => {
    const preferenceStore = usePreferenceStore()

    const isFirstInit = ref(true)

    const files = ref<File[]>([])
    const urls = ref<string>('')

    const form = reactive<AddTorrentPayload>({})

    const pendingTorrentsCount = computed(() => files.value.length + urls.value.split('\n').filter(url => url.trim() !== '').length)

    function pushTorrentToQueue(torrentDescriptor: File | string) {
      if (torrentDescriptor instanceof File) {
        files.value.push(torrentDescriptor)
      } else {
        if (urls.value !== '') {
          urls.value += '\n'
        }
        urls.value += torrentDescriptor
      }
    }

    function initForm() {
      if (isFirstInit.value) {
        isFirstInit.value = false
        resetForm()
      }
    }

    function resetForm() {
      urls.value = ''
      files.value = []

      form.addToTopOfQueue = preferenceStore.preferences!.add_to_top_of_queue
      form.autoTMM = preferenceStore.preferences!.auto_tmm_enabled
      form.category = undefined
      form.contentLayout = preferenceStore.preferences!.torrent_content_layout
      form.cookie = undefined
      form.dlLimit = preferenceStore.preferences!.dl_limit
      form.downloadPath = preferenceStore.preferences!.temp_path
      form.firstLastPiecePrio = false
      form.inactiveSeedingTimeLimit = undefined
      form.paused = preferenceStore.preferences!.start_paused_enabled
      form.ratioLimit = undefined
      form.rename = undefined
      form.savepath = preferenceStore.preferences!.save_path
      form.seedingTimeLimit = undefined
      form.sequentialDownload = false
      form.skip_checking = false
      form.stopCondition = preferenceStore.preferences!.torrent_stop_condition
      form.tags = undefined
      form.upLimit = preferenceStore.preferences!.up_limit
      form.useDownloadPath = preferenceStore.preferences!.temp_path_enabled
    }

    return {
      isFirstInit,
      files,
      urls,
      form,
      pendingTorrentsCount,
      pushTorrentToQueue,
      initForm,
      resetForm,
      $reset: () => {
        isFirstInit.value = true
        initForm()
      }
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          key: 'vuetorrent_addTorrents'
        }
      ]
    }
  }
)
