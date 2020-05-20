import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getModalState']),
        dialog: {
            get() {
                return this.getModalState(this.$options.name)
            },
            set() {
                this.$store.commit('TOGGLE_MODAL', this.$options.name)
            }
        }
    }
}
