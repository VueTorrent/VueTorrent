<script setup lang="ts">
import { computed } from 'vue'
import ItemAmount from './DashboardItems/ItemAmount.vue'
import ItemBoolean from './DashboardItems/ItemBoolean.vue'
import ItemChip from './DashboardItems/ItemChip.vue'
import ItemData from './DashboardItems/ItemData.vue'
import ItemDateTime from './DashboardItems/ItemDateTime.vue'
import ItemDuration from './DashboardItems/ItemDuration.vue'
import ItemPercent from './DashboardItems/ItemPercent.vue'
import ItemRelativeTime from './DashboardItems/ItemRelativeTime.vue'
import ItemSpeed from './DashboardItems/ItemSpeed.vue'
import ItemText from './DashboardItems/ItemText.vue'
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { comparators } from '@/helpers'
import { useAppStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent }>()

const appStore = useAppStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() =>
  vuetorrentStore.tableProperties.filter(ppt => ppt.active && appStore.isFeatureAvailable(ppt.qbitVersion)).sort((a, b) => comparators.numeric.asc(a.order, b.order))
)

function getComponent(type: DashboardPropertyType) {
  switch (type) {
    case DashboardPropertyType.AMOUNT:
      return ItemAmount
    case DashboardPropertyType.BOOLEAN:
      return ItemBoolean
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
    <component :is="getComponent(ppt.type)" v-if="ppt.props" :key="ppt.name" :torrent="torrent" v-bind="ppt.props" :class="`torrent-${ppt.name}`" />
  </template>
</template>
