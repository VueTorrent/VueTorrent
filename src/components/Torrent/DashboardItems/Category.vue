<template>
  <v-flex v-if="torrent.category" xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.category') }}
    </div>
    <v-chip small class="upload white--text caption">
      {{ torrent.category }}
    </v-chip>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Category',
  props: {
    torrent: Torrent
  }
})
</script>
