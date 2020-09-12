<template>
    <v-app :style="{ backgroundColor: background }">
        <component
            v-for="modal in modals"
            :key="modal.guid"
            :is="modal.component"
            v-bind="{ guid: modal.guid, ...modal.props }"
        />
        <Navbar v-if="isAuthenticated" />
        <v-main fill-height fill-width>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import { isAuthenticated } from '@/services/auth.js'
import { version } from '../package.json'

export default {
    components: { Navbar },
    name: 'App',
    data() {
        return {}
    },
    methods: {
        async getAuth() {
            return await isAuthenticated()
        }
    },
    computed: {
        ...mapState(['rid', 'mainData', 'preferences', 'modals']),
        ...mapGetters([
            'getTheme',
            'getDynamicComponent',
            'getDynamicComponent'
        ]),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        background() {
            return this.$vuetify.theme.themes[this.theme].background
        },
        isAuthenticated() {
            return this.getAuth()
        }
    },
    created() {
        this.$store.commit('SET_APP_VERSION', version)
    }
}
</script>
