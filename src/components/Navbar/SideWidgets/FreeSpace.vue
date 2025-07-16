<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/Cards/DataCard.vue'
import StringCard from '@/components/Core/Cards/StringCard.vue'
import { useMaindataStore } from '@/stores'

const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection>
    <div class="d-flex flex-row flex-gap-column">
      <StringCard orientation="row" :value="maindataStore.serverState?.global_ratio ?? 0" color="ratio" icon="mdi-compare-horizontal" />
      <DataCard orientation="row" :value="maindataStore.serverState?.free_space_on_disk ?? 0" color="upload" icon="mdi-chart-donut" />
    </div>
  </StatSection>
</template>
