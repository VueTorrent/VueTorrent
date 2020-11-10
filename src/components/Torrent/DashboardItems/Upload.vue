<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">Upload</div>
    <div>
      {{ torrent.upspeed | getDataValue }}
      <span class="caption grey--text">{{
          torrent.upspeed | getDataUnit
        }}</span>
    </div>
  </v-flex>
</template>
<script>
export default {
    name: 'Upload',
    props: ['torrent']
}
</script>
