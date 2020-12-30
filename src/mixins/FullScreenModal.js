export default {
  computed: {
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    dialogWidth() {
      return this.phoneLayout ? '100%' : '80%'
    }
  },
  watch: {
    dialog(visible) {
      if (!visible) {
        this.tab = null
      }
    }
  }
}
