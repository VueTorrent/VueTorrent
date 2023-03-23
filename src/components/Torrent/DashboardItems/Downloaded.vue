<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.downloaded') }}
    </div>
    <div>
      {{ torrent.downloaded | getDataValue(2) }}
      <span class="caption grey--text">
        {{ torrent.downloaded | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Downloaded',
  props: {
    torrent: Torrent
  }
})
</script>
