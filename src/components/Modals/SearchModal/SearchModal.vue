<template>
    <v-dialog
        v-model="dialog"
        scrollable
        :width="dialogWidth"
        :fullscreen="phoneLayout"
        persistent
    >
        <v-card :style="{ height: phoneLayout ? '100vh' : '' }">
          <v-card-title class="headline">
            <v-icon class="mr-2">mdi-card-search-outline</v-icon>
            <span v-text="'Search'" />
            <v-spacer />
            <v-btn
                icon
                @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <SearchForm
                :loading="loading"
                @triggerSearch="triggerSearch"
                @stopSearch="stopSearch"
            />

            <v-data-table
                :headers="grid.headers"
                :items="grid.searchItems"
                :items-per-page="10"
                :loading="loading"
                class="elevation-1"
            >
              <template #[`item.fileName`]="{ item }">
                <a
                    :href="item.descrLink"
                    target="_blank"
                    v-text="item.fileName"
                />
              </template>
              <template v-slot:[`item.fileSize`]="{ item }">
                {{ item.fileSize | formatSize }}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="downloadTorrent(item)">mdi-download</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn>
              <v-icon>mdi-cog</v-icon> Plugin manager
            </v-btn>
          </v-card-actions>
            <v-fab-transition v-if="phoneLayout">
                <v-btn @click="close" color="red" dark absolute bottom right>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-card>
    </v-dialog>
</template>

<script>
import SearchForm from './SearchForm'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
    name: 'SearchModal',
    components : {SearchForm},
    mixins: [Modal, FullScreenModal],
    data() {
        return {
            searchTerm: null,
            searchCategory: null,
            searchId: null,
            status: null,
            searchInterval: null,
            results: [],
            noResults: false, //old variables end here
            loading: false,
            grid: {
                searchItems: [],
                downloadItem: {
                    descrLink: '',
                    fileName: '',
                    fileSize: 0,
                    fileUrl: '',
                    nbLeechers: 0,
                    nbSeeders: 0,
                    siteUrl: ''
                },
                headers: [
                    { text: 'Name', value: 'fileName' },
                    { text: 'Size', value: 'fileSize' },
                    { text: 'Seeds', value: 'nbSeeders' },
                    { text: 'Peers', value: 'nbLeechers' },
                    { text: 'Search_engine', value: 'siteUrl' },
                    { text: 'Action', value: 'actions', sortable: false }
                ]
            }
        }
    },
    computed: {
        dialogWidth() {
            return this.phoneLayout ? '100%' : '80%'
        }
    },
    methods: {
        async search() {
            this.noResults = false
            if (this.searchTerm && !this.searchInterval) {
                this.status = 'Running'
                this.results = []
                const {data} = await qbit.startSearch(
                    this.searchTerm,
                    this.searchCategory
                )
                this.searchId = data.id
                this.searchInterval = setInterval(async () => {
                    let status = await this.getStatus()
                    if (status === 'Stopped') {
                        clearInterval(this.searchInterval)
                        this.searchInterval = null
                        this.getResults()
                    }
                }, 2000)
            }
        },
        async getStatus() {
            if (this.searchId) {
                const { data } = await qbit.getSearchStatus(this.searchId)
                return (this.status = data[0].status)
            }
        },
        async getResults() {
            const { data } = await qbit.getSearchResults(this.searchId)
            this.results = data.results
            if (data.results.length === 0) this.noResults = true
        },
        addTorrent(torrent) {
            let params = { urls: null }
            params.urls = torrent
            qbit.addTorrents(params)
        },
        async downloadTorrent(item) {
            console.log(item)
        },
        async triggerSearch(searchForm) {
            this.grid.searchItems = [] // Clear the table
            this.loading = true
            console.log(searchForm)
        },
        async stopSearch(){
            //
        },
        close() {
            this.$store.commit('DELETE_MODAL', this.guid)
        }
    }

}
</script>
