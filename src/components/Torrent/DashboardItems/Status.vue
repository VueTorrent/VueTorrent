<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.properties.status') }}
    </div>
    <v-chip style="height: 1.3em" class="caption white--text px-2" :class="state">
      {{ stateString }}
    </v-chip>
  </v-flex>
</template>

<script lang="ts">
import { TorrentDashboardItem } from '@/mixins'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'
import { TorrentState } from '@/enums/vuetorrent'

export default defineComponent({
  name: 'Status',
  mixins: [TorrentDashboardItem],
  props: {
    torrent: Torrent
  },
  computed: {
    stateString() {
      if (!this.torrent) return TorrentState.UNKNOWN

      let finalState = this.torrent.state.toString()
      if (this.torrent.forced) {
        finalState = `[F] ${finalState}`
      }

      return finalState
    }
  }
})
</script>
