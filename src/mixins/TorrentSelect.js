export default {
  methods: {
    isAlreadySelected(hash) {
      return this.$store.getters.containsTorrent(hash)
    },
    selectTorrent(hash) {
      if (!this.$store.state.selectMode) return
      if (this.isAlreadySelected(hash)) {
        this.$store.commit('SET_SELECTED', { type: 'remove', hash })
      } else {
        this.$store.commit('SET_SELECTED', { type: 'add', hash })
      }
    },
    selectUntil(hash, index) {
      if (!this.$store.state.selectMode) return
      this.$store.commit('SET_SELECTED', { type: 'until', hash, index })
    }
  }
}
