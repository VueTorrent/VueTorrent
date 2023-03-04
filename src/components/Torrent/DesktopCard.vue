<template>
  <v-layout row wrap class="ma-0 px-4 py-2 ml-0 flex-gap">
    <v-flex xs12>
      <div class="truncate">
        {{ torrent.name }}
      </div>
    </v-flex>
    <component :is="item.name" v-for="item in properties" :key="item.name" :torrent="torrent" />
  </v-layout>
</template>
<script>
import * as Fields from './DashboardItems'
import { mapState } from 'vuex'

export default {
  name: 'DesktopCard',
  components: {
    ...Fields
  },
  props: {
    torrent: Object
  },
  computed: {
    ...mapState(['webuiSettings']),
    properties() {
      if (this.torrent.progress === 100) {
        return this.webuiSettings.doneDesktopTorrentProperties.filter(i => i.active)
      }

      return this.webuiSettings.busyDesktopTorrentProperties.filter(i => i.active)
    }
  }
}
</script>

<style scoped lang="scss">
.flex-gap {
  /* xs */
  @media (min-width: 0) {
    column-gap: 15px;
  }
  /* sm */
  @media (min-width: 600px) {
    column-gap: 10px;
  }
  /* md */
  @media (min-width: 960px) {
    column-gap: 5px;
  }
}
</style>
