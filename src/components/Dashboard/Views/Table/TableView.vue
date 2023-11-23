<script lang="ts" setup>
import { formatData, formatPercent } from '@/helpers'
import { useVueTorrentStore } from '@/stores'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'

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

const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <v-table id="torrentList" class="pa-0">
    <thead>
    <tr>
      <th></th>
      <th class="text-left">{{ $t('torrent.properties.name') }}</th>
      <th class="text-left">{{ $t('torrent.properties.size') }}</th>
      <th class="text-left">{{ $t('torrent.properties.state') }}</th>
      <th class="text-left">{{ $t('torrent.properties.progress') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="torrent in paginatedTorrents" :class="`text-torrent-${torrent.state}`"
        @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
        @touchcancel="$emit('endPress')" @touchend="$emit('endPress')"
        @touchstart="$emit('startPress', $event, torrent)"
        @dblclick.prevent="$emit('goToInfo', torrent)">
      <td>
        <v-checkbox-btn :model-value="dashboardStore.isTorrentInSelection(torrent.hash)"
            :color="`torrent-${torrent.state}`" variant="flat" @click="$emit('onCheckboxClick', $event, torrent)" />
      </td>
      <td>{{ torrent.name }}</td>
      <td>{{ formatData(torrent.size, vuetorrentStore.useBinarySize) }}</td>
      <td>{{ torrent.stateString }}</td>
      <td>{{ formatPercent(torrent.progress) }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>