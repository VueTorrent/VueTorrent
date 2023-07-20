<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.eta') }}
    </div>
    <div>
      {{ torrent.eta }}
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'ETA',
  mixins: [TorrentDashboardItem]
})
</script>
