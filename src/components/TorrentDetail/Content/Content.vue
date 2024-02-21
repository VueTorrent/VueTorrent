<script setup lang="ts">
import { useContentStore } from '@/stores'
import { Torrent, TreeNode } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref } from 'vue'
import { useDisplay } from 'vuetify'
import ContentNode from './ContentNode.vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { height: deviceHeight } = useDisplay()
const contentStore = useContentStore()
const { rightClickProperties, openedItems, flatTree, internalSelection } = storeToRefs(contentStore)

const height = computed(() => {
  // 48px for the tabs and page title
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  return deviceHeight.value - 48 * 2 - 64 - 12 * 2
})

async function onRightClick(e: MouseEvent | Touch, node: TreeNode) {
  if (rightClickProperties.value.isVisible) {
    rightClickProperties.value.isVisible = false
    await nextTick()
  }

  Object.assign(rightClickProperties.value, {
    isVisible: true,
    offset: [e.pageX, e.pageY],
    hash: props.torrent.hash
  })

  if (internalSelection.value.size <= 1) {
    internalSelection.value = new Set([node.fullName])
  }
}

// mobile long press
const timer = ref<NodeJS.Timeout>()

function startPress(e: Touch, node: TreeNode) {
  console.log('startPress')
  timer.value = setTimeout(() => {
    console.log('triggered')
    onRightClick(e, node)
  }, 500)
}

function endPress() {
  console.log('endPress')
  clearTimeout(timer.value)
}
// END mobile long press
</script>

<template>
  <v-card>
    <v-virtual-scroll id="tree-root" :items="flatTree" :height="height" item-height="68" class="pa-2">
      <template #default="{ item }">
        <ContentNode
          :opened-items="openedItems"
          :node="item"
          @setFilePrio="(fileIdx, prio) => contentStore.setFilePriority(fileIdx, prio)"
          @touchcancel="endPress"
          @touchend="endPress"
          @touchmove="endPress"
          @touchstart="startPress($event.touches.item(0)!, item)"
          @onRightClick="(e, node) => onRightClick(e, node)"/>
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
