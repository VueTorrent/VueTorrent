<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { VVirtualScroll } from 'vuetify/components/VVirtualScroll'
import ContentNode from './ContentNode.vue'
import ContentFilterDialog from '@/components/Dialogs/ContentFilterDialog.vue'
import { useContentStore, useDialogStore } from '@/stores'
import { Torrent, TreeNode } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { height: deviceHeight } = useDisplay()
const contentStore = useContentStore()
const { rightClickProperties, filenameFilter, flatTree, internalSelection, selectedNodes, lastSelected, timerForcedPause, isTimerActive } = storeToRefs(contentStore)
const dialogStore = useDialogStore()

const scrollView = ref<VVirtualScroll>()

const height = computed(() => {
  // 48px for the tabs and page title
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  // 56px for the filter text field
  // 8px for its top margin
  return deviceHeight.value - 48 * 2 - 64 - 12 * 2 - 56 - 8
})

async function onRightClick(e: MouseEvent | Touch, node: TreeNode) {
  if (rightClickProperties.value.isVisible) {
    rightClickProperties.value.isVisible = false
    await nextTick()
  }

  Object.assign(rightClickProperties.value, {
    isVisible: true,
    offset: [e.pageX, e.pageY],
    hash: props.torrent.hash,
  })

  if (internalSelection.value.size <= 1) {
    internalSelection.value = new Set([node.fullName])
    lastSelected.value = node.fullName
  }
}

watch(
  () => props.isActive,
  isActive => {
    if (isActive && !timerForcedPause.value) contentStore.resumeTimer()
    else contentStore.pauseTimer()
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})
onBeforeUnmount(() => {
  contentStore.$reset()
  document.removeEventListener('keydown', handleKeyboardInput)
})

function pause() {
  timerForcedPause.value = true
  contentStore.pauseTimer()
}

function resume() {
  timerForcedPause.value = false
  contentStore.resumeTimer()
}

function openFilterDialog() {
  dialogStore.createDialog(ContentFilterDialog)
}

function handleKeyboardInput(e: KeyboardEvent) {
  enum KeyNames {
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Spacebar = ' ',
  }

  const pressedKey = e.key as KeyNames
  if (dialogStore.hasActiveDialog || !Object.values(KeyNames).includes(pressedKey)) {
    return false
  }

  e.preventDefault()
  const oldCursor = flatTree.value.findIndex(node => node.fullName === lastSelected.value)
  let newCursor = oldCursor

  switch (pressedKey) {
    case KeyNames.ArrowUp:
      if (oldCursor > 0) {
        newCursor--
      }
      break
    case KeyNames.ArrowDown:
      if (oldCursor < flatTree.value.length - 1) {
        newCursor++
      }
      break
    case KeyNames.ArrowLeft:
      contentStore.closeNode(e, flatTree.value[oldCursor])
      newCursor = flatTree.value.findIndex(node => node.fullName === lastSelected.value)
      break
    case KeyNames.ArrowRight:
      contentStore.openNode(e, flatTree.value[oldCursor])
      break
    case KeyNames.Spacebar:
      void contentStore.toggleFileSelection(...selectedNodes.value)
      break
  }

  if (oldCursor !== newCursor) {
    lastSelected.value = flatTree.value[newCursor].fullName
    internalSelection.value = new Set([lastSelected.value])
    scrollView.value?.scrollToIndex(Math.max(0, newCursor - Math.floor(height.value / 68 / 2)))
  }

  return true
}
</script>

<template>
  <v-card>
    <div class="mt-2 mx-3 d-flex flex-gap align-center">
      <v-text-field v-model="filenameFilter" hide-details clearable :placeholder="$t('torrentDetail.content.filter_placeholder')" @keydown.stop />

      <v-tooltip :text="$t('torrentDetail.content.filter.activator')" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="tooltipProps" icon="mdi-select-multiple" color="primary" @click="openFilterDialog" />
        </template>
      </v-tooltip>

      <v-tooltip :text="isTimerActive ? $t('common.pause') : $t('common.resume')" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="tooltipProps" :icon="isTimerActive ? 'mdi-timer-pause' : 'mdi-timer-play'" color="primary" @click="isTimerActive ? pause() : resume()" />
        </template>
      </v-tooltip>
    </div>

    <v-virtual-scroll ref="scrollView" :items="flatTree" :height="height" item-height="68" class="pa-2">
      <template #default="{ item }">
        <ContentNode :node="item" @on-right-click="(e, node) => onRightClick(e, node)" />
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
