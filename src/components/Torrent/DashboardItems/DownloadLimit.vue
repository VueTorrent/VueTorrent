<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_limit') | titleCase }}
    </div>
    <div>
      {{ torrent.dl_limit | getDataValue(1) }}
      <span class="caption grey--text"> {{ torrent.dl_limit | getDataUnit }}/s </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'DownloadLimit',
  props: {
    torrent: Torrent
  }
})
</script>
