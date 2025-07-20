<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import StatSection from './StatSection.vue'
import SpeedCard from '@/components/Core/Cards/SpeedCard.vue'
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

const isLimitDefined = computed(() => !!serverState.value?.dl_rate_limit || !!serverState.value?.up_rate_limit)
const downloadValue = computed(() => {
  if (displayGraphLimits && isLimitDefined.value && serverState.value?.dl_rate_limit) {
    return [serverState.value?.dl_info_speed ?? 0, serverState.value?.dl_rate_limit ?? 0]
  }
  return serverState.value?.dl_info_speed ?? 0
})
const uploadValue = computed(() => {
  if (displayGraphLimits && isLimitDefined.value && serverState.value?.up_rate_limit) {
    return [serverState.value?.up_info_speed ?? 0, serverState.value?.up_rate_limit ?? 0]
  }
  return serverState.value?.up_info_speed ?? 0
})
</script>

<template>
  <StatSection :title="t('navbar.side.current_speed.title')" columns="2">
    <SpeedCard
      orientation="row"
      :title="t('navbar.side.current_speed.download')"
      icon="mdi-arrow-down"
      color="download"
      :value="downloadValue"
      :active="isDownloadingFilterActive"
      @click="isDownloadingFilterActive ? removeFilter() : selectDownloading()" />
    <SpeedCard
      orientation="row"
      :title="t('navbar.side.current_speed.upload')"
      icon="mdi-arrow-up"
      color="upload"
      :value="uploadValue"
      :active="isUploadingFilterActive"
      @click="isUploadingFilterActive ? removeFilter() : selectUploading()" />
  </StatSection>
</template>
