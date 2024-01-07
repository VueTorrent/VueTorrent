<script setup lang="ts">
import { useContentStore } from '@/stores'
import { Torrent, TreeNode } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import ContentNode from './ContentNode.vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const contentStore = useContentStore()
const { trcProperties, tree } = storeToRefs(contentStore)

const flatTree = computed(() => {
  const flatten = (node: TreeNode, parentPath: string): TreeNode[] => {
    const path = parentPath === '' ? node.name : parentPath + '/' + node.name

    if (node.type === 'file') {
      return [node]
    } else if (openedItems.value.includes(node.fullName)) {
      const children = node.children.flatMap(el => flatten(el, path))
      return [node, ...children]
    } else {
      return [node]
    }
  }

  return flatten(tree.value, '')
})

const openedItems = ref(['(root)'])

async function onRightClick(e: MouseEvent | Touch, node: TreeNode) {
  if (trcProperties.value.isVisible) {
    trcProperties.value.isVisible = false
    await nextTick()
  }

  Object.assign(trcProperties.value, {
    isVisible: true,
    offset: [e.pageX, e.pageY],
    hash: props.torrent.hash,
    target: node
  })

  if (contentStore.internalSelection.size <= 1) {
    contentStore.internalSelection = new Set([node.fullName])
  }
}

watch(
  () => trcProperties.value.isVisible,
  newValue => {
    if (!newValue) {
      trcProperties.value.target = null
    }
  }
)

watch(
  () => props.isActive,
  newValue => {
    if (newValue) {
      contentStore.resumeTimer()
      contentStore.updateFileTree()
    } else {
      contentStore.pauseTimer()
    }
  }
)

onMounted(() => {
  contentStore.internalSelection.clear()
  trcProperties.value.hash = props.torrent.hash
  contentStore.resumeTimer()
})
onUnmounted(() => contentStore.$reset())
</script>

<template>
  <v-card>
    <v-virtual-scroll id="tree-root" :items="flatTree" height="750" class="pa-2">
      <template #default="{ item }">
        <ContentNode :opened-items="openedItems"
                     :node="item"
                     @setFilePrio="(fileIdx, prio) => contentStore.setFilePriority(fileIdx, prio)"
                     @onRightClick="(e, node) => onRightClick(e, node)" />
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<style lang="scss">
#_tree-root {
  font-size: medium;
  list-style-type: none;

  div.v-virtual-scroll__item {
    padding-top: 8px;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 8px;
    }
  }
}
</style>
