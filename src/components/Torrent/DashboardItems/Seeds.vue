<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.seeds') }}
    </div>
    <div>
      {{ torrent.num_seeds }}
      <span class="grey--text caption"> / {{ torrent.available_seeds }} </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'Seeds',
  mixins: [TorrentDashboardItem]
})
</script>
