<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.size') | titleCase }}
    </div>
    <div>
      {{ torrent.size | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.size | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'Size',
  mixins: [TorrentDashboardItem]
})
</script>
