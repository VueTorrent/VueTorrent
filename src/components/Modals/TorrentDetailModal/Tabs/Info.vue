<template>
    <v-card flat>
        <perfect-scrollbar>
            <v-card-text
                style="font-size: 1.1em; min-height: 400px;"
                :style="{ maxHeight: phoneLayout ? '' : '500px' }"
            >
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td class="grey--text">Torrent title</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.name }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Directory</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.savePath }}
                            </td>
                        </tr>
                        <tr style="margin-top: 10px !important">
                            <td class="grey--text">hash</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.hash }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Size</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.size }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Done:</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.dloaded }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Uploaded:</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.uploaded }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Ratio</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.ratio }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Download Speed</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.dlspeed }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Upload Speed</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.upspeed }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">ETA</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.eta }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Peers</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.num_leechs
                                }}<span class="grey--text"
                                    >/{{ torrent.available_peers }}</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Seeds</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.num_seeds
                                }}<span class="grey--text"
                                    >/{{ torrent.available_seeds }}</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Added on</td>
                            <td class="torrentmodaltext--text">
                                {{ torrent.added_on }}
                            </td>
                        </tr>
                        <tr>
                            <td class="grey--text">Status</td>
                            <v-chip
                                small
                                :class="`${torrent.state.toLowerCase()} white--text my-2 caption`"
                                >{{ torrent.state }}</v-chip
                            >
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
        </perfect-scrollbar>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Info',
    props: {
        hash: String
    },
    computed: {
        ...mapGetters(['getTorrent']),
        torrent() {
            return this.getTorrent(this.hash)
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table thead th,
::v-deep .v-data-table tbody td {
    padding: 0 !important;
    height: 3em;

    white-space: nowrap;

    &:first-child {
        padding: 0 0 0 8px !important;
    }
    &:last-child {
        padding-right: 8px !important;
    }
}
</style>
