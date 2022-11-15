<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.directory') | titleCase }}
    </div>
    <div class="truncate">
      {{ torrent.savePath }}
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Directory',
  props: ['torrent']
}
</script>
