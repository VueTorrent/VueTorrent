<script setup lang="ts">
import { DurationUnitType } from 'dayjs/plugin/duration'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import InfoBase from './InfoBase.vue'
import { formatDuration } from '@/helpers'
import { useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { properties } = storeToRefs(useTorrentDetailStore())
const { durationFormat } = storeToRefs(useVueTorrentStore())

const torrentValues = computed<{ title: string; unit: DurationUnitType; value: number }[]>(() => [
  { title: 'seeding_time', unit: 's', value: props.torrent.seeding_time },
  { title: 'seeding_time_limit', unit: 'm', value: props.torrent.seeding_time_limit },
  { title: 'inactive_seeding_time_limit', unit: 'm', value: props.torrent.inactive_seeding_time_limit },
  { title: 'time_active', unit: 's', value: props.torrent.time_active },
  { title: 'reannounce', unit: 's', value: properties.value?.reannounce ?? 0 },
])
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.duration_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues" :key="ppt.title">
          <template #title>
            {{ $t(`torrent.properties.${ppt.title}`) }}
          </template>
          <template v-if="ppt.value > 0" #text>
            {{ formatDuration(ppt.value, ppt.unit, durationFormat) }}
          </template>
          <template v-else #text>
            {{ $t('common.NA') }}
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
