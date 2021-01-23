<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      Download
    </div>
    <div>
      {{ torrent.dlspeed | getDataValue(1) }}
      <span class="caption grey--text">
        {{
          torrent.dlspeed | getDataUnit(1)
        }}/s
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Download',
  props: ['torrent']
}
</script>
