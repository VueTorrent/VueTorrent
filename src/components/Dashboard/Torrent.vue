<script setup lang="ts">
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import { useDashboardStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'
import ItemAmount from './DashboardItems/ItemAmount.vue'
import ItemChip from './DashboardItems/ItemChip.vue'
import ItemData from './DashboardItems/ItemData.vue'
import ItemDateTime from './DashboardItems/ItemDateTime.vue'
import ItemDuration from './DashboardItems/ItemDuration.vue'
import ItemPercent from './DashboardItems/ItemPercent.vue'
import ItemRelativeTime from './DashboardItems/ItemRelativeTime.vue'
import ItemSpeed from './DashboardItems/ItemSpeed.vue'
import ItemText from './DashboardItems/ItemText.vue'

const props = defineProps<{ torrent: Torrent }>()

const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => {
  let ppts = props.torrent.progress === 1 ? vuetorrentStore.doneTorrentProperties : vuetorrentStore.busyTorrentProperties

  return ppts.filter(ppt => ppt.active).sort((a, b) => a.order - b.order)
})

function onClick(e: MouseEvent) {
  if (e.shiftKey) {
    dashboardStore.spanTorrentSelection(props.torrent.hash)
  } else if (doesCommand(e) || dashboardStore.isSelectionMultiple) {
    dashboardStore.isSelectionMultiple = true
    dashboardStore.toggleSelect(props.torrent.hash)
  }
}

const getComponent = (type: DashboardPropertyType) => {
  switch (type) {
    case DashboardPropertyType.AMOUNT:
      return ItemAmount
    case DashboardPropertyType.CHIP:
      return ItemChip
    case DashboardPropertyType.DATA:
      return ItemData
    case DashboardPropertyType.DATETIME:
      return ItemDateTime
    case DashboardPropertyType.DURATION:
      return ItemDuration
    case DashboardPropertyType.PERCENT:
      return ItemPercent
    case DashboardPropertyType.RELATIVE:
      return ItemRelativeTime
    case DashboardPropertyType.SPEED:
      return ItemSpeed
    case DashboardPropertyType.TEXT:
    default:
      return ItemText
  }
}
const isTorrentSelected = computed(() => dashboardStore.isTorrentInSelection(props.torrent.hash))
</script>

<template>
  <v-card :class="`sideborder ${torrent.state} pointer`" :color="isTorrentSelected ? `torrent-${torrent.state}-darken-3` : undefined" width="100%" @click="onClick">
    <v-card-title class="text-wrap text-subtitle-1 pt-1 pb-0">{{ torrent.name }}</v-card-title>
    <v-card-text class="pa-2 pt-0">
      <div class="d-flex gap flex-wrap">
        <component :is="getComponent(ppt.type)" :torrent="torrent" v-bind="ppt.props" v-for="ppt in torrentProperties" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.gap {
  gap: 8px 16px;
}
</style>
