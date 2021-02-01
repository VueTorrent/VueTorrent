<template>
  <v-card
    v-ripple="true"
    flat
    class="pointer noselect"
    :class="{ selected: isSelected }"
    @click.native.exact.prevent="selectMode && selectTorrent(torrent.hash)"
    @dblclick.exact.prevent="showInfo(torrent.hash)"
    @click.native.ctrl.exact.prevent="handleSelection(torrent.hash)"
    @click.native.shift.exact.prevent="handleRangeSelection(torrent.hash, index)"
  >
    <MobileCard v-if="isMobile" :torrent="torrent" />
    <DesktopCard v-else :torrent="torrent" />
  </v-card>
</template>

<script>
import { General, TorrentSelect } from '@/mixins'
import { mapState } from 'vuex'
import DesktopCard from './DesktopCard.vue'
import MobileCard from './MobileCard.vue'

export default {
  name: 'Torrent',
  components: {
    DesktopCard,
    MobileCard
  },
  mixins: [General, TorrentSelect],
  props: {
    torrent: Object,
    index: Number
  },
  computed: {
    ...mapState(['selected_torrents', 'selectMode']),
    isSelected() {
      return this.selected_torrents.includes(this.torrent.hash)
    }
  },
  methods: {
    showInfo(hash) {
      this.createModal('TorrentDetailModal', { hash })
    },
    enableSelectMode() {
      if (!this.$store.state.selectMode) {
        this.$store.state.selectMode = true
      }
    },
    disableSelectMode() {
      if (this.$store.state.selectMode) {
        this.$store.state.selectMode = false
      }
    },
    toggleSelection() {
      if (this.selected_torrents.length) {
        this.enableSelectMode()
      } else {
        this.disableSelectMode()
      }
    },
    // custom selection with Ctrl and Shift pressed that initites selection mode
    handleSelection(hash) {
      // trick to allow adding or removing selected torrents
      // because select function from mixin doesnt allow this if select mode is not enables
      this.enableSelectMode()
      this.selectTorrent(hash)
      this.toggleSelection()
    },
    handleRangeSelection(hash, index) {
      // trick to allow adding or removing selected torrents
      // because select function from mixin doesnt allow this if select mode is not enables
      this.enableSelectMode()
      this.selectUntil(hash, index)
      this.toggleSelection()
    }
  }
}
</script>