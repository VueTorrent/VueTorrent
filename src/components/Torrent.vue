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
                            {{ torrent.size | getNumber }}
                            <span class="caption grey--text">{{
                                torrent.size | getUnit
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Done</div>
                        <div>
                            {{ torrent.dloaded | getNumber }}
                            <span class="caption grey--text">{{
                                torrent.dloaded | getUnit
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Download</div>
                        <div>
                            {{ torrent.dlspeed | getNumber }}
                            <span class="caption grey--text">{{
                                torrent.dlspeed | getUnit
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs5 sm1 md1 class="mr-2">
                        <div class="caption grey--text">Upload</div>
                        <div>
                            {{ torrent.upspeed | getNumber }}
                            <span class="caption grey--text">{{
                                torrent.upspeed | getUnit
                            }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm1 md1 class="mr-2">
                        <div class="caption grey--text">ETA</div>
                        <div>
                            {{ torrent.eta | formatEta({ dayLimit: 100 }) }}
                        </div>
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
    },
    filters: {
        getUnit(value) {
            if (!value) return ''
            return value.substring(value.indexOf(' '))
        },
        getNumber(value) {
            if (!value) return ''
            return value.substring(0, value.indexOf(' '))
        },
        formatEta(value, options) {
            const minute = 60
            const hour = minute * 60
            const day = hour * 24
            const year = day * 365

            const durations = [year, day, hour, minute, 1]
            const units = 'ydhms'

            let index = 0
            let unitSize = 0
            const parts = []

            const defaultOptions = {
                maxUnitSize: 2,
                dayLimit: 0,
                minUnit: 0
            }

            const opt = options
                ? Object.assign(defaultOptions, options)
                : defaultOptions

            if (opt.dayLimit && value >= opt.dayLimit * day) {
                return '∞'
            }

            while (
                (!opt.maxUnitSize || unitSize !== opt.maxUnitSize) &&
                index !== durations.length
            ) {
                const duration = durations[index]
                if (value < duration) {
                    index++
                    continue
                } else if (
                    opt.minUnit &&
                    durations.length - index <= opt.minUnit
                ) {
                    break
                }

                const result = Math.floor(value / duration)
                parts.push(result + units[index])

                value %= duration
                index++
                unitSize++
            }

            if (!parts.length) {
                return '0' + units[durations.length - 1 - opt.minUnit]
            }

            return parts.join(' ')
        }
    }
}
</script>

<style></style>
