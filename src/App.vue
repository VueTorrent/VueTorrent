<template>
    <v-app class="grey lighten-4">
        <div v-if="authenticated">
            <Navbar />
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
        <v-spacer></v-spacer>
        <p
            class="grey--text caption text-sm-center text-md-center text-xs-center"
        >
            Made by Daan Wijns
        </p>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import qbit from './services/qbit'

export default {
    components: { Navbar, Login },
    name: 'App',
    data() {
        return {}
    },
    computed: {
        ...mapState(['authenticated', 'rid', 'mainData', 'preferences'])
    }
}
</script>
