<template>
  <v-card
      ripple
      flat
      class="pointer torrent noselect"
      :class="{ torrent_selected: isAlreadySelected(torrent.hash) }"
      @click.native.exact.prevent="
      $vuetify.breakpoint.smAndDown ?
      selectTorrent(torrent.hash)  :
      showInfo(torrent.hash)"
      @dblclick.prevent="showInfo(torrent.hash)"
      @click.ctrl.exact.prevent="selectTorrent(torrent.hash)"
      @click.shift.exact.prevent="selectUntil(torrent.hash, index)"
  >
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-layout v-on="denseDashboard && on" row wrap :class="style">
          <v-flex xs12 :class="denseDashboard ? 'sm3' : ''">
            <div class="caption grey--text">Torrent title</div>
            <div class="truncate">{{ torrent.name }}</div>
          </v-flex>
          <component
            :key="'busy' + item.name"
            v-for="item in properties"
            :is="item.name" :torrent="torrent"
          />
        </v-layout>
      </template>
      <span>{{ torrent.name }}</span>
    </v-tooltip>
    <v-divider v-if="index !== length"></v-divider>
  </v-card>
</template>

<script>
import { General, TorrentSelect } from '@/mixins'
import { mapGetters } from 'vuex'
import {
    Size,
    Progress,
    Download,
    Ratio,
    Upload,
    ETA,
    Peers,
    Seeds,
    Status,
    Category,
    Tags
} from './Torrent/DashboardItems'

export default {
    name: 'Torrent',
    components: {
        Size,
        Progress,
        Download,
        Ratio,
        Upload,
        ETA,
        Peers,
        Seeds,
        Status,
        Category,
        Tags
    },
    mixins: [General, TorrentSelect],
    props: {
        torrent: Object,
        index: Number,
        length: Number
    },
    computed: {
        ...mapGetters(['getTheme', 'getWebuiSettings']),
        theme() {
            return this.getTheme() ? 'dark' : 'light'
        },
        state() {
            return this.torrent.state.toLowerCase()
        },
        style() {
            let base = `pa-4 ml-0 sideborder ${this.state} `
            if (this.index === this.length) base += ' bottomBorderRadius'
            if (this.index === 0) base += ' topBorderRadius'
            return base
        },
        phoneLayout() {
            return this.$vuetify.breakpoint.xsOnly
        },
        denseDashboard() {
            return this.getWebuiSettings().denseDashboard
        },
        properties() {
            if (this.torrent.progress === 100) {
                return this.getWebuiSettings().doneTorrentProperties.filter(i => i.active)
            }
            return this.getWebuiSettings().busyTorrentProperties.filter(i => i.active)
        }
    },
    methods: {
        showInfo(hash) {
            this.createModal('TorrentDetailModal', { hash })
        }
    }
}
</script>

<style lang="scss" scoped>
.topBorderRadius {
  border-top-left-radius: 3px;
}
.bottomBorderRadius {
  border-bottom-left-radius: 3px;
}
</style>
