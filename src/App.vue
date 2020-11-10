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
import { General } from '@/mixins'

export default {
    name: 'App',
    components: { Navbar },
    mixins: [General],
    data() {
        return {}
    },
    methods: {
        async checkAuthenticated() {
            const res = await qbit.login()
            const authenticated = res === 'Ok.'
            this.$store.commit('LOGIN', authenticated)
            if (
                !authenticated &&
                !this.$router.currentRoute.name.includes('login')
            ) this.$router.push('login')
        }
    },
    computed: {
        ...mapState(['rid', 'mainData', 'preferences', 'modals']),
        ...mapGetters(['getAuthenticated']),
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
