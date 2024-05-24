<script setup lang="ts">
import { getFileIcon } from '@/constants/vuetorrent'
import { useI18n } from 'vue-i18n'
import { FilePriority } from '@/constants/qbit'
import { doesCommand, formatData } from '@/helpers'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { TreeNode } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps<{
  node: TreeNode
  openedItems: string[]
}>()

const emit = defineEmits<{
  setFilePrio: [fileIdx: number[], prio: FilePriority]
  onRightClick: [e: MouseEvent | Touch, node: TreeNode]
}>()

const folderColor = '#ffe476'

const { t } = useI18n()
const { mobile } = useDisplay()
const contentStore = useContentStore()
const vuetorrentStore = useVueTorrentStore()

const depth = computed(() => {
  if (props.node.fullName === '') return 0

  const effectiveDepth = props.node.fullName.split('/').length
  const depthStep = mobile.value ? 12 : 24
  return effectiveDepth * depthStep
})

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
  if (node.priority === FilePriority.DO_NOT_DOWNLOAD) {
    emit('setFilePrio', node.childrenIds, FilePriority.NORMAL)
  } else {
    emit('setFilePrio', node.childrenIds, FilePriority.DO_NOT_DOWNLOAD)
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
  if (node.priority === FilePriority.DO_NOT_DOWNLOAD) {
    return 'grey'
  }

  const progress = node.progress
  return progress === 1 ? 'green' : ''
}

function getNodeDeepCount(node: TreeNode) {
  const [folderCount, fileCount] = node.deepCount

  const res = []
  if (folderCount > 1) {
    res.push(t('torrentDetail.content.folderInfo', folderCount - 1))
  }
  if (fileCount > 0) {
    res.push(t('torrentDetail.content.fileInfo', fileCount))
  }

  return res.join(', ')
}

function getNodeSubtitle(node: TreeNode) {
  const values = [formatData(node.size, vuetorrentStore.useBinarySize)]

  if (node.type === 'folder') {
    values.push(getNodeDeepCount(node))
  }

  return values.join(' | ')
}
</script>

<template>
  <div
    :class="['d-flex flex-column py-2 pr-3', node.isSelected(contentStore.internalSelection) ? 'selected' : '']"
    :style="`padding-left: ${depth}px`"
    @click.stop="toggleInternalSelection($event, node)"
    @contextmenu="$emit('onRightClick', $event, node)">
    <div class="d-flex">
      <!-- Selection checkbox -->
      <div class="d-flex align-center" @click.stop="toggleFileSelection(node)">
        <v-icon v-if="node.wanted === null" :color="getNodeColor(node)" icon="mdi-checkbox-intermediate-variant" />
        <v-icon v-else-if="node.wanted" :color="getNodeColor(node)" icon="mdi-checkbox-marked" />
        <v-icon v-else :color="getNodeColor(node)" icon="mdi-checkbox-blank-outline" />
      </div>

      <!-- Node icon -->
      <div class="d-flex align-center spacer" @click="openNode($event, node)">
        <v-icon v-if="node.type === 'folder'">{{ openedItems.includes(node.fullName) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>

        <v-icon v-if="node.fullName === ''" icon="mdi-file-tree" />
        <v-icon v-else-if="node.type === 'file'" :icon="getFileIcon(node.name)" />
        <v-icon v-else-if="openedItems.includes(node.fullName)" icon="mdi-folder-open" :color="folderColor" />
        <v-icon v-else icon="mdi-folder" :color="folderColor" />
      </div>

      <!-- Node content -->
      <div class="d-flex flex-column overflow-hidden text-no-wrap mr-3">
        <div :class="`text-${getNodeColor(node)}`">{{ node.name }}</div>
        <div class="text-grey">
          {{ getNodeSubtitle(node) }}
        </div>
      </div>

      <v-spacer />

      <!-- Priority icon -->
      <div class="d-flex align-center">
        <v-icon v-if="node.priority === FilePriority.MAXIMAL" color="error">mdi-arrow-up</v-icon>
        <v-icon v-else-if="node.priority === FilePriority.HIGH" color="warning">mdi-arrow-top-right</v-icon>
        <v-icon v-else-if="node.priority === FilePriority.NORMAL">mdi-minus</v-icon>
        <v-icon v-else-if="node.priority === FilePriority.MIXED">mdi-tilde</v-icon>
        <v-icon v-else-if="node.priority === FilePriority.DO_NOT_DOWNLOAD" color="grey">mdi-cancel</v-icon>
      </div>
    </div>
    <v-progress-linear :model-value="node.progress" :max="1" :color="getNodeColor(node)" rounded="sm" />
  </div>
</template>

<style scoped lang="scss">
.spacer {
  margin-left: 8px;
  margin-right: 16px;
}

.v-theme--darkTheme .selected {
  background-color: rgb(var(--v-theme-surface));
  filter: brightness(135%);
}

.v-theme--lightTheme .selected {
  background-color: rgb(var(--v-theme-surface));
  filter: brightness(75%);
}
</style>
