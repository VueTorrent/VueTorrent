<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { getFileIcon } from '@/constants/vuetorrent'
import { formatData } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { TreeFile } from '@/types/vuetorrent'

defineProps<{
  node: TreeFile
  color: string
}>()

defineEmits<{
  toggleFileSelection: [node: TreeFile]
}>()

const vuetorrentStore = useVueTorrentStore()
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

    <div class="d-flex align-center">
      <v-icon v-if="node.getPriority() === FilePriority.MAXIMAL">mdi-arrow-up</v-icon>
      <v-icon v-else-if="node.getPriority() === FilePriority.HIGH">mdi-arrow-top-right</v-icon>
      <v-icon v-else-if="node.getPriority() === FilePriority.NORMAL">mdi-minus</v-icon>
      <v-icon v-else-if="node.getPriority() === FilePriority.DO_NOT_DOWNLOAD">mdi-cancel</v-icon>
    </div>
  </div>
  <v-progress-linear :model-value="node.getProgress()" :max="1" :color="color" rounded="sm" />
</template>

<style scoped>
.spacer {
  padding-left: 8px;
  padding-right: 16px;
}
</style>