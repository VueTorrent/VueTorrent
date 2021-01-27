<template>
  <v-flex
    xs6
    sm1
    md1
    class="mr-4"
  >
    <div class="caption grey--text">
      Status
    </div>
    <v-chip
      small
      class="caption white--text px-2"
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
