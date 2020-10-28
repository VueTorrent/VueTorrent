<template>
    <v-dialog
        v-model="dialog"
        scrollable
        width="85%"
        :fullscreen="phoneLayout"
    >
        <v-card style="min-height: 400px; overflow: hidden !important">
            <div :style="{ height: phoneLayout ? '100vh' : '' }">
                <v-card-title class="pb-0 justify-center primary">
                    <h2 class="white--text">Settings</h2>
                </v-card-title>
                <v-tabs v-model="tab" background-color="primary" dark fixed-tabs>
                    <v-tab href="#downloads">Downloads</v-tab>
                    <v-tab href="#bittorrent">BitTorrent</v-tab>
                    <v-tab href="#webui">WebUI</v-tab>
                    <v-tab href="#vuetorrent">VueTorrent</v-tab>
                    <v-tab href="#tagsAndCategories">Tags & Categories</v-tab>
                </v-tabs>
                <perfect-scrollbar>
                    <v-tabs-items
                        v-model="tab"
                        :touch="updateTab(tab)"
                        :style="{ maxHeight: dialogHeight }"
                    >
                        <v-tab-item value="downloads">
                            <Downloads :is-active="tab === 'downloads'" />
                        </v-tab-item>
                        <v-tab-item value="bittorrent">
                            <BitTorrent :is-active="tab === 'bittorrent'" />
                        </v-tab-item>
                        <v-tab-item value="webui">
                            <WebUI :is-active="tab === 'webui'" />
                        </v-tab-item>

                        <v-tab-item value="vuetorrent">
                            <VueTorrent :is-active="tab === 'vuetorrent'" />
                        </v-tab-item>
                        <v-tab-item value="tagsAndCategories">
                            <TagsAndCategories
                                :is-active="tab === 'tagsAndCategories'"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </perfect-scrollbar>
            </div>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="success" @click="saveSettings">Save</v-btn>
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
import {
    WebUI,
    BitTorrent,
    Downloads,
    VueTorrent,
    TagsAndCategories
} from './Tabs'

export default {
    name: 'SettingsModal',
    mixins: [Modal, FullScreenModal],
    components: { WebUI, BitTorrent, Downloads, VueTorrent, TagsAndCategories },
    data() {
        return {
            tab: null,
            items: [],
            peers: []
        }
    },
    methods: {
        close() {
            this.deleteModal()
        },
        saveSettings() {
            qbit.setPreferences(this.getSettings()).then(() => {
                Vue.$toast.success('Settings saved successfully!')
            })
            this.$store.commit('FETCH_SETTINGS')
            this.close()
        }
    },
    computed: {
        ...mapGetters(['getSettings']),
        dialogHeight() {
            return this.phoneLayout ? '79vh' : '70vh'
        }
    },
    created() {
        this.$store.commit('FETCH_SETTINGS')
    }
}
</script>
