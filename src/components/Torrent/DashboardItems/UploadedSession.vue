<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.uploaded_session') | titleCase }}
    </div>
    <div>
      {{ torrent.uploaded_session | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.uploaded_session | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'UploadedSession',
  props: {
    torrent: Torrent
  }
})
</script>
