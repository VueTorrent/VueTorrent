<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { getFileIcon } from '@/constants/vuetorrent'
import { doesCommand, formatData } from '@/helpers'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { TreeNode } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  node: TreeNode
  openedItems: string[]
}>()

const emit = defineEmits<{
  setFilePrio: [fileIdx: number[], prio: FilePriority]
  onRightClick: [e: MouseEvent | Touch, node: TreeNode]
}>()

const { t } = useI18n()
const contentStore = useContentStore()
const vuetorrentStore = useVueTorrentStore()

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

function getNodeDescription(node: TreeNode) {
  const [folderCount, fileCount] = node.getDeepCount()

  const res = []
  if (folderCount > 1) {
    res.push(t('torrentDetail.content.folderInfo', folderCount - 1))
  }
  if (fileCount > 0) {
    res.push(t('torrentDetail.content.fileInfo', fileCount))
  }

  return res.join(', ')
}

function getPriorityColor(node: TreeNode) {
  switch(node.getPriority()) {
    case FilePriority.DO_NOT_DOWNLOAD:
      return 'grey'
    case FilePriority.MIXED:
      return ''
    case FilePriority.NORMAL:
      return 'green'
    case FilePriority.HIGH:
      return 'warning'
    case FilePriority.MAXIMAL:
      return 'error'
  }
}

function getNodeSubtitle(node: TreeNode) {
  const values = []

  values.push(formatData(node.getSize(), vuetorrentStore.useBinarySize))
  if (node.type === 'folder') values.push(getNodeDescription(node))

  return values.join(' | ')
}
</script>

<template>
  <div :class="[`d-flex flex-column`, (node.isSelected(contentStore.internalSelection)) ? 'bg-grey-darken-3' : '']"
      :style="node.name !== '(root)' ? `padding-left: ${depth * 32}px` : ''"
      @click.stop="toggleInternalSelection($event, node)"
      @contextmenu="$emit('onRightClick', $event, node)">
    <div class="d-flex">
      <div class="d-flex align-center" @click.stop="toggleFileSelection(node)">
        <v-icon v-if="node.getPriority() === FilePriority.DO_NOT_DOWNLOAD" icon="mdi-checkbox-blank-outline" />
        <v-icon v-else-if="node.getPriority() === FilePriority.MIXED" icon="mdi-checkbox-intermediate-variant" />
        <v-icon v-else :color="getPriorityColor(node)" icon="mdi-checkbox-marked" />
      </div>

      <div class="d-flex align-center spacer" @click="openNode($event, node)">
        <template v-if="node.type === 'folder'">
          <v-icon>{{ openedItems.includes(node.fullName) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>

          <v-icon v-if="node.name === '(root)'" icon="mdi-file-tree" />
          <v-icon v-else-if="openedItems.includes(node.fullName)" icon="mdi-folder-open" color="#ffe476" />
          <v-icon v-else icon="mdi-folder" color="#ffe476" />
        </template>

        <v-icon v-else :icon="getFileIcon(node.name)" />
      </div>

      <div class="d-flex flex-column">
        <span :class="`text-${getPriorityColor(node)}`">{{ node.name }}</span>
        <span class="text-grey">
          {{ getNodeSubtitle(node) }}
        </span>
      </div>
    </div>

    <div>
      <v-progress-linear :model-value="node.getProgress()" :color="getPriorityColor(node)" max="1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.spacer {
  margin-left: 8px;
  margin-right: 16px;
}
</style>