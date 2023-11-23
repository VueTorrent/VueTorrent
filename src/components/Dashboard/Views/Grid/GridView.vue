<script lang="ts" setup>
import GridTorrent from '@/components/Dashboard/Views/Grid/GridTorrent.vue'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { useDisplay } from 'vuetify'

defineProps<{
  paginatedTorrents: TorrentType[]
}>()

defineEmits<{
  onCheckboxClick: [e: PointerEvent, torrent: TorrentType],
  onTorrentClick: [e: PointerEvent, torrent: TorrentType],
  onTorrentDblClick: [e: PointerEvent, torrent: TorrentType],
  onTorrentRightClick: [e: PointerEvent, torrent: TorrentType],
  startPress: [e: PointerEvent, torrent: TorrentType],
  endPress: []
}>()

const display = useDisplay()
const dashboardStore = useDashboardStore()
</script>

<template>
  <v-row id="torrentList">
    <v-col v-for="torrent in paginatedTorrents" cols="12" lg="3" md="4" sm="6" xl="2"
           :class="display.mobile ? 'pb-2' : 'pb-4'" class="pt-0"
           @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
           @touchcancel="$emit('endPress')" @touchend="$emit('endPress')" @touchmove="$emit('endPress')"
           @touchstart="$emit('startPress', $event, torrent)"
           @dblclick="$emit('onTorrentDblClick', $event, torrent)">
      <div class="d-flex align-center" style="height: 100%; width: 100%">
        <v-expand-x-transition>
          <v-btn v-show="dashboardStore.isSelectionMultiple"
                 :color="`torrent-${torrent.state}`"
                 :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                 class="mr-2" variant="text" @click="$emit('onCheckboxClick', $event, torrent)" />
        </v-expand-x-transition>
        <GridTorrent :torrent="torrent" @onTorrentClick="(e, t) => $emit('onTorrentClick', e, t)" />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>