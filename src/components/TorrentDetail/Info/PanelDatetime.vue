<script setup lang="ts">
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'
import { formatTimeSec } from '@/helpers'
import { useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())
const { dateFormat } = storeToRefs(useVueTorrentStore())

const torrentValues = [
  { title: 'added_on', getter: () => props.torrent.added_on },
  { title: 'completed_on', getter: () => props.torrent.completed_on },
  { title: 'creation_date', getter: () => properties.value?.creation_date ?? 0 },
  { title: 'last_activity', getter: () => props.torrent.last_activity },
  { title: 'seen_complete', getter: () => props.torrent.seen_complete },
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.datetime_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues" :key="ppt.title">
          <template #title>
            {{ $t(`torrent.properties.${ppt.title}`) }}
          </template>
          <template v-if="ppt.getter() > 0" #text>
            {{ formatTimeSec(ppt.getter(), dateFormat) }}
          </template>
          <template v-else #text>
            {{ $t('dashboard.not_complete') }}
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
