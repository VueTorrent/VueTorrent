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
import Navbar from '@/components/Navbar/Navbar.vue'
import { version } from '../package.json'
import qbit from '@/services/qbit'

export default {
    components: { Navbar },
    name: 'App',
    data() {
        return {}
    },
    methods: {
        async checkAuthenticated() {
            const res = await qbit.login()
            this.$store.commit('LOGIN', res === 'Ok.')
        }
    },
    computed: {
        ...mapState(['rid', 'mainData', 'preferences', 'modals']),
        ...mapGetters(['getTheme', 'getAuthenticated']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        background() {
            return this.$vuetify.theme.themes[this.theme].background
        },
        isAuthenticated() {
            return this.getAuthenticated()
        }
    },
    created() {
        this.$store.commit('SET_APP_VERSION', version)
        this.checkAuthenticated()
    }
}
</script>
