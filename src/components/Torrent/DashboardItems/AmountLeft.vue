<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.amount_left') | titleCase }}
    </div>
    <div>
      {{ torrent.amount_left | getDataValue(2) }}
      <span class="caption grey--text">
        {{ torrent.amount_left | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'AmountLeft',
  props: {
    torrent: Torrent
  }
})
</script>
