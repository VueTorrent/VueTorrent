import { mapGetters } from 'vuex'
import {Component, Prop, Vue} from "vue-property-decorator";
import type {Torrent} from "@/models";

@Component({
  computed: mapGetters(['getTheme'])
})
export default class TorrentDashboardItem extends Vue {
  getTheme!: () => string

  @Prop() torrent!: Torrent

  get phoneLayout() {
    return this.$vuetify.breakpoint.xsOnly
  }
  get theme() {
    return this.getTheme()
  }
  get state() {
    return this.torrent.state.toLowerCase()
  }
}
