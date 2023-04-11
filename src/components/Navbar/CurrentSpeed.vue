<script setup lang="ts">
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useMainData, useSessionInfo } from '@/composables/api/info'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

// composables

const sessionInfo = useSessionInfo()
const mainData = useMainData()
</script>

<template>
  <div class="text-uppercase text-caption ml-4 font-weight-medium">
    {{ $t('navbar.currentSpeed') }}
  </div>
  <VRow dense class="mx-1 pt-1">
    <VCol>
      <SpeedCard
        :icon="mdiChevronDown"
        color="download"
        :value="sessionInfo.data.value?.dl_info_speed || 0"
      />
    </VCol>
    <VCol>
      <SpeedCard
        :icon="mdiChevronUp"
        color="upload"
        :value="sessionInfo.data.value?.up_info_speed || 0"
      />
    </VCol>
  </VRow>
</template>
