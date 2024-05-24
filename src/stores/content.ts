import { useSearchQuery, useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { useDialogStore } from '@/stores/dialog'
import { useMaindataStore } from '@/stores/maindata'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { TorrentFile } from '@/types/qbit/models'
import { RightClickMenuEntryType, RightClickProperties, TreeFolder, TreeNode } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import { computed, nextTick, reactive, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export const useContentStore = defineStore('content', () => {
  const { t } = useI18n()
  const route = useRoute()
  const dialogStore = useDialogStore()
  const maindataStore = useMaindataStore()
  const { fileContentInterval } = storeToRefs(useVueTorrentStore())

  const hash = computed(() => route.params.hash as string)

  const rightClickProperties = reactive<RightClickProperties>({
    isVisible: false,
    offset: [0, 0]
  })
  const _lock = ref(false)
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
      text: t('torrentDetail.content.priority'),
      icon: 'mdi-trending-up',
      children: [
        { text: t('constants.file_priority.max'), icon: 'mdi-arrow-up', action: () => setFilePriority(selectedIds.value, FilePriority.MAXIMAL) },
        { text: t('constants.file_priority.high'), icon: 'mdi-arrow-top-right', action: () => setFilePriority(selectedIds.value, FilePriority.HIGH) },
        { text: t('constants.file_priority.normal'), icon: 'mdi-minus', action: () => setFilePriority(selectedIds.value, FilePriority.NORMAL) },
        { text: t('constants.file_priority.unwanted'), icon: 'mdi-cancel', action: () => setFilePriority(selectedIds.value, FilePriority.DO_NOT_DOWNLOAD) }
      ]
    }
  ])

  const timerForcedPause = ref(false)
  const { isActive: isTimerActive, pause: pauseTimer, resume: resumeTimer } = useIntervalFn(updateFileTree, fileContentInterval, {
    immediate: false,
    immediateCallback: true
  })

  async function updateFileTree() {
    if (_lock.value) return
    _lock.value = true
    performance.mark('ContentStore::updateFileTree::start')
    cachedFiles.value = await maindataStore.fetchFiles(hash.value)
      .finally(() => _lock.value = false)
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
    dialogStore.createDialog(MoveTorrentFileDialog, payload, updateFileTree)
  }

  async function bulkRename(node: TreeFolder) {
    const { default: BulkRenameFilesDialog } = await import('@/components/Dialogs/BulkRenameFilesDialog.vue')
    const payload = { hash: hash.value, node }
    dialogStore.createDialog(BulkRenameFilesDialog, payload, updateFileTree)
  }

  async function renameTorrentFile(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFile(hash, oldPath, newPath)
  }

  async function renameTorrentFolder(hash: string, oldPath: string, newPath: string) {
    await qbit.renameFolder(hash, oldPath, newPath)
  }

  async function setFilePriority(fileIdx: number[], priority: FilePriority) {
    await qbit.setTorrentFilePriority(hash.value, fileIdx, priority)
    await updateFileTree()
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
    updateFileTree,
    timerForcedPause,
    isTimerActive,
    pauseTimer,
    resumeTimer,
    renameTorrentFile,
    renameTorrentFolder,
    setFilePriority,
    $reset: () => {
      while (_lock.value) {}
      internalSelection.value.clear()
      filenameFilter.value = ''
      cachedFiles.value = []
      openedItems.value = ['']
      pauseTimer()
    }
  }
})
