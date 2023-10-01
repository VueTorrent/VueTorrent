<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_speed') }}
    </div>
    <div>
      {{ torrent.dlspeed | formatSpeedValue(shouldUseBitSpeed()) }}
      <span class="caption grey--text">
        {{ torrent.dlspeed | formatSpeedUnit(shouldUseBitSpeed()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'DownloadSpeed',
  mixins: [TorrentDashboardItem]
})
</script>
