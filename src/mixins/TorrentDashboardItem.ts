import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'
import { TorrentState } from '@/enums/vuetorrent'

export default defineComponent({
  name: 'TorrentDashboardItem',
  props: {
    torrent: Torrent
  },
  computed: {
    ...mapGetters(['getTheme']),
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    theme(): string {
      // @ts-expect-error: TS2339: Property 'getTheme' does not exist on type 'CreateComponentPublicInstance { torrent: typeof Torrent; }>, {}, {}, { phoneLayout(): boolean; theme(): string; state(): string; }, {}, ComponentOptionsMixin, ... 11 more ..., {}>'.
      return this.getTheme()
    },
    state() {
      if (!this.torrent) return TorrentState.UNKNOWN.toString().toLowerCase()
      return this.torrent.state.toLowerCase()
    }
  }
})
