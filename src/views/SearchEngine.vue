<template>
  <div class="px-1 px-sm-5 background noselect">
    <v-row no-gutters class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('search.title') }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn small elevation="0" color="primary" @click="openPluginManager">
            <v-icon>{{ mdiToyBrick }}</v-icon>
          </v-btn>
          <v-btn small elevation="0" @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-card flat>
      <v-list-item class="searchCriterias">
        <v-row class="my-2">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchPattern"
              dense
              hide-details
              clearable
              :rules="[v => !!v || 'Search term is required']"
              label="Search pattern"
              @keydown.enter.prevent="runNewSearch"
              autofocus
            />
          </v-col>
          <v-col cols="6" sm="5" md="2">
            <v-select v-model="searchCategory" height="1" flat dense hide-details outlined :items="categories" label="Search category" />
          </v-col>
          <v-col cols="6" sm="5" md="2">
            <v-select v-model="searchPlugin" height="1" flat dense hide-details outlined :items="plugins" label="Search plugins" />
          </v-col>
          <v-col cols="12" sm="2" class="d-flex align-center justify-center">
            <v-btn v-if="queryId === 0" class="mx-auto accent white--text elevation-0 px-4" @click="runNewSearch">
              {{ $t('search.runNewSearch') }}
            </v-btn>
            <v-btn v-else class="mx-auto warning white--text elevation-0 px-4" @click="stopSearch">
              {{ $t('search.stopSearch') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-card>

    <v-card flat class="mt-5">
      <v-list-item class="searchResults">
        <v-data-table style="width: 100%" id="searchResultsTable" :headers="headers" :items="filteredResults" :search="resultFilter" :custom-filter="customFilter">
          <template v-slot:top>
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field v-model="resultFilter" dense hide-details label="Filter" />
              </v-col>
            </v-row>
          </template>
          <template v-slot:item.fileSize="{ item }">
            {{ item.fileSize | formatSize }}
          </template>
          <template v-slot:item.actions="{ item }">
            <span class="search-actions">
              <v-icon @click="downloadTorrent(item)">{{ mdiDownload }}</v-icon>
            </span>
          </template>
        </v-data-table>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapGetters} from 'vuex'
import {mdiClose, mdiDownload, mdiToyBrick} from '@mdi/js'
import qbit from '@/services/qbit'
import {General} from '@/mixins'
import {SearchPlugin, SearchResult} from '@/types/qbit/models'

export default defineComponent({
  name: 'SearchEngine',
  mixins: [General],
  data() {
    return {
      headers: [
        { text: 'Filename', value: 'fileName' },
        { text: 'File Size', value: 'fileSize' },
        { text: 'Seeders', value: 'nbSeeders' },
        { text: 'Leechers', value: 'nbLeechers' },
        { text: 'Site URL', value: 'siteUrl' },
        { text: '', value: 'actions', sortable: false }
      ],
      searchPattern: '',
      searchCategory: 'all',
      searchPlugin: 'enabled',
      queryId: 0,
      queryTimer: NaN as NodeJS.Timer,
      queryResults: [] as SearchResult[],
      resultFilter: '',
      mdiClose,
      mdiDownload,
      mdiToyBrick
    }
  },
  computed: {
    ...mapGetters(['getSearchPlugins', 'getModals']),
    categories() {
      const cats = [
        { text: 'Movies', value: 'movies' },
        { text: 'TV shows', value: 'tv' },
        { text: 'Music', value: 'music' },
        { text: 'Games', value: 'games' },
        { text: 'Anime', value: 'anime' },
        { text: 'Software', value: 'software' },
        { text: 'Pictures', value: 'pictures' },
        { text: 'Books', value: 'books' }
      ]
      cats.sort((a, b) => a.text.localeCompare(b.text))

      return [{ text: 'All categories', value: 'all' }, ...cats]
    },
    plugins() {
      const plugins = [
        { text: 'All plugins', value: 'all' },
        { text: 'Only enabled', value: 'enabled' }
      ]

      this.getSearchPlugins().filter((plugin: SearchPlugin) => plugin.enabled).forEach((plugin: SearchPlugin) => plugins.push({ text: plugin.fullName, value: plugin.name }))

      return plugins
    },
    filteredResults() {
      return this.queryResults
    }
  },
  async mounted() {
    await this.$store.dispatch('FETCH_SEARCH_PLUGINS')
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  async beforeDestroy() {
    await this.stopSearch()
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  methods: {
    openPluginManager() {
      this.createModal('SearchPluginManager')
    },
    close() {
      this.$router.back()
    },
    async runNewSearch() {
      const searchJob = await qbit.startSearch(this.searchPattern, this.searchCategory, [this.searchPlugin])
      this.queryId = searchJob.id
      this.queryTimer = setInterval(() => this.refreshResults(), 1000)
    },
    async stopSearch() {
      if (this.queryId !== 0) await qbit.stopSearch(this.queryId)

      this.queryId = 0
      clearInterval(this.queryTimer)
    },
    async refreshResults() {
      const response = await qbit.getSearchResults(this.queryId, this.queryResults.length)
      this.queryResults.push(...response.results)

      if (response.status === 'Stopped') {
        this.queryId = 0
        await this.stopSearch()
      }
    },
    downloadTorrent(item: SearchResult) {
      this.createModal('AddModal', { initialMagnet: item.fileUrl })
    },
    customFilter(value: any, search: string | null) {
      return value != null
          && search != null
          && typeof value === 'string'
          && search.trim().toLowerCase().split(' ').every(i => value.toString().toLowerCase().indexOf(i) !== -1)
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.getModals().length === 0) {
        this.close()
      }
    }
  }
})
</script>

<style scoped lang="scss">
.search-actions {
  display: flex;
  flex-direction: row;
}
</style>
