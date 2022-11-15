<template>
  <v-layout row wrap class="ma-0 px-4 py-2 ml-0">
    <v-flex xs12>
      <div class="caption grey--text">
        {{ $t('torrent.torrentTitle') }}
      </div>
      <div class="truncate mr-4">
        {{ torrent.name }}
      </div>
    </v-flex>
    <component :is="item.name" v-for="item in properties" :key="item.name" :torrent="torrent" />
  </v-layout>
</template>
<script>
import * as Fields from './DashboardItems'
import { mapGetters } from 'vuex'

export default {
  name: 'DesktopCard',
  components: {
    ...Fields
  },
  props: {
    torrent: Object
  },
  computed: {
    ...mapGetters(['getWebuiSettings']),
    properties() {
      if (this.torrent.progress === 100) {
        return this.getWebuiSettings().doneTorrentProperties.filter(i => i.active)
      }

      return this.getWebuiSettings().busyTorrentProperties.filter(i => i.active)
    }
  }
}
</script>
