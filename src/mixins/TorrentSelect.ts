import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TorrentSelect extends Vue {
  isAlreadySelected(hash: string) {
    return this.$store.getters.containsTorrent(hash)
  }
  selectTorrent(hash: string) {
    if (!this.$store.state.selectMode) this.$store.state.selectMode = true
    if (this.isAlreadySelected(hash)) {
      this.$store.commit('SET_SELECTED', { type: 'remove', hash })
    } else {
      this.$store.commit('SET_SELECTED', { type: 'add', hash })
    }
  }
  selectUntil(hash: string, index: number) {
    if (!this.$store.state.selectMode) return
    this.$store.commit('SET_SELECTED', { type: 'until', hash, index })
  }
}
