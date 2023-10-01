<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.ratio') }}
    </div>
    <div>{{ torrent.ratio }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'Ratio',
  mixins: [TorrentDashboardItem]
})
</script>
