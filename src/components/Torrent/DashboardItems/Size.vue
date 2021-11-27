<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.size') | titleCase }}
    </div>
    <div>
      {{ torrent.size | getDataValue }}
      <span class="caption grey--text">
        {{
          torrent.size | getDataUnit
        }}
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Size',
  props: ['torrent']
}
</script>
