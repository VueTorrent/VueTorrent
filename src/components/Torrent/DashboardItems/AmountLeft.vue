<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.amount_left') | titleCase }}
    </div>
    <div>
      {{ torrent.amount_left | formatDataValue(shouldUseBinaryData()) }}
      <span class="caption grey--text">
        {{ torrent.amount_left | formatDataUnit(shouldUseBinaryData()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {TorrentDashboardItem} from '@/mixins'

export default defineComponent({
  name: 'AmountLeft',
  mixins: [TorrentDashboardItem]
})
</script>
