<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import FolderNode from './FolderNode.vue'
import { TreeFile, TreeFolder, TreeRoot } from '@/types/vuetorrent'

defineProps<{
  root: TreeRoot
}>()
defineEmits<{
  renameFolder: [node: TreeFolder]
  renameFile: [node: TreeFile]
  setFilePriority: [node: TreeFile, priority: FilePriority]
}>()
</script>

<template>
  <v-list density="compact" select-strategy="classic">
    <FolderNode
      :node="root"
      @renameFolder="n => $emit('renameFolder', n)"
      @renameFile="n => $emit('renameFile', n)"
      @setFilePriority="(n, prio) => $emit('setFilePriority', n, prio)" />
  </v-list>
</template>

<style scoped></style>
