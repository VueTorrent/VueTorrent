import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTheme']),
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    theme() {
      return this.getTheme()
    },
    state() {
      return this.torrent.state.toLowerCase()
    }
  }
}
