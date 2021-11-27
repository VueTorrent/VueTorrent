<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.availability') | titleCase }}
    </div>
    <div>
      {{ availability }}
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'Availability',
  props: ['torrent'],
  computed: {
    availability() {
      if (this.torrent.availability !== -1) {
        return this.torrent.availability
      }

      return 'N/A'
    }
  }
}
</script>
