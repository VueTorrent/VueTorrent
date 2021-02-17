<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :width="dialogWidth"
    :fullscreen="phoneLayout"
    :style="{ height: phoneLayout ? '100vh' : '' }"
  >
    <v-card :style="{ height: phoneLayout ? '100vh' : '' }">
      <v-card-title class="justify-center">
        <h2>Search</h2>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-form
          ref="form"
          v-model="searchForm.valid"
        >
          <v-flex row class="my-1 py-1 px-2 mx-auto">
            <v-col class="pa-0" cols="8">
              <v-text-field
                v-model="searchForm.pattern"
                :prepend-inner-icon="mdiMagnify"
                label="Search"
                :rules="[v => !!v || 'Searchterm is required']"
                clearable
                style="width: 95%;"
                @keydown.enter="$refs.searchButton.click"
              />
            </v-col>
            <v-col class="pa-0 mt-2" cols="3">
              <v-btn
                ref="searchButton"
                class="mt-2 mx-0"
                :disabled="!searchForm.valid"
                :color="loading ? 'warning' : 'primary'"
                @click="loading ? stopSearch() : startSearch()"
              >
                {{ loading ? "Stop" : "Search" }}
              </v-btn>
            </v-col>
          </v-flex>
        </v-form>
        <perfect-scrollbar>
          <v-data-table
            :headers="grid.headers"
            :items="search.results"
            :items-per-page="10"
            :loading="loading"
            :style="{ maxHeight: '60vh'}"
          >
            <template #[`item.fileName`]="{ item }">
              <a
                :href="item.descrLink"
                target="_blank"
                v-text="item.fileName"
              />
            </template>
            <template #[`item.fileSize`]="{ item }">
              {{ item.fileSize | formatSize }}
            </template>
            <template #[`item.actions`]="{ item }">
              <v-icon @click="downloadTorrent(item)">
                {{ mdiDownload }}
              </v-icon>
            </template>
          </v-data-table>
        </perfect-scrollbar>
      </v-card-text>
      <v-card-actions>
        <PluginManager />
      </v-card-actions>
      <v-fab-transition v-if="phoneLayout">
        <v-btn
          color="red"
          dark
          absolute
          bottom
          right
          @click="close"
        >
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { Modal, FullScreenModal, General } from '@/mixins'
import PluginManager from './PluginManager'
import { mdiClose, mdiMagnify, mdiDownload } from '@mdi/js'

export default {
  name: 'SearchModal',
  components: { PluginManager },
  mixins: [Modal, FullScreenModal, General],
  data() {
    return {
      search: {
        id: null,
        status: null,
        interval: null,
        results: []
      },
      loading: false,
      grid: {
        headers: [
          { text: 'Name', value: 'fileName' },
          { text: 'Size', value: 'fileSize' },
          { text: 'Seeds', value: 'nbSeeders' },
          { text: 'Peers', value: 'nbLeechers' },
          { text: 'Search_engine', value: 'siteUrl' },
          { text: 'Action', value: 'actions', sortable: false }
        ]
      },
      searchForm: {
        valid: false,
        pattern: ''
      },
      mdiClose, mdiMagnify, mdiDownload
    }
  },
  computed: {
    ...mapGetters(['getSearchPlugins']),
    dialogWidth() {
      return this.phoneLayout ? '100%' : '70%'
    },
    enabledSearchPlugins() {
      return this.getSearchPlugins().filter(p => p.enabled)
    }
  },
  created() {
    this.$store.commit('FETCH_SEARCH_PLUGINS')
  },
  methods: {
    async startSearch() {
      if (this.searchForm.pattern.length && !this.search.interval) {
        this.loading = true
        this.search.status = 'Running'
        this.search.results = []
        const data = await qbit.startSearch(
          this.searchForm.pattern,
          this.enabledSearchPlugins.map(p => p.name)
        )
        this.search.id = data.id
        await this.getStatus()
        this.search.interval = setInterval(async () => {
          const status = await this.getStatus()
          if (status === 'Stopped') {
            clearInterval(this.search.interval)
            this.search.interval = null
            await this.getResults()
          }
        }, 500)
      }
    },
    async getStatus() {
      if (this.search.id) {
        const data = await qbit.getSearchStatus(this.search.id)

        return (this.search.status = data[0].status)
      }
    },
    async getResults() {
      const data = await qbit.getSearchResults(this.search.id)
      this.search.results = data.results
      this.loading = false
    },
    downloadTorrent(item) {
      this.createModal('addModal', { initialMagnet: item.fileUrl })
    },
    stopSearch() {
      qbit.stopSearch(this.search.id)
    },
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>
