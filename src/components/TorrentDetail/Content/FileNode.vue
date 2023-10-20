<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { getFileIcon } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { TreeFile } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'
import { formatData, formatPercent } from '@/helpers'

defineProps<{
  node: TreeFile
}>()
defineEmits<{
  renameFile: [node: TreeFile]
}>()

const { t } = useI18n()
const vuetorrentStore = useVueTorrentStore()

const filePriorityOptions = [
  { name: t('constants.file_priority.max'), icon: 'mdi-priority-high', value: FilePriority.MAXIMAL },
  { name: t('constants.file_priority.high'), icon: 'mdi-arrow-up', value: FilePriority.HIGH },
  { name: t('constants.file_priority.normal'), icon: 'mdi-arrow-down', value: FilePriority.NORMAL },
  { name: t('constants.file_priority.unwanted'), icon: 'mdi-priority-low', value: FilePriority.DO_NOT_DOWNLOAD }
]

function getNodePriority(node: TreeFile) {
  return filePriorityOptions.find(el => el.value === node.priority)?.name || ''
}
</script>

<template>
  <v-list-item :title="node.name" :value="node.index" :prepend-icon="getFileIcon(node)">
    <template v-slot:append>
      <span class="mr-2">[ {{ formatData(node.size, vuetorrentStore.useBinarySize) }} ]</span>
      <span class="mr-2">{{ formatPercent(node.progress) }}</span>
      <span class="mr-4">[ {{ getNodePriority(node) }} ]</span>
      <v-btn class="mr-2" color="accent" size="x-small" icon="mdi-trending-up" />
      <!-- TODO: prio menu -->
      <v-btn color="accent" size="x-small" icon="mdi-pencil" @click.stop="$emit('renameFile', node)" />
    </template>
  </v-list-item>
</template>

<style scoped></style>
