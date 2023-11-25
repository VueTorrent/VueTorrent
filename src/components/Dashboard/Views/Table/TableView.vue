<script lang="ts" setup>
import TableTorrent from '@/components/Dashboard/Views/Table/TableTorrent.vue'
import { useVueTorrentStore } from '@/stores'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{
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

const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const getTorrentProperties = computed(() => vuetorrentStore.tableProperties.filter(ppt => ppt.active).sort((a, b) => a.order - b.order))

function isTorrentSelected(torrent: TorrentType) {
  return dashboardStore.isTorrentInSelection(torrent.hash)
}
</script>

<template>
  <v-table id="torrentList" class="pa-0">
    <thead>
    <tr>
      <th></th>
      <th class="text-left">{{ $t('torrent.properties.name') }}</th>

      <th v-for="ppt in getTorrentProperties" class="text-left">
        {{ $t(`torrent.properties.${ ppt.props.title }`) }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="torrent in paginatedTorrents" :class="`text-torrent-${torrent.state}`"
        @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
        @touchcancel="$emit('endPress')" @touchend="$emit('endPress')" @touchmove="$emit('endPress')"
        @touchstart="$emit('startPress', $event, torrent)"
        @click="$emit('onTorrentClick', $event, torrent)"
        @dblclick.prevent="$emit('onTorrentDblClick', torrent)">
      <td>
        <v-checkbox-btn :model-value="dashboardStore.isTorrentInSelection(torrent.hash)"
                        :color="`torrent-${torrent.state}`" variant="flat"
                        @click="$emit('onCheckboxClick', $event, torrent)" />
      </td>
      <td>{{ torrent.name }}</td>
      <TableTorrent :torrent="torrent" />
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
#torrentList {
  background-color: unset;
}
</style>