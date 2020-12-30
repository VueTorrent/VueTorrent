<template>
  <v-flex xs6 sm1>
    <div class="caption grey--text">
      Status
    </div>
    <v-chip
      small
      class="caption white--text"
      :class="state"
    >
      {{ torrent.state }}
    </v-chip>
  </v-flex>
</template>
<script>
import { TorrentDashboardItem } from '@/mixins'
export default {
  name: 'Status',
  mixins: [TorrentDashboardItem],
  props: ['torrent']
}
</script>
