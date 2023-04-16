<script setup lang="ts">
import { useAvailableTags } from '@/composables/api/torrents'
import { useCategories } from '@/composables/api/torrents'
import {
  mdiAccountGroup,
  mdiArrowDown,
  mdiArrowUp,
  mdiBullhorn,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiChevronDown,
  mdiChevronRight,
  mdiChevronUp,
  mdiContentCopy,
  mdiDelete,
  mdiFastForward,
  mdiFolder,
  mdiHeadCog,
  mdiInformation,
  mdiLabel,
  mdiLabelOff,
  mdiMagnet,
  mdiPause,
  mdiPlay,
  mdiPlaylistCheck,
  mdiPriorityHigh,
  mdiPriorityLow,
  mdiRenameBox,
  mdiSelect,
  mdiSpeedometerSlow,
  mdiTag,
  mdiTagOff,
  mdiDownload,
  mdiDownloadMultiple
} from '@mdi/js'
import { computed, ref, watch } from 'vue'

// props

const props = defineProps<{
  hash: string
  touchmode: boolean
  x: number
}>()

// data
const isRightSide = ref(true)
const priorityOptions = [
  { name: 'top', icon: mdiPriorityHigh, action: 'topPrio' },
  { name: 'increase', icon: mdiArrowUp, action: 'increasePrio' },
  { name: 'decrease', icon: mdiArrowDown, action: 'decreasePrio' },
  { name: 'bottom', icon: mdiPriorityLow, action: 'bottomPrio' }
]

// computed

// methods
const availableCategories = () => {
  const categories = [{ name: 'None', value: '' }]
  useCategories().then((c) => {
    c.data.value?.map((c) => {
      categories.push({ name: c.name, value: c.savePath })
    })
  })

  return categories
}

const availableTags = () => {
  return useAvailableTags().then((t) => {
    return t
  })
}

// watch
watch(
  () => props.x,
  (x) => {
    isRightSide.value = document.documentElement.clientWidth < x + 380
  }
)
</script>

<template>
  <VList class="noselect">
    <VListItem link @click="resume">
      <VIcon :icon="mdiPlay" />
      <VListItemTitle class="ml-2">
        {{ capitalize($t('rightClick.resume')) }}
      </VListItemTitle>
    </VListItem>
    <VListItem link @click="forceResume">
      <VIcon :icon="mdiFastForward" />
      <VListItemTitle class="ml-2">
        {{ capitalize($t('rightClick.forceResume')) }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

<style scoped lang="scss">
.list-item {
  &__title {
    font-size: 1em;
  }
}

.v-menu__content {
  max-height: 720px;
  overflow-y: auto !important;
}
</style>
