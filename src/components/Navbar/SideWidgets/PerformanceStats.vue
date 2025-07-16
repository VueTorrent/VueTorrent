<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/Cards/DataCard.vue'
import StringCard from '@/components/Core/Cards/StringCard.vue'
import UnitCard from '@/components/Core/Cards/UnitCard.vue'
import { useMaindataStore } from '@/stores'

const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection>
    <div class="d-flex flex-column flex-gap">
      <div class="d-flex flex-row flex-gap flex-wrap">
        <UnitCard :value="maindataStore.serverState?.average_time_queue ?? 0" unit="ms" color="" icon="mdi-file-clock" />
        <StringCard :value="maindataStore.serverState?.queued_io_jobs ?? 0" color="" icon="mdi-harddisk" />
      </div>

      <div class="d-flex flex-row flex-gap flex-wrap">
        <DataCard :value="[maindataStore.serverState?.total_buffers_size ?? 0]" color="" icon="mdi-dns" />
        <DataCard :value="[maindataStore.serverState?.total_queued_size ?? 0]" color="" icon="mdi-tray-full" />
      </div>

      <div class="d-flex flex-row flex-gap flex-wrap">
        <StringCard :value="maindataStore.serverState?.read_cache_hits ?? 0" color="download" icon="mdi-check-circle" />
        <StringCard :value="maindataStore.serverState?.read_cache_overload ?? 0" color="download" icon="mdi-alert" />
        <DataCard :value="[maindataStore.serverState?.total_wasted_session ?? 0]" color="warning" icon="mdi-recycle-variant" />
        <StringCard :value="maindataStore.serverState?.write_cache_overload ?? 0" color="warning" icon="mdi-alert" />
      </div>
    </div>
  </StatSection>
</template>
