<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.global_volume') }}
    </div>
    <div>
      {{ torrent.globalVolume | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.globalVolume | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'GlobalVolume',
  props: {
    torrent: Torrent
  }
})
</script>
