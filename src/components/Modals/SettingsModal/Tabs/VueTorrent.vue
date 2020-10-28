<template>
    <v-container>
        <v-card flat>
          <v-tabs v-model="tab">
            <v-tab href="#general">General</v-tab>
            <v-tab href="#dashboard">Dashboard</v-tab>
          </v-tabs>
          <v-tabs-items
              v-model="tab"
              :touch="updateTab(tab)"
          >
            <v-tab-item value="general">
              <General :is-active="tab === 'downloads'" />
            </v-tab-item>
            <v-tab-item value="dashboard">
              <Dashboard :is-active="tab === 'bittorrent'" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import General from './Vuetorrent/General'
import Dashboard from './Vuetorrent/Dashboard'

export default {
    name: 'VueTorrent',
    components: {
        General, Dashboard
    },
    data : () => ({
        tab: null
    }),
    methods: {
        updateTab(tab) {
            this.tab = tab
        }
    }
}
</script>