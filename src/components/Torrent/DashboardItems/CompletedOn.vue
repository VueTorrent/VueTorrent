<template>
  <v-flex xs6 sm2>
    <div class="caption grey--text">
      {{ $t('torrent.completed_on') | titleCase }}
    </div>
    <div>{{ torrent.completed_on }}</div>
  </v-flex>
</template>
<script>
export default {
  name: 'CompletedOn',
  props: ['torrent']
}
</script>
