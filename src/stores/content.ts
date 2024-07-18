import { useSearchQuery, useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { useDialogStore } from '@/stores/dialog'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { TorrentFile } from '@/types/qbit/models'
import { RightClickMenuEntryType, RightClickProperties, TreeFolder, TreeNode } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import { computed, nextTick, reactive, ref, toRaw } from 'vue'
import { useTask } from 'vue-concurrency'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export const useContentStore = defineStore('content', () => {
  const { t } = useI18n()
  const route = useRoute()
  const dialogStore = useDialogStore()
  const { fileContentInterval } = storeToRefs(useVueTorrentStore())

  const hash = computed(() => route.params.hash as string)

  const rightClickProperties = reactive<RightClickProperties>({
    isVisible: false,
    offset: [0, 0]
  })
  const filenameFilter = ref('')
  const cachedFiles = ref<TorrentFile[]>([])
  const openedItems = ref([''])
  const { results: filteredFiles } = useSearchQuery(cachedFiles, filenameFilter, item => item.name)
  const { flatTree } = useTreeBuilder(filteredFiles, openedItems)

  const internalSelection = ref<Set<string>>(new Set())
  const selectedNodes = computed<TreeNode[]>(() => (internalSelection.value.size === 0 ? [] : flatTree.value.filter(node => internalSelection.value.has(node.fullName))))
  const selectedNode = computed<TreeNode | null>(() => (selectedNodes.value.length > 0 ? selectedNodes.value[0] : null))
  const selectedIds = computed<number[]>(() =>
    selectedNodes.value
      .map(node => node.childrenIds)
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i)
  )

  const menuData = computed<RightClickMenuEntryType[]>(() => [
    {
      text: t(`torrentDetail.content.rename.bulk`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size !== 1 || (selectedNode.value?.type || 'file') === 'file',
      action: () => bulkRename(toRaw(selectedNode.value!) as TreeFolder)
    },
    {
      text: t(`torrentDetail.content.rename.${selectedNode.value?.type || 'file'}`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size > 1 || selectedNode.value?.fullName === '',
      action: () => renameNode(selectedNode.value!)
    },
    {
      text: t('torrentDetail.content.invert_priority'),
      icon: 'mdi-checkbox-intermediate-variant',
      action: invertPrioritySelection
    },
    {
      text: t('torrentDetail.content.priority'),
      icon: 'mdi-trending-up',
      children: [
        {
          text: t('constants.file_priority.max'),
          icon: 'mdi-arrow-up',
          action: () => setFilePriority(selectedIds.value, FilePriority.MAXIMAL)
        },
        {
          text: t('constants.file_priority.high'),
          icon: 'mdi-arrow-top-right',
          action: () => setFilePriority(selectedIds.value, FilePriority.HIGH)
        },
        {
          text: t('constants.file_priority.normal'),
          icon: 'mdi-minus',
          action: () => setFilePriority(selectedIds.value, FilePriority.NORMAL)
        },
        {
          text: t('constants.file_priority.unwanted'),
          icon: 'mdi-cancel',
          action: () => setFilePriority(selectedIds.value, FilePriority.DO_NOT_DOWNLOAD)
        }
      ]
    }
  ])

  const updateFileTreeTask = useTask(function* () {
    yield updateFileTree()
  }).drop()

  const timerForcedPause = ref(false)
  const {
    isActive: isTimerActive,
    pause: pauseTimer,
    resume: resumeTimer
  } = useIntervalFn(updateFileTreeTask.perform, fileContentInterval, {
    immediate: false,
    immediateCallback: true
  })

  async function updateFileTree() {
    performance.mark('ContentStore::updateFileTree::start')
    cachedFiles.value = await fetchFiles(hash.value)
    await nextTick()
    performance.mark('ContentStore::updateFileTree::end')
    performance.measure('ContentStore::updateFileTree', 'ContentStore::updateFileTree::start', 'ContentStore::updateFileTree::end')
  }

  async function renameNode(node: TreeNode) {
    const { default: MoveTorrentFileDialog } = await import('@/components/Dialogs/MoveTorrentFileDialog.vue')
    const payload = {
      hash: hash.value,
      isFolder: node.type === 'folder',
      oldName: node.fullName
    }
    dialogStore.createDialog(MoveTorrentFileDialog, payload, updateFileTreeTask.perform)
  }

  async function bulkRename(node: TreeFolder) {
    const { default: BulkRenameFilesDialog } = await import('@/components/Dialogs/BulkRenameFilesDialog.vue')
    const payload = { hash: hash.value, node }
    dialogStore.createDialog(BulkRenameFilesDialog, payload, updateFileTreeTask.perform)
  }

  async function invertPrioritySelection() {
    const selection = selectedNodes.value.flatMap(n => n.childrenIds)
    const files = cachedFiles.value.filter(file => selection.includes(file.index))

    const selectedFileIds = files.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).map(file => file.index)
    const unwantedFileIds = files.filter(file => file.priority === FilePriority.DO_NOT_DOWNLOAD).map(file => file.index)

    await Promise.all([
      setFilePriority(unwantedFileIds, FilePriority.NORMAL),
      setFilePriority(selectedFileIds, FilePriority.DO_NOT_DOWNLOAD)
    ])
  }

  async function renameTorrentFile(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFile(hash, oldPath, newPath)
  }

  async function renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFolder(hash, oldPath, newPath)
  }

  async function setFilePriority(fileIdx: number[], priority: FilePriority) {
    await qbit.setTorrentFilePriority(hash.value, fileIdx, priority)
    updateFileTreeTask.perform()
  }

  async function fetchFiles(hash: string, indexes?: number[]) {
    return await qbit.getTorrentFiles(hash, indexes)
  }

  async function fetchPieceState(hash: string) {
    return await qbit.getTorrentPieceStates(hash)
  }

  return {
    rightClickProperties,
    internalSelection,
    menuData,
    filenameFilter,
    cachedFiles,
    openedItems,
    filteredFiles,
    flatTree,
    updateFileTreeTask,
    timerForcedPause,
    isTimerActive,
    pauseTimer,
    resumeTimer,
    renameTorrentFile,
    renameTorrentFolder,
    setFilePriority,
    fetchFiles,
    fetchPieceState,
    $reset: () => {
      pauseTimer()
      updateFileTreeTask.clear()
      internalSelection.value.clear()
      filenameFilter.value = ''
      cachedFiles.value = []
      openedItems.value = ['']
    }
  }
})
