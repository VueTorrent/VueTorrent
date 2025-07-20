<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/Cards/DataCard.vue'
import StringCard from '@/components/Core/Cards/StringCard.vue'
import { useI18nUtils } from '@/composables'
import { useMaindataStore } from '@/stores'

const { t } = useI18nUtils()
const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection>
    <div class="d-flex flex-row flex-gap-column">
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
    </div>
  </StatSection>
</template>
