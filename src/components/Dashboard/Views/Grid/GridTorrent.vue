<script setup lang="ts">
import { doesCommand } from '@/helpers'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent } from '@/types/vuetorrent'
import { computed } from 'vue'
import ItemData from '@/components/Dashboard/DashboardItems/ItemData.vue'
import ItemPercent from './DashboardItems/ItemPercent.vue'

const props = defineProps<{ torrent: Torrent }>()

const dashboardStore = useDashboardStore()

function onClick(e: MouseEvent) {
  if (e.shiftKey) {
    dashboardStore.spanTorrentSelection(props.torrent.hash)
  } else if (doesCommand(e) || dashboardStore.isSelectionMultiple) {
    dashboardStore.isSelectionMultiple = true
    dashboardStore.toggleSelect(props.torrent.hash)
  }
}

const isTorrentSelected = computed(() => dashboardStore.isTorrentInSelection(props.torrent.hash))
</script>

<template>
  <v-card :class="`sideborder ${torrent.state} pointer`" :color="isTorrentSelected ? `torrent-${torrent.state}-darken-3` : undefined" width="100%" @click="onClick">
    <v-card-title class="font-weight-bold text-wrap">{{ torrent.name }}</v-card-title>
    <v-card-text>
      <div class="d-flex gap flex-wrap">
        <ItemData :torrent="torrent" title="size" value="size" />
        <v-chip :color="`torrent-${torrent.state}`" variant="flat">{{ torrent.stateString }}</v-chip>
        <ItemPercent :torrent="torrent" value="progress" title="" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.gap {
  gap: 8px 16px;
}
</style>
