<template>
    <nav>
        <!--title-->
        <v-toolbar flat app>
            <v-toolbar-side-icon
                @click="drawer = !drawer"
                class="grey--text"
            ></v-toolbar-side-icon>
            <v-toolbar-title
                :class="[
                    'grey--text',
                    { 'subheading ml-0': $vuetify.breakpoint.smAndDown }
                ]"
            >
                <span class="font-weight-light">Vue</span>
                <span>Torrent</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!--right corner functions-->
            <AddTorrent @torrentAdded="snackbar = true" />
            <v-btn small fab flat class="mr-0 ml-0" @click="removeTorrents">
                <v-icon color="grey">remove</v-icon>
            </v-btn>
            <v-btn small fab flat class="mr-0 ml-0" @click="resumeTorrents">
                <v-icon color="grey">play_arrow</v-icon>
            </v-btn>
            <v-btn small fab flat class="mr-0 ml-0" @click="pauseTorrents">
                <v-icon color="grey">pause</v-icon>
            </v-btn>
            <v-btn small fab flat class="mr-0 ml-0" @click="refreshTorrents">
                <v-icon color="grey">autorenew</v-icon>
            </v-btn>
        </v-toolbar>
        <!--navigation drawer itself -->
        <v-navigation-drawer app v-model="drawer" class="primary allow-spacer">
            <!--current download speeds -->
            <v-flex class="mt-3" v-if="stats">
                <div
                    class="secondary_lighter--text text-uppercase caption ml-4"
                >
                    current speed
                </div>
                <v-card color="secondary" flat class="mr-2 ml-2">
                    <v-layout row wrap :class="`pa-3 project nav_download`">
                        <v-icon color="download">keyboard_arrow_down</v-icon>
                        <span class="download--text title">
                            {{
                                stats.dlspeed.substring(
                                    0,
                                    stats.dlspeed.indexOf(' ')
                                )
                            }}
                            <span class="font-weight-light caption">{{
                                stats.dlspeed.substring(
                                    stats.dlspeed.indexOf(' ')
                                )
                            }}</span>
                        </span>
                        <v-icon class="pl-5" color="upload"
                            >keyboard_arrow_up</v-icon
                        >
                        <span class="upload--text title">
                            {{
                                stats.upspeed.substring(
                                    0,
                                    stats.upspeed.indexOf(' ')
                                )
                            }}
                            <span class="font-weight-light caption">{{
                                stats.upspeed.substring(
                                    stats.upspeed.indexOf(' ')
                                )
                            }}</span>
                        </span>
                    </v-layout>
                </v-card>
                <!--speeds graph -->
                <div class="mt-4">
                    <apexcharts
                        ref="chart"
                        type="line"
                        :options="chartOptions"
                        :series="series"
                    ></apexcharts>
                </div>
                <div class="mt-4"></div>
                <div
                    class="secondary_lighter--text text-uppercase caption ml-4"
                >
                    session stats
                </div>
                <v-card flat color="secondary" class="mr-2 ml-2">
                    <v-layout row wrap :class="`pa-3 project nav_download`">
                        <v-flex md6>
                            <div class="download--text">Total downloaded</div>
                        </v-flex>
                        <v-flex md5 class="mr-2">
                            <span class="download--text title pl-3">
                                {{
                                    stats.downloaded.substring(
                                        0,
                                        stats.downloaded.indexOf(' ')
                                    )
                                }}
                                <span class="font-weight-light caption">{{
                                    stats.downloaded.substring(
                                        stats.downloaded.indexOf(' ')
                                    )
                                }}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card flat color="secondary" class="mr-2 ml-2 mt-1">
                    <v-layout row wrap :class="`pa-3 project nav_upload`">
                        <v-flex md6>
                            <div class="upload--text">Total uploaded</div>
                        </v-flex>
                        <v-flex md5 class="mr-2">
                            <span class="upload--text title pl-3">
                                {{
                                    stats.uploaded.substring(
                                        0,
                                        stats.uploaded.indexOf(' ')
                                    )
                                }}
                                <span class="font-weight-light caption">{{
                                    stats.uploaded.substring(
                                        stats.uploaded.indexOf(' ')
                                    )
                                }}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-layout class="align-end">
                <Settings />
                <v-spacer></v-spacer>
                <v-tooltip top v-if="paused">
                    <v-btn
                        small
                        fab
                        flat
                        class="mr-4"
                        @click="startInterval"
                        slot="activator"
                    >
                        <v-icon color="green_accent">play_arrow</v-icon>
                    </v-btn>
                    <span>Resumes connection to client</span>
                </v-tooltip>
                <v-tooltip top v-else>
                    <v-btn
                        small
                        fab
                        flat
                        class="mr-4"
                        @click="clearInterval"
                        slot="activator"
                    >
                        <v-icon color="green_accent">pause</v-icon>
                    </v-btn>
                    <span>Pauses connection to client</span>
                </v-tooltip>
            </v-layout>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import { setInterval } from 'timers'
import VueApexCharts from 'vue-apexcharts'
import ApexCharts from 'apexcharts'
import AddTorrent from './AddTorrent'
import Settings from './Settings'

export default {
    components: { AddTorrent, Settings, apexcharts: VueApexCharts },
    data() {
        return {
            drawer: false,
            paused: false,
            links: [
                { icon: 'dashboard', text: 'Dashboard', route: '/' },
                { icon: 'settings', text: 'Settings', route: '/settings' }
            ],
            chartOptions: {
                chart: {
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: false,
                        dynamicAnimation: {
                            speed: 2000
                        }
                    }
                },
                colors: ['#00b3fa', '#64CEAA'],
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'round',
                    width: 4
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        opacityFrom: 0.6,
                        opacityTo: 0.5,
                        stops: [0, 50, 100]
                    }
                }
            },
            series: [
                {
                    name: 'upload',
                    type: 'area',
                    data: this.$store.state.upload_data
                },
                {
                    name: 'download',
                    type: 'area',
                    data: this.$store.state.download_data
                }
            ],
            chartInterval: null
        }
    },
    methods: {
        ...mapMutations(['REFRESH_TORRENTS', 'CLEAR_INTERVALS']),
        clearInterval() {},
        startInterval() {},
        pauseTorrents() {},
        resumeTorrents() {},
        removeTorrents() {},
        refreshTorrents() {},
        updateChart() {
            this.$refs.chart.updateSeries(this.series, true)
        }
    },
    computed: {
        ...mapState(['stats'])
    },
    created() {
        this.chartInterval = setInterval(async () => {
            this.updateChart()
        }, 2000)
    },
    beforeDestroy() {
        clearInterval(this.chartInterval)
    }
}
</script>
<style>
.project.nav_upload {
    border-left: 4px solid #00b3fa;
}
.project.nav_download {
    border-left: 4px solid #64ceaa;
}
.allow-spacer {
    display: flex;
    flex-direction: column;
}
</style>
