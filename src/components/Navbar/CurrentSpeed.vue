<script setup lang="ts">
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useSessionInfoStore } from '@/stores/info'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

// composables

const sessionInfo = useSessionInfoStore()
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
        :value="sessionInfo.stats?.dl_info_speed || 0"
      />
    </VCol>
    <VCol>
      <SpeedCard
        :icon="mdiChevronUp"
        color="upload"
        :value="sessionInfo.stats?.up_info_speed || 0"
      />
    </VCol>
  </VRow>
</template>
