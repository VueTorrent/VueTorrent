<template>
  <v-flex xs6 md2 sm1>
    <div class="caption grey--text">
      {{ $t('torrent.directory') | titleCase }}
    </div>
    <div class="truncate" :title="torrent.savePath">
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
