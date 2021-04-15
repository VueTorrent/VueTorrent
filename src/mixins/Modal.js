import { mapGetters } from 'vuex'
export default {
  props: ['guid'],
  computed: {
    ...mapGetters(['getModalState'])
  },
  methods: {
    deleteModal() {
      setTimeout(() => this.$store.commit('DELETE_MODAL', this.guid), 100)
    }
  },
  beforeDestroy() {
    this.deleteModal()
  }
}
