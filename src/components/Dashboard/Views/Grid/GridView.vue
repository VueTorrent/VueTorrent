<script lang="ts" setup>
import { vOnLongPress } from '@vueuse/components'
import GridTorrent from './GridTorrent.vue'
import { getTorrentStateColor } from '@/helpers'
import { useDashboardStore } from '@/stores'
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
}>()

const dashboardStore = useDashboardStore()
</script>

<template>
  <v-row id="torrentList" class="ma-0 overflow-y-auto" :style="`max-height: ${height}px`">
    <v-col
      v-for="torrent in paginatedTorrents"
      :key="torrent.hash"
      v-on-long-press.prevent="e => $emit('onTorrentRightClick', e, torrent)"
      data-custom-context-menu
      cols="12"
      lg="3"
      md="4"
      sm="6"
      xl="2"
      class="pb-0"
      @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
      @dblclick="$emit('onTorrentDblClick', torrent)">
      <div class="d-flex align-center" style="height: 100%; width: 100%">
        <v-expand-x-transition>
          <v-btn
            v-if="dashboardStore.isSelectionMultiple"
            :color="getTorrentStateColor(torrent.state)"
            :icon="dashboardStore.isTorrentInSelection(torrent.hash) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
            class="mr-2"
            variant="text"
            @click="$emit('onCheckboxClick', $event, torrent)" />
        </v-expand-x-transition>
        <GridTorrent :torrent="torrent" @on-torrent-click="(e, t) => $emit('onTorrentClick', e, t)" />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>
