<script setup lang="ts">
import { useContentStore } from '@/stores'
import { Torrent, TreeNode } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watch } from 'vue'
import ContentNode from './ContentNode.vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const contentStore = useContentStore()
const { trcProperties, tree } = storeToRefs(contentStore)

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
</script>

<template>
  <v-card>
    <v-card-text>
      <ul class="tree-root">
        <ContentNode :opened-items="openedItems"
                     :nodes="[tree]"
                     :depth="0"
                     @setFilePrio="(fileIdx, prio) => contentStore.setFilePriority(fileIdx, prio)"
                     @onRightClick="(e, node) => onRightClick(e, node)" />
      </ul>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
ul.tree-root {
  font-size: medium;
  list-style-type: none;

  @for $i from 0 through 10 {
    .depth-#{$i} {
      padding-left: $i * 32px;
    }
  }

  li {
    margin-top: 8px;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      padding-bottom: 8px;
    }
  }
}
</style>
