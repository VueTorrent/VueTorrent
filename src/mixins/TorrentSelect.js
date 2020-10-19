export default {
    methods: {
        isAlreadySelected(hashesArray) {
            return this.$store.getters.containsTorrents(hashesArray)
        },
        selectTorrents(hashesArray) {
            if (this.isAlreadySelected(hashesArray)) {
                this.$store.commit('SET_SELECTED', { type: 'remove', hash: this.hash })
            } else {
                this.$store.commit('SET_SELECTED', { type: 'add', hash: this.hash })
            }
        }
    }
}
