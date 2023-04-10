<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@/composables/useAxios'
import type { SpeedInfoResponse } from '@/types/qbit/responses'

import SpeedCard from '@/components/Core/SpeedCard.vue'

// composables
const axios = useAxios()

const globalInfo = useQuery({
  queryKey: ['globalInfo'],
  queryFn: async () => {
    const info = await axios.get('transfer/info').then((r) => r.data as SpeedInfoResponse)
    return info
  },
  refetchInterval: 1000
})
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
        :value="globalInfo.data.value?.dl_info_speed || 0"
      />
    </VCol>
    <VCol>
      <SpeedCard
        :icon="mdiChevronUp"
        color="upload"
        :value="globalInfo.data.value?.up_info_speed || 0"
      />
    </VCol>
  </VRow>
</template>
