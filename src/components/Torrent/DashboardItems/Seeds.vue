<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('seeds') }}
    </div>
    <div>
      {{ torrent.num_seeds }}
      <span class="grey--text caption"> /{{ torrent.available_seeds }} </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Seeds',
  props: ['torrent']
}
</script>
