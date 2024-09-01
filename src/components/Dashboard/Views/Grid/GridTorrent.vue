<script setup lang="ts">
import ItemAmount from '@/components/Dashboard/DashboardItems/ItemAmount.vue'
import ItemChip from '@/components/Dashboard/DashboardItems/ItemChip.vue'
import ItemData from '@/components/Dashboard/DashboardItems/ItemData.vue'
import ItemDateTime from '@/components/Dashboard/DashboardItems/ItemDateTime.vue'
import ItemDuration from '@/components/Dashboard/DashboardItems/ItemDuration.vue'
import ItemPercent from '@/components/Dashboard/DashboardItems/ItemPercent.vue'
import ItemRelativeTime from '@/components/Dashboard/DashboardItems/ItemRelativeTime.vue'
import ItemSpeed from '@/components/Dashboard/DashboardItems/ItemSpeed.vue'
import ItemText from '@/components/Dashboard/DashboardItems/ItemText.vue'
import { DashboardPropertyType } from '@/constants/vuetorrent'
import { getTorrentStateColor } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent }>()

defineEmits<{
  onTorrentClick: [e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: Torrent]
}>()

const { current } = useTheme()

const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => {
  let ppts = props.torrent.progress === 1 ? vuetorrentStore.doneGridProperties : vuetorrentStore.busyGridProperties

  return ppts.filter(ppt => ppt.active).sort((a, b) => a.order - b.order)
})

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
const stateColor = computed(() => current.value.colors[getTorrentStateColor(props.torrent.state)])

function getTorrentColor(torrent: Torrent) {
  if (isTorrentSelected.value) return `${getTorrentStateColor(torrent.state)}-darken-3`
  if (dashboardStore.isSelectionMultiple) return undefined
  if (dashboardStore.isTorrentHighlighted(torrent.hash)) {
    return `${getTorrentStateColor(torrent.state)}-lighten-3`
  }
  return undefined
}
</script>

<template>
  <v-card class="cursor-pointer" :style="`border-left: 6px solid ${stateColor}`" height="100%" :color="getTorrentColor(torrent)" @click="$emit('onTorrentClick', $event, torrent)">
    <v-card-title class="text-wrap text-subtitle-1 pt-1 pb-0">{{ torrent.name }}</v-card-title>
    <v-card-text>
      <div class="d-flex flex-gap flex-wrap">
        <template v-for="ppt in torrentProperties">
          <component v-if="ppt.props" :is="getComponent(ppt.type)" :torrent="torrent" v-bind="ppt.props" />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>
