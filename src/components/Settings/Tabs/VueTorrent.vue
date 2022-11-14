<template>
  <v-card flat>
    <v-tabs v-model="tab">
      <v-tab href="#general">
        {{ $t('modals.settings.pageVueTorrent.tabName.general') }}
      </v-tab>
      <v-tab href="#dashboard">
        {{ $t('modals.settings.pageVueTorrent.tabName.dashboard') }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" touchless>
      <v-tab-item eager value="general">
        <VGeneral />
      </v-tab-item>
      <v-tab-item eager value="dashboard">
        <Dashboard />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import VGeneral from './VueTorrent/VGeneral.vue'
import Dashboard from './VueTorrent/Dashboard.vue'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'VueTorrent',
  components: {
    VGeneral,
    Dashboard
  },
  mixins: [FullScreenModal],
  data: () => ({
    tab: null
  })
}
</script>
