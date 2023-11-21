<script lang="ts" setup>
import ListTorrent from '@/components/Dashboard/Views/List/ListTorrent.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { useDisplay } from 'vuetify'

defineProps<{
  paginatedTorrents: TorrentType[]
}>()

defineEmits<{
  onClick: [e: PointerEvent, torrent: TorrentType],
  onRightClick: [e: PointerEvent, torrent: TorrentType],
  startPress: [e: PointerEvent, torrent: TorrentType],
  endPress: [],
  goToInfo: [torrent: TorrentType]
}>()

const display = useDisplay()
const dashboardStore = useDashboardStore()
</script>

<template>
  <v-list id="torrentList" class="pa-0">
    <v-list-item v-for="torrent in paginatedTorrents" :id="`torrent-${torrent.hash}`"
                 :class="display.mobile ? 'mb-2' : 'mb-4'" class="pa-0"
                 @contextmenu="$emit('onRightClick', $event, torrent)"
                 @touchcancel="$emit('endPress')" @touchend="$emit('endPress')"
                 @touchstart="$emit('startPress', $event, torrent)"
                 @dblclick.prevent="$emit('goToInfo', torrent)">
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-btn v-show="dashboardStore.isSelectionMultiple"
                 :color="`torrent-${torrent.state}`"
                 :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                 class="mr-2" variant="text" @click="$emit('onClick', $event, torrent)" />
        </v-expand-x-transition>
        <ListTorrent :torrent="torrent" />
      </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>