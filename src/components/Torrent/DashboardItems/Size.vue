<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.size') | titleCase }}
    </div>
    <div>
      {{ torrent.size | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.size | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Size',
  props: {
    torrent: Torrent
  }
})
</script>
