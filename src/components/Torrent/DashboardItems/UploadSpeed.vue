<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.upload_speed') }}
    </div>
    <div>
      {{ torrent.upspeed | getDataValue(1) }}
      <span class="caption grey--text"> {{ torrent.upspeed | getDataUnit(1) }}/s </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'UploadSpeed',
  props: {
    torrent: Torrent
  }
})
</script>
