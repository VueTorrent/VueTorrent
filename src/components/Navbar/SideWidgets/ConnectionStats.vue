<script setup lang="ts">
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
      :title="t('navbar.side.connection_stats.dht_nodes_connected')"
      :value="maindataStore.serverState?.dht_nodes ?? 0"
      color=""
      icon="mdi-server-network-outline" />
    <StringCard
      orientation="row"
      :title="t('navbar.side.connection_stats.total_peers_connections')"
      :value="maindataStore.serverState?.total_peer_connections ?? 0"
      color=""
      icon="mdi-connection" />
  </StatSection>
</template>
