<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/Cards/DataCard.vue'
import { useMaindataStore } from '@/stores'

const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection>
    <div class="d-flex flex-row flex-gap-column">
      <DataCard orientation="row" :value="[maindataStore.serverState?.alltime_dl ?? 0, maindataStore.serverState?.dl_info_data ?? 0]" color="download" icon="mdi-download" />
      <DataCard orientation="row" :value="[maindataStore.serverState?.alltime_ul ?? 0, maindataStore.serverState?.up_info_data ?? 0]" color="upload" icon="mdi-upload" />
    </div>
  </StatSection>
</template>
