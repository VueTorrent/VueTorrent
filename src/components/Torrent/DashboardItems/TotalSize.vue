<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.total_size') | titleCase }}
    </div>
    <div>
      {{ torrent.total_size | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.total_size | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'TotalSize',
  mixins: [TorrentDashboardItem]
})
</script>
