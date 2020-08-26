<template>
    <v-dialog max-width="750px" v-model="dialog">
        <v-card>
            <div :style="{ height: phoneLayout ? '100vh' : '' }">
                <v-card-title class="pb-0 justify-center primary">
                    <h2 class="white--text">Settings</h2>
                </v-card-title>
                <v-tabs v-model="tab" background-color="primary" center-active>
                    <v-tab href="#downloads">Downloads</v-tab>
                    <v-tab href="#bittorrent">BitTorrent</v-tab>
                    <v-tab href="#webui">WebUI</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" touchless>
                    <v-tab-item value="webui">
                        <WebUI :is-active="tab === 'webui'" />
                    </v-tab-item>
                    <v-tab-item value="bittorrent">
                        <BitTorrent :is-active="tab === 'bittorrent'" />
                    </v-tab-item>
                    <v-tab-item value="downloads">
                        <Downloads :is-active="tab === 'downloads'" />
                    </v-tab-item>
                </v-tabs-items>
            </div>
            <v-fab-transition v-if="phoneLayout">
                <v-btn @click="close" color="red" dark absolute bottom right>
                    
                    <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-card>
    </v-dialog>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Modal from '@/mixins/Modal'
// import { mapGetters } from 'vuex'
import WebUI from '@/components/SettingsModal/WebUI.vue'
import BitTorrent from '@/components/SettingsModal/BitTorrent.vue'
import Downloads from '@/components/SettingsModal/Downloads.vue'

export default {
    name: 'SettingsModal',
    mixins: [Modal],
    components: { WebUI, BitTorrent, Downloads },
    data() {
        return {
            tab: null,
            items: [],
            peers: []
        }
    },
    methods: {
        close() {
            this.$store.commit('TOGGLE_MODAL', 'SettingsModal')
        }
    },
    computed: {
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        }
    },
    watch: {
        dialog(visible) {
            if (!visible) {
                this.tab = null
            } else {
                // Grab the settings from qbittorrent again
                this.$store.commit('SET_SETTINGS')
            }
        }
    }
}
</script>
