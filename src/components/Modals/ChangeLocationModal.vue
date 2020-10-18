<template>
    <v-dialog
        v-model="dialog"
        scrollable
        :width="dialogWidth"
        :fullscreen="phoneLayout"
    >
        <v-card style="overflow: hidden !important">
            <v-container :style="{ height: phoneLayout ? '100vh' : '' }">
                <v-card-title class="pb-0 justify-center">
                    <h2>Change Torrent Location</h2>
                </v-card-title>
                <v-card-text>
                    <div>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Torrent Name"
                                        prepend-icon="insert_drive_file"
                                        readonly
                                        v-model="torrent.name"
                                    />
                                    <v-text-field
                                        label="Directory"
                                        prepend-icon="folder"
                                        v-model="newPath"
                                        v-on:keydown.enter="setLocation"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <div>
                    <v-card-actions class="justify-center">
                        <v-btn color="success" @click="setLocation">Save</v-btn>
                    </v-card-actions>
                </div>
            </v-container>
            <v-fab-transition v-if="phoneLayout">
                <v-btn @click="close" color="red" dark absolute bottom right>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
    name: 'ChangeLocationModal',
    mixins: [Modal, FullScreenModal],
    props: {
        hash: String
    },
    data() {
        return {
            newPath: ''
        }
    },
    computed: {
        ...mapGetters(['getTorrent']),
        dialogWidth() {
            return this.phoneLayout ? '100%' : '750px'
        },
        torrent() {
            return this.getTorrent(this.hash)
        }
    },
    methods: {
        setLocation() {
            qbit.setTorrentLocation([this.hash], this.newPath)
            this.close()
        },
        close() {
            this.$store.commit('DELETE_MODAL', this.guid)
        }
    },
    created() {
        this.newPath = this.torrent.savePath
    }
}
</script>
