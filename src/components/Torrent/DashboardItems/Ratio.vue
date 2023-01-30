<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('ratio') }}
    </div>
    <div>{{ torrent.ratio }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Ratio',
  props: {
    torrent: Torrent
  }
})
</script>
