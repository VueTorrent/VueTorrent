<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.trackers_count') | titleCase }}
    </div>
    <div>{{ torrent.trackers_count }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'TrackersCount',
  mixins: [TorrentDashboardItem]
})
</script>
