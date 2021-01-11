<template>
  <v-card
    flat
    class="pointer torrent noselect"
    :class="{ torrent_selected: isAlreadySelected(torrent.hash) }"
    @click.native.exact.prevent="showInfo(torrent.hash)"
    @click.ctrl.exact.prevent="selectTorrent(torrent.hash)"
    @click.shift.exact.prevent="selectUntil(torrent.hash, index)"
  >
    <v-tooltip top>
      <template #activator="{ on }">
        <v-layout
          row
          wrap
          :class="style"
          v-on="denseDashboard && on"
        >
          <v-flex xs12 :class="denseDashboard ? 'sm3' : ''">
            <div class="caption grey--text">
              Torrent title
            </div>
            <div class="truncate mr-4">
              {{ torrent.name }}
            </div>
          </v-flex>
          <component
            :is="item.name"
            v-for="item in properties"
            :key="item.name"
            :torrent="torrent"
          />
        </v-layout>
      </template>
      <span>{{ torrent.name }}</span>
    </v-tooltip>
  </v-card>
</template>

<script>
import { General, TorrentSelect } from '@/mixins'
import { mapGetters } from 'vuex'
import * as Fields from './DashboardItems'

export default {
  name: 'Torrent',
  components: {
    ...Fields
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
      return `ma-0 pa-4 ml-0 sideborder ${this.state} `
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