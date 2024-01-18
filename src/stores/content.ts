import MoveTorrentFileDialog from '@/components/Dialogs/MoveTorrentFileDialog.vue'
import { useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { qbit } from '@/services'
import { useDialogStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { TRCMenuEntry, TreeNode } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useContentStore = defineStore('torrentDetail', () => {
  const { t } = useI18n()
  const dialogStore = useDialogStore()
  const maindataStore = useMaindataStore()
  const { fileContentInterval } = storeToRefs(useVueTorrentStore())

  const trcProperties = reactive({
    isVisible: false,
    offset: [0, 0],
    hash: '',
    target: null as TreeNode | null
  })

  const menuData = computed<TRCMenuEntry[]>(() => ([
    {
      text: t(`torrentDetail.content.rename.${ trcProperties.target?.type || 'file' }`),
      icon: 'mdi-rename',
      hidden: trcProperties.target?.name === '(root)',
      action: () => renameNode(trcProperties.target!)
    },
    {
      text: t('torrentDetail.content.priority'),
      icon: 'mdi-trending-up',
      children: [
        { text: t('constants.file_priority.max'), icon: 'mdi-priority-high', action: () => setFilePriority(trcProperties.target!.getChildrenIds(), FilePriority.MAXIMAL) },
        { text: t('constants.file_priority.high'), icon: 'mdi-arrow-up', action: () => setFilePriority(trcProperties.target!.getChildrenIds(), FilePriority.HIGH) },
        { text: t('constants.file_priority.normal'), icon: 'mdi-arrow-down', action: () => setFilePriority(trcProperties.target!.getChildrenIds(), FilePriority.NORMAL) },
        { text: t('constants.file_priority.unwanted'), icon: 'mdi-close', action: () => setFilePriority(trcProperties.target!.getChildrenIds(), FilePriority.DO_NOT_DOWNLOAD) }
      ]
    }
  ]))

  const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(updateFileTree, fileContentInterval, {
    immediate: false,
    immediateCallback: true
  })

  const apiLock = ref(false)
  const loading = ref(false)
  const cachedFiles = ref<TorrentFile[]>([])
  const { tree } = useTreeBuilder(cachedFiles)

  async function updateFileTree() {
    if (apiLock.value) return
    apiLock.value = true
    loading.value = true
    await nextTick()

    cachedFiles.value = await maindataStore.fetchFiles(trcProperties.hash)

    loading.value = false
    apiLock.value = false
    await nextTick()
  }

  const renameDialog = ref('')

  const renamePayload = reactive({
    hash: '',
    isFolder: false,
    oldName: ''
  })

  async function renameNode(node: TreeNode) {
    renamePayload.hash = trcProperties.hash
    renamePayload.isFolder = node.type === 'folder'
    renamePayload.oldName = node.fullName
    renameDialog.value = dialogStore.createDialog(MoveTorrentFileDialog, renamePayload)
  }

  async function setFilePriority(fileIdx: number[], priority: FilePriority) {
    await qbit.setTorrentFilePriority(trcProperties.hash, fileIdx, priority)
    await updateFileTree()
  }

  watch(
    () => dialogStore.isDialogOpened(renameDialog.value),
    async v => {
      if (!v) {
        await updateFileTree()
      }
    }
  )

  return {
    trcProperties,
    menuData,
    tree,
    updateFileTree,
    pauseTimer,
    resumeTimer,
    setFilePriority
  }
})