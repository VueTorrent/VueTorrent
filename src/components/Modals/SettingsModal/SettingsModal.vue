<template>
    <v-dialog
        v-model="dialog"
        scrollable
        :width="dialogWidth"
        :fullscreen="phoneLayout"
    >
        <v-card style="min-height: 400px; overflow: hidden !important">
            <div :style="{ height: phoneLayout ? '100vh' : '' }">
                <v-card-title class="pb-0 justify-center primary">
                    <h2 class="white--text">Settings</h2>
                </v-card-title>
                <v-tabs v-model="tab" background-color="primary" center-active>
                    <v-tab href="#downloads">Downloads</v-tab>
                    <v-tab href="#bittorrent">BitTorrent</v-tab>
                    <v-tab href="#webui">WebUI</v-tab>
                    <v-tab href="#vuetorrent">VueTorrent</v-tab>
                </v-tabs>
                <perfect-scrollbar>
                    <v-tabs-items
                        v-model="tab"
                        touchless
                        :style="{ maxHeight: dialogHeight }"
                    >
                        <v-tab-item value="webui">
                            <WebUI :is-active="tab === 'webui'" />
                        </v-tab-item>
                        <v-tab-item value="bittorrent">
                            <BitTorrent :is-active="tab === 'bittorrent'" />
                        </v-tab-item>
                        <v-tab-item value="downloads">
                            <Downloads :is-active="tab === 'downloads'" />
                        </v-tab-item>
                        <v-tab-item value="vuetorrent">
                            <VueTorrent :is-active="tab === 'vuetorrent'" />
                        </v-tab-item>
                    </v-tabs-items>
                </perfect-scrollbar>
            </div>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="success" @click="save_settings">Save</v-btn>
                <v-fab-transition v-if="phoneLayout">
                    <v-btn
                        @click="close"
                        color="red"
                        dark
                        absolute
                        bottom
                        right
                    >
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-fab-transition>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'

import { Modal, FullScreenModal } from '@/mixins'
import { WebUI, BitTorrent, Downloads, VueTorrent } from './Tabs'

export default {
    name: 'SettingsModal',
    mixins: [Modal, FullScreenModal],
    components: { WebUI, BitTorrent, Downloads, VueTorrent },
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
        },
        save_settings() {
            qbit.setPreferences(this.getSettings()).then(() => {
                Vue.$toast.success('Settings saved successfully!')
            })
        }
    },
    computed: {
        ...mapGetters(['getSettings']),
        dialogWidth() {
            return this.phoneLayout ? '100%' : '750px'
        },
        dialogHeight() {
            return this.phoneLayout ? '79vh' : '70vh'
        }
    },
    watch: {
        dialog(visible) {
            !visible ? (this.tab = null) : this.$store.commit('SET_SETTINGS')
        }
    }
}
</script>
