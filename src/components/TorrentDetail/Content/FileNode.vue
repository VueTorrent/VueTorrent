<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { getFileIcon } from '@/constants/vuetorrent'
import { formatData, formatPercent } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { TreeFile } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'

defineProps<{
  node: TreeFile
  color: string
}>()

defineEmits<{
  toggleFileSelection: [node: TreeFile]
}>()

const { t } = useI18n()
const vuetorrentStore = useVueTorrentStore()

const filePrioOptions = [
  { title: t('constants.file_priority.max'), value: FilePriority.MAXIMAL },
  { title: t('constants.file_priority.high'), value: FilePriority.HIGH },
  { title: t('constants.file_priority.normal'), value: FilePriority.NORMAL },
  { title: t('constants.file_priority.unwanted'), value: FilePriority.DO_NOT_DOWNLOAD }
]

function getPrioName(prio: FilePriority) {
  return filePrioOptions.find((o) => o.value === prio)?.title || 'unknown'
}
</script>

<template>
  <div class="d-flex">
    <div class="d-flex align-center" @click.stop="$emit('toggleFileSelection', node)">
      <v-icon v-if="node.getPriority() === FilePriority.DO_NOT_DOWNLOAD" icon="mdi-checkbox-blank-outline" />
      <v-icon v-else :color="color" icon="mdi-checkbox-marked" />
    </div>

    <div class="d-flex align-center spacer">
      <v-icon :icon="getFileIcon(node.name)" />
    </div>

    <div class="d-flex flex-column overflow-hidden text-no-wrap mr-3">
      <div :class="`text-${color}`">{{ node.name }}</div>
      <div class="text-grey">
        {{ formatData(node.getSize(), vuetorrentStore.useBinarySize) }}
      </div>
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
  padding-left: 8px;
  padding-right: 16px;
}
</style>