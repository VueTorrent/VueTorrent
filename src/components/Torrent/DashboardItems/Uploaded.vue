<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('uploaded') }}
    </div>
    <div>
      {{ torrent.uploaded | getDataValue }}
      <span class="caption grey--text">
        {{ torrent.uploaded | getDataUnit }}
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Uploaded',
  props: ['torrent']
}
</script>
