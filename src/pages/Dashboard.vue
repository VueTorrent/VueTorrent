<script setup lang="ts">
import Torrent from '@/components/Dashboard/Torrent.vue'
import { useDashboardStore, useMaindataStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('dashboard.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
        </div>
      </v-col>
    </v-row>

    <v-list>
      <Torrent :torrent="torrent" v-for="torrent in maindataStore.torrents" />
    </v-list>

    <v-pagination v-model="dashboardStore.currentPage" />
  </div>
</template>

<style scoped>

</style>