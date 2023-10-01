<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.availability') | titleCase }}
    </div>
    <div>
      {{ availability }}
    </div>
  </v-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TorrentDashboardItem } from '@/mixins'

export default defineComponent({
  name: 'Availability',
  mixins: [TorrentDashboardItem],
  computed: {
    availability() {
      if (this.torrent && this.torrent.availability !== -1) {
        return this.torrent.availability
      }

      return 'N/A'
    }
  }
})
</script>
