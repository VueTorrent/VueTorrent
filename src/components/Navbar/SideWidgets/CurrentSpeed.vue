<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useI18nUtils } from '@/composables'
import { TorrentState } from '@/constants/vuetorrent'
import { useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const { serverState } = storeToRefs(useMaindataStore())
const { displayGraphLimits } = storeToRefs(useVueTorrentStore())
const { statusFilter } = storeToRefs(useTorrentStore())

const downloadingStates = [TorrentState.DOWNLOADING, TorrentState.DL_FORCED]
const uploadingStates = [TorrentState.UPLOADING, TorrentState.UL_FORCED]

function removeFilter() {
  statusFilter.value = []
}

function selectDownloading() {
  statusFilter.value = downloadingStates
}

function selectUploading() {
  statusFilter.value = uploadingStates
}

const isDownloadingFilterActive = computed(() => downloadingStates.every(state => statusFilter.value.includes(state)) && downloadingStates.length === statusFilter.value.length)
const isUploadingFilterActive = computed(() => uploadingStates.every(state => statusFilter.value.includes(state)) && uploadingStates.length === statusFilter.value.length)
</script>

<template>
  <v-card flat class="inherit-bg">
    <v-card-title class="px-0 text-uppercase text-white ml-1 font-weight-light text-subtitle-2">
      {{ t('navbar.side.current_speed.title') }}
    </v-card-title>
    <v-card-text class="px-0">
      <v-sheet class="mx-2 inherit-bg">
        <v-row class="pt-0">
          <v-col cols="6" class="px-1 pt-1">
            <SpeedCard
              icon="mdi-arrow-down"
              color="download"
              :value="serverState?.dl_info_speed ?? 0"
              :active="isDownloadingFilterActive"
              @click="isDownloadingFilterActive ? removeFilter() : selectDownloading()" />
          </v-col>
          <v-col cols="6" class="px-1 pt-1">
            <SpeedCard
              icon="mdi-arrow-up"
              color="upload"
              :value="serverState?.up_info_speed ?? 0"
              :active="isUploadingFilterActive"
              @click="isUploadingFilterActive ? removeFilter() : selectUploading()" />
          </v-col>

          <template v-if="displayGraphLimits && (serverState?.dl_rate_limit || serverState?.up_rate_limit)">
            <v-col v-if="serverState.dl_rate_limit" cols="6" class="px-1 pt-0">
              <SpeedCard icon="mdi-arrow-collapse-down" color="download" :value="serverState.dl_rate_limit" />
            </v-col>
            <v-col v-else cols="6" />

            <v-col v-if="serverState.up_rate_limit" cols="6" class="px-1 pt-0">
              <SpeedCard icon="mdi-arrow-collapse-up" color="upload" :value="serverState.up_rate_limit" />
            </v-col>
            <v-col v-else cols="6" />
          </template>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
