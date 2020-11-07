<template>
  <v-flex xs5 sm1 md1 class="mr-2">
    <div class="caption grey--text">Peers</div>
    <div>
      {{ torrent.num_leechs }}
      <span class="grey--text caption"
      >/{{ torrent.available_peers }}</span
      >
    </div>
  </v-flex>
</template>
<script>
export default {
    name: 'Peers',
    props: ['torrent']
}
</script>
