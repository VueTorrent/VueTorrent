<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { formatData, formatPercent } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { TreeFolder, TreeNode } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'

defineProps<{
  node: TreeFolder
  color: string
  openedItems: string[]
}>()

defineEmits<{
  toggleFileSelection: [node: TreeFolder]
  openNode: [e: Event, node: TreeFolder]
}>()

const { t } = useI18n()
const vuetorrentStore = useVueTorrentStore()

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

function getNodeSubtitle(node: TreeNode) {
  return [
    formatData(node.getSize(), vuetorrentStore.useBinarySize),
    getNodeDescription(node)
  ].join(' | ')
}

const filePrioOptions = [
  { title: t('constants.file_priority.max'), value: FilePriority.MAXIMAL },
  { title: t('constants.file_priority.high'), value: FilePriority.HIGH },
  { title: t('constants.file_priority.normal'), value: FilePriority.NORMAL },
  { title: t('constants.file_priority.unwanted'), value: FilePriority.DO_NOT_DOWNLOAD },
  { title: t('constants.file_priority.mixed'), value: FilePriority.MIXED }
]

function getPrioName(prio: FilePriority) {
  return filePrioOptions.find((o) => o.value === prio)?.title || 'unknown'
}
</script>

<template>
  <div class="d-flex">
    <div class="d-flex align-center" @click.stop="$emit('toggleFileSelection', node)">
      <v-icon v-if="node.getPriority() === FilePriority.DO_NOT_DOWNLOAD" icon="mdi-checkbox-blank-outline" />
      <v-icon v-else-if="node.getPriority() === FilePriority.MIXED" icon="mdi-checkbox-intermediate-variant" />
      <v-icon v-else :color="color" icon="mdi-checkbox-marked" />
    </div>

    <div class="d-flex align-center spacer" @click="$emit('openNode', $event, node)">
      <v-icon>{{ openedItems.includes(node.fullName) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>

      <v-icon v-if="node.name === '(root)'" icon="mdi-file-tree" />
      <v-icon v-else-if="openedItems.includes(node.fullName)" icon="mdi-folder-open" color="#ffe476" />
      <v-icon v-else icon="mdi-folder" color="#ffe476" />
    </div>

    <div class="d-flex flex-column">
      <span :class="`text-${color}`">{{ node.name }}</span>
      <span class="text-grey">
        {{ getNodeSubtitle(node) }}
      </span>
    </div>

    <v-spacer />

    <div class="d-flex align-center mr-3">
      [ {{ getPrioName(node.getPriority()) }} ]
    </div>

    <div class="d-flex align-center">
      <v-progress-linear :model-value="node.getProgress()" :max="1" :height="20" :color="color" rounded="sm" style="width: 7em">
        {{ formatPercent(node.getProgress()) }}
      </v-progress-linear>
    </div>
  </div>
</template>

<style scoped>
.spacer {
  margin-left: 8px;
  margin-right: 16px;
}
</style>