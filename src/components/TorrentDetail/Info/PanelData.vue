<script setup lang="ts">
import { formatData } from '@/helpers'
import { useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())
const { useBinarySize } = storeToRefs(useVueTorrentStore())

const torrentValues = [
  { title: 'downloaded', getter: () => props.torrent.downloaded },
  { title: 'downloaded_session', getter: () => props.torrent.downloaded_session },
  { title: 'uploaded', getter: () => props.torrent.uploaded },
  { title: 'uploaded_session', getter: () => props.torrent.uploaded_session },
  { title: 'size', getter: () => props.torrent.size },
  { title: 'total_size', getter: () => props.torrent.total_size },
  { title: 'total_wasted', getter: () => properties.value?.total_wasted ?? 0 },
  { title: 'amount_left', getter: () => props.torrent.amount_left },
  { title: 'global_volume', getter: () => props.torrent.globalVolume }
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.data_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues">
          <template v-slot:title>{{ $t(`torrent.properties.${ppt.title}`) }}</template>
          <template v-slot:text>{{ formatData(ppt.getter(), useBinarySize) }}</template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>