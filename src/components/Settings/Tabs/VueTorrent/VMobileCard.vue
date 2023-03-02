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
      const localePrefix = 'modals.settings.pageVueTorrent.properties'
      const localeMap = {
        Size: i18n.t(`${localePrefix}.size`),
        Progress: i18n.t(`${localePrefix}.progress`),
        Download: i18n.t(`${localePrefix}.downloadSpeed`),
        Upload: i18n.t(`${localePrefix}.uploadSpeed`),
        ETA: i18n.t(`${localePrefix}.ETA`),
        Peers: i18n.t(`${localePrefix}.peers`),
        Seeds: i18n.t(`${localePrefix}.seeds`),
        Status: i18n.t(`${localePrefix}.state`),
        Ratio: i18n.t(`${localePrefix}.ratio`),
        Uploaded: i18n.t(`${localePrefix}.uploaded`),
        Tracker: i18n.t(`${localePrefix}.tracker`),
        Category: i18n.t(`${localePrefix}.category`),
        Tags: i18n.t(`${localePrefix}.tags`)
      }

      properties.forEach(property => (property.label = localeMap[property.name]))
      return properties
    }
  }
}
</script>
