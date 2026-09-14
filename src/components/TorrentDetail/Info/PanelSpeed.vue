<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import InfoBase from './InfoBase.vue'
import RawNumberTooltip from '@/components/Core/RawNumberTooltip.vue'
import { useI18nUtils, useNumberFormatter } from '@/composables'
import { useTorrentDetailStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const { t } = useI18nUtils()
const { formatSpeed } = useNumberFormatter()

const { properties } = storeToRefs(useTorrentDetailStore())

const torrentValues = computed(() => [
  { title: 'download_limit', value: props.torrent.dl_limit },
  { title: 'download_speed', value: props.torrent.dlspeed },
  { title: 'avg_download_speed', value: properties.value?.dl_speed_avg ?? 0 },
  { title: 'upload_limit', value: props.torrent.up_limit },
  { title: 'upload_speed', value: props.torrent.upspeed },
  { title: 'avg_upload_speed', value: properties.value?.up_speed_avg ?? 0 },
  { title: 'global_speed', value: props.torrent.globalSpeed },
])
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
            <RawNumberTooltip :value="ppt.value" :unit="t('units.byte_per_second', ppt.value)">
              {{ formatSpeed({ speed: ppt.value }) }}
            </RawNumberTooltip>
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
