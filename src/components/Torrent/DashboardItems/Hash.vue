<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.hash') | titleCase }}
    </div>
    <div>{{ torrent.hash }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Hash',
  props: {
    torrent: Torrent
  }
})
</script>
