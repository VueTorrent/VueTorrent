<template>
    <nav>
        <!--title-->
        <v-app-bar flat color="background">
            <v-btn
                @click="drawer = !drawer"
                text
                fab
                class="grey--text text--lighten-1" 
            >
            <v-icon>menu</v-icon>
            </v-btn>
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
            <v-btn
                text
                small
                fab
                color="grey"
                class="mr-0 ml-0"
                @click="toggleModal('addmodal')"
            >
                <v-icon color="grey">add</v-icon>
            </v-btn>
            <v-btn small fab text class="mr-0 ml-0" @click="removeTorrents">
                <v-icon color="grey">remove</v-icon>
            </v-btn>
            <v-btn small fab text class="mr-0 ml-0" @click="resumeTorrents">
                <v-icon color="grey">play_arrow</v-icon>
            </v-btn>
            <v-btn small fab text class="mr-0 ml-0" @click="pauseTorrents">
                <v-icon color="grey">pause</v-icon>
            </v-btn>
        </v-app-bar>
        <!--navigation drawer itself -->
        <v-navigation-drawer app v-model="drawer" class="primary" style="position:fixed;">
            <!--current download speeds -->
            <v-flex class="mt-3" v-if="status">
                <div
                    class="secondary_lighter--text text-uppercase caption ml-4"
                >
                    current speed
                </div>
                <v-card color="secondary" flat class="mr-2 ml-2">
                    <v-layout row wrap class="pa-3 project nav_download mx-auto">
                        <v-icon color="download">keyboard_arrow_down</v-icon>
                        <span class="download--text title">
                            {{
                                status.dlspeed.substring(
                                    0,
                                    status.dlspeed.indexOf(' ')
                                )
                            }}
                            <span class="font-weight-light caption">{{
                                status.dlspeed.substring(
                                    status.dlspeed.indexOf(' ')
                                )
                            }}</span>
                        </span>
                        <v-icon class="pl-5" color="upload"
                            >keyboard_arrow_up</v-icon
                        >
                        <span class="upload--text title">
                            {{
                                status.upspeed.substring(
                                    0,
                                    status.upspeed.indexOf(' ')
                                )
                            }}
                            <span class="font-weight-light caption">{{
                                status.upspeed.substring(
                                    status.upspeed.indexOf(' ')
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
                    session status
                </div>
                <v-card flat color="secondary" class="mr-2 ml-2">
                    <v-layout row wrap class="pa-3 project nav_download mx-auto">
                        <v-flex md6>
                            <div style="font-size: 0.95em; margin-top: 6px;" class="download--text">Downloaded</div>
                        </v-flex>
                        <v-flex md5 class="ml-4">
                            <span class="download--text title">
                                {{
                                    status.downloaded.substring(
                                        0,
                                        status.downloaded.indexOf(' ')
                                    )
                                }}
                                <span class="font-weight-light caption">{{
                                    status.downloaded.substring(
                                        status.downloaded.indexOf(' ')
                                    )
                                }}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-card>
                <v-card flat color="secondary" class="ml-2 mr-2 mt-1">
                    <v-layout row wrap class="pa-3 project nav_upload mx-auto">
                        <v-flex md6>
                            <div style="font-size: 0.95em; margin-top: 6px;"  class="upload--text">Uploaded</div>
                        </v-flex>
                        <v-flex md5 class="ml-4">
                            <span class="upload--text title">
                                {{
                                    status.uploaded.substring(
                                        0,
                                        status.uploaded.indexOf(' ')
                                    )
                                }}
                                <span class="font-weight-light caption">{{
                                    status.uploaded.substring(
                                        status.uploaded.indexOf(' ')
                                    )
                                }}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-card>

                <v-card flat style="margin-top: 30px;" color="secondary" class="ml-2 mr-2">
                    <v-layout row wrap class="pa-3 project nav_upload mx-auto">
                        <v-flex md6>
                            <div style="font-size: 0.95em; margin-top: 6px;"  class="upload--text">Free Space</div>
                        </v-flex>
                        <v-flex md5 class="ml-4">
                            <span class="upload--text title">
                                {{
                                    status.freeDiskSpace.substring(
                                        0,
                                        status.freeDiskSpace.indexOf(' ')
                                    )
                                }}
                                <span class="font-weight-light caption">{{
                                    status.freeDiskSpace.substring(
                                        status.freeDiskSpace.indexOf(' ')
                                    )
                                }}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-container>
             <v-row justify="space-between" style="position:fixed; bottom: 0px; right: 15px;">
                <v-col>
                     <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-list-item v-on="on" @click="logout" link>
                                <v-icon  class="pr-2 white--text">exit_to_app</v-icon>
                            </v-list-item>  
                        </template>
                        <span>Log out</span>
                        </v-tooltip> 
                </v-col>
                <v-col>
                     <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-list-item  v-on="on" @click="toggleSpeed" link>
                                <v-icon :color="altSpeed ? 'download' : ''" class="pr-2 white--text">speed</v-icon>
                            </v-list-item>  
                        </template>
                        <span>Alt speeds</span>
                        </v-tooltip> 
                </v-col>
                <v-col>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-list-item v-on="on" @click="toggleTheme" link>
                                <v-icon v-if="theme === 'Light'" class="pr-2 white--text">brightness_7</v-icon>
                                <v-icon v-else class="pr-2 white--text">brightness_2</v-icon>
                            </v-list-item>
                        </template>
                        <span>{{theme}}</span>
                    </v-tooltip>       
                </v-col>
            </v-row>
            </v-container>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import qbit from '@/services/qbit'

export default {
    components: { apexcharts: VueApexCharts },
    data() {
        return {
            drawer: false,
            paused: false,
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
       pauseTorrents() {
            qbit.pauseTorrents(this.selected_torrents)
        },
        resumeTorrents(){
             qbit.resumeTorrents(this.selected_torrents)
        },
        removeTorrents() {
            qbit.deleteTorrents(this.selected_torrents, false)
        },
        updateChart() {
            this.$refs.chart.updateSeries(this.series, true)
        },
        toggleModal(name) {
            this.$store.commit('TOGGLE_MODAL', name)
        },
         toggleTheme() {
            this.$store.commit('TOGGLE_THEME')
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        logout(){
            this.$store.commit('LOGOUT')
            this.$router.push('/login')
        },
        toggleSpeed(){
            qbit.toggleSpeedLimitsMode()
        }
    },
    computed: {
        ...mapState(['status', 'selected_torrents']),  
        ...mapGetters(['getTheme', 'getStatus']),
        theme() {
            return this.getTheme() ? 'Dark' : 'Light'
        },
        altSpeed(){
            return this.getStatus().altSpeed
        }
    },
    created() {
        this.chartInterval = setInterval(async () => {
            this.updateChart()
        }, 2000)
        this.$vuetify.theme.dark = this.getTheme()
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
