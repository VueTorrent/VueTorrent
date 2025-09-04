import { useIntervalFn } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, defineAsyncComponent, nextTick, reactive, ref, shallowRef, toRaw, triggerRef } from 'vue'
import { useTask } from 'vue-concurrency'
import { useDialogStore } from './dialog'
import { useVueTorrentStore } from './vuetorrent'
import { useI18nUtils, useSearchQuery, useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { type TorrentFile, RightClickMenuEntryType, RightClickProperties, TreeFolder, TreeNode } from '@/types/vuetorrent'

export const useContentStore = defineStore('content', () => {
  const { t } = useI18nUtils()
  const dialogStore = useDialogStore()
  const { fileContentInterval, expandContent } = storeToRefs(useVueTorrentStore())

  const hashes = ref<string[]>([])

  const rightClickProperties = reactive<RightClickProperties>({
    target: '',
    isVisible: false,
    offset: [0, 0],
  })
  const isFirstRun = shallowRef(true)
  const cachedFiles = shallowRef<Record<string, TorrentFile[]>>({})
  const cachedFilesFlat = computed<TorrentFile[]>(() => Object.values(cachedFiles).flat())
  const filenameFilter = shallowRef('')
  const { results: filteredFiles } = useSearchQuery(cachedFilesFlat, filenameFilter, item => item.name)
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
      action: () => renameNode(selectedNode.value!),
    },
    {
      text: t(`torrentDetail.content.rename.bulk`),
      icon: 'mdi-rename',
      hidden: internalSelection.value.size !== 1 || (selectedNode.value?.type || 'file') === 'file',
      action: () => bulkRename(toRaw(selectedNode.value!) as TreeFolder),
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
    await Promise.all(
      hashes.value.map(async hash => {
        cachedFiles.value[hash] = await fetchFiles(hash).then(files => files.map(file => ({ ...file, hash })))
      })
    )
    await nextTick()
  }

  function renameNode(node: TreeNode) {
    const MoveTorrentFileDialog = defineAsyncComponent(() => import('@/components/Dialogs/MoveTorrentFileDialog.vue'))
    const payload = {
      hash: node.hash,
      isFolder: node.type === 'folder',
      oldName: node.fullName,
    }
    dialogStore.createDialog(MoveTorrentFileDialog, payload, () => void updateFileTreeTask.perform())
  }

  function bulkRename(node: TreeFolder) {
    const BulkRenameFilesDialog = defineAsyncComponent(() => import('@/components/Dialogs/BulkRenameFilesDialog.vue'))
    const payload = { hash: node.hash, node }
    dialogStore.createDialog(BulkRenameFilesDialog, payload, () => void updateFileTreeTask.perform())
  }

  function aggregateByHash<T extends { hash: string }>(acc: Record<string, T[]>, obj: T) {
    if (!acc[obj.hash]) {
      acc[obj.hash] = []
    }
    acc[obj.hash].push(obj)
    return acc
  }

  async function invertPrioritySelection() {
    const selection = selectedNodes.value.flatMap(n => n.childrenIds)
    const files = cachedFilesFlat.value.filter(file => selection.includes(file.index))

    const unwantedFiles = files.filter(file => file.priority === FilePriority.DO_NOT_DOWNLOAD).reduce(aggregateByHash, Record<string, TorrentFile[]>())
    const selectedFiles = files.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).reduce(aggregateByHash, {})

    const unwantedFilesPromises = Object.entries(unwantedFiles).map(([hash, unwantedFilesByHash]) =>
      setFilePriority(
        hash,
        unwantedFilesByHash.map(f => f.index),
        FilePriority.NORMAL
      )
    )
    const selectedFilesPromises = Object.entries(selectedFiles).map(([hash, selectedFilesByHash]) =>
      setFilePriority(
        hash,
        selectedFilesByHash.map(f => f.index),
        FilePriority.DO_NOT_DOWNLOAD
      )
    )

    await Promise.all([...unwantedFilesPromises, ...selectedFilesPromises])
  }

  async function renameTorrentFile(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFile(hash, oldPath, newPath)
  }

  async function renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFolder(hash, oldPath, newPath)
  }

  async function setFilePriority(hash: string, fileIdx: number[], priority: FilePriority) {
    await qbit.setTorrentFilePriority(hash, fileIdx, priority)
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
    hashes,
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
      hashes.value = []
      cachedFiles.value = {}
      openedItems.value = new Set([''])
      isFirstRun.value = true
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
}
