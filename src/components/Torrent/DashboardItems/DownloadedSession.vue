<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.downloaded_session') | titleCase }}
    </div>
    <div>
      {{ torrent.downloaded_session | getDataValue(2) }}
      <span class="caption grey--text">
        {{ torrent.downloaded_session | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'DownloadedSession',
  props: {
    torrent: Torrent
  }
})
</script>
