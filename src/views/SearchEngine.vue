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
          <v-btn small elevation="0" color="error" @click="stopAllSearch">
            <v-icon>{{ mdiStop }}</v-icon>
          </v-btn>
          <v-btn small elevation="0" color="primary" @click="openPluginManager">
            <v-icon>{{ mdiToyBrick }}</v-icon>
          </v-btn>
          <v-btn small elevation="0" @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-container class="d-flex align-center justify-center ma-0 pa-0 primary" fluid>
        <v-tabs v-model="tabIndex" ref="tabs" align-with-title show-arrows background-color="primary" slider-color="white" class="overflow-auto">
          <v-tab v-for="t in tabs" :key="t.uniqueId" class="white--text">
            <h4>{{ !t.query || t.query.length === 0 ? $t('search.tabHeaderEmpty') : t.query }}</h4>
          </v-tab>
        </v-tabs>
        <v-spacer />
        <v-btn icon @click="createNewTab" class="mr-1">
          <v-icon color="accent">{{ mdiPlusCircleOutline }}</v-icon>
        </v-btn>
        <v-btn icon @click="deleteTab" :disabled="tabs.length === 1" class="mx-1">
          <v-icon color="error">{{ mdiMinusCircleOutline }}</v-icon>
        </v-btn>
      </v-container>
    </v-row>

    <div>
      <v-card flat>
        <v-list-item class="searchCriterias">
          <v-row class="my-2">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedTab.query"
                ref="queryInput"
                autofocus
                dense
                hide-details
                clearable
                label="Search pattern"
                @keydown.enter.prevent="runNewSearch"
                @input="updateTabWidth"
              />
            </v-col>
            <v-col cols="6" sm="5" md="2">
              <v-select v-model="selectedTab.filters.category" height="1" flat dense hide-details outlined :items="categories" label="Search category" />
            </v-col>
            <v-col cols="6" sm="5" md="2">
              <v-select v-model="selectedTab.filters.plugin" height="1" flat dense hide-details outlined :items="plugins" label="Search plugins" />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center justify-center">
              <v-btn v-if="selectedTab.id === 0" class="mx-auto accent white--text elevation-0 px-4" @click="runNewSearch">
                {{ $t('search.runNewSearch') }}
              </v-btn>
              <v-btn v-else class="mx-auto warning white--text elevation-0 px-4" @click="stopSearch(selectedTab)">
                {{ $t('search.stopSearch') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-card>

      <v-card flat class="mt-5">
        <v-list-item class="searchResults">
          <v-data-table
            style="width: 100%"
            id="searchResultsTable"
            :headers="headers"
            :items="filteredResults"
            :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
            :items-per-page.sync="selectedTab.itemsPerPage"
            :search="selectedTab.filters.title"
            :custom-filter="customFilter"
          >
            <template v-slot:top>
              <v-row class="mt-2">
                <v-col cols="12" md="6">
                  <v-text-field v-model="selectedTab.filters.title" dense hide-details label="Filter" />
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.fileSize="{ item }">
              {{ item.fileSize | formatData(shouldUseBinaryData()) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <span class="d-flex flex-row">
                <v-icon @click="downloadTorrent(item)">{{ mdiDownload }}</v-icon>
              </span>
            </template>
          </v-data-table>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { mdiClose, mdiToyBrick, mdiPlusCircleOutline, mdiMinusCircleOutline, mdiDownload, mdiStop } from '@mdi/js'
import { General } from '@/mixins'
import { SearchPlugin, SearchResult } from '@/types/qbit/models'
import qbit from '@/services/qbit'
import { SearchData } from '@/types/vuetorrent'
import { Optional } from '@/global'
import { v1 as genUuid } from 'uuid'

export default defineComponent({
  name: 'SearchEngine',
  mixins: [General],
  data() {
    return {
      tabIndex: 0,
      tabs: [] as SearchData[],
      headers: [
        { text: 'Filename', value: 'fileName' },
        { text: 'File Size', value: 'fileSize' },
        { text: 'Seeders', value: 'nbSeeders' },
        { text: 'Leechers', value: 'nbLeechers' },
        { text: 'Site URL', value: 'siteUrl' },
        { text: '', value: 'actions', sortable: false }
      ],
      mdiDownload,
      mdiClose,
      mdiToyBrick,
      mdiPlusCircleOutline,
      mdiMinusCircleOutline,
      mdiStop
    }
  },
  computed: {
    ...mapGetters(['getModals', 'getSearchPlugins', 'shouldUseBinaryData']),
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

      this.getSearchPlugins()
        .filter((plugin: SearchPlugin) => plugin.enabled)
        .forEach((plugin: SearchPlugin) => plugins.push({ text: plugin.fullName, value: plugin.name }))

      return plugins
    },
    selectedTab() {
      return this.tabs[this.tabIndex]
    },
    filteredResults() {
      return this.selectedTab.results
    }
  },
  async beforeMount() {
    this.tabs = this.$store.state.searchData
    if (this.tabs.length === 0) this.createNewTab()
    else {
      for (const tab of this.tabs) {
        if (tab.id && tab.id !== 0) {
          tab.timer = setInterval(() => this.refreshResults(tab), 1000)
        }
      }
    }
    await this.$store.dispatch('FETCH_SEARCH_PLUGINS')
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  async beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)

    for (const tab of this.tabs) {
      !!tab.timer && clearInterval(tab.timer)
    }
  },
  methods: {
    openPluginManager() {
      this.createModal('SearchPluginManager')
    },
    createNewTab() {
      this.tabs.push({
        uniqueId: genUuid(),
        id: 0,
        query: '',
        itemsPerPage: 10,
        filters: {
          title: '',
          category: 'all',
          plugin: 'enabled'
        },
        results: [],
        timer: null
      })
      this.tabIndex = this.tabs.length - 1
      const input = this.$refs.queryInput as Optional<HTMLInputElement>
      input && input.focus()
    },
    async deleteTab() {
      await this.stopSearch(this.selectedTab)
      this.tabs.splice(this.tabIndex, 1)
      this.tabIndex = Math.min(this.tabIndex, this.tabs.length - 1)
    },
    downloadTorrent(item: SearchResult) {
      this.createModal('AddModal', { initialMagnet: item.fileUrl })
    },
    async runNewSearch() {
      const searchJob = await qbit.startSearch(this.selectedTab.query, this.selectedTab.filters.category, [this.selectedTab.filters.plugin])
      this.selectedTab.id = searchJob.id
      this.selectedTab.results = []
      this.selectedTab.timer = setInterval(() => this.refreshResults(this.selectedTab), 1000)
    },
    async stopSearch(tab: SearchData) {
      if (tab.id && tab.id !== 0) await qbit.stopSearch(tab.id)
      tab.id = 0
      !!tab.timer && clearInterval(tab.timer)
    },
    async stopAllSearch() {
      for (const tab of this.tabs) {
        await this.stopSearch(tab)
      }
    },
    customFilter(value: any, search: string | null) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        search
          .trim()
          .toLowerCase()
          .split(' ')
          .every(i => value.toString().toLowerCase().indexOf(i) !== -1)
      )
    },
    async refreshResults(tab: SearchData) {
      const response = await qbit.getSearchResults(tab.id, tab.results.length)
      tab.results.push(...response.results)

      if (response.status === 'Stopped') {
        await this.stopSearch(tab)
      }
    },
    close() {
      this.$router.back()
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.getModals().length === 0) {
        this.close()
      }
    },
    updateTabWidth() {
      //@ts-expect-error: TS2339: Property 'onResize' does not exist on type '...'
      this.$refs.tabs && this.$refs.tabs.onResize()
    }
  }
})
</script>

<style scoped lang="scss">
.full-width {
  width: 100%;
}
</style>
