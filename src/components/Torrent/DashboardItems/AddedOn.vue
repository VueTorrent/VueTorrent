<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      {{ $t('torrent.properties.added_on') | titleCase }}
    </div>
    <div>{{ torrent.added_on }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'AddedOn',
  props: {
    torrent: Torrent
  }
})
</script>
