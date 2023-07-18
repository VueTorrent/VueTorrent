<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.peers') }}
    </div>
    <div>
      {{ torrent.num_leechs }}
      <span class="grey--text caption"> / {{ torrent.available_peers }} </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'Peers',
  mixins: [TorrentDashboardItem]
})
</script>
