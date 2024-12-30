<script setup lang="ts">
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'
import { Torrent as TorrentType } from '@/types/vuetorrent'
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

defineProps<{ torrent: TorrentType }>()

const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => vuetorrentStore.tableProperties.filter(ppt => ppt.active).sort((a, b) => a.order - b.order))

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
</script>

<template>
  <template v-for="ppt in torrentProperties">
    <component v-if="ppt.props" :is="getComponent(ppt.type)" :torrent="torrent" v-bind="ppt.props" :class="`torrent-${ppt.name}`" />
  </template>
</template>
