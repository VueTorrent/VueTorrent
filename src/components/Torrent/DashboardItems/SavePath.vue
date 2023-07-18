<template>
  <v-flex xs6 md2 sm1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.save_path') | titleCase }}
    </div>
    <div class="truncate" :title="torrent?.savePath">
      {{ torrent.savePath }}
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'SavePath',
  mixins: [TorrentDashboardItem]
})
</script>
