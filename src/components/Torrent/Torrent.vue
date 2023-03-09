<template>
  <v-card class="pointer noselect elevation-0 rounded-0 ma-0 pa-0" :class="style">
    <v-layout @click="evtClicnk">
      <MobileCard v-if="isMobile" :torrent="torrent" />
      <DesktopCard v-else :torrent="torrent" />
    </v-layout>
  </v-card>
</template>

<script>
import { General, TorrentSelect } from '@/mixins'
import { mapState } from 'vuex'
import DesktopCard from './DesktopCard.vue'
import MobileCard from './MobileCard.vue'
import {Torrent} from '@/models'
import {doesCommand} from "@/helpers";

export default {
  name: 'Torrent',
  components: {
    DesktopCard,
    MobileCard
  },
  mixins: [General, TorrentSelect],
  props: {
    torrent: Torrent,
    index: Number
  },
  computed: {
    ...mapState(['selectMode']),
    style() {
      const state = this.torrent.state.toString().toLowerCase()
      return `sideborder ${state} ${this.isAlreadySelected(this.torrent.hash) ? `torrent-${state}` : ''}`
    }
  },
  methods: {
    evtClicnk: function (event) {
      if (event.shiftKey) {
        this.selectUntil(this.torrent.hash, this.index)
      } else if (doesCommand(event) || this.selectMode) {
        this.selectTorrent(this.torrent.hash)
      }
    }
  }
}
</script>
