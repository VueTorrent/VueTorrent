import { mapGetters } from 'vuex'
export default {
  props: ['guid'],
  data() {
    return {
      hndlDialog: true
    }
  },
  computed: {
    ...mapGetters(['getModalState']),
    dialog: {
      get() {
        return this.hndlDialog
      },
      set(val) {
        this.hndlDialog = val
        if (!val) this.deleteModal()
      }
    }
  },

  methods: {
    deleteModal() {
      //this.hndlDialog = false
      setTimeout(
        function () {
          this.$store.commit('DELETE_MODAL', this.guid)
        }.bind(this),
        300
      )
    }
  },
  beforeDestroy() {
    this.deleteModal()
  }
}
