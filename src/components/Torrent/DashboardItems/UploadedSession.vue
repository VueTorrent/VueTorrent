<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.uploaded_session') | titleCase }}
    </div>
    <div>
      {{ torrent.uploaded_session | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.uploaded_session | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'UploadedSession',
  mixins: [TorrentDashboardItem]
})
</script>
