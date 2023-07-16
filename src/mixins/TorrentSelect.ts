import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: 'TorrentSelect',
  computed: {
    ...mapState(['selectMode']),
    ...mapGetters(['containsTorrent'])
  },
  methods: {
    isAlreadySelected(hash: string) {
      return this.containsTorrent(hash)
    },
    selectTorrent(hash: string) {
      if (!this.selectMode) this.selectMode = true
      if (this.isAlreadySelected(hash)) {
        this.$store.commit('SET_SELECTED', {type: 'remove', hash})
      } else {
        this.$store.commit('SET_SELECTED', {type: 'add', hash})
      }
    },
    selectUntil(hash: string, index: number) {
      if (!this.selectMode) return
      this.$store.commit('SET_SELECTED', {type: 'until', hash, index})
    }
  }
})
