<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { getFileIcon } from '@/constants/vuetorrent'
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { TreeNode } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  nodes: TreeNode[]
  openedItems: string[]
  depth: number
}>()

const emit = defineEmits<{
  setFilePrio: [fileIdx: number[], prio: FilePriority]
  onRightClick: [e: MouseEvent | Touch, node: TreeNode]
}>()

const { t } = useI18n()
const vuetorrentStore = useVueTorrentStore()

function openNode(node: TreeNode) {
  if (node.type === 'file') return

  const index = props.openedItems.indexOf(node.fullName)
  if (index === -1) {
    props.openedItems.push(node.fullName)
  } else {
    props.openedItems.splice(index, 1)
  }
}

async function toggleSelection(node: TreeNode) {
  if (node.getPriority() === FilePriority.DO_NOT_DOWNLOAD) {
    emit('setFilePrio', node.getChildrenIds(), FilePriority.NORMAL)
  } else {
    emit('setFilePrio', node.getChildrenIds(), FilePriority.DO_NOT_DOWNLOAD)
  }
}

function getNodeDescription(node: TreeNode) {
  const [folderCount, fileCount] = node.getDeepCount()

  const res = []
  if (fileCount > 0) {
    res.push(t('torrentDetail.content.fileInfo', fileCount))
  }
  if (folderCount > 0) {
    res.push(t('torrentDetail.content.folderInfo', folderCount))
  }

  return res.join(', ')
}

function getNodeSubtitle(node: TreeNode) {
  const values = []

  values.push(formatData(node.getSize(), vuetorrentStore.useBinarySize))
  if (node.type === 'folder') values.push(getNodeDescription(node))

  return values.join(' | ')
}
</script>

<template>
  <template v-for="node in nodes">
    <li :class="`d-flex flex-column depth-${depth}`" @click.stop="openNode(node)" @contextmenu="$emit('onRightClick', $event, node)">
      <div class="d-flex">
        <div class="d-flex align-center" @click.stop="toggleSelection(node)">
          <v-icon v-if="node.getPriority() === FilePriority.DO_NOT_DOWNLOAD" icon="mdi-checkbox-blank-outline" />
          <v-icon v-else-if="node.getPriority() === FilePriority.MIXED" icon="mdi-checkbox-intermediate-variant" />
          <v-icon v-else icon="mdi-checkbox-marked" />
        </div>

        <div class="d-flex align-center spacer">
          <template v-if="node.type === 'folder'">
            <v-icon v-if="node.name === '(root)'" icon="mdi-file-tree" />
            <v-icon v-else-if="openedItems.includes(node.fullName)" icon="mdi-folder-open" color="#ffe476" />
            <v-icon v-else icon="mdi-folder" color="#ffe476" />
          </template>
          <v-icon v-else :icon="getFileIcon(node.name)" />
        </div>

        <div class="d-flex flex-column">
          <span>{{ node.name }}</span>
          <span class="text-grey">
            {{ getNodeSubtitle(node) }}
          </span>
        </div>
      </div>

      <div>
        <v-progress-linear :model-value="node.getProgress()" max="1" />
      </div>
    </li>
    <ContentNode v-if="node.type === 'folder' && openedItems.includes(node.fullName)"
                 :opened-items="openedItems"
                 :nodes="node.children"
                 :depth="depth+1"
                 @setFilePrio="(fileIdx, prio) => $emit('setFilePrio', fileIdx, prio)"
                 @onRightClick="($e, $node) => $emit('onRightClick', $e, $node)" />
  </template>
</template>

<style scoped lang="scss">
.spacer {
  margin-left: 8px;
  margin-right: 16px;
}
</style>