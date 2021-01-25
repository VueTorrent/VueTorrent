<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      Downloaded
    </div>
    <div>
      {{ torrent.dloaded | getDataValue(2) }}
      <span class="caption grey--text">
        {{
          torrent.dloaded | getDataUnit(1)
        }}
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Downloaded',
  props: ['torrent']
}
</script>
