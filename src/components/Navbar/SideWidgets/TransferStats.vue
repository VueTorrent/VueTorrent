<script setup lang="ts">
import DataCard from './Cards/DataCard.vue'
import StatSection from './StatSection.vue'
import { useI18nUtils } from '@/composables'
import { useMaindataStore } from '@/stores'

const { t } = useI18nUtils()
const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection columns="2">
    <DataCard
      orientation="row"
      :title="t('navbar.side.transfer_stats.download')"
      :value="[maindataStore.serverState?.dl_info_data ?? 0, maindataStore.serverState?.alltime_dl ?? 0]"
      color="download"
      icon="mdi-download" />
    <DataCard
      orientation="row"
      :title="t('navbar.side.transfer_stats.upload')"
      :value="[maindataStore.serverState?.up_info_data ?? 0, maindataStore.serverState?.alltime_ul ?? 0]"
      color="upload"
      icon="mdi-upload" />
  </StatSection>
</template>
