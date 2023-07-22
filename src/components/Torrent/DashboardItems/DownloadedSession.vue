<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.downloaded_session') | titleCase }}
    </div>
    <div>
      {{ torrent.downloaded_session | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.downloaded_session | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'DownloadedSession',
  mixins: [TorrentDashboardItem]
})
</script>
