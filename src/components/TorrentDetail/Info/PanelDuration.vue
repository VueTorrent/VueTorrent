<script setup lang="ts">
import { formatDuration } from '@/helpers'
import { useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { DurationUnitType } from 'dayjs/plugin/duration'
import { storeToRefs } from 'pinia'
import InfoBase from './InfoBase.vue'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())
const { durationFormat } = storeToRefs(useVueTorrentStore())

const torrentValues: { title: string; unit: DurationUnitType; getter: () => number }[] = [
  { title: 'seeding_time', unit: 's', getter: () => props.torrent.seeding_time },
  { title: 'seeding_time_limit', unit: 'm', getter: () => props.torrent.seeding_time_limit },
  { title: 'inactive_seeding_time_limit', unit: 'm', getter: () => props.torrent.inactive_seeding_time_limit },
  { title: 'time_active', unit: 's', getter: () => props.torrent.time_active },
  { title: 'reannounce', unit: 's', getter: () => properties.value?.reannounce ?? 0 }
]
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.duration_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues">
          <template v-slot:title>{{ $t(`torrent.properties.${ppt.title}`) }}</template>
          <template v-if="ppt.getter() > 0" v-slot:text>
            {{ formatDuration(ppt.getter(), ppt.unit, durationFormat) }}
          </template>
          <template v-else v-slot:text>{{ $t('common.NA') }}</template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
