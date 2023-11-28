<script lang="ts" setup>
import TableTorrent from '@/components/Dashboard/Views/Table/TableTorrent.vue'
import { useVueTorrentStore } from '@/stores'
import { useDashboardStore } from '@/stores/dashboard.ts'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { computed } from 'vue'

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

const dashboardStore = useDashboardStore()
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => vuetorrentStore.tableProperties.filter(ppt => ppt.active).sort((a, b) => a.order - b.order))

function isTorrentSelected(torrent: TorrentType) {
  return dashboardStore.isTorrentInSelection(torrent.hash)
}

const getTorrentRowColorClass = (torrent: TorrentType) => [
  'pointer',
  isTorrentSelected(torrent) ? `bg-torrent-${ torrent.state }-darken-3 selected` : ''
]
</script>

<template>
  <v-table id="torrentList" class="pa-0" density="compact">
    <thead>
    <tr>
      <th class="px-1" />
      <th v-if="dashboardStore.isSelectionMultiple" />
      <th class="text-left">{{ $t('torrent.properties.name') }}</th>

      <th v-for="ppt in torrentProperties" class="text-left">
        {{ $t(`torrent.properties.${ ppt.props.title }`) }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="torrent in paginatedTorrents" :class="getTorrentRowColorClass(torrent)" v-ripple
        @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
        @touchcancel="$emit('endPress')" @touchend="$emit('endPress')" @touchmove="$emit('endPress')"
        @touchstart="$emit('startPress', $event, torrent)"
        @click="$emit('onTorrentClick', $event, torrent)"
        @dblclick="$emit('onTorrentDblClick', $event, torrent)">
      <td :class="`pa-0 bg-torrent-${ torrent.state }`" />
      <td v-if="dashboardStore.isSelectionMultiple">
        <v-checkbox-btn :model-value="isTorrentSelected(torrent)"
                        :color="`torrent-${torrent.state}`" variant="text"
                        @click.stop="$emit('onCheckboxClick', $event, torrent)" />
      </td>
      <td>{{ torrent.name }}</td>
      <TableTorrent :torrent="torrent" />
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped lang="scss">
@use 'vuetify/settings';

#torrentList {
  background-color: unset;

  tbody tr:nth-child(odd) {
    background-color: settings.$card-background;
  }

  tbody tr.selected {
    position: relative;

    &:nth-child(odd)::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>