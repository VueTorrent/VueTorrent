<script lang="ts" setup>
import TableTorrent from '@/components/Dashboard/Views/Table/TableTorrent.vue'
import { TorrentProperty, TorrentState } from '@/constants/vuetorrent'
import { comparators, getTorrentStateColor } from '@/helpers'
import { useDashboardStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { Torrent as TorrentType } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

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

const dashboardStore = useDashboardStore()
const { sortCriterias } = storeToRefs(useTorrentStore())
const vuetorrentStore = useVueTorrentStore()

const torrentProperties = computed(() => vuetorrentStore.tableProperties.filter(ppt => ppt.active).sort((a, b) => comparators.numeric.asc(a.order, b.order)))
const sortCriteria = computed(() => sortCriterias.value[0])

function onHeaderClick(ppt: TorrentProperty) {
  if (sortCriteria.value.value === ppt.sortKey) {
    sortCriteria.value.reverse = !sortCriteria.value.reverse
  } else {
    sortCriteria.value.value = ppt.sortKey
  }
}

function isTorrentSelected(torrent: TorrentType) {
  return dashboardStore.isTorrentInSelection(torrent.hash)
}

const getTorrentRowColorClass = (torrent: TorrentType) => ['cursor-pointer', isTorrentSelected(torrent) ? `bg-${getTorrentStateColor(torrent.state)}-darken-3 selected` : '']
</script>

<template>
  <v-table id="torrentList" class="pa-0" density="compact">
    <thead>
      <tr>
        <th class="px-1" />
        <th v-if="dashboardStore.isSelectionMultiple" />
        <th class="text-left">{{ $t('torrent.properties.name') }}</th>

        <th v-for="ppt in torrentProperties" class="text-left cursor-pointer" @click="onHeaderClick(ppt)">
          <div class="d-flex align-center">
            <span>{{ $t(ppt.props.titleKey) }}</span>
            <v-icon v-if="sortCriteria.value === ppt.sortKey"
                    class="ml-2"
                    :icon="sortCriteria.reverse ? 'mdi-arrow-up' : 'mdi-arrow-down'" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="torrent in paginatedTorrents"
        :class="getTorrentRowColorClass(torrent)"
        v-ripple
        @contextmenu="$emit('onTorrentRightClick', $event, torrent)"
        @touchcancel="$emit('endPress')"
        @touchend="$emit('endPress')"
        @touchmove="$emit('endPress')"
        @touchstart="$emit('startPress', $event.touches.item(0)!, torrent)"
        @click="$emit('onTorrentClick', $event, torrent)"
        @dblclick="$emit('onTorrentDblClick', torrent)">
        <td :class="`pa-0 bg-torrent-${TorrentState[torrent.state].toLowerCase()}`" />
        <td v-if="dashboardStore.isSelectionMultiple">
          <v-checkbox-btn
            :model-value="isTorrentSelected(torrent)"
            :color="`torrent-${TorrentState[torrent.state].toLowerCase()}`"
            variant="text"
            @click.stop="$emit('onCheckboxClick', torrent)" />
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
      content: '';
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
