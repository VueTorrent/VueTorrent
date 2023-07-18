<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.content_path') | titleCase }}
    </div>
    <div>{{ torrent.content_path }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'ContentPath',
  mixins: [TorrentDashboardItem]
})
</script>
