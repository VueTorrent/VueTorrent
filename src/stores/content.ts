import { useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { qbit } from '@/services'
import { useDialogStore } from '@/stores/dialog'
import { useMaindataStore } from '@/stores/maindata'
import { useVueTorrentStore } from '@/stores/vuetorrent'
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
  const internalSelection = ref<Set<string>>(new Set())
  const _lock = ref(false)
  const cachedFiles = ref<TorrentFile[]>([])
  const { tree } = useTreeBuilder(cachedFiles)

  const menuData = computed<TRCMenuEntry[]>(() => ([
    {
      text: t(`torrentDetail.content.rename.bulk`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size <= 1,
      action: bulkRename
    },
    {
      text: t(`torrentDetail.content.rename.${ trcProperties.target?.type || 'file' }`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size > 1 || trcProperties.target?.name === '(root)',
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

  async function updateFileTree() {
    if (_lock.value) return
    _lock.value = true
    await nextTick()

    cachedFiles.value = await maindataStore.fetchFiles(trcProperties.hash)

    _lock.value = false
    await nextTick()
  }

  const renameDialog = ref('')

  const renamePayload = reactive({
    hash: '',
    isFolder: false,
    oldName: ''
  })

  async function renameNode(node: TreeNode) {
    const { default: MoveTorrentFileDialog } = await import('@/components/Dialogs/MoveTorrentFileDialog.vue')
    renamePayload.hash = trcProperties.hash
    renamePayload.isFolder = node.type === 'folder'
    renamePayload.oldName = node.fullName
    renameDialog.value = dialogStore.createDialog(MoveTorrentFileDialog, renamePayload)
  }

  async function bulkRename() {
    //TODO
  }

  async function renameTorrentFile(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFile(hash, oldPath, newPath)
  }

  async function renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFolder(hash, oldPath, newPath)
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
    internalSelection,
    menuData,
    tree,
    updateFileTree,
    pauseTimer,
    resumeTimer,
    renameTorrentFile,
    renameTorrentFolder,
    setFilePriority,
    $reset: () => {
      while (_lock.value) {}
      internalSelection.value = new Set()
      cachedFiles.value = []
    }
  }
})