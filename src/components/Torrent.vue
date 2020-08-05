<template>
    <v-card
        ripple
        flat
        class="pointer torrent noselect"
        :class="containsTorrent(torrent.hash) ? 'torrent_selected' : ''"
        @click.native="selectTorrent(torrent.hash)"
        @dblclick.prevent="showInfo(torrent.hash)"
    >
        <v-tooltip top>
            <template v-slot:activator="{ on }">
                <v-layout
                    @contextmenu.prevent="$refs.menu.open"
                    v-on="on"
                    row
                    wrap
                    :class="`pa-4 ml-0 project ${torrent.state}`"
                >
                    <v-flex xs12 sm2 md3>
                        <div class="caption grey--text">Torrent title</div>
                        <div class="truncate">{{ torrent.name }}</div>
                    </v-flex>
                    <v-flex xs6 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Size</div>
                        <div>
                            {{
                                torrent.size.substring(
                                    0,
                                    torrent.size.indexOf(' ')
                                )
                            }}
                            <span class="caption grey--text">{{
                                torrent.size.substring(
                                    torrent.size.indexOf(' ')
                                )
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Done</div>
                        <div>
                            {{
                                torrent.dloaded.substring(
                                    0,
                                    torrent.dloaded.indexOf(' ')
                                )
                            }}
                            <span class="caption grey--text">{{
                                torrent.dloaded.substring(
                                    torrent.dloaded.indexOf(' ')
                                )
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Download</div>
                        <div>
                            {{
                                torrent.dlspeed.substring(
                                    0,
                                    torrent.dlspeed.indexOf(' ')
                                )
                            }}
                            <span class="caption grey--text">{{
                                torrent.dlspeed.substring(
                                    torrent.dlspeed.indexOf(' ')
                                )
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Upload</div>
                        <div>
                            {{
                                torrent.upspeed.substring(
                                    0,
                                    torrent.upspeed.indexOf(' ')
                                )
                            }}
                            <span class="caption grey--text">{{
                                torrent.upspeed.substring(
                                    torrent.upspeed.indexOf(' ')
                                )
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm1 md1 class="mr-2">
                        <div class="caption grey--text">ETA</div>
                        <div>{{ torrent.eta }}</div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Peers</div>
                        <div>
                            {{ torrent.num_leechs }}
                            <span class="grey--text caption"
                                >/{{ torrent.available_peers }}</span
                            >
                        </div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Seeds</div>
                        <div>
                            {{ torrent.num_seeds }}
                            <span class="grey--text caption"
                                >/{{ torrent.available_seeds }}</span
                            >
                        </div>
                    </v-flex>
                    <v-flex xs4 sm12 md1>
                        <div class="right">
                            <v-chip
                                small
                                :class="`${torrent.state} white--text my-2 caption`"
                                >{{ torrent.state }}</v-chip
                            >
                        </div>
                    </v-flex>
                    <!-- labels -->
                    <v-flex v-for="tag in torrent.tags" :key="tag" xs3 sm1 md1>
                        <v-chip small class="download white--text my-2 caption">
                            {{ tag }}
                        </v-chip>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-progress-linear
                            height="3"
                            rounded
                            color="cyan darken-1"
                            background-color="cyan lighten-3"
                            :value="torrent.progress"
                        ></v-progress-linear>
                    </v-flex>
                </v-layout>
            </template>
            <span>{{ torrent.name }}</span>
        </v-tooltip>
        <v-divider></v-divider>
        <vue-context ref="menu">
            <TorrentRightClickMenu :hash="torrent.hash" />
        </vue-context>
    </v-card>
</template>

<script>
import { VueContext } from 'vue-context'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

export default {
    name: 'Torrent',
    components: {
        VueContext,
        TorrentRightClickMenu
    },
    props: {
        torrent: Object
    },
    methods: {
        selectTorrent(hash) {
            if (this.containsTorrent(hash)) {
                this.$store.commit('SET_SELECTED', { type: 'remove', hash })
            } else {
                this.$store.commit('SET_SELECTED', { type: 'add', hash })
            }
        },
        containsTorrent(hash) {
            return this.$store.getters.containsTorrent(hash)
        },
        showInfo(hash) {
            this.$store.commit('TOGGLE_MODAL', 'TorrentDetailModal')
            this.$store.commit('SET_SELECTED_TORRENT_DETAIL', hash)
        }
    }
}
</script>

<style>
.project.done {
    border-left: 4px solid #3cd1c2;
}
.project.busy {
    border-left: 4px solid #ffaa2c;
}
.project.fail {
    border-left: 4px solid #f83e70;
}
.project.paused {
    border-left: 4px solid #cfd8dc;
}
.project.queued {
    border-left: 4px solid #2e5eaa;
}
.v-chip.done {
    background: #3cd1c2 !important;
}
.v-chip.busy {
    background: #ffaa2c !important;
}
.v-chip.fail {
    background: #f83e70 !important;
}
.v-chip.paused {
    background: #cfd8dc !important;
}
.v-chip.queued {
    background: #2e5eaa !important;
}

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.pointer {
    cursor: pointer;
}
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
