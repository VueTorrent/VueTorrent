<template>
    <v-app :style="{ backgroundColor : background }" >
       <AddModal />
       <Navbar v-if="authenticated" /> 
        <v-container fill-height fill-width>
            <v-content>
                <router-view></router-view>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default {
    components: { Navbar },
    name: 'App',
    data() {
        return {}
    },
    computed: {
        ...mapState(['authenticated', 'rid', 'mainData', 'preferences']),
        ...mapGetters(['getTheme']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        background(){
            return this.$vuetify.theme.themes[this.theme].background
        }
    }
}
</script>
