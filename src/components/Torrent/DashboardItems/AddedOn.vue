<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      {{ $t('torrent.detail.info.addedOn') }}
    </div>
    <div>{{ torrent.added_on }}</div>
  </v-flex>
</template>
<script>
export default {
  name: 'AddedOn',
  props: ['torrent']
}
</script>
