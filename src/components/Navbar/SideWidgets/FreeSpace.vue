<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/DataCard.vue'
import { useMaindataStore } from '@/stores'

const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection>
    <div class="d-flex flex-row flex-gap-column">
      <DataCard :value="maindataStore.serverState?.free_space_on_disk ?? 0" color="upload" icon="mdi-chart-donut" />
    </div>
  </StatSection>
</template>
