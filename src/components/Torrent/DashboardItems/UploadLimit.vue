<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.upload_limit') }}
    </div>
    <div>
      {{ torrent.up_limit | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.up_limit | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'UploadLimit',
  mixins: [TorrentDashboardItem]
})
</script>
