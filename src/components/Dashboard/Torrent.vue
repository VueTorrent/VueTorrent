<script setup lang="ts">
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/VueTorrent'
import { computed } from 'vue'
import ItemAmount from './DashboardItems/ItemAmount.vue'
import ItemChip from './DashboardItems/ItemChip.vue'
import ItemData from './DashboardItems/ItemData.vue'
import ItemPercent from './DashboardItems/ItemPercent.vue'
import ItemSpeed from './DashboardItems/ItemSpeed.vue'
import ItemText from './DashboardItems/ItemText.vue'

const props = defineProps<{ torrent: Torrent }>()

const getComponent = (type: DashboardPropertyType) => {
  switch (type) {
    case DashboardPropertyType.AMOUNT:
      return ItemAmount
    case DashboardPropertyType.CHIP:
      return ItemChip
    case DashboardPropertyType.DATA:
      return ItemData
    case DashboardPropertyType.PERCENT:
      return ItemPercent
    case DashboardPropertyType.SPEED:
      return ItemSpeed
    case DashboardPropertyType.TEXT:
    default:
      return ItemText

  }
}

const torrentProperties = computed(() => {
  let ppts = props.torrent.progress === 100
    ? vuetorrentStore.doneTorrentProperties
    : vuetorrentStore.busyTorrentProperties

  return ppts.filter(ppt => ppt.active).sort((a, b) => a.order - b.order)
})

const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <v-list-item class="sideborder">
    <v-list-item-title class="font-weight-bold">{{ torrent.name }}</v-list-item-title>
    <div class="d-flex gap flex-wrap">
      <component :is="getComponent(ppt.type)" :torrent="torrent" v-bind="ppt.props" v-for="ppt in torrentProperties" />
    </div>
  </v-list-item>
</template>

<style scoped>
.gap {
  gap: 8px 16px;
}
</style>