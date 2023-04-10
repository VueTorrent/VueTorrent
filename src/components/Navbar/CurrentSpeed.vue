<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { useQuery } from '@tanstack/vue-query'
import { useAxios } from '@/composables/useAxios'

import SpeedCard from '@/components/Core/SpeedCard.vue'

interface GlobalInfo {
  connection_status: string
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
}

// props
const props = defineProps<{
  status: boolean
}>()

// composables
const axios = useAxios()

const globalInfo = useQuery({
  queryKey: ['globalInfo'],
  queryFn: async () => {
    const info = await axios.get('transfer/info').then((r) => r.data as GlobalInfo)
    return { info }
  },
  refetchInterval: 1000
})
</script>

<template>
  <VContainer v-if="status">
    <VRow>
      <VCol>
        <span class="text-uppercase caption ml-4 font-weight-medium">
          {{ $t('navbar.currentSpeed') }}
        </span>
      </VCol>
    </VRow>
    <VRow dense class="mx-1 pt-1">
      <VCol>
        <SpeedCard
          :icon="mdiChevronDown"
          color="download"
          :value="globalInfo.data.value?.info.dl_info_speed || 0"
        />
      </VCol>
      <VCol>
        <SpeedCard
          :icon="mdiChevronUp"
          color="upload"
          :value="globalInfo.data.value?.info.up_info_speed || 0"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
