<template>
  <v-dialog v-model="dialog" scrollable :width="dialogWidth" :fullscreen="phoneLayout">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.searchPluginManager.title') }}</h3>
        </v-toolbar-title>
      </v-card-title>

      <v-card-text>
        <v-data-table
          v-model="enabledPlugins"
          item-key="name"
          :headers="headers"
          :items="searchPlugins"
          disable-pagination
          show-select
          sort-by="name"
          :loading="loading"
          @item-selected="onTogglePlugin"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon color="red" small @click="uninstallPlugin(item)">
              {{ mdiDelete }}
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-dialog v-model="installDialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary white--text elevation-0 px-4" @click="installNewPlugin" v-on="on">Install</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <h5>{{ $t('modals.searchPluginManager.install.title') }}</h5>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="installInput" :label="$t('modals.searchPluginManager.install.label')" required />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="accent darken-1" text @click="closeInstallDialog">{{ $t('cancel') }}</v-btn>
              <v-btn color="accent darken-1" text @click="installNewPlugin">{{ $t('ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer />

        <v-btn class="white--text elevation-0 px-4" @click="checkForPluginUpdates">
          {{ $t('modals.searchPluginManager.checkForUpdates') }}
        </v-btn>
        <v-btn class="accent white--text elevation-0 px-4" @click="close">
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, Modal } from '@/mixins'
import { mapState } from 'vuex'
import { SearchPlugin } from '@/types/qbit/models'
import qbit from '@/services/qbit'
import { mdiDelete } from '@mdi/js'

export default defineComponent({
  name: "SearchPluginManager",
  mixins: [Modal, FullScreenModal],
  data() {
    return {
      headers: [
        {text: 'Name', value: 'fullName'},
        {text: 'Version', value: 'version'},
        {text: 'URL', value: 'url'},
        {text: 'Actions', value: 'actions'}
      ],
      enabledPlugins: [],
      loading: false,
      installDialog: false,
      installInput: '',
      mdiDelete
    }
  },
  computed: {
    ...mapState(['searchPlugins'])
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)

    this.loading = true
    this.$store.commit('FETCH_SEARCH_PLUGINS')
    this.enabledPlugins = this.searchPlugins.filter((plugin: SearchPlugin) => plugin.enabled)
    this.loading = false
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  methods: {
    async onTogglePlugin(payload: {item: SearchPlugin, value: boolean}) {
      this.loading = true
      await qbit.enableSearchPlugin([payload.item.name], payload.value)
      this.loading = false
    },
    async installNewPlugin() {
      this.loading = true
      this.closeInstallDialog()
      await qbit.installSearchPlugin([this.installInput])
      this.installInput = ''
      this.loading = false
    },
    async checkForPluginUpdates() {
      this.loading = true
      await qbit.updateSearchPlugins()
      this.$store.commit('FETCH_SEARCH_PLUGINS')
      this.loading = false
    },
    async uninstallPlugin(plugin: SearchPlugin) {
      this.loading = true
      await qbit.uninstallSearchPlugin([plugin.name])
      this.$store.commit('FETCH_SEARCH_PLUGINS')
      this.loading = false
    },
    close() {
      this.dialog = false
    },
    closeInstallDialog() {
      this.installDialog = false
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  }
});
</script>