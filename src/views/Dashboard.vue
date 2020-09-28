<template>
    <div class="pl-5 pr-5" color="background" @click.self="resetSelected">
        <h1 style="font-size: 1.1em !important" class="subtitle-1 grey--text">
            Dashboard
            <p
                style="float: right; font-size: 0.7em"
                class="grey--text text-uppercase"
            >
                {{ torrentCountString }}
            </p>
        </h1>

        <v-container
            color="background"
            class="my-4 pt-5 pa-0"
            @click.self="resetSelected"
        >
            <v-flex xs12 sm6 md3 @click.self="resetSelected">
                <v-text-field
                    flat
                    label="type to filter..."
                    height="50"
                    clearable
                    solo
                    color="search"
                    v-model="input"
                ></v-text-field>
            </v-flex>
            <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
                <p class="grey--text">Nothing to see here!</p>
            </div>
            <div v-else>
                <div
                    @contextmenu.prevent="$refs.menu.open($event, { torrent })"
                    v-for="torrent in torrents"
                    :key="torrent.hash"
                >
                    <Torrent :torrent="torrent" />
                </div>
            </div>
        </v-container>
        <vue-context ref="menu" v-slot="{ data }">
            <TorrentRightClickMenu v-if="data" :hash="data.torrent.hash" />
        </vue-context>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Torrent from '@/components/Torrent'
import Fuse from 'fuse.js'
import { VueContext } from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

export default {
    name: 'Dashboard',
    components: { Torrent, VueContext, TorrentRightClickMenu },
    data() {
        return {
            input: ''
        }
    },
    computed: {
        ...mapState(['mainData']),
        ...mapGetters(['getTorrents', 'getTorrentCountString']),
        torrents() {
            if (this.input.length === 0) return this.getTorrents()

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
            return fuse.search(this.input).map(el => el.item)
        },
        torrentCountString() {
            return this.getTorrentCountString()
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
    },
    watch: {
        torrents: function (torrents) {
            this.$store.commit('SET_CURRENT_ITEM_COUNT', torrents.length)
        }
    }
}
</script>

<style scoped lang="scss">
.v-context {
    &,
    & ul {
        border-radius: 0.3rem;
        padding: 0;
    }
}
</style>
