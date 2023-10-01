import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FullScreenModal',
  data() {
    return {
      tab: null as string | null
    }
  },
  computed: {
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    dialogWidth() {
      return this.phoneLayout ? '100%' : '80%'
    }
  },
  watch: {
    dialog(visible: boolean) {
      if (!visible) this.tab = null
    }
  }
})
