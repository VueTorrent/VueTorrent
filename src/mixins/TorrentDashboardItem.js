import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['getTheme']),
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        },
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        state() {
            return this.torrent.state.toLowerCase()
        }
    }
}
