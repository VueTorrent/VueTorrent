<template>
  <div>
    <v-btn @click="opened = true">
      <v-icon>{{ mdiCog }}</v-icon> {{ $t('modals.pluginManager.title') | titleCase }}
    </v-btn>
    <v-dialog v-model="opened" width="50%">
      <v-card class="pa-0">
        <v-card-title class="justify-center pa-1" >
          <v-toolbar flat dense class="transparent">
            <v-toolbar-title>
             <v-icon>{{ mdiToyBrick }}</v-icon> Plugin manager
            </v-toolbar-title>
            <v-spacer/>
            <v-btn fab small class="transparent elevation-0" @click="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-switch v-for="(plugin, key) in searchPlugins" :key="key" v-model="plugin.enabled" :label="plugin.fullName" @change="togglePlugin(plugin)" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import { mdiCog, mdiToyBrick, mdiClose } from '@mdi/js'

export default {
  name: 'PluginsManager',
  data: () => ({
    opened: false,
    mdiCog,
    mdiToyBrick,
    mdiClose
  }),
  computed: {
    ...mapState(['searchPlugins'])
  },
  watch: {
    opened() {
      this.$store.commit('FETCH_SEARCH_PLUGINS')
    }
  },
  mounted() {
    if (!this.searchPlugins.length) {
      qbit.updateSearchPlugins()
    }
  },
  methods: {
    togglePlugin(plugin) {
      qbit.enableSearchPlugin([plugin.name], plugin.enabled)
    },
    close(){
      this.opened = false
    }
  }
}
</script>
