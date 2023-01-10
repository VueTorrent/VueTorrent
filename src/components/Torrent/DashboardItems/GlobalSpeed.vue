<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('globalSpeed') }}
    </div>
    <div>
      {{ torrent.globalSpeed | getDataValue(1) }}
      <span class="caption grey--text">
        {{ torrent.globalSpeed | getDataUnit(1) }}/s
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'GlobalSpeed',
  props: ['torrent']
}
</script>
