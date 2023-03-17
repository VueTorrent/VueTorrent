<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.download_speed') }}
    </div>
    <div>
      {{ torrent.dlspeed | getDataValue(1) }}
      <span class="caption grey--text"> {{ torrent.dlspeed | getDataUnit }}/s </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'DownloadSpeed',
  props: {
    torrent: Torrent
  }
})
</script>
