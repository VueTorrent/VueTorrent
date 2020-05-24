<template>
    <v-app :style="{ backgroundColor: background }">
        <AddModal />
        <Navbar v-if="isAuthenticated" />
        <v-content fill-height fill-width>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import { isAuthenticated } from '@/services/auth.js'

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
        ...mapState(['rid', 'mainData', 'preferences']),
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        background() {
            return this.$vuetify.theme.themes[this.theme].background
        },
        isAuthenticated() {
            return this.getAuth()
        }
    }
}
</script>
