<template>
  <div>
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
import {mdiDownload} from '@mdi/js'
import {SearchPlugin, SearchResult} from "@/types/qbit/models";
import {General} from "@/mixins";
import qbit from "@/services/qbit";

export default defineComponent({
  name: "SearchTab",
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
      mdiDownload
    }
  },
  async beforeDestroy() {
    await this.stopSearch()
  },
  computed: {
    ...mapGetters(['getSearchPlugins']),
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
  methods: {
    downloadTorrent(item: SearchResult) {
      this.createModal('AddModal', { initialMagnet: item.fileUrl })
    },
    async runNewSearch() {
      const searchJob = await qbit.startSearch(this.searchPattern, this.searchCategory, [this.searchPlugin])
      this.queryId = searchJob.id
      this.queryResults = []
      this.queryTimer = setInterval(() => this.refreshResults(), 1000)
    },
    async stopSearch() {
      if (this.queryId !== 0) await qbit.stopSearch(this.queryId)

      this.queryId = 0
      clearInterval(this.queryTimer)
    },
    customFilter(value: any, search: string | null) {
      return value != null
          && search != null
          && typeof value === 'string'
          && search.trim().toLowerCase().split(' ').every(i => value.toString().toLowerCase().indexOf(i) !== -1)
    },
    async refreshResults() {
      const response = await qbit.getSearchResults(this.queryId, this.queryResults.length)
      this.queryResults.push(...response.results)

      if (response.status === 'Stopped') {
        this.queryId = 0
        await this.stopSearch()
      }
    },
  }
})
</script>

<style scoped lang="scss">

</style>