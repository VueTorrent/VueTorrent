import { AddTorrentParams } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { usePreferenceStore } from './preferences'

export const useAddTorrentStore = defineStore(
  'addTorrents',
  () => {
    const preferenceStore = usePreferenceStore()

    const isFirstInit = ref(true)

    const files = ref<File[]>([])
    const urls = ref<string>('')

    const form = reactive<
      Partial<{
        cookie: string
        firstLastPiecePrio: boolean
        rename: string
        sequentialDownload: boolean
      }>
    >({})
    const addTorrentParams = reactive<AddTorrentParams>({})

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

      form.cookie = undefined
      form.firstLastPiecePrio = false
      form.rename = undefined
      form.sequentialDownload = false

      addTorrentParams.add_to_top_of_queue = preferenceStore.preferences!.add_to_top_of_queue
      addTorrentParams.category = undefined
      addTorrentParams.content_layout = preferenceStore.preferences!.torrent_content_layout
      addTorrentParams.download_limit = preferenceStore.preferences!.dl_limit
      addTorrentParams.download_path = preferenceStore.preferences!.temp_path_enabled ? preferenceStore.preferences!.temp_path : undefined
      addTorrentParams.inactive_seeding_time_limit = undefined
      addTorrentParams.ratio_limit = undefined
      addTorrentParams.save_path = preferenceStore.preferences!.save_path
      addTorrentParams.seeding_time_limit = undefined
      addTorrentParams.skip_checking = false
      addTorrentParams.stop_condition = preferenceStore.preferences!.torrent_stop_condition
      addTorrentParams.stopped = preferenceStore.preferences!.start_paused_enabled
      addTorrentParams.tags = undefined
      addTorrentParams.upload_limit = preferenceStore.preferences!.up_limit
      addTorrentParams.use_auto_tmm = preferenceStore.preferences!.auto_tmm_enabled
      addTorrentParams.use_download_path = preferenceStore.preferences!.temp_path_enabled
    }

    return {
      isFirstInit,
      files,
      urls,
      form,
      addTorrentParams,
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
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }]
    }
  }
)
