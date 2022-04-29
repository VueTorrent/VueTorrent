<template>
  <v-flex
    xs6
    sm1
    md1
    class="mr-4"
  >
    <div class="caption grey--text">
      {{ $t('status') }}
    </div>
    <v-chip
      small
      class="caption white--text px-2"
      :class="state"
    >
      {{ stateString }}
    </v-chip>
  </v-flex>
</template>
<script>
import { TorrentDashboardItem } from '@/mixins'
export default {
  name: 'Status',
  mixins: [TorrentDashboardItem],
  props: ['torrent'],
  computed: {
    stateString() {
      if (this.torrent.forced) {
        return `[F] ${this.torrent.state}`
      }      
      
      return this.torrent.state
    }
  }
}
</script>
