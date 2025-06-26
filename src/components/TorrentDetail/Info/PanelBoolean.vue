<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import InfoBase from './InfoBase.vue'
import { useTorrentDetailStore, useTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent }>()

const torrentStore = useTorrentStore()
const { properties } = storeToRefs(useTorrentDetailStore())

const auto_tmm = computed({
  get: () => props.torrent.auto_tmm,
  set: value => void torrentStore.toggleAutoTmm([props.torrent.hash], value)
})

const f_l_piece_prio = computed({
  get: () => props.torrent.f_l_piece_prio,
  set: () => void torrentStore.toggleFLPiecePrio([props.torrent.hash])
})

const forced = computed({
  get: () => props.torrent.forced,
  set: value => {
    if (value) {
      void torrentStore.forceStartTorrents([props.torrent.hash])
    } else {
      void torrentStore.resumeTorrents([props.torrent.hash])
    }
  }
})

const seq_dl = computed({
  get: () => props.torrent.seq_dl,
  set: () => void torrentStore.toggleSeqDl([props.torrent.hash])
})

const super_seeding = computed({
  get: () => props.torrent.super_seeding,
  set: value => void torrentStore.setSuperSeeding([props.torrent.hash], value)
})
</script>

<template>
  <v-expansion-panel :title="$t('torrentDetail.info.boolean_values')">
    <v-expansion-panel-text>
      <v-row>
        <InfoBase>
          <template #title>
            <v-checkbox v-model="auto_tmm" hide-details density="compact" :label="$t('torrent.properties.auto_tmm')" />
          </template>
        </InfoBase>

        <InfoBase>
          <template #title>
            <v-checkbox v-model="f_l_piece_prio" hide-details density="compact" :label="$t('torrent.properties.f_l_piece_prio')" />
          </template>
        </InfoBase>

        <InfoBase>
          <template #title>
            <v-checkbox v-model="forced" hide-details density="compact" :label="$t('torrent.properties.forced')" />
          </template>
        </InfoBase>

        <InfoBase>
          <template #title>
            <v-checkbox v-model="seq_dl" hide-details density="compact" :label="$t('torrent.properties.seq_dl')" />
          </template>
        </InfoBase>

        <InfoBase>
          <template #title>
            <v-checkbox v-model="super_seeding" hide-details density="compact" :label="$t('torrent.properties.super_seeding')" />
          </template>
        </InfoBase>

        <InfoBase>
          <template #title>
            <v-checkbox disabled :model-value="properties?.is_private" hide-details density="compact" :label="$t('torrent.properties.is_private')" />
          </template>
        </InfoBase>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
