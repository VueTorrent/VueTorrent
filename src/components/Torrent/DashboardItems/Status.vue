<template>
  <v-flex xs5 sm1>
    <div class="caption grey--text">Status</div>
    <v-chip
        small
        class="caption"
        :class="
                            theme === 'light'
                                ? `${state} white--text `
                                : `${state}  black--text`">
      {{ torrent.state }}
    </v-chip>
  </v-flex>
</template>
<script>
import {TorrentDashboardItem} from '@/mixins'
export default {
    name: 'Status',
    mixins : [TorrentDashboardItem],
    props: ['torrent']
}
</script>