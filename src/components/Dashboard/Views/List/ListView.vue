<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import ListTorrent from './ListTorrent.vue'
import { getTorrentStateColor } from '@/helpers'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent as TorrentType } from '@/types/vuetorrent'

defineProps<{
  height: number
  paginatedTorrents: TorrentType[]
}>()

defineEmits<{
  onCheckboxClick: [e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: TorrentType]
  onTorrentClick: [e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: TorrentType]
  onTorrentDblClick: [torrent: TorrentType]
  onTorrentRightClick: [e: MouseEvent, torrent: TorrentType]
  startPress: [e: Touch, torrent: TorrentType]
  endPress: []
}>()

const display = useDisplay()
const dashboardStore = useDashboardStore()
</script>

<template>
  <v-list id="torrentList" class="pa-0" :max-height="height">
    <v-list-item
      v-for="torrent in paginatedTorrents"
      :id="`torrent-${torrent.hash}`"
      :key="torrent.hash"
      data-custom-context-menu
      :class="['pa-0', display.mobile ? 'mb-2' : 'mb-4']"
      @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
      @dblclick="$emit('onTorrentDblClick', torrent)"
      @touchcancel.passive="$emit('endPress')"
      @touchend.passive="$emit('endPress')"
      @touchmove.passive="$emit('endPress')"
      @touchstart.passive="$emit('startPress', $event.touches.item(0)!, torrent)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn
            v-if="dashboardStore.isSelectionMultiple"
            :color="getTorrentStateColor(torrent.state)"
            :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
            class="mr-2"
            variant="text"
            @click.prevent="$emit('onCheckboxClick', $event, torrent)" />
        </v-expand-x-transition>
        <ListTorrent :torrent="torrent" @on-torrent-click="(e, t) => $emit('onTorrentClick', e, t)" />
      </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>
