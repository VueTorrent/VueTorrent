<template>
    <div class="pl-5 pr-5"
         color="background"
         @click.self="resetSelected"
    >
        <h1 style="font-size: 1.1em !important" class="subtitle-1 grey--text">
            Dashboard
            <p
                style="float: right; font-size: 0.7em"
                class="grey--text text-uppercase"
            >
                {{ torrentCountString }}
            </p>
        </h1>

        <div
            color="background"
            class="my-4 pt-5 px-8"
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
                    @click:clear="resetInput()"
                    v-model="input"
                ></v-text-field>
            </v-flex>
            <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
                <p class="grey--text">Nothing to see here!</p>
            </div>
            <div v-else>
                <v-layout
                    @contextmenu.prevent="$refs.menu.open($event, { torrent })"
                    v-for="(torrent, index) in paginatedData"
                    :key="torrent.hash"
                >
                  <v-flex v-if="selectMode">
                    <v-checkbox color="grey" class="mt-10" xs1 :value="selected_torrents.indexOf(torrent.hash) !== -1" @click="selectTorrent(torrent.hash)" />
                  </v-flex>
                  <v-flex :class="selectMode ? 'xs11' : ''">
                    <Torrent
                        :class="{
                            topBorderRadius: index === 0,
                            noBorderRadius:
                                index !== 0 && index !== torrent.length - 1,
                            bottomBorderRadius: index === torrents.length - 1
                        }"
                        :torrent="torrent"
                        :index="index"
                        :length="torrents.length - 1"
                    />
                  </v-flex>
                </v-layout>
                <v-row v-if="pageCount > 1" xs12 justify="center">
                    <v-col>
                        <v-container>
                            <v-pagination
                            v-model="pageNumber"
                            :length="pageCount"
                            :total-visible="7"
                            @input="toTop"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </div>
        </div>
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
import { TorrentSelect, General } from '@/mixins'

export default {
    name: 'Dashboard',
    components: { Torrent, VueContext, TorrentRightClickMenu },
    mixins: [ TorrentSelect, General ],
    data() {
        return {
            input: '',
            pageNumber: 1
        }
    },
    computed: {
        ...mapState(['mainData', 'selected_torrents']),
        ...mapGetters(['getTorrents', 'getTorrentCountString', 'getWebuiSettings']),
        torrents() {
            if (!this.input || !this.input.length) return this.getTorrents()

            const options = {
                threshold: 0.3,
                shouldSort: false,
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
        paginationSize() {
            return this.getWebuiSettings().paginationSize
        },
        pageCount(){
            let l = this.torrents.length,
                s = this.paginationSize
            return Math.ceil(l/s)
        },
        paginatedData(){
            const start = (this.pageNumber - 1) * this.paginationSize,
                end = start + this.paginationSize
            return this.torrents.slice(start, end)
        },
        torrentCountString() {
            return this.getTorrentCountString()
        },
        selectMode(){
            return this.$store.state.selectMode
        }
    },
    methods: {
        resetSelected() {
            this.$store.commit('RESET_SELECTED')
        },
        resetInput(){
            this.input = ''
        },
        toTop () {
            this.$vuetify.goTo(0)
        },
        handleKeyboardShortcut(e) {
            // 'ctrl + A' => select torrents
            if (e.keyCode === 65 && e.ctrlKey) {
                e.preventDefault()
                if(this.$store.state.selected_torrents.length === this.torrents.length){
                    return  this.$store.state.selected_torrents = []
                }
                const hashes = this.torrents.map(t => t.hash)
                return this.$store.state.selected_torrents = hashes
            }

            // 'Delete' => Delete modal
            if(e.keyCode === 46) {
                e.preventDefault()

                //no torrents select to delete
                if(!this.selected_torrents.length) return

                return this.createModal('ConfirmDeleteModal')
            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyboardShortcut)
    },
    created() {
        this.$store.dispatch('INIT_INTERVALS')
        this.$store.commit('FETCH_CATEGORIES')
    },
    beforeDestroy() {
        this.$store.commit('REMOVE_INTERVALS')
        document.removeEventListener('keydown', this.handleKeyboardShortcut)
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
.topBorderRadius {
    border-top-left-radius: 3px !important;
    border-top-right-radius: 3px !important;
    border-bottom-right-radius: 0px !important;
}
.noBorderRadius {
    border-radius: 0 !important;
}
.bottomBorderRadius {
    border-bottom-left-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
}
</style>
