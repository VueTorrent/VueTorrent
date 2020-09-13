<template>
    <v-dialog
        v-model="dialog"
        scrollable
        :width="dialogWidth"
        :fullscreen="phoneLayout"
    >
        <v-card min-height="400px">
            <v-container
                :style="{ height: phoneLayout ? '100vh' : '' }"
                :class="`pa-0 project done`"
            >
                <v-card-title class="justify-center">
                    <h2>Search Torrent</h2>
                </v-card-title>
                <v-card-text>
                    <div>
                        <v-container>
                            <v-row no-gutters>
                                <v-col ref="fileZone">
                                    <v-text-field
                                        label="Search"
                                        prepend-icon="search"
                                        required
                                        :autofocus="!phoneLayout"
                                        v-model="searchTerm"
                                        v-on:keydown.enter="search"
                                    />
                                    <v-text-field
                                        label="Category"
                                        prepend-icon="category"
                                        v-model="searchCategory"
                                        v-on:keydown.enter="search"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-card-text>

                <v-spacer></v-spacer>
                <div>
                    <v-card-actions class="justify-center">
                        <v-btn
                            text
                            @click="search"
                            :loading="status === 'Running'"
                            class="blue_accent white--text"
                            >Search</v-btn
                        >
                    </v-card-actions>
                </div>
                <div class="text-center mt-6">
                    <p
                        v-if="noResults"
                        class="red--text"
                        style="font-size: 1.3em"
                    >
                        No results could be found
                    </p>
                    <div v-if="results.length">
                        <h2>Results</h2>
                        <perfect-scrollbar>
                            <v-list
                                rounded
                                style="max-height: 500px; min-height: 400px"
                            >
                                <v-list-item>
                                    <v-list-item-title
                                        >FileName</v-list-item-title
                                    >
                                    <v-list-item-subtitle style="max-width: 20%"
                                        >Size</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle style="max-width: 20%"
                                        >Seeders</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle style="max-width: 20%"
                                        >Leechers</v-list-item-subtitle
                                    >
                                </v-list-item>
                                <v-list-item
                                    @click="addTorrent(res.fileUrl)"
                                    v-for="res in results"
                                    :key="res.title"
                                >
                                    <v-list-item-title>
                                        {{ res.fileName }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle
                                        style="max-width: 20%"
                                    >
                                        {{ res.fileSize | size }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle
                                        style="max-width: 20%"
                                    >
                                        {{ res.nbSeeders }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle
                                        style="max-width: 20%"
                                    >
                                        {{ res.nbLeechers }}
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </perfect-scrollbar>
                    </div>
                </div>
            </v-container>
            <v-fab-transition v-if="phoneLayout">
                <v-btn @click="close" color="red" dark absolute bottom right>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-card>
    </v-dialog>
</template>

<script>
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
    name: 'SearchModal',
    mixins: [Modal, FullScreenModal],
    data() {
        return {
            searchTerm: null,
            searchCategory: null,
            searchId: null,
            status: null,
            searchInterval: null,
            results: [],
            noResults: false
        }
    },
    methods: {
        async search() {
            this.noResults = false
            if (this.searchTerm && !this.searchInterval) {
                this.status = 'Running'
                this.results = []
                const { data } = await qbit.startSearch(
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
        close() {
            this.$store.commit('DELETE_MODAL', this.guid)
        }
    }
}
</script>
