<script setup lang="ts">
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'
import { useI18nUtils } from '@/composables'
import { formatEta } from '@/helpers'
import { useTorrentDetailStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { t, getTorrentStateString } = useI18nUtils()
const { properties } = storeToRefs(useTorrentDetailStore())

const torrentValues = [
  { title: 'available_peers', getter: () => props.torrent.available_peers },
  { title: 'available_seeds', getter: () => props.torrent.available_seeds },
  { title: 'ratio', getter: () => props.torrent.ratio.toFixed(2) },
  { title: 'ratio_limit', getter: () => props.torrent.ratio_limit },
  { title: 'num_leechs', getter: () => props.torrent.num_leechs },
  { title: 'num_seeds', getter: () => props.torrent.num_seeds },
  { title: 'availability', getter: () => props.torrent.availability },
  { title: 'eta', getter: () => formatEta(props.torrent.eta, props.torrent.forced) },
  { title: 'category', getter: () => props.torrent.category || t('common.NA') },
  { title: 'state', getter: () => getTorrentStateString(props.torrent.state) },
  { title: 'trackers_count', getter: () => props.torrent.trackers_count },
  { title: 'priority', getter: () => props.torrent.priority },
  { title: 'nb_connections', getter: () => properties.value?.nb_connections ?? 0 },
  { title: 'nb_connections_limit', getter: () => properties.value?.nb_connections_limit ?? 0 }
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.text_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues" :key="ppt.title">
          <template #title>
            {{ $t(`torrent.properties.${ppt.title}`) }}
          </template>
          <template #text>
            {{ ppt.getter() }}
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
