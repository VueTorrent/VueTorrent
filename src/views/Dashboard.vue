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
                    color="search"
                    v-model="sort_input"
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
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Torrent from '@/components/Torrent'
import Fuse from 'fuse.js'

export default {
    name: 'Dashboard',
    components: { Torrent },
    data() {
        return {
            sort_input: ''
        }
    },
    computed: {
        ...mapState(['mainData']),
        ...mapGetters(['getTorrents']),
        torrents() {
            if (this.sort_input.length === 0) return this.getTorrents()

            const options = {
                threshold: 0.3,
                keys: [
                    'name',
                    'size',
                    'state',
                    'hash',
                    'savePath',
                    'tags',
                    'category'
                ]
            }
            const fuse = new Fuse(this.getTorrents(), options)
            return fuse.search(this.sort_input).map(el => el.item)
        }
    },
    methods: {
        resetSelected() {
            this.$store.commit('RESET_SELECTED')
        }
    },
    created() {
        this.$store.dispatch('INIT_INTERVALS')
        this.$store.commit('FETCH_CATEGORIES')
    },
    beforeDestroy() {
        this.$store.commit('REMOVE_INTERVALS')
    }
}
</script>
