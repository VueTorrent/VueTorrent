<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.uploaded') }}
    </div>
    <div>
      {{ torrent.uploaded | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.uploaded | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Uploaded',
  props: {
    torrent: Torrent
  }
})
</script>
