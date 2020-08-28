<template>
    <div class="pl-5 pr-5" color="background" @click.self="resetSelected">
        <h1 style="font-size: 1.1em !important" class="subtitle-1 grey--text">
            Dashboard
        </h1>
        <v-container
            color="background"
            class="my-4 pt-5 pa-0"
            @click.self="resetSelected"
        >
            <!-- justify-center here in layout to center!! -->
            <v-flex xs12 sm6 md3 @click.self="resetSelected">
                <v-text-field
                    flat
                    label="type to sort..."
                    height="50"
                    clearable
                    solo
                    hint="eg `s size desc` + enter"
                    color="search"
                    v-model="sort_input"
                    @keyup.enter.native="sortBy"
                ></v-text-field>
            </v-flex>
            <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
                <p class="grey--text">No active Torrents!</p>
            </div>
            <div v-else>
                <div v-for="torrent in torrents" :key="torrent.hash">
                    <Torrent :torrent="torrent" />
                </div>
            </div>
        </v-container>
        <TorrentDetailModal />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Torrent from '@/components/Torrent'
import TorrentDetailModal from '@/components/TorrentDetailModal/TorrentDetailModal'

import { getPropName, sortOrFilter, filterOption } from '@/helpers'

export default {
    name: 'Dashboard',
    components: { Torrent, TorrentDetailModal },
    data() {
        return {
            sort_input: ''
        }
    },
    computed: {
        ...mapState(['mainData', 'torrents', 'selected_torrents'])
    },
    methods: {
        ...mapMutations(['SORT_TORRENTS']),
        sortBy() {
            let parts = this.sort_input.split(' ')

            if (parts.length === 0) {
                let name = 'name'
                let reverse = false
                return this.$store.commit('UPDATE_SORT_OPTIONS', {
                    name,
                    reverse
                })
            }
            //basic sort
            if (parts.length === 1) {
                let name = getPropName(parts[0])
                let reverse = false

                return this.$store.commit('UPDATE_SORT_OPTIONS', {
                    name,
                    reverse
                })
            }

            // could be sort OR filter
            if (parts.length === 2) {
                let type = sortOrFilter(parts[0])
                if (type === 'sort') {
                    let name = getPropName(parts[1])
                    let reverse = false

                    return this.$store.commit('UPDATE_SORT_OPTIONS', {
                        name,
                        reverse
                    })
                }

                if (type === 'filter') {
                    let ftype = filterOption(parts[1])
                    //filter state
                    if (ftype) {
                        let name = 'name'
                        let reverse = false
                        return this.$store.commit('UPDATE_SORT_OPTIONS', {
                            name,
                            reverse,
                            filter: ftype
                        })
                    }

                    //filter name
                    let filtered = this.torrents.filter(t =>
                        t.name.toLowerCase().includes(parts[1].toLowerCase())
                    )
                    let name = 'name'
                    let reverse = false
                    let hashes = filtered.map(t => t.hash)
                    return this.$store.commit('UPDATE_SORT_OPTIONS', {
                        name,
                        reverse,
                        hashes
                    })
                }
            }

            //sort with asc/desc
            if (parts.length === 3) {
                let type = sortOrFilter(parts[0])
                if (type === 'sort') {
                    let name = getPropName(parts[1])
                    let reverse = parts[2] === 'desc'

                    return this.$store.commit('UPDATE_SORT_OPTIONS', {
                        name,
                        reverse
                    })
                }
            }
        },
        resetSelected() {
            this.$store.commit('RESET_SELECTED')
        }
    },
    created() {
        this.$store.dispatch('INIT_INTERVALS')
    },
    beforeDestroy() {
        this.$store.commit('REMOVE_INTERVALS')
    }
}
</script>
