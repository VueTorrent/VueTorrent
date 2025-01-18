<script setup lang="ts">
import ItemAmount from '@/components/Dashboard/DashboardItems/ItemAmount.vue'
import ItemBoolean from '@/components/Dashboard/DashboardItems/ItemBoolean.vue'
import ItemChip from '@/components/Dashboard/DashboardItems/ItemChip.vue'
import ItemData from '@/components/Dashboard/DashboardItems/ItemData.vue'
import ItemDateTime from '@/components/Dashboard/DashboardItems/ItemDateTime.vue'
import ItemDuration from '@/components/Dashboard/DashboardItems/ItemDuration.vue'
import ItemPercent from '@/components/Dashboard/DashboardItems/ItemPercent.vue'
import ItemRelativeTime from '@/components/Dashboard/DashboardItems/ItemRelativeTime.vue'
import ItemSpeed from '@/components/Dashboard/DashboardItems/ItemSpeed.vue'
import ItemText from '@/components/Dashboard/DashboardItems/ItemText.vue'
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { comparators, getTorrentStateColor } from '@/helpers'
import { useAppStore, useDashboardStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent }>()

defineEmits<{
  onTorrentClick: [e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: Torrent]
}>()

const { current } = useTheme()

const appStore = useAppStore()
const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => {
  let ppts = props.torrent.progress === 1 ? vuetorrentStore.doneTorrentProperties : vuetorrentStore.busyTorrentProperties

  return ppts.filter(ppt => ppt.active && appStore.isFeatureAvailable(ppt.qbitVersion)).sort((a, b) => comparators.numeric.asc(a.order, b.order))
})

const getComponent = (type: DashboardPropertyType) => {
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
const isTorrentSelected = computed(() => dashboardStore.isTorrentInSelection(props.torrent.hash))
const stateColor = computed(() => current.value.colors[getTorrentStateColor(props.torrent.state)])
</script>

<template>
  <v-card
    class="cursor-pointer"
    :style="`border-left: 6px solid ${stateColor}`"
    width="100%"
    :color="isTorrentSelected ? `${getTorrentStateColor(torrent.state)}-darken-3` : undefined"
    @click="$emit('onTorrentClick', $event, torrent)">
    <v-card-title class="text-wrap pt-1 pb-0 px-2 text-truncate" style="font-size: 0.97em">{{ torrent.name }}</v-card-title>
    <v-card-text class="pa-2 pt-0">
      <div class="d-flex flex-gap flex-wrap">
        <template v-for="ppt in torrentProperties">
          <component v-if="ppt.props" :is="getComponent(ppt.type)" :torrent="torrent" v-bind="ppt.props" />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>
