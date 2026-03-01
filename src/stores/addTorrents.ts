import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref, shallowRef } from 'vue'
import { usePreferenceStore } from './preferences'
import { AddTorrentParams } from '@/types/qbit/models'

export const useAddTorrentStore = defineStore(
  'addTorrents',
  () => {
    const preferenceStore = usePreferenceStore()

    const isFirstInit = ref(true)

    const files = shallowRef<File[]>([])
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
      initForm()
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
      addTorrentParams.download_limit = undefined
      addTorrentParams.download_path = preferenceStore.preferences!.temp_path_enabled ? preferenceStore.preferences!.temp_path : undefined
      addTorrentParams.forced = undefined
      addTorrentParams.inactive_seeding_time_limit = undefined
      addTorrentParams.ratio_limit = undefined
      addTorrentParams.save_path = preferenceStore.preferences!.save_path
      addTorrentParams.seeding_time_limit = undefined
      addTorrentParams.skip_checking = false
      addTorrentParams.stop_condition = preferenceStore.preferences!.torrent_stop_condition
      addTorrentParams.stopped = preferenceStore.preferences!.add_stopped_enabled ?? preferenceStore.preferences!.start_paused_enabled
      addTorrentParams.tags = undefined
      addTorrentParams.upload_limit = undefined
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
        isFirstInit.value = false
        resetForm()
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage, excludePaths: ['files'] }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddTorrentStore, import.meta.hot))
}
