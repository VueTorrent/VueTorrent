<template>
  <v-card
    flat
    class="pointer noselect"
    :class="{ torrent_selected: isAlreadySelected(torrent.hash) }"
    @click.native.exact.prevent="showInfo(torrent.hash)"
    @click.ctrl.exact.prevent="selectTorrent(torrent.hash)"
    @click.shift.exact.prevent="selectUntil(torrent.hash, index)"
  >
    <v-layout
      v-if="isMobile"
      wrap
      class="ma-0 pa-2"
      :class="style"
    >
      <v-card-title class="truncate pa-0 subtitle-1">
        {{ torrent.name }}
      </v-card-title>
      <v-card-subtitle class="pa-0 ma-1 row">
        <div>
          {{ torrent.state }}:
          <span class="white--text"> {{ torrent.dloaded | getDataValue }} </span>
          {{ torrent.dloaded | getDataUnit }} /
          <span class="white--text">{{ torrent.size | getDataValue }} </span>
          {{ torrent.size | getDataUnit }}
        </div>
        <v-spacer />
        <div><span class="white--text">{{ torrent.progress }}</span>%</div>
      </v-card-subtitle>
      <v-flex xs12 class="mt-1 mb-1">
        <v-progress-linear color="upload" :value="torrent.progress" />
      </v-flex>
      <v-flex row xs12 class="ma-1">
        <div class="caption grey--text">
          {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
        </div>
        <v-spacer />
        <div class="caption grey--text">
          {{ torrent.dlspeed | getDataValue(1) }} {{ torrent.dlspeed | getDataUnit(1) }}/s {{ torrent.upspeed | getDataValue(1) }} {{ torrent.upspeed | getDataUnit(1) }}/s
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      row
      wrap
      class="ma-0 pa-4 ml-0 "
      :class="style"
    >
      <v-flex xs12>
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
  </v-card>
</template>

<script>
import { General, TorrentSelect } from '@/mixins'
import { mapGetters, mapState } from 'vuex'
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
    ...mapState(['selected_torrents']),
    theme() {
      return this.getTheme() ? 'dark' : 'light'
    },
    state() {
      return this.torrent.state.toLowerCase()
    },
    style() {
      return `sideborder ${this.state} ${this.isSelected ? 'selected' : ''}`
    },
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    properties() {
      if (this.torrent.progress === 100) {
        return this.getWebuiSettings().doneTorrentProperties.filter(i => i.active)
      }
      
      return this.getWebuiSettings().busyTorrentProperties.filter(i => i.active)
    },
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