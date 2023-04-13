<script setup lang="ts">
import { titleCase } from '@/utils/dataParse'
import { mdiInformationOutline } from '@mdi/js'
import StorageCard from '../Core/StorageCard.vue'
import { useMainData, useSessionInfo } from '@/composables/api/info'

// props
const props = defineProps<{
  isSession?: boolean
}>()

// composables
const sessionInfo = useSessionInfo()
const mainData = useMainData()

// methods
const getDownload = () => {
  return (
    (props.isSession
      ? sessionInfo.data.value?.dl_info_data
      : mainData.data.value?.server_state?.alltime_dl) || 0
  )
}

const getUpload = () => {
  return (
    (props.isSession
      ? sessionInfo.data.value?.up_info_data
      : mainData.data.value?.server_state?.alltime_ul) || 0
  )
}
</script>

<template>
  <div class="my-3">
    <label class="text-uppercase text-white text-caption font-eight-medium ml-4">
      {{ isSession ? $t('navbar.sessionTitle') : $t('navbar.alltimeTitle') }}
    </label>
    <VTooltip v-if="isSession">
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          color="white"
          style="opacity: 0.3"
          size="small"
          :icon="mdiInformationOutline"
        />
      </template>
      <span>{{ $t('navbar.sessionStats.tooltip') }}</span>
    </VTooltip>
    <StorageCard
      class="mb-4 mt-4"
      :label="titleCase($t('downloaded'))"
      color="download"
      :value="getDownload()"
    />
    <StorageCard :label="titleCase($t('uploaded'))" color="upload" :value="getUpload()" />
  </div>
</template>
