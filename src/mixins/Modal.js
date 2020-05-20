import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getAvailableTiles', 'getModalState']),
        availableTiles() {
            return this.getAvailableTiles()
        },
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
