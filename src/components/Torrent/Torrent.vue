<template>
  <v-card
    flat
    class="pointer noselect"
    :class="{ selected: isSelected}"
    @click.native.exact.prevent="selectMode && selectTorrent(torrent.hash)"
    @dblclick.prevent="showInfo(torrent.hash)"
    @click.ctrl.exact.prevent="selectTorrent(torrent.hash)"
    @click.shift.exact.prevent="selectUntil(torrent.hash, index)"
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
    }
  }
}
</script>
