<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <VDashboardItem :isDraggable="false" :property="item" v-for="item in busyProperties" :key="item.name" />
          </v-list>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <VDashboardItem :isDraggable="false" :property="item" v-for="item in doneProperties" :key="item.name" />
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import VDashboardItem from './VDashboardItem.vue'

export default {
  name: 'VMobileCard',
  components: { VDashboardItem },
  computed: {
    ...mapState(['webuiSettings']),
    busyProperties() {
      return this.webuiSettings.busyMobileCardProperties
    },
    doneProperties() {
      return this.webuiSettings.doneMobileCardProperties
    }
  }
}
</script>
