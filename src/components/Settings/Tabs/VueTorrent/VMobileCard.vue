<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <VPropertiesList :isDraggable="false" :properties="webuiSettings.busyMobileCardProperties" />
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <VPropertiesList :isDraggable="false" :properties="webuiSettings.doneMobileCardProperties" />
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import VPropertiesList from './VPropertiesList.vue'

export default {
  name: 'VMobileCard',
  components: { VPropertiesList },
  computed: mapState(['webuiSettings'])
}
</script>
