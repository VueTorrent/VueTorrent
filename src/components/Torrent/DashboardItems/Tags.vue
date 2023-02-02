<template>
  <v-flex v-if="torrent.tags && torrent.tags.length" xs6 sm2>
    <div class="caption grey--text">
      {{ $t('tags') }}
    </div>
    <v-row wrap class="ma-0">
      <v-chip v-for="tag in torrent.tags" :key="tag" small class="tags white--text caption mb-1 mx-1">
        {{ tag }}
      </v-chip>
    </v-row>
  </v-flex>
</template>

<script lang="ts">
import { TorrentDashboardItem } from '@/mixins'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'

export default defineComponent({
  name: 'Tags',
  mixins: [TorrentDashboardItem],
  props: {
    torrent: Torrent
  }
})
</script>

<style>
.tags {
  background-color: #048b9a !important;
}
</style>
