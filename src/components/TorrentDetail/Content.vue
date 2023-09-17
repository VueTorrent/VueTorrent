<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { typesMap } from '@/constants/vuetorrent'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { Torrent, TreeFile, TreeFolder, TreeNode, TreeRoot } from '@/types/vuetorrent'
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t } = useI18n()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const timer = ref<NodeJS.Timeout | null>(null)
const apiLock = ref(false)
const loading = ref(false)
const cachedFiles = ref<TorrentFile[]>([])
const fileTree = ref<TreeRoot>(getEmptyRoot())
const openedItems = ref<string[]>([])
const fileSelection = ref<number[]>([])
const renameDialog = ref(false)
const renamePayload = reactive({
  hash: '',
  isFolder: false,
  oldName: ''
})

const filePriorityOptions = [
  { name: t('constants.file_priority.max'), icon: 'mdi-priority-high', value: FilePriority.MAXIMAL },
  { name: t('constants.file_priority.high'), icon: 'mdi-arrow-up', value: FilePriority.HIGH },
  { name: t('constants.file_priority.normal'), icon: 'mdi-arrow-down', value: FilePriority.NORMAL },
  { name: t('constants.file_priority.unwanted'), icon: 'mdi-priority-low', value: FilePriority.DO_NOT_DOWNLOAD }
]

function getFileIcon(file: TreeFile) {
  const type = file.name.split('.').pop()?.toLowerCase() || ''
  return typesMap[type] || 'mdi-file'
}

function getNodeDescription(node: TreeRoot | TreeFolder) {
  let fileCount = 0
  let folderCount = 0
  for (const child of node.children) {
    if (child.type === 'file') {
      fileCount++
    } else if (child.type === 'folder') {
      folderCount++
    }
  }

  const res = []
  if (fileCount > 0) {
    res.push(t('torrentDetail.content.fileInfo', fileCount))
  }
  if (folderCount > 0) {
    res.push(t('torrentDetail.content.folderInfo', folderCount))
  }

  return res.join(', ')
}

function getNodePriority(node: TreeFile) {
  return filePriorityOptions.find(el => el.value === node.priority)?.name || ''
}

async function toggleFileSelect(file: TreeFile) {
  await setFilePrio(file, file.priority === FilePriority.DO_NOT_DOWNLOAD ? FilePriority.NORMAL : FilePriority.DO_NOT_DOWNLOAD)
}

async function setFilePrio(file: TreeFile, prio: FilePriority) {
  await maindataStore.setTorrentFilePriority(props.torrent.hash, [file.index], prio)
}

async function renameNode(node: TreeNode) {
  renamePayload.hash = props.torrent.hash
  renamePayload.isFolder = node.type === 'folder'
  renamePayload.oldName = node.fullName
  renameDialog.value = true
}

async function updateFileTree() {
  if (apiLock.value) return
  apiLock.value = true
  loading.value = true
  await nextTick()

  cachedFiles.value = await maindataStore.fetchFiles(props.torrent.hash)
  fileTree.value = genFileTree(cachedFiles.value)

  loading.value = false
  apiLock.value = false
  await nextTick()
}

function getEmptyRoot(): TreeRoot {
  return {
    type: 'root',
    name: '',
    fullName: '',
    id: '',
    children: []
  }
}

function genFileTree(files: TorrentFile[]) {
  const rootNode = getEmptyRoot()

  for (const file of files) {
    let cursor: TreeRoot | TreeFolder = rootNode
    file.name
      .replace('\\', '/')
      .split('/')
      .reduce((parentPath, nodeName) => {
        const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

        if (file.name.replace('\\', '/').split('/').pop() === nodeName) {
          const newFile: TreeFile = {
            type: 'file',
            name: nodeName,
            fullName: nextPath,
            id: file.index,
            availability: file.availability,
            index: file.index,
            is_seed: file.is_seed,
            priority: file.priority,
            progress: file.progress,
            size: file.size
          }
          cursor.children.push(newFile)
        } else {
          const folder = cursor.children.find(el => el.name === nodeName) as TreeFolder | undefined
          if (folder) {
            cursor = folder
          } else {
            // if not found, create folder and set cursor to folder
            const newFolder: TreeFolder = {
              type: 'folder',
              name: nodeName,
              fullName: nextPath,
              id: nextPath,
              children: []
            }
            cursor.children.push(newFolder)
            cursor = newFolder
          }
        }

        return nextPath
      }, '')
  }

  return rootNode
}

watch(
  () => props.isActive,
  newValue => {
    if (newValue) {
      updateFileTree().then(() => openedItems.value.push(''))
      timer.value = setInterval(() => {
        updateFileTree()
      }, vuetorrentStore.fileContentInterval)
    } else {
      clearInterval(timer.value as NodeJS.Timeout)
    }
  }
)
onBeforeUnmount(() => clearInterval(timer.value as NodeJS.Timeout))
</script>

<template>
  <v-card :loading="loading" flat>
    <!-- TODO: add treeview after merge -->
  </v-card>
</template>

<style scoped></style>
