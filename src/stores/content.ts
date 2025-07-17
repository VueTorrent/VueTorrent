import { useIntervalFn } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, nextTick, reactive, shallowRef, toRaw, triggerRef } from 'vue'
import { useTask } from 'vue-concurrency'
import { useRoute } from 'vue-router'
import { useDialogStore } from './dialog'
import { useVueTorrentStore } from './vuetorrent'
import { useI18nUtils, useSearchQuery, useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { TorrentFile } from '@/types/qbit/models'
import { RightClickMenuEntryType, RightClickProperties, TreeFolder, TreeNode } from '@/types/vuetorrent'

export const useContentStore = defineStore('content', () => {
  const { t } = useI18nUtils()
  const route = useRoute()
  const dialogStore = useDialogStore()
  const { fileContentInterval, expandContent } = storeToRefs(useVueTorrentStore())

  const hash = computed(() => route.params.hash as string)

  const rightClickProperties = reactive<RightClickProperties>({
    isVisible: false,
    offset: [0, 0],
  })
  const isFirstRun = shallowRef(true)
  const cachedFiles = shallowRef<TorrentFile[]>([])
  const filenameFilter = shallowRef('')
  const { results: filteredFiles } = useSearchQuery(cachedFiles, filenameFilter, item => item.name)
  const openedItems = shallowRef(new Set(['']))
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
      action: () => void renameNode(selectedNode.value!),
    },
    {
      text: t(`torrentDetail.content.rename.bulk`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size !== 1 || (selectedNode.value?.type || 'file') === 'file',
      action: () => void bulkRename(toRaw(selectedNode.value!) as TreeFolder),
    },
    {
      text: t('torrentDetail.content.invert_priority'),
      icon: 'mdi-checkbox-intermediate-variant',
      action: () => void invertPrioritySelection(),
    },
    {
      text: t('torrentDetail.content.priority'),
      icon: 'mdi-trending-up',
      children: [
        {
          text: t('constants.file_priority.max'),
          icon: 'mdi-arrow-up',
          action: () => void setFilePriority(selectedIds.value, FilePriority.MAXIMAL),
        },
        {
          text: t('constants.file_priority.high'),
          icon: 'mdi-arrow-top-right',
          action: () => void setFilePriority(selectedIds.value, FilePriority.HIGH),
        },
        {
          text: t('constants.file_priority.normal'),
          icon: 'mdi-minus',
          action: () => void setFilePriority(selectedIds.value, FilePriority.NORMAL),
        },
        {
          text: t('constants.file_priority.unwanted'),
          icon: 'mdi-cancel',
          action: () => void setFilePriority(selectedIds.value, FilePriority.DO_NOT_DOWNLOAD),
        },
      ],
    },
    {
      text: 'Collapse All',
      icon: 'mdi-unfold-less-horizontal',
      action: collapseAll,
    },
    {
      text: 'Expand All',
      icon: 'mdi-unfold-more-horizontal',
      action: expandAll,
    },
  ])

  const updateFileTreeTask = useTask(function* () {
    if (isFirstRun.value) {
      yield updateFileTree().then(() => expandContent.value && expandAll())
      isFirstRun.value = false
    } else {
      yield updateFileTree()
    }
  }).drop()

  const timerForcedPause = shallowRef(false)
  const {
    isActive: isTimerActive,
    pause: pauseTimer,
    resume: resumeTimer,
  } = useIntervalFn(() => void updateFileTreeTask.perform(), fileContentInterval, {
    immediate: false,
    immediateCallback: true,
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
      oldName: node.fullName,
    }
    dialogStore.createDialog(MoveTorrentFileDialog, payload, () => void updateFileTreeTask.perform())
  }

  async function bulkRename(node: TreeFolder) {
    const { default: BulkRenameFilesDialog } = await import('@/components/Dialogs/BulkRenameFilesDialog.vue')
    const payload = { hash: hash.value, node }
    dialogStore.createDialog(BulkRenameFilesDialog, payload, () => void updateFileTreeTask.perform())
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
    e.stopPropagation()

    const dirName = node.type === 'file' ? node.fullName.slice(0, node.fullName.lastIndexOf('/')) : node.fullName

    if (!openedItems.value.has(dirName)) {
      openedItems.value.add(dirName)
      triggerRef(openedItems)
    }
  }

  function closeNode(e: Event, node: TreeNode) {
    e.stopPropagation()

    const dirName = node.type === 'file' || !openedItems.value.has(node.fullName) ? node.fullName.slice(0, node.fullName.lastIndexOf('/')) : node.fullName

    if (openedItems.value.has(dirName)) {
      openedItems.value.delete(dirName)
      if (internalSelection.value.has(node.fullName)) {
        internalSelection.value.delete(node.fullName)
        internalSelection.value.add(dirName)
        lastSelected.value = dirName
      }
      triggerRef(openedItems)
    }
  }

  function collapseAll() {
    openedItems.value = new Set([''])
  }

  function expandAll() {
    openedItems.value = cachedFiles.value
      .flatMap(file =>
        file.name
          .replaceAll('\\', '/')
          .split('/')
          .reduce((prev, curr, i, arr) => [...prev, ...(i < arr.length - 1 ? [[...prev, curr].join('/')] : [])], [] as string[])
      )
      .reduce((prev, curr) => prev.add(curr), new Set(['']))
  }

  async function toggleFileSelection(...nodes: TreeNode[]) {
    const wanted = nodes.some(node => node.wanted)
    const ids = nodes.flatMap(node => node.childrenIds)

    if (!wanted) {
      await setFilePriority(ids, FilePriority.NORMAL)
    } else {
      await setFilePriority(ids, FilePriority.DO_NOT_DOWNLOAD)
    }
  }

  return {
    rightClickProperties,
    isFirstRun,
    internalSelection,
    lastSelected,
    selectedNodes,
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
    fetchPieceState,
    openNode,
    closeNode,
    toggleFileSelection,
    $reset: () => {
      pauseTimer()
      updateFileTreeTask.clear()
      internalSelection.value.clear()
      lastSelected.value = ''
      filenameFilter.value = ''
      cachedFiles.value = []
      openedItems.value = new Set([''])
      isFirstRun.value = true
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
}
