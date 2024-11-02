import { useI18nUtils, useSearchQuery, useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { useDialogStore } from '@/stores/dialog'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { TorrentFile } from '@/types/qbit/models'
import { RightClickMenuEntryType, RightClickProperties, TreeFolder, TreeNode } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, nextTick, reactive, shallowRef, toRaw, triggerRef } from 'vue'
import { useTask } from 'vue-concurrency'
import { useRoute } from 'vue-router'

export const useContentStore = defineStore('content', () => {
  const { t } = useI18nUtils()
  const route = useRoute()
  const dialogStore = useDialogStore()
  const { fileContentInterval } = storeToRefs(useVueTorrentStore())

  const hash = computed(() => route.params.hash as string)

  const rightClickProperties = reactive<RightClickProperties>({
    isVisible: false,
    offset: [0, 0]
  })
  const filenameFilter = shallowRef('')
  const cachedFiles = shallowRef<TorrentFile[]>([])
  const openedItems = shallowRef([''])
  const { results: filteredFiles } = useSearchQuery(cachedFiles, filenameFilter, item => item.name)
  const { flatTree } = useTreeBuilder(filteredFiles, openedItems)

  const internalSelection = shallowRef<Set<string>>(new Set())
  const lastSelected = shallowRef<string>('')
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
      text: t(`torrentDetail.content.rename.${selectedNode.value?.type || 'file'}`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size > 1 || selectedNode.value?.fullName === '',
      action: () => renameNode(selectedNode.value!)
    },
    {
      text: t(`torrentDetail.content.rename.bulk`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size !== 1 || (selectedNode.value?.type || 'file') === 'file',
      action: () => bulkRename(toRaw(selectedNode.value!) as TreeFolder)
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

  const timerForcedPause = shallowRef(false)
  const {
    isActive: isTimerActive,
    pause: pauseTimer,
    resume: resumeTimer
  } = useIntervalFn(updateFileTreeTask.perform, fileContentInterval, {
    immediate: false,
    immediateCallback: true
  })

  async function updateFileTree() {
    cachedFiles.value = await fetchFiles(hash.value)
    await nextTick()
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

    await Promise.all([setFilePriority(unwantedFileIds, FilePriority.NORMAL), setFilePriority(selectedFileIds, FilePriority.DO_NOT_DOWNLOAD)])
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

  function openNode(e: Event, node: TreeNode) {
    if (node.type === 'file') return
    e.stopPropagation()

    const index = openedItems.value.indexOf(node.fullName)
    if (index === -1) {
      openedItems.value.push(node.fullName)
    } else {
      openedItems.value.splice(index, 1)
    }
    triggerRef(openedItems)
  }

  async function toggleFileSelection(node: TreeNode) {
    if (!node.wanted) {
      await setFilePriority(node.childrenIds, FilePriority.NORMAL)
    } else {
      await setFilePriority(node.childrenIds, FilePriority.DO_NOT_DOWNLOAD)
    }
  }

  return {
    rightClickProperties,
    internalSelection,
    lastSelected,
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
    openNode,
    toggleFileSelection,
    $reset: () => {
      pauseTimer()
      updateFileTreeTask.clear()
      internalSelection.value.clear()
      lastSelected.value = ''
      filenameFilter.value = ''
      cachedFiles.value = []
      openedItems.value = ['']
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
}
