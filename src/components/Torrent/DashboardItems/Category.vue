<template>
  <v-flex v-if="torrent.category" class="mr-2" xs6 sm1 md1>
    <div class="caption grey--text">Category</div>
    <v-chip small class="upload white--text caption">
      {{ torrent.category }}
    </v-chip>
  </v-flex>
</template>
<script>
export default {
    name: 'Category',
    props: ['torrent']
}
</script>