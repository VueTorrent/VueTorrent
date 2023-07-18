<template>
  <v-flex xs12 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.progress') | titleCase }}
    </div>
    <v-progress-linear :value="torrent?.progress ?? 0" height="20" style="width: 90%" :color="`torrent-${torrentStateClass}`" rounded>
      <span class="caption white--text">{{ torrent.progress | progress }}</span>
    </v-progress-linear>
  </v-flex>
</template>

<script lang="ts">
import { TorrentDashboardItem } from '@/mixins'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Progress',
  mixins: [TorrentDashboardItem]
})
</script>
