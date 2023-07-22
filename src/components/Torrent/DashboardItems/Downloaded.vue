<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.downloaded') }}
    </div>
    <div>
      {{ torrent.downloaded | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.downloaded | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'Downloaded',
  mixins: [TorrentDashboardItem]
})
</script>
