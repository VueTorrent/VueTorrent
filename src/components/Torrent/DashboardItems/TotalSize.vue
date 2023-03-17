<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.total_size') | titleCase }}
    </div>
    <div>
      {{ torrent.total_size | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.total_size | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'TotalSize',
  props: {
    torrent: Torrent
  }
})
</script>
