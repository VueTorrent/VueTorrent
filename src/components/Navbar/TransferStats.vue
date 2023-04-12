<script setup lang="ts">
import { useSessionInfoStore } from '@/stores/info'
import { titleCase } from '@/utils/dataParse'
import { mdiInformationOutline } from '@mdi/js'
import StorageCard from '../Core/StorageCard.vue'

// props
const props = defineProps<{
  isSession?: boolean
}>()

// composables
const sessionInfo = useSessionInfoStore()

// methods
const getDownload = () => {
  return (props.isSession ? sessionInfo.stats?.dl_info_data : sessionInfo.stats?.dl_info_data) || 0
}

const getUpload = () => {
  return (props.isSession ? sessionInfo.stats?.up_info_data : sessionInfo.stats?.up_info_data) || 0
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
      class="my-4"
      :label="titleCase($t('downloaded'))"
      color="download"
      :value="getDownload()"
    />
    <StorageCard :label="titleCase($t('uploaded'))" color="upload" :value="getUpload()" />
  </div>
</template>
