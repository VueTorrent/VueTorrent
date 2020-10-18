<template>
    <v-card
        ripple
        flat
        class="pointer torrent noselect"
        :class="{ torrent_selected: containsTorrent(torrent.hash) }"
        @click.native="selectTorrent(torrent.hash)"
        @dblclick.prevent="showInfo(torrent.hash)"
    >
        <v-layout row wrap :class="style">
            <v-flex xs12 class="mb-4">
                <div class="caption grey--text">Torrent title</div>
                <div class="truncate mr-4">{{ torrent.name }}</div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Size</div>
                <div>
                    {{ torrent.size | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.size | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1 :class="phoneLayout ? '' : 'mr-4'">
                <div class="caption grey--text">Status</div>
                <div>
                    <v-chip
                        small
                        class="caption"
                        :class="
                            theme === 'light'
                                ? `${state} white--text `
                                : `${state} black--text`">
                        {{ torrent.state }}
                    </v-chip>
                </div>                        
            </v-flex>
            <v-flex xs12 sm1 md1 :class="phoneLayout ? 'mr-4' : ''">
                <div class="caption grey--text">Done</div>
                <v-progress-linear
                    height="20"
                    :value="torrent.progress"
                    :style="phoneLayout ? '' : 'width: 80%;'"
                    :color="torrent.progress == 100 ? `teal lighten-1` : `orange lighten-1`"
                >
                    <span
                        class="caption"
                        :class="
                            theme === 'light'
                                ? `${state} white--text `
                                : `${state} black--text`">
                        {{ torrent.progress }}%
                    </span>
                </v-progress-linear>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Ratio</div>
                <div>
                    {{ torrent.ratio }}
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">ETA</div>
                <div>
                    {{ torrent.eta }}
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Download Speed</div>
                <div>
                    {{ torrent.dlspeed | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.dlspeed | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Upload Speed</div>
                <div>
                    {{ torrent.upspeed | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.upspeed | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Peers</div>
                <div>
                    {{ torrent.num_leechs }}
                    <span class="grey--text caption"
                        >/{{ torrent.available_peers }}</span
                    >
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Seeds</div>
                <div>
                    {{ torrent.num_seeds }}
                    <span class="grey--text caption"
                        >/{{ torrent.available_seeds }}</span
                    >
                </div>
            </v-flex>
            <v-flex v-if="torrent.category" xs3 sm1 md1>
                <div class="caption grey--text">Category</div>
                <v-chip small class="upload white--text caption">
                    {{ torrent.category }}
                </v-chip>
            </v-flex>

            <!-- labels -->
            <v-flex v-for="tag in torrent.tags" :key="tag" xs3 sm1 md1>
                <v-chip
                    small
                    :class="
                        theme === 'light'
                            ? 'white--text'
                            : 'black--text'
                    "
                    class="download my-2 caption"
                >
                    {{ tag }}
                </v-chip>
            </v-flex>
        </v-layout>
        <v-divider v-if="index !== length"></v-divider>
    </v-card>
</template>

<script>
import { General } from '@/mixins'

import { mapGetters } from 'vuex'

export default {
    name: 'Torrent',
    mixins: [General],

    props: {
        torrent: Object,
        index: Number,
        length: Number
    },
    computed: {
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        state() {
            return this.torrent.state.toLowerCase()
        },
        style() {
            let base = `pa-4 ml-0 sideborder ${this.state} `
            if (this.index === this.length) base += ' bottomBorderRadius'
            if (this.index === 0) base += ' topBorderRadius'
            return base
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        }
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
            this.createModal('TorrentDetailModal', { hash })
        }
    }
}
</script>

<style lang="scss" scoped>
.topBorderRadius {
    border-top-left-radius: 3px;
}
.bottomBorderRadius {
    border-bottom-left-radius: 3px;
}
</style>
