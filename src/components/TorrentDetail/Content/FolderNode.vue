<script setup lang="ts">
import { FilePriority } from '@/constants/qbit'
import { TreeFile, TreeFolder, TreeRoot } from '@/types/vuetorrent'
import { useI18n } from 'vue-i18n'
import FileNode from './FileNode.vue'

defineProps<{
  node: TreeRoot | TreeFolder
}>()
defineEmits<{
  renameFolder: [node: TreeFolder]
  renameFile: [node: TreeFile]
  setFilePriority: [node: TreeFile, priority: FilePriority]
}>()

const { t } = useI18n()

function getNodeDescription(node: TreeRoot | TreeFolder) {
  let fileCount = 0
  let folderCount = 0
  for (const child of node.children) {
    if (child.type === 'file') {
      fileCount++
    } else if (child.type === 'folder') {
      folderCount++
    }
  }

  const res = []
  if (fileCount > 0) {
    res.push(t('torrentDetail.content.fileInfo', fileCount))
  }
  if (folderCount > 0) {
    res.push(t('torrentDetail.content.folderInfo', folderCount))
  }

  return res.join(', ')
}
</script>

<template>
  <v-list-group :value="node.type === 'root' ? '(root)' : node.fullName">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="node.type === 'root' ? 'mdi-file-tree' : 'mdi-folder'"
        :title="node.type === 'root' ? $t('torrentDetail.content.rootNode') : node.name"
        :value="node.type === 'root' ? '(root)' : node.fullName">
        <template v-slot:append="{ isActive }">
          <span class="mr-2">{{ getNodeDescription(node) }}</span>
          <v-btn v-if="node.type === 'folder'" color="accent" size="x-small" icon="mdi-pencil" @click.stop="$emit('renameFolder', node)" />
          <v-icon :icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
        </template>
      </v-list-item>
    </template>

    <template v-for="child in node.children">
      <FolderNode
        v-if="child.type === 'folder'"
        :node="child as TreeFolder"
        @renameFolder="n => $emit('renameFolder', n)"
        @renameFile="n => $emit('renameFile', n)"
        @setFilePriority="(n, prio) => $emit('setFilePriority', n, prio)" />
      <FileNode
        v-if="child.type === 'file'"
        :node="child as TreeFile"
        @renameFile="n => $emit('renameFile', n)"
        @setFilePriority="(n, prio) => $emit('setFilePriority', n, prio)" />
    </template>
  </v-list-group>
</template>

<style scoped></style>
