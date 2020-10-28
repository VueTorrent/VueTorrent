<template>
  <v-flex xs6 sm1 md1 class="mr-2" >
    <div class="caption grey--text">Download</div>
    <div>
      {{ torrent.dlspeed | getDataValue }}
      <span class="caption grey--text">{{
          torrent.dlspeed | getDataUnit
        }}</span>
    </div>
  </v-flex>
</template>
<script>
export default {
    name: 'Download',
    props: ['torrent']
}
</script>