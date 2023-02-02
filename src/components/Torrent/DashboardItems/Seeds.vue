<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('seeds') }}
    </div>
    <div>
      {{ torrent.num_seeds }}
      <span class="grey--text caption"> /{{ torrent.available_seeds }} </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Seeds',
  props: {
    torrent: Torrent
  }
})
</script>
