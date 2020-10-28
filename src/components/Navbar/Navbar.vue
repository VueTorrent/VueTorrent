<template>
    <nav>
        <!--title-->
        <v-app-bar app flat color="background" @click="resetSelected">
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
                class="grey--text text--lighten-1"
            ></v-app-bar-nav-icon>
            <v-toolbar-title
                :class="[
                    'grey--text',
                    { 'subheading ml-0': $vuetify.breakpoint.smAndDown }
                ]"
            >
                <div v-if="!$vuetify.breakpoint.xs">
                    <span class="font-weight-light">Vue</span>
                    <span>Torrent</span>
                </div>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <TopActions :showAll="webuiSettings.showGlobalRemoveResumePause" />
        </v-app-bar>
        <!--navigation drawer itself -->
        <v-navigation-drawer
            app
            v-model="drawer"
            class="primary"
            style="position: fixed; height: 100%"
            disable-resize-watcher
        >
            <!--current download speeds -->
            <v-flex class="mt-3" v-if="status">
                <CurrentSpeed
                    v-if="webuiSettings.showCurrentSpeed"
                    :status="status"
                />

                <SpeedGraph v-if="webuiSettings.showSpeedGraph" />

                <div class="mt-4"></div>
                <SessionStats
                    v-if="webuiSettings.showSessionStat"
                    :status="status"
                />

                <FreeSpace
                    v-if="webuiSettings.showFreeSpace"
                    :space="status.freeDiskSpace"
                />
                <FilterSelect />
            </v-flex>
            <v-container class="mt-12">
                <BottomActions />
            </v-container>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import {
    BottomActions,
    TopActions,
    SpeedGraph,
    FreeSpace,
    SessionStats,
    CurrentSpeed,
    FilterSelect
} from './index'

export default {
    name: 'Navbar',
    components: {
        FreeSpace,
        BottomActions,
        TopActions,
        SpeedGraph,
        SessionStats,
        CurrentSpeed,
        FilterSelect
    },

    computed: {
        ...mapGetters(['getTheme', 'getWebuiSettings', 'getStatus']),
        webuiSettings() {
            return this.getWebuiSettings()
        },
        status() {
            return this.getStatus()
        }
    },
    data() {
        return {
            drawer: this.$vuetify.breakpoint.mdAndUp
        }
    },
    methods: {
        resetSelected() {
            this.$store.commit('RESET_SELECTED')
        }
    },
    created() {
        this.$vuetify.theme.dark = this.getTheme()
    }
}
</script>
