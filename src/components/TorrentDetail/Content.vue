<script setup lang="ts">
import MoveTorrentFileDialog from '@/components/Dialogs/MoveTorrentFileDialog.vue'
import RootNode from '@/components/TorrentDetail/Content/RootNode.vue'
import { useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { Torrent, TreeNode } from '@/types/vuetorrent'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const timer = ref<NodeJS.Timeout | null>(null)
const apiLock = ref(false)
const loading = ref(false)
const cachedFiles = ref<TorrentFile[]>([])
const { tree } = useTreeBuilder(cachedFiles)
const openedItems = ref<string[]>([])
const renameDialog = ref(false)
const renamePayload = reactive({
  hash: '',
  isFolder: false,
  oldName: ''
})

const fileSelection = computed({
  get: () => cachedFiles.value.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).map(file => file.index),
  async set(newValue: number[]) {
    const oldValue = cachedFiles.value.filter(f => f.priority !== FilePriority.DO_NOT_DOWNLOAD).map(f => f.index)

    const filesToExclude = oldValue
      .filter(index => !newValue.includes(index))
      .map(index => cachedFiles.value.find(f => f.index === index))
      .filter(f => f && f.priority !== FilePriority.DO_NOT_DOWNLOAD)
      .map(f => (f as TorrentFile).index)
    const filesToInclude = newValue
      .filter(index => !oldValue.includes(index))
      .map(index => cachedFiles.value.find(f => f.index === index))
      .filter(f => f && f.priority === FilePriority.DO_NOT_DOWNLOAD)
      .map(f => (f as TorrentFile).index)

    if (filesToExclude.length) {
      await maindataStore.setTorrentFilePriority(props.torrent.hash, filesToExclude, FilePriority.DO_NOT_DOWNLOAD)
    }
    if (filesToInclude.length) {
      await maindataStore.setTorrentFilePriority(props.torrent.hash, filesToInclude, FilePriority.NORMAL)
    }
    await updateFileTree()
  }
})

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

  loading.value = false
  apiLock.value = false
  await nextTick()
}

watch(
  () => props.isActive,
  newValue => {
    if (newValue) {
      timer.value = setInterval(updateFileTree, vuetorrentStore.fileContentInterval)
      updateFileTree().then(() => openedItems.value.push('(root)'))
    } else {
      clearInterval(timer.value as NodeJS.Timeout)
    }
  }
)
watch(renameDialog, v => {
  if (!v) {
    updateFileTree()
  }
})

onBeforeUnmount(() => {
  clearInterval(timer.value as NodeJS.Timeout)
})
onMounted(() => {
  timer.value = setInterval(updateFileTree, vuetorrentStore.fileContentInterval)
  updateFileTree().then(() => openedItems.value.push('(root)'))
})
</script>

<template>
  <v-card :loading="loading" flat>
    <RootNode v-model:opened="openedItems" v-model:selected="fileSelection" :root="tree" @renameFolder="renameNode" @renameFile="renameNode" />
    <!--
    TODO: add treeview after merge
    https://github.com/vuetifyjs/vuetify/issues/13518
    -->
  </v-card>
  <MoveTorrentFileDialog v-model="renameDialog" v-bind="renamePayload" disable-activator />
</template>

<style scoped></style>
