<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.vueTorrent.desktopCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="busyProperties" tag="tbody">
              <VDashboardItem :isDraggable="true" :property="item" v-for="item in busyProperties" :key="item.name" />
            </draggable>
          </v-list>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.vueTorrent.desktopCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="doneProperties" tag="tbody">
              <VDashboardItem :isDraggable="true" :property="item" v-for="item in doneProperties" :key="item.name" />
            </draggable>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import VDashboardItem from './VDashboardItem.vue'

export default {
  name: 'VDesktopCard',
  components: { VDashboardItem, draggable },
  computed: {
    ...mapState(['webuiSettings']),
    busyProperties() {
      return this.webuiSettings.busyDesktopTorrentProperties
    },
    doneProperties() {
      return this.webuiSettings.doneDesktopTorrentProperties
    }
  }
}
</script>
