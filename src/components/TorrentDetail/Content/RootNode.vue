<script setup lang="ts">
import FolderNode from './FolderNode.vue'
import { TreeFile, TreeFolder, TreeRoot } from '@/types/vuetorrent'

defineProps<{
  root: TreeRoot
}>()
defineEmits<{
  renameFolder: [node: TreeFolder],
  renameFile: [node: TreeFile]
}>()
</script>

<template>
  <v-list density="compact" select-strategy="classic">
    <FolderNode :node="root" @renameFolder="n => $emit('renameFolder', n)" @renameFile="n => $emit('renameFile', n)" />
  </v-list>
</template>

<style scoped>

</style>