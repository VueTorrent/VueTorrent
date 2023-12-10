<script setup lang="ts">
import ContentNode from '@/components/TorrentDetail/ContentNode.vue'
import { useTreeBuilder } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { useDialogStore, useMaindataStore, useVueTorrentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const { fileContentInterval } = storeToRefs(useVueTorrentStore())

const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(updateFileTree, fileContentInterval, {
  immediate: false,
  immediateCallback: true
})
const apiLock = ref(false)
const loading = ref(false)
const cachedFiles = ref<TorrentFile[]>([])
const { tree } = useTreeBuilder(cachedFiles)
const openedItems = ref(['(root)'])
const renameDialog = ref('')
// const renamePayload = reactive({
//   hash: '',
//   isFolder: false,
//   oldName: ''
// })

// async function renameNode(node: TreeNode) {
//   renamePayload.hash = props.torrent.hash
//   renamePayload.isFolder = node.type === 'folder'
//   renamePayload.oldName = node.fullName
//   renameDialog.value = dialogStore.createDialog(MoveTorrentFileDialog, renamePayload)
// }

async function setFilePriority(fileIdx: number[], priority: FilePriority) {
  await maindataStore.setTorrentFilePriority(props.torrent.hash, fileIdx, priority)
  await updateFileTree()
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
      resumeTimer()
      updateFileTree()
    } else {
      pauseTimer()
    }
  }
)

watch(
  () => dialogStore.isDialogOpened(renameDialog.value),
  v => {
    if (!v) {
      updateFileTree()
    }
  }
)

onMounted(() => {
  resumeTimer()
})
</script>

<template>
  <v-card>
    <v-card-text>
      <ul class="tree-root">
        <ContentNode :opened-items="openedItems"
                     :nodes="[tree]"
                     :depth="0"
                     @setFilePrio="(fileIdx, prio) => setFilePriority(fileIdx, prio)" />
      </ul>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
ul.tree-root {
  font-size: medium;
  list-style-type: none;

  @for $i from 0 through 10 {
    .depth-#{$i} {
      padding-left: $i * 32px;
    }
  }

  li {
    margin-top: 8px;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      padding-bottom: 8px;
    }
  }
}
</style>
