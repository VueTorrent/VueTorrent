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
const { formatData } = useNumberFormatter()

const { properties } = storeToRefs(useTorrentDetailStore())

const torrentValues = computed(() => [
  { title: 'downloaded', value: props.torrent.downloaded },
  { title: 'downloaded_session', value: props.torrent.downloaded_session },
  { title: 'uploaded', value: props.torrent.uploaded },
  { title: 'uploaded_session', value: props.torrent.uploaded_session },
  { title: 'size', value: props.torrent.size },
  { title: 'total_size', value: props.torrent.total_size },
  { title: 'total_wasted', value: properties.value?.total_wasted ?? 0 },
  { title: 'amount_left', value: props.torrent.amount_left },
  { title: 'global_volume', value: props.torrent.globalVolume },
])
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.data_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase v-for="ppt in torrentValues" :key="ppt.title">
          <template #title>
            {{ $t(`torrent.properties.${ppt.title}`) }}
          </template>
          <template #text>
            <RawNumberTooltip :value="ppt.value" :unit="t('units.byte', ppt.value)">
              {{ formatData({ data: ppt.value }) }}
            </RawNumberTooltip>
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
