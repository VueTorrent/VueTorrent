<template>
    <v-app class="background">
        <AddModal/>
        <div v-if="authenticated" class="background">
            <keep-alive><Navbar /></keep-alive>
            <v-content class="mx-4 mb-4">
                <router-view></router-view>
            </v-content>
        </div>
        <v-container v-else fill-height>
            <v-layout
                row
                wrap
                align-center
                class="justify-center"
                justify-center
            >
                <div style="margin: 0 auto;">
                    <Login />
                </div>
            </v-layout>
        </v-container>
        <div class="background">
            <p class="grey--text caption text-center">
                Made by Daan Wijns
            </p>
        </div>
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'

export default {
    components: { Navbar, Login },
    name: 'App',
    data() {
        return {}
    },
    computed: {
        ...mapState(['authenticated', 'rid', 'mainData', 'preferences']),
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        }
    }
}
</script>
