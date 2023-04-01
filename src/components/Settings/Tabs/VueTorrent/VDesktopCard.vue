<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDesktopCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <VPropertiesList :isDraggable="true" :properties="webuiSettings.busyDesktopTorrentProperties" />
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDesktopCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <VPropertiesList :isDraggable="true" :properties="webuiSettings.doneDesktopTorrentProperties" />
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import VPropertiesList from './VPropertiesList.vue'

export default {
  name: 'VDesktopCard',
  components: { VPropertiesList },
  computed: mapState(['webuiSettings'])
}
</script>
