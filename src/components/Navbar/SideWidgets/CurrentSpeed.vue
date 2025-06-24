<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import StatSection from './StatSection.vue'
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
  <StatSection :title="t('navbar.side.current_speed.title')">
    <div class="d-flex flex-row flex-gap-column">
      <SpeedCard
        icon="mdi-arrow-down"
        color="download"
        :value="serverState?.dl_info_speed ?? 0"
        :active="isDownloadingFilterActive"
        @click="isDownloadingFilterActive ? removeFilter() : selectDownloading()" />
      <SpeedCard
        icon="mdi-arrow-up"
        color="upload"
        :value="serverState?.up_info_speed ?? 0"
        :active="isUploadingFilterActive"
        @click="isUploadingFilterActive ? removeFilter() : selectUploading()" />
    </div>
    <div v-if="displayGraphLimits && (serverState?.dl_rate_limit || serverState?.up_rate_limit)" class="d-flex flex-row flex-gap-column">
      <SpeedCard v-if="serverState.dl_rate_limit" icon="mdi-arrow-collapse-down" color="download" :value="serverState.dl_rate_limit" />
      <div v-else />

      <SpeedCard v-if="serverState.up_rate_limit" icon="mdi-arrow-collapse-up" color="upload" :value="serverState.up_rate_limit" />
      <div v-else />
    </div>
  </StatSection>
</template>
