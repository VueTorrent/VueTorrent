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
      <v-flex xs12>
        <div class="truncate ">
          {{ torrent.name }}
        </div>
      </v-flex>
      <v-flex xs12>
        {{ torrent.dloaded | getDataValue }} {{ torrent.dloaded | getDataUnit }} /  {{ torrent.size | getDataValue }} {{ torrent.size | getDataUnit }} - {{ torrent.progress }}%
      </v-flex>
      <v-flex xs12 class="mt-1">
        <v-progress-linear :value="torrent.progress" />
      </v-flex>
      <v-flex xs6>
        {{ torrent.state }} {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
      </v-flex>
      <v-flex xs6>
        {{ torrent.dlspeed | getDataValue(1) }} {{ torrent.dlspeed | getDataUnit(1) }}/s {{ torrent.upspeed | getDataValue(1) }} {{ torrent.upspeed | getDataUnit(1) }}/s
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