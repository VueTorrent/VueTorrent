<template>
    <v-dialog
        v-model="dialog"
        scrollable
        :width="dialogWidth"
        :fullscreen="phoneLayout"
    >
        <v-card
            v-if="torrent"
            style="min-height: 400px; overflow: hidden !important;"
        >
            <div
                :class="`pa-0 project ${torrent.state}`"
                :style="{ height: phoneLayout ? '100vh' : '' }"
            >
                <v-card-title class="pb-0 justify-center primary">
                    <h2 class="white--text">Torrent Detail</h2>
                </v-card-title>
                <v-tabs v-model="tab" background-color="primary" center-active>
                    <v-tab href="#info">Info</v-tab>
                    <v-tab href="#trackers">Trackers</v-tab>
                    <v-tab href="#peers">Peers</v-tab>
                    <v-tab href="#content">Content</v-tab>
                    <v-tab href="#tags">Tags</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" touchless>
                    <v-tab-item value="info">
                        <info :is-active="tab === 'info'" :hash="hash" />
                    </v-tab-item>
                    <v-tab-item value="peers">
                        <Peers :is-active="tab === 'peers'" :hash="hash" />
                    </v-tab-item>
                    <v-tab-item value="trackers">
                        <Trackers
                            :is-active="tab === 'trackers'"
                            :hash="hash"
                        />
                    </v-tab-item>
                    <v-tab-item value="content">
                        <Content :is-active="tab === 'content'" :hash="hash" />
                    </v-tab-item>
                    <v-tab-item value="tags">
                        <Tags :is-active="tab === 'tags'" :hash="hash" />
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
import { mapGetters } from 'vuex'

import Content from '@/components/TorrentDetailModal/Content'
import Info from '@/components/TorrentDetailModal/Info'
import Peers from '@/components/TorrentDetailModal/Peers'
import Trackers from '@/components/TorrentDetailModal/Trackers'
import Tags from '@/components/TorrentDetailModal/Tags'

export default {
    name: 'TorrentDetailModal',
    mixins: [Modal],
    components: { Content, Info, Peers, Trackers,Tags },
    data() {
        return {
            tab: null,
            items: [{ tab: 'Info' }, { tab: 'Content' }],
            peers: []
        }
    },
    methods: {
        close() {
            this.$store.commit('TOGGLE_MODAL', 'TorrentDetailModal')
        }
    },
    computed: {
        ...mapGetters(['getTorrent']),
        hash() {
            return this.$store.state.selectedDetailTorrent
        },
        torrent() {
            return this.getTorrent(this.hash)
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        },
        dialogWidth() {
            return this.phoneLayout ? '100%' : '80%'
        }
    },
    watch: {
        dialog(visible) {
            if (!visible) {
                this.tab = null
            }
        }
    }
}
</script>
