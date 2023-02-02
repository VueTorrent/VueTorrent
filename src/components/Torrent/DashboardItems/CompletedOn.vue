<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      {{ $t('torrent.completed_on') | titleCase }}
    </div>
    <div>{{ torrent.completed_on }}</div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'CompletedOn',
  props: {
    torrent: Torrent
  }
})
</script>
