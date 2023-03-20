<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.trackers_count') | titleCase }}
    </div>
    <div>{{ torrent.trackers_count }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'TrackersCount',
  props: {
    torrent: Torrent
  }
})
</script>
