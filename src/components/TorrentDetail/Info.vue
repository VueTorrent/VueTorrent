<script setup lang="ts">
import InfoBase from '@/components/TorrentDetail/InfoBase.vue'
import dayjs from '@/plugins/dayjs'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/VueTorrent'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ torrent: Torrent, isActive: boolean }>()

const { t } = useI18n()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const durationFormat = 'D[d] H[h] m[m] s[s]'

const auto_tmm = computed({
  get: () => props.torrent.auto_tmm,
  set: (value) => maindataStore.toggleAutoTmm([props.torrent.hash], value)
})

const f_l_piece_prio = computed({
  get: () => props.torrent.f_l_piece_prio,
  set: () => maindataStore.toggleFLPiecePrio([props.torrent.hash])
})

const forced = computed({
  get: () => props.torrent.forced,
  set: (value) => {
    if (value) {
      maindataStore.resumeTorrents([props.torrent.hash])
    } else {
      maindataStore.forceResumeTorrents([props.torrent.hash])
    }
  }
})

const seq_dl = computed({
  get: () => props.torrent.seq_dl,
  set: () => maindataStore.toggleSeqDl([props.torrent.hash])
})

const super_seeding = computed({
  get: () => props.torrent.super_seeding,
  set: (value) => maindataStore.setSuperSeeding([props.torrent.hash], value)
})

const datetimePpts = [
  // Datetime values
  { title: 'added_on', text: 'added_on' },
  { title: 'completed_on', text: 'completed_on' },
  { title: 'last_activity', text: 'last_activity' },
  { title: 'seen_complete', text: 'seen_complete' },
]

const durationPpts = [
  // Relative time values
  { title: 'ratio_time_limit', text: 'ratio_time_limit' },
  { title: 'seeding_time', text: 'seeding_time' },
  { title: 'time_active', text: 'time_active' },
]

const ppts = [
  // Boolean values
  { title: 'auto_tmm', text: 'auto_tmm' },
  { title: 'f_l_piece_prio', text: 'f_l_piece_prio' },
  { title: 'forced', text: 'forced' },
  { title: 'seq_dl', text: 'seq_dl' },
  { title: 'super_seeding', text: 'super_seeding' },

  // Data values
  { title: 'amount_left', text: 'amount_left' },
  { title: 'downloaded', text: 'downloaded' },
  { title: 'downloaded_session', text: 'downloaded_session' },
  { title: 'size', text: 'size' },
  { title: 'total_size', text: 'total_size' },
  { title: 'uploaded', text: 'uploaded' },
  { title: 'uploaded_session', text: 'uploaded_session' },
  { title: 'globalVolume', text: 'globalVolume' },

  // Speed values
  { title: 'dl_limit', text: 'dl_limit' },
  { title: 'dlspeed', text: 'dlspeed' },
  { title: 'up_limit', text: 'up_limit' },
  { title: 'upspeed', text: 'upspeed' },
  { title: 'globalSpeed', text: 'globalSpeed' },

  // Text values
  { title: 'availability', text: 'availability' },
  { title: 'available_peers', text: 'available_peers' },
  { title: 'available_seeds', text: 'available_seeds' },
  { title: 'category', text: 'category' },
  { title: 'eta', text: 'eta' },
  { title: 'num_leechs', text: 'num_leechs' },
  { title: 'num_seeds', text: 'num_seeds' },
  { title: 'priority', text: 'priority' },
  { title: 'ratio', text: 'ratio' },
  { title: 'ratio_limit', text: 'ratio_limit' },
  { title: 'state', text: 'stateString' },
  { title: 'trackers_count', text: 'trackers_count' },

  // Long text values
  { title: 'content_path', text: 'content_path' },
  { title: 'download_path', text: 'download_path' },
  { title: 'hash', text: 'hash' },
  { title: 'infohash_v1', text: 'infohash_v1' },
  { title: 'infohash_v2', text: 'infohash_v2' },
  { title: 'magnet', text: 'magnet' },
  { title: 'name', text: 'name' },
  { title: 'savePath', text: 'savePath' },
  { title: 'tracker', text: 'tracker' },

  // Percent values
  { title: 'progress', text: 'progress' },

  // List values
  { title: 'tags', text: 'tags' }
]
</script>

<template>
  <v-list>
    <v-list-item>
      <v-expansion-panels>
        <v-expansion-panel title="Datetime Values">
          <v-expansion-panel-text>
            <v-row>
              <InfoBase v-for="ppt in datetimePpts">
                <template v-slot:title>{{ $t(`torrent.properties.${ppt.title}`) }}</template>
                <template v-slot:text>{{ dayjs(torrent[ppt.text] * 1000).format(vuetorrentStore.dateFormat ?? 'DD/MM/YYYY, HH:mm:ss') }}</template>
              </InfoBase>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Relative time values">
          <v-expansion-panel-text>
            <v-row>
              <InfoBase v-for="ppt in durationPpts">
                <template v-slot:title>{{ $t(`torrent.properties.${ppt.title}`) }}</template>
                <template v-slot:text>{{ dayjs.duration(torrent[ppt.text], 's').format(durationFormat) }}</template>
              </InfoBase>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Boolean values">
          <v-expansion-panel-text>
            <v-row>
              <InfoBase compact>
                <template v-slot:title>
                  <v-checkbox v-model="auto_tmm"
                              hide-details
                              density="compact"
                              :label="$t('torrent.properties.auto_tmm')" />
                </template>
              </InfoBase>

              <InfoBase compact>
                <template v-slot:title>
                  <v-checkbox v-model="f_l_piece_prio"
                              hide-details
                              density="compact"
                              :label="$t('torrent.properties.f_l_piece_prio')" />
                </template>
              </InfoBase>

              <InfoBase compact>
                <template v-slot:title>
                  <v-checkbox v-model="forced"
                              hide-details
                              density="compact"
                              :label="$t('torrent.properties.forced')" />
                </template>
              </InfoBase>

              <InfoBase compact>
                <template v-slot:title>
                  <v-checkbox v-model="seq_dl"
                              hide-details
                              density="compact"
                              :label="$t('torrent.properties.seq_dl')" />
                </template>
              </InfoBase>

              <InfoBase compact>
                <template v-slot:title>
                  <v-checkbox v-model="super_seeding"
                              hide-details
                              density="compact"
                              :label="$t('torrent.properties.super_seeding')" />
                </template>
              </InfoBase>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list-item>
  </v-list>

  <v-row class="mt-2">
    <InfoBase v-for="ppt in ppts">
      <template v-slot:title>{{ ppt.title }}</template>
      <template v-slot:text>{{ torrent[ppt.text] }}</template>
    </InfoBase>
  </v-row>
</template>

<style scoped>

</style>