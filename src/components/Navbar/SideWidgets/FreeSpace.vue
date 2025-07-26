<script setup lang="ts">
import DataCard from './Cards/DataCard.vue'
import StringCard from './Cards/StringCard.vue'
import StatSection from './StatSection.vue'
import { useI18nUtils } from '@/composables'
import { useMaindataStore } from '@/stores'

const { t } = useI18nUtils()
const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection columns="2">
    <StringCard
      orientation="row"
      :title="t('navbar.side.free_space.global_ratio')"
      :value="maindataStore.serverState?.global_ratio ?? 0"
      color="ratio"
      icon="mdi-compare-horizontal" />
    <DataCard
      orientation="row"
      :title="t('navbar.side.free_space.free_space_on_disk')"
      :value="maindataStore.serverState?.free_space_on_disk ?? 0"
      color="upload"
      icon="mdi-chart-donut" />
  </StatSection>
</template>
