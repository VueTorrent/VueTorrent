<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      {{ $t('torrent.last_activity') | titleCase }}
    </div>
    <div>{{ torrent.last_activity }}</div>
  </v-flex>
</template>
<script>
export default {
  name: 'LastActivity',
  props: ['torrent']
}
</script>