<script setup lang="ts">
import StatSection from './StatSection.vue'
import DataCard from '@/components/Core/Cards/DataCard.vue'
import StringCard from '@/components/Core/Cards/StringCard.vue'
import UnitCard from '@/components/Core/Cards/UnitCard.vue'
import { useI18nUtils } from '@/composables'
import { useMaindataStore } from '@/stores'

const { t } = useI18nUtils()
const maindataStore = useMaindataStore()
</script>

<template>
  <StatSection columns="4">
    <UnitCard
      :title="t('navbar.side.performance_stats.average_time_queue')"
      :value="maindataStore.serverState?.average_time_queue ?? 0"
      unit="ms"
      color=""
      icon="mdi-file-clock"
      class="grid-col-span-2" />
    <StringCard
      :title="t('navbar.side.performance_stats.queued_io_jobs')"
      :value="maindataStore.serverState?.queued_io_jobs ?? 0"
      color=""
      icon="mdi-harddisk"
      class="grid-col-span-2" />

    <DataCard
      :title="t('navbar.side.performance_stats.total_buffers_size')"
      :value="[maindataStore.serverState?.total_buffers_size ?? 0]"
      color=""
      icon="mdi-dns"
      class="grid-col-span-2" />
    <DataCard
      :title="t('navbar.side.performance_stats.total_queued_size')"
      :value="[maindataStore.serverState?.total_queued_size ?? 0]"
      color=""
      icon="mdi-tray-full"
      class="grid-col-span-2" />

    <StringCard :title="t('navbar.side.performance_stats.read_cache_hits')" :value="maindataStore.serverState?.read_cache_hits ?? 0" color="download" icon="mdi-check-circle" />
    <StringCard :title="t('navbar.side.performance_stats.read_cache_overload')" :value="maindataStore.serverState?.read_cache_overload ?? 0" color="download" icon="mdi-alert" />
    <DataCard
      :title="t('navbar.side.performance_stats.total_wasted_session')"
      :value="[maindataStore.serverState?.total_wasted_session ?? 0]"
      color="warning"
      icon="mdi-recycle-variant" />
    <StringCard :title="t('navbar.side.performance_stats.write_cache_overload')" :value="maindataStore.serverState?.write_cache_overload ?? 0" color="warning" icon="mdi-alert" />
  </StatSection>
</template>
