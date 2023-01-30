<template>
  <v-flex xs6 sm1>
    <div class="caption grey--text">
      {{ $t('torrent.last_activity') | titleCase }}
    </div>
    <div>{{ torrent.last_activity }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'LastActivity',
  props: {
    torrent: Torrent
  }
})
</script>
