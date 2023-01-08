<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('globalVolume') }}
    </div>
    <div>
      {{ torrent.globalVolume | getDataValue(1) }}
      <span class="caption grey--text"> {{ torrent.globalVolume | getDataUnit(1) }}/s </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'GlobalVolume',
  props: ['torrent']
}
</script>
