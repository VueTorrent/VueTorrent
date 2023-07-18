<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.global_volume') }}
    </div>
    <div>
      {{ torrent.globalVolume | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.globalVolume | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'GlobalVolume',
  mixins: [TorrentDashboardItem]
})
</script>
