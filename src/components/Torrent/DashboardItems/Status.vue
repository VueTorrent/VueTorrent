<template>
  <v-flex
    xs6
    sm1
    md1
    class="mr-4"
  >
    <div class="caption grey--text">
      {{ $t('torrent.detail.info.status') }}
    </div>
    <v-chip
      small
      class="caption white--text px-2"
      :class="state"
    >
      {{ stateString }}
    </v-chip>
  </v-flex>
</template>
<script>
import { TorrentDashboardItem } from '@/mixins'
import i18n from '@/locales/index'
export default {
  name: 'Status',
  mixins: [TorrentDashboardItem],
  props: ['torrent'],
  computed: {
    stateString() {
      const status = i18n.tc(`download.status.${this.torrent.state.toLowerCase()}`)
      if (this.torrent.forced) {
        return `[F] ${status}`
      }      
      
      return status
    }
  }
}
</script>
