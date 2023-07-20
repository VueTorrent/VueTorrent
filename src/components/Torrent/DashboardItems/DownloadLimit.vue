<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_limit') | titleCase }}
    </div>
    <div>
      {{ torrent.dl_limit | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.dl_limit | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'DownloadLimit',
  mixins: [TorrentDashboardItem]
})
</script>
