<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      Added On
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
