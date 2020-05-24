<template>
    <v-card flat>
        <v-card-text style="font-size: 1.2em;">
            <v-simple-table>
                <tbody>
                    <tr>
                        <td class="grey--text">Torrent title</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.name }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">hash</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.hash }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Size</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.size }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Done:</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.dloaded }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Download</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.dlspeed }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Upload</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.upspeed }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">ETA</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.eta }}
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Peers</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.num_leechs
                            }}<span class="grey--text"
                                >/{{ torrent.available_peers }}</span
                            >
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Seeds</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.num_seeds
                            }}<span class="grey--text"
                                >/{{ torrent.available_seeds }}</span
                            >
                        </td>
                    </tr>
                    <tr class="mt-2">
                        <td class="grey--text">Ratio</td>
                        <td class="torrentmodaltext--text">
                            {{ torrent.ratio }}%
                        </td>
                    </tr>
                    <tr>
                        <td class="grey--text">Status</td>
                        <v-chip
                            small
                            :class="`${torrent.state} white--text my-2 caption`"
                            >{{ torrent.state }}</v-chip
                        >
                    </tr>
                </tbody>
            </v-simple-table>
            <v-flex class="pt-3 pb-4">
                <v-progress-linear
                    height="5"
                    stream
                    rounded
                    color="cyan darken-1"
                    background-color="cyan lighten-3"
                    :buffer-value="torrent.progress"
                ></v-progress-linear>
            </v-flex>
        </v-card-text>
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
        }
    }
}
</script>

<style></style>
