<script setup lang="ts">
import { useTorrentDetailStore } from '@/stores'
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'
import dayjs from '@/plugins/dayjs'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())

const torrentValues = [
  { title: 'ratio_time_limit', getter: () => 0 },
  { title: 'seeding_time', getter: () => props.torrent.seeding_time },
  { title: 'time_active', getter: () => props.torrent.time_active },
  { title: 'reannounce', getter: () => properties.value?.reannounce ?? 0 }
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.duration_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues">
          <template v-slot:title>{{ $t(`torrent.properties.${ppt.title}`) }}</template>
          <template v-slot:text>{{ dayjs.duration(ppt.getter(), 's').humanize() }}</template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
