import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getSettings']),
        settings() {
            return this.getSettings()
        }
    }
}
