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
  mdiDownloadMultiple,
  mdiCog
} from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { capitalize } from '@/utils/textFormatting'

// props

const props = defineProps<{
  hash: string
  touchmode: boolean
  x: number
}>()

// data
const isRightside = ref(true)
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
    isRightside.value = document.documentElement.clientWidth < x + 380
  }
)
</script>

<template>
  <VList class="noselect">
    <VListItem link @click="resume">
      <VIcon :icon="mdiPlay" />
      <VListItemTitle class="ml-2">
        {{ capitalize($t('resume')) }}
      </VListItemTitle>
    </VListItem>
    <VListItem link @click="forceResume">
      <VIcon :icon="mdiFastForward" />
      <VListItemTitle class="ml-2">
        {{ capitalize($t('forceResume')) }}
      </VListItemTitle>
    </VListItem>
    <VListItem link @click="pause">
      <VIcon :icon="mdiPause" />
      <VListItemTitle class="ml-2">
        {{ capitalize($t('pause')) }}
      </VListItemTitle>
    </VListItem>

    <VDivider />
    <VListItem link @click="removeTorrent">
      <VIcon color="red" :icon="mdiDelete" />
      <VListItemTitle class="ml-2 text-red">
        {{ capitalize($t('delete')) }}
      </VListItemTitle>
    </VListItem>
    <VDivider />
    <VMenu
      :openOnHover="!touchmode"
      top
      :offset="x"
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem link v-bind="props">
          <VIcon :icon="mdiHeadCog" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.advanced')) }}
          </VListItemTitle>
          <VListItemAction>
            <VIcon :icon="mdiChevronRight" />
          </VListItemAction>
        </VListItem>
      </template>
      <VList>
        <VListItem link @click="location">
          <VIcon :icon="mdiFolder" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.changeLocation')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="!multiple" link @click="rename">
          <VIcon :icon="mdiRenameBox" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.rename')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem link @click="recheck">
          <VIcon :icon="mdiPlaylistCheck" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.forceRecheck')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem link @click="reannounce">
          <VIcon :icon="mdiBullhorn" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.forceReannounce')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="!multiple" link @click="toggleSeq">
          <VIcon :icon="torrent.seq_dl ? mdiCheckboxMarked : mdiCheckboxBlankOutline" />
          <VListItemTitle class="ml2">
            {{ capitalize($t('rightClick.advanced.sequentialDownload')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="!multiple" link @click="toggleFL">
          <VIcon :icon="torrent.f_l_piece_prio ? mdiCheckboxMarked : mdiCheckboxBlankOutline" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.firstLastPriority')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="!multiple" link @click="toggleAutoTMM">
          <VIcon :icon="torrent.auto_tmm ? mdiCheckboxMarked : mdiCheckboxBlankOutline" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.advanced.automaticTorrentManagement')) }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="props">
        <VListItem link v-bind="props">
          <VIcon :icon="mdiPriorityLow" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.prio.prio')) }}
          </VListItemTitle>
          <VListItemAction>
            <VIcon :icon="mdiChevronRight" />
          </VListItemAction>
        </VListItem>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in priorityOptions"
          :key="index"
          link
          @click="setPriority(item.action)"
        >
          <VIcon :icon="item.icon" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.prio.' + item.name)) }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem link v-bind="props">
          <VIcon :icon="mdiPriorityHigh" />
          <VListItemTitle class="ml-2">
            {{ capitalize($t('rightClick.queue.queue')) }}
          </VListItemTitle>
        </VListItem>
      </template>
    </VMenu>
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
