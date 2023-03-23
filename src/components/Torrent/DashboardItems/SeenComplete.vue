<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.seen_complete') | titleCase }}
    </div>
    <div>{{ torrent.seen_complete }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'SeenComplete',
  props: {
    torrent: Torrent
  }
})
</script>
