<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.upload_speed') }}
    </div>
    <div>
      {{ torrent.upspeed | formatSpeedValue(shouldUseBitSpeed()) }}
      <span class="caption grey--text">
        {{ torrent.upspeed | formatSpeedUnit(shouldUseBitSpeed()) }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'UploadSpeed',
  mixins: [TorrentDashboardItem]
})
</script>
