<template>
    <div style="height: 89vh" color="background" @click.self="resetSelected">
        <h1 style="font-size: 1.1em !important" class="subtitle-1 grey--text">Dashboard</h1>
        <v-container color="background" class="my-4" @click.self="resetSelected">
            <!-- justify-center here in layout to center!! -->
            <v-flex xs12 sm6 md3 @click.self="resetSelected">
                <v-text-field
                    flat
                    label="type to sort..."
                    height="50"
                    clearable
                    solo
                    hint="eg `size desc` + enter"
                    color="search"
                    v-model="sort_input"
                    @keyup.enter.native="sortBy"
                ></v-text-field>
            </v-flex>
            <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
                <p class="grey--text">No active Torrents!</p>
            </div>
            <div v-else>
                <div

                    v-for="torrent in torrents"
                    :key="torrent.hash"
                >
                    <Torrent :torrent="torrent"/>
            
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
import Torrent from '@/components/Torrent'


export default {
    name:'Dashboard', 
    components: {Torrent},
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
            let name
            let reverse
            // search if order was presented
            const index = this.sort_input.indexOf(' ')
            if (index > -1) {
                name = this.sort_input.substring(0, index)
                const temp = this.sort_input.substring(index)
                if (temp.indexOf('asc') > -1) {
                    reverse = false
                } else if (temp.indexOf('desc') > -1) {
                    reverse = true
                }
            } else {
                // no order so we assume input is propname
                name = this.sort_input
                reverse = false
            }
            // prop names
            switch (name) {
                case 'title':
                case 'name':
                case 'Name':
                case 'Title':
                    name = 'name'
                    break
                case 'size':
                case 'Size':
                    name = 'size'
                    break
                case 'dlspeed':
                case 'Dlspeed':
                case 'Download':
                case 'download':
                case 'downloadspeed':
                    name = 'dlspeed'
                    break
                case 'upspeed':
                case 'upload':
                case 'Upload':
                case 'Upspeed':
                case 'uploadspeed':
                    name = 'upspeed'
                    break
                case 'leechs':
                case 'leechers':
                case 'leech':
                case 'peers':
                case 'Leechs':
                case 'Leechers':
                case 'Leech':
                case 'Peers':
                    name = 'num_leechs'
                    break
                case 'seeds':
                case 'seeders':
                case 'Seeds':
                case 'Seeders':
                    name = 'num_seeds'
                    break
                case 'remaining':
                case 'time':
                case 'Time':
                case 'ETA':
                case 'eta':
                    name = 'eta'
                    break
                case 'done':
                case 'downloaded':
                case 'dloaded':
                case 'Done':
                case 'Downloaded':
                case 'Dloaded':
                    name = 'downloaded'
                    break
                case 'state':
                case 'status':
                case 'State':
                case 'Status':
                    name = 'state'
                    break
                default:
                    name = 'name'
                    break
            }

            this.$store.state.sort_options = { name, reverse }
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


