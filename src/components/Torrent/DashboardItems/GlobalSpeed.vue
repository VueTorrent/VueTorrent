<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('globalSpeed') }}
    </div>
    <div>
      {{ torrent.globalSpeed | getDataValue(1) }}
      <span class="caption grey--text"> {{ torrent.globalSpeed | getDataUnit }}/s </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'GlobalSpeed',
  props: {
    torrent: Torrent
  }
})
</script>
