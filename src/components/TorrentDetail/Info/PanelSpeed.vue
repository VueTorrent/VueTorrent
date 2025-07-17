<script setup lang="ts">
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'
import { formatSpeed } from '@/helpers'
import { useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())
const { useBitSpeed } = storeToRefs(useVueTorrentStore())

const torrentValues = [
  { title: 'download_limit', getter: () => props.torrent.dl_limit },
  { title: 'download_speed', getter: () => props.torrent.dlspeed },
  { title: 'avg_download_speed', getter: () => properties.value?.dl_speed_avg ?? 0 },
  { title: 'upload_limit', getter: () => props.torrent.up_limit },
  { title: 'upload_speed', getter: () => props.torrent.upspeed },
  { title: 'avg_upload_speed', getter: () => properties.value?.up_speed_avg ?? 0 },
  { title: 'global_speed', getter: () => props.torrent.globalSpeed },
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.speed_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues" :key="ppt.title">
          <template #title>
            {{ $t(`torrent.properties.${ppt.title}`) }}
          </template>
          <template #text>
            {{ formatSpeed(ppt.getter(), useBitSpeed) }}
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
