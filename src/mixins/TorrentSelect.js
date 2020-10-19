export default {
    methods: {
        isAlreadySelected(hash) {
            return this.$store.getters.containsTorrent(hash)
        },
        selectTorrent(hash) {
            if (this.isAlreadySelected(hash)) {
                this.$store.commit('SET_SELECTED', { type: 'remove', hash })
            } else {
                this.$store.commit('SET_SELECTED', { type: 'add', hash })
            }
        }
    }
}
