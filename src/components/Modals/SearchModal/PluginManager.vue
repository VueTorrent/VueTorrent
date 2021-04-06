<template>
  <div>
    <v-btn @click="opened = true">
      <v-icon>{{ mdiCog }}</v-icon> Plugin manager
    </v-btn>

    <v-bottom-sheet
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="opened"
      scrollable
      inset
    >
      <v-sheet>
        <v-card>
          <v-card-title> <v-icon>{{ mdiToyBrick }}</v-icon> Plugin manager </v-card-title>
          <v-card-text>
            <v-switch
              v-for="(plugin, key) in searchPlugins"
              :key="key"
              :input-value="plugin.enabled"
              :label="plugin.fullName"
              @change="togglePlugin(plugin)"
            />
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog v-else v-model="opened" width="50%">
      <v-card>
        <v-card-title> <v-icon>{{ mdiToyBrick }}</v-icon> Plugin manager </v-card-title>
        <v-card-text>
          <v-switch
            v-for="(plugin, key) in searchPlugins"
            :key="key"
            v-model="plugin.enabled"
            :label="plugin.fullName"
            @change="togglePlugin(plugin)"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import { mdiCog, mdiToyBrick } from '@mdi/js'
export default {
  name: 'PluginsManager',
  data: () => ({
    opened: false,
    mdiCog, mdiToyBrick
  }),
  computed: {
    ...mapState(['searchPlugins'])
  },
  watch: {
    opened() {
      this.$store.commit('FETCH_SEARCH_PLUGINS')
    }
  },
  methods: {
    togglePlugin(plugin) {
      qbit.enableSearchPlugin([plugin.name], plugin.enabled)
    }
  },
  mounted() {
    if(!this.searchPlugins.length) {
      qbit.updateSearchPlugins()
    }
  }
}
</script>
