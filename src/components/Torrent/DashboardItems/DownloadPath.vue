<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_path') | titleCase }}
    </div>
    <div>{{ torrent.download_path }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'DownloadPath',
  props: {
    torrent: Torrent
  }
})
</script>
