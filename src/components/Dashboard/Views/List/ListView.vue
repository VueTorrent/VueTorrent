<script lang="ts" setup>
import ListTorrent from '@/components/Dashboard/Views/List/ListTorrent.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { useDisplay } from 'vuetify'

defineProps<{
  paginatedTorrents: TorrentType[]
}>()

defineEmits<{
  onCheckboxClick: [torrent: TorrentType]
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
  <v-list id="torrentList" class="pa-0">
    <v-list-item
      v-for="torrent in paginatedTorrents"
      :id="`torrent-${torrent.hash}`"
      :class="display.mobile ? 'mb-2' : 'mb-4'"
      class="pa-0"
      @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
      @touchcancel="$emit('endPress')"
      @touchend="$emit('endPress')"
      @touchmove="$emit('endPress')"
      @touchstart="$emit('startPress', $event.touches.item(0)!, torrent)"
      @dblclick="$emit('onTorrentDblClick', torrent)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn
            v-show="dashboardStore.isSelectionMultiple"
            :color="`torrent-${torrent.state}`"
            :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
            class="mr-2"
            variant="text"
            @click="$emit('onCheckboxClick', torrent)" />
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
