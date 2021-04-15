<template>
  <v-card flat>
    <v-tabs v-model="tab">
      <v-tab href="#general">
        General
      </v-tab>
      <v-tab href="#dashboard">
        Dashboard
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" touchless>
      <v-tab-item eager value="general">
        <!--<General :is-active="tab === 'downloads'" />-->
        <General />
      </v-tab-item>
      <v-tab-item eager value="dashboard">
        <!--<Dashboard :is-active="tab === 'bittorrent'" />-->
        <Dashboard />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import General from './Vuetorrent/General'
import Dashboard from './Vuetorrent/Dashboard'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'VueTorrent',
  components: {
    General, Dashboard
  },
  mixins: [FullScreenModal],
  data: () => ({
    tab: null
  })
}
</script>
