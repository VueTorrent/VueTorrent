<template>
  <v-card
    class="pointer noselect elevation-0 rounded-0 ma-0 pa-0"
    :class="isSelected ? 'info' : ''"
  >
    <LineGraph :download="downloadData" :upload="uploadData" />
    <v-layout
      @click="evtClicnk"
    >
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
import LineGraph from '../Core/Graphs/LineGraph'

export default {
  name: 'Torrent',
  components: {
    LineGraph,
    DesktopCard,
    MobileCard
  },
  mixins: [General, TorrentSelect],
  props: {
    torrent: Object,
    index: Number
  },
  data() {
    return {
      downloadData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      uploadData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  computed: {
    ...mapState(['selected_torrents', 'selectMode']),
    isSelected() {
      return this.selected_torrents.includes(this.torrent.hash)
    }
  },
  watch: {
    '$store.state.download_data'() {
      this.update()
    }
  },
  methods: {
    evtClicnk: function (event) {
      if (event.shiftKey) {
        this.selectUntil(this.torrent.hash, this.index)
      } else if (event.ctrlKey) {
        this.selectTorrent(this.torrent.hash)
      } else {
        this.selectMode && this.selectTorrent(this.torrent.hash)
      }
    },
    update() {
      this.downloadData.shift()
      this.uploadData.shift()
      this.downloadData.push(this.torrent.dlspeed || 0)
      this.uploadData.push(this.torrent.upspeed || 0)
    }
  }
}
</script>
