<template>
  <v-flex v-if="torrent.tracker" xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('tracker') }}
    </div>
    <v-chip small class="trackers white--text caption">
      {{ trackerString }}
    </v-chip>
  </v-flex>
</template>

<script lang="ts">
import { TorrentDashboardItem } from '@/mixins'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Tracker',
  mixins: [TorrentDashboardItem],
  props: {
    torrent: Torrent
  },
  computed: {
    trackerString() {
      let trackerUrl = this.torrent.tracker.match(/:\/\/([^\/]+\.)?([^\/\.]+)\.[^\/\.:]+/i)
      if (trackerUrl != null && trackerUrl.length > 2 && typeof trackerUrl[2] === 'string' && trackerUrl[2].length > 0) {
        return trackerUrl[2]
      } else {
        return ''
      }
    }
  }
})
</script>

<style>
.trackers {
  background-color: #fbe777 !important;
}
</style>
