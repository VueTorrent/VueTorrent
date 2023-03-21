<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <v-list-item v-for="(item, index) in busyMobileCardProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
              <v-checkbox v-model="item.active" dense hide-details class="pa-0 ma-0" />
              <v-list-item-content>
                <v-list-item-title class="truncate" v-text="item.label" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageMobileCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <v-list-item v-for="(item, index) in doneMobileCardProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
              <v-checkbox v-model="item.active" dense hide-details class="pa-0 ma-0" />
              <v-list-item-content>
                <v-list-item-title class="truncate" v-text="item.label" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import { mdiMenu } from '@mdi/js'
import { i18n } from '@/plugins/i18n'

export default {
  name: 'VMobileCard',
  components: {
    draggable
  },
  data: () => ({
    mdiMenu
  }),
  computed: {
    ...mapState(['webuiSettings']),
    busyMobileCardProperties() {
      return this.injectLocalization(this.webuiSettings.busyMobileCardProperties)
    },
    doneMobileCardProperties() {
      return this.injectLocalization(this.webuiSettings.doneMobileCardProperties)
    }
  },
  methods: {
    injectLocalization(properties) {
      properties.forEach(property => {
        const value = property.name.replace(/\.?([A-Z]+)/g, (x, y) => '_' + y.toLowerCase()).replace(/^_/, '')
        property.label = i18n.t(`torrent.properties.${value}`)
      })
      return properties
    }
  }
}
</script>
