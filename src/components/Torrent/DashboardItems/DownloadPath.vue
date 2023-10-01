<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_path') | titleCase }}
    </div>
    <div>{{ torrent.download_path }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'DownloadPath',
  mixins: [TorrentDashboardItem]
})
</script>
