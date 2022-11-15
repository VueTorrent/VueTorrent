<template>
  <v-flex v-if="torrent.tags && torrent.tags.length" xs6 sm2>
    <div class="caption grey--text">
      {{ $t('tags') }}
    </div>
    <v-row wrap class="ma-0">
      <v-chip v-for="tag in torrent.tags" :key="tag" small :class="theme === 'light' ? 'white--text' : 'black--text'" class="download caption mb-1 mx-1">
        {{ tag }}
      </v-chip>
    </v-row>
  </v-flex>
</template>
<script>
import { TorrentDashboardItem } from '@/mixins'
export default {
  name: 'Tags',
  mixins: [TorrentDashboardItem],
  props: ['torrent']
}
</script>
