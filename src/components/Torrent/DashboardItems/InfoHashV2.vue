<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.info_hash_v2') | titleCase }}
    </div>
    <div>{{ torrent.infohash_v2 }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'InfoHashV2',
  props: {
    torrent: Torrent
  }
})
</script>
