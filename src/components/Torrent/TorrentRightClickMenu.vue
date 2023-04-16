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
import {
  deleteTorrents,
  forceStartTorrents,
  resumeTorrents,
  pauseTorrents,
  setAutoTMM,
  setDownloadLimit,
  setUploadLimit,
  toggleFirstLastPiecePriority,
  toggleSequentialDownload,
  toggleSpeedLimitsMode
} from '@/composables/api/actions'

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
  <VList class="noselect" maxWidth="300">
    <VListItem link @click="resumeTorrents" :prependIcon="mdiPlay">
      <VListItemTitle class="ml-2 list-item__title">
        {{ capitalize($t('resume')) }}
      </VListItemTitle>
    </VListItem>
    <VListItem link @click="forceStartTorrents" :prependIcon="mdiFastForward">
      <VListItemTitle class="ml-2 list-item__title">
        {{ capitalize($t('rightClick.forceResume')) }}
      </VListItemTitle>
    </VListItem>
    <VListItem link @click="pauseTorrents" :prependIcon="mdiPause">
      <VListItemTitle class="ml-2 list-item__title">
        {{ capitalize($t('pause')) }}
      </VListItemTitle>
    </VListItem>

    <VDivider />
    <VListItem link @click="deleteTorrents">
      <template #prepend>
        <VIcon :icon="mdiDelete" color="red" />
      </template>
      <VListItemTitle class="ml-2 text-red list-item__title">
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
        <VListItem link v-bind="props" :prependIcon="mdiHeadCog" :appendIcon="mdiChevronRight">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.advanced')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem link @click="location" :prependIcon="mdiFolder">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.changeLocation')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="!multiple" link @click="rename" :prependIcon="mdiRenameBox">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.rename')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem link @click="recheck" :prependIcon="mdiPlaylistCheck">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.forceRecheck')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem link @click="reannounce" :prependIcon="mdiBullhorn">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.forceReannounce')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem
          v-if="!multiple"
          link
          @click="toggleSeq"
          :prependIcon="torrent.seq_dl ? mdiCheckboxMarked : mdiCheckboxBlankOutline"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.sequentialDownload')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem
          v-if="!multiple"
          link
          @click="toggleFL"
          :prependIcon="torrent.f_l_piece_prio ? mdiCheckboxMarked : mdiCheckboxBlankOutline"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.advanced.firstLastPriority')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem
          v-if="!multiple"
          link
          @click="toggleAutoTMM"
          :prependIcon="torrent.auto_tmm ? mdiCheckboxMarked : mdiCheckboxBlankOutline"
        >
          <VListItemTitle class="ml-2 list-item__title">
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
      <template #activator="{ props }">
        <VListItem link v-bind="props" :prependIcon="mdiPriorityHigh" :appendIcon="mdiChevronRight">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.prio.prio')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in priorityOptions"
          :key="index"
          link
          @click="setPriority(item.action)"
          :prependIcon="item.icon"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.prio.' + item.name)) }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      v-if="availableTags.length > 0"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem link v-bind="props" :prependIcon="mdiTag" :appendIcon="mdiChevronRight">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.tags')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem
          v-for="(tag, index) in availableTags"
          :key="index"
          link
          @click="setTag(tag)"
          :prependIcon="torrent.tags.includes(tag) ? mdiTag : mdiTagOutline"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ tag }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      v-if="availableCategories.length > 1"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem link v-bind="props" :prependIcon="mdiLabel" :appendIcon="mdiChevronRight">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.category')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem
          v-for="(category, index) in availableCategories"
          :key="index"
          link
          @click="setCategory(category)"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ category }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      v-if="!multiple"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem
          link
          v-bind="props"
          :prependIcon="mdiSpeedometerSlow"
          :appendIcon="mdiChevronRight"
        >
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.limit')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem @click="setLimit('download')" :prependIcon="mdiChevronDown">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('download')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem @click="setLimit('upload')" :prependIcon="mdiChevronUp">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('upload')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem @click="setShareLimit()" :prependIcon="mdiAccountGroup">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('share')) }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VMenu
      v-if="!multiple"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ props }">
        <VListItem link v-bind="props" :prependIcon="mdiContentCopy" :appendIcon="mdiChevronRight">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('rightClick.copy')) }}
          </VListItemTitle>
        </VListItem>
      </template>
      <VList>
        <VListItem @click="copyToClipboard(torrent.name)" :prependIcon="mdiContentCopy">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('name')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem @click="copyToClipboard(torrent.hash)" :prependIcon="mdiContentCopy">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('hash')) }}
          </VListItemTitle>
        </VListItem>
        <VListItem @click="copyToClipboard(torrent.magnet)" :prependIcon="mdiMagnet">
          <VListItemTitle class="ml-2 list-item__title">
            {{ capitalize($t('magnet')) }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VListItem
      link
      @click="exportTorrents"
      :prependIcon="multiple ? mdiDownloadMultiple : mdiDownload"
    >
      <VListItemTitle class="ml-2 list-item__title">
        {{ capitalize($t('rightClick.export', multiple ? 2 : 1)) }}
      </VListItemTitle>
    </VListItem>
    <v-divider v-if="!multiple" />
    <VListItem v-if="!multiple" link @click="showInfo" :prependIcon="mdiInformation">
      <VListItemTitle class="ml-2 list-item__title">
        {{ capitalize($t('rightClick.info')) }}
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
