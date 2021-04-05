<template>
  <v-card flat>
    <perfect-scrollbar>
      <v-card-text class="pa-1" :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh'}">
        <v-tabs v-model="tab">
          <v-tab href="#general">
            General
          </v-tab>
          <v-tab href="#dashboard">
            Dashboard
          </v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="tab"
          touchless
        >
          <v-tab-item value="general">
            <General :is-active="tab === 'downloads'" />
          </v-tab-item>
          <v-tab-item value="dashboard">
            <Dashboard :is-active="tab === 'bittorrent'" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </perfect-scrollbar>
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
