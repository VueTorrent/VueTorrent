<template>
    <v-dialog max-width="500px" v-model="dialog">
        <v-card>
            <div
                :style="{ height: phoneLayout ? '100vh' : '' }"
            >
                <v-card-title class="pb-0 justify-center primary">
                    <h2 class="white--text">Settings</h2>
                </v-card-title>
                <v-tabs v-model="tab" background-color="primary" center-active>
                    <v-tab href="#webui">WebUI</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" touchless>
                    <v-tab-item value="webui">
                        <WebUI :is-active="tab === 'webui'"/>
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

export default {
    name: 'SettingsModal',
    mixins: [Modal],
    components: { WebUI },
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
