<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { doesCommand } from '@/helpers'
import { useContentStore } from '@/stores'
import { TreeNode } from '@/types/vuetorrent'
import { computed } from 'vue'
import FileNode from './FileNode.vue'
import FolderNode from './FolderNode.vue'

const props = defineProps<{
  node: TreeNode
  openedItems: string[]
}>()

const emit = defineEmits<{
  setFilePrio: [fileIdx: number[], prio: FilePriority]
  onRightClick: [e: MouseEvent | Touch, node: TreeNode]
}>()

const contentStore = useContentStore()

const depth = computed(() => props.node.fullName.split('/').length)

function openNode(e: Event, node: TreeNode) {
  if (node.type === 'file') return
  e.stopPropagation()

  const index = props.openedItems.indexOf(node.fullName)
  if (index === -1) {
    props.openedItems.push(node.fullName)
  } else {
    props.openedItems.splice(index, 1)
  }
}

async function toggleFileSelection(node: TreeNode) {
  if (node.getPriority() === FilePriority.DO_NOT_DOWNLOAD) {
    emit('setFilePrio', node.getChildrenIds(), FilePriority.NORMAL)
  } else {
    emit('setFilePrio', node.getChildrenIds(), FilePriority.DO_NOT_DOWNLOAD)
  }
}

function toggleInternalSelection(e: { metaKey: boolean; ctrlKey: boolean }, node: TreeNode) {
  if (doesCommand(e)) {
    if (contentStore.internalSelection.has(node.fullName)) {
      contentStore.internalSelection.delete(node.fullName)
    } else {
      contentStore.internalSelection.add(node.fullName)
    }
  } else {
    contentStore.internalSelection = new Set([node.fullName])
  }
}

function getNodeColor(node: TreeNode) {
  if (node.getPriority() === FilePriority.DO_NOT_DOWNLOAD) {
    return 'grey'
  }

  const progress = node.getProgress()
  return progress === 1 ? 'cyan' : 'green'
}
</script>

<template>
  <div :class="[`d-flex flex-column`, (node.isSelected(contentStore.internalSelection)) ? 'bg-grey-darken-3' : '']"
       :style="node.name !== '(root)' ? `padding-left: ${depth * 32}px` : ''"
       @click.stop="toggleInternalSelection($event, node)"
       @contextmenu="$emit('onRightClick', $event, node)">
    <FileNode v-if="node.type === 'file'"
              :node="node"
              :color="getNodeColor(node)"
              @toggleFileSelection="toggleFileSelection" />
    <FolderNode v-else
                :node="node"
                :opened-items="openedItems"
                :color="getNodeColor(node)"
                @toggleFileSelection="toggleFileSelection"
                @openNode="openNode" />
  </div>
</template>

<style scoped lang="scss">
.spacer {
  margin-left: 8px;
  margin-right: 16px;
}
</style>
