<script lang="ts" setup>
import ListTorrent from '@/components/Dashboard/Views/List/ListTorrent.vue'
import { getTorrentStateColor } from '@/helpers'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { useDisplay } from 'vuetify'

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
      :class="['pa-0', display.mobile ? 'mb-2' : 'mb-4']"
      data-custom-context-menu
      @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
      @touchcancel="$emit('endPress')"
      @touchend="$emit('endPress')"
      @touchmove="$emit('endPress')"
      @touchstart="$emit('startPress', $event.touches.item(0)!, torrent)"
      @dblclick="$emit('onTorrentDblClick', torrent)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn
            v-if="dashboardStore.isSelectionMultiple"
            :color="getTorrentStateColor(torrent.state)"
            :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
            class="mr-2"
            variant="text"
            @click="$emit('onCheckboxClick', $event, torrent)" />
        </v-expand-x-transition>
        <ListTorrent :torrent="torrent" @onTorrentClick="(e, t) => $emit('onTorrentClick', e, t)" />
      </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>
