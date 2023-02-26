<template>
  <v-flex v-if="torrent.tracker" xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('tracker') }}
    </div>
    <v-chip small class="moving white--text caption">
      {{ trackerString }}
    </v-chip>
  </v-flex>
</template>

<script lang="ts">
import { TorrentDashboardItem } from '@/mixins'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'
import { getDomainBody } from '@/helpers'

export default defineComponent({
  name: 'Tracker',
  mixins: [TorrentDashboardItem],
  props: {
    torrent: Torrent
  },
  computed: {
    trackerString() {
      return getDomainBody(this.torrent.tracker)
    }
  }
})
</script>
