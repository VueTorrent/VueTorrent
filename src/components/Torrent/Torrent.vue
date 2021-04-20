<template>
  <v-card
    class="pointer noselect elevation-0 rounded-0 ma-0 pa-0"
    :class="isSelected ? 'info' : ''"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 100"
      preserveAspectRatio="none"
      class="updlGraph"
      style="position:absolute; width:300px; height:30%; bottom:0"
    >
      <defs>
        <linearGradient id="fadeGrad" x1="100%" x2="0%">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="1" />
        </linearGradient>
        <mask id="fade" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#fadeGrad)" />
        </mask>
      </defs>
      <g mask="url(#fade)">
        <path class="hWndUpload" />
        <path class="hWndUpload" />
        <path class="hWndUpload" />
        <path class="hWndDownload" />
        <path class="hWndDownload" />
        <path class="hWndDownload" />
      </g>
    </svg>
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
  data() {
    return {
      svgGraph: null, hWndDownload: null, hWndUpload: null,
      ad: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      au: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  mounted() {
    const
      getCanvas = s => this.$el.getElementsByClassName(s)
    this.hWndDownload = getCanvas('hWndDownload')
    this.hWndUpload = getCanvas('hWndUpload')
  },
  /*
  beforeUpdate() {
    this.update()
  },*/
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
      const 
        ad = this.ad, au = this.au
      ad.shift(); au.shift()
      ad.push(this.torrent.dlspeed || 0)
      au.push(this.torrent.upspeed || 0)
      this.hWndDownload && this.updateGraph(this.ad, this.hWndDownload)
      this.hWndUpload && this.updateGraph(this.au, this.hWndUpload)
    },
    updateGraph(val, cvs) {
      var
        i, v, v2, d_dat = [], b_dat = [], c_dat = []
      const
        max = Math.max.apply(null, val)
      var
        l = val.length - 1
      const
        c_ = e => Math.floor(100 - e / max * 100),
        n_ = e => Number.isNaN(e)
      v = c_(val[0]); if (n_(v)) v = 100
      d_dat.push(['M0', 100])
      d_dat.push(['L0', v])
      for (i = 1; i < l; i++) {
        v = c_(val[i]); if (n_(v)) v = 100
        v2 = c_(val[i + 1]); if (n_(v2)) v2 = 100; v2 = (v + v2) / 2

        d_dat.push(['Q' + i, v])
        d_dat.push([i + 0.5, v2])
      }
      v = c_(val[i]); if (n_(v)) v = 100
      d_dat.push(['L14', v])

      l = d_dat.length - 1
      for (i = l; i > 1; i--) {
        b_dat.push([d_dat[i][0], Math.floor(d_dat[i][1] + (100 - d_dat[i][1]) / 1.3)])
        c_dat.push([d_dat[i][0], Math.floor(d_dat[i][1] + (100 - d_dat[i][1]) / 2.3)])
      }
      b_dat.push([0, Math.floor(d_dat[1][1] + (100 - d_dat[1][1]) / 1.3)])
      c_dat.push([0, Math.floor(d_dat[1][1] + (100 - d_dat[1][1]) / 2.3)])

      d_dat.push([14, 100])
      cvs[0].setAttribute('d', d_dat)
      cvs[1].setAttribute('d', d_dat.concat(b_dat))
      cvs[2].setAttribute('d', d_dat.concat(c_dat))
    }
  }
}
</script>

<style lang="scss" scoped>

.hWndDownload {
  fill: var(--v-download-base);
  opacity: .23;
}
.hWndUpload {
  fill: var(--v-upload-base);
  opacity: .23;
}

</style>