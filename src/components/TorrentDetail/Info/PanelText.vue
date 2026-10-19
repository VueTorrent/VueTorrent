<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import InfoBase from './InfoBase.vue'
import { useI18nUtils } from '@/composables'
import { formatEta } from '@/helpers'
import { useTorrentDetailStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { t, getTorrentStateString } = useI18nUtils()
const { properties } = storeToRefs(useTorrentDetailStore())

const torrentValues = computed(() => [
  { title: 'available_peers', value: props.torrent.available_peers },
  { title: 'available_seeds', value: props.torrent.available_seeds },
  { title: 'ratio', value: props.torrent.ratio.toFixed(2) },
  { title: 'ratio_limit', value: props.torrent.ratio_limit },
  { title: 'num_leechs', value: props.torrent.num_leechs },
  { title: 'num_seeds', value: props.torrent.num_seeds },
  { title: 'availability', value: props.torrent.availability },
  { title: 'eta', value: formatEta(props.torrent.eta, props.torrent.forced) },
  { title: 'category', value: props.torrent.category || t('common.NA') },
  { title: 'state', value: getTorrentStateString(props.torrent.state) },
  { title: 'trackers_count', value: props.torrent.trackers_count },
  { title: 'priority', value: props.torrent.priority },
  { title: 'nb_connections', value: properties.value?.nb_connections ?? 0 },
  { title: 'nb_connections_limit', value: properties.value?.nb_connections_limit ?? 0 },
])
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
            {{ ppt.value }}
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
