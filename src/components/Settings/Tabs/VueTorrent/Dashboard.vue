<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDashboard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="busyTorrentProperties" tag="tbody">
              <v-list-item v-for="(item, index) in busyTorrentProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
                <v-checkbox v-model="item.active" dense hide-details class="pa-0 ma-0" />
                <v-list-item-content>
                  <v-list-item-title class="truncate" v-text="item.label" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>
                    {{ mdiMenu }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </draggable>
          </v-list>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDashboard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="doneTorrentProperties" tag="tbody">
              <v-list-item v-for="(item, index) in doneTorrentProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
                <v-checkbox v-model="item.active" dense hide-details class="pa-0 ma-0" />
                <v-list-item-content>
                  <v-list-item-title class="truncate" v-text="item.label" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>
                    {{ mdiMenu }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </draggable>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import { mdiMenu } from '@mdi/js'
import { i18n } from '@/plugins/i18n'

export default {
  name: 'Dashboard',
  components: {
    draggable
  },
  data: () => ({
    mdiMenu
  }),
  computed: {
    busyTorrentProperties() {
      return this.injectLocalization(this.$store.state.webuiSettings.busyTorrentProperties)
    },
    doneTorrentProperties() {
      return this.injectLocalization(this.$store.state.webuiSettings.doneTorrentProperties)
    }
  },
  methods: {
    injectLocalization(properties) {
      const localePrefix = 'modals.settings.pageVueTorrent.pageDashboard.properties'
      const localeMap = {
        Size: i18n.t(`${localePrefix}.size`),
        Progress: i18n.t(`${localePrefix}.progress`),
        Download: i18n.t(`${localePrefix}.downloadSpeed`),
        Upload: i18n.t(`${localePrefix}.uploadSpeed`),
        Downloaded: i18n.t(`${localePrefix}.downloaded`),
        Directory: i18n.t(`${localePrefix}.save_path`),
        Uploaded: i18n.t(`${localePrefix}.uploaded`),
        ETA: i18n.t(`${localePrefix}.ETA`),
        Peers: i18n.t(`${localePrefix}.peers`),
        Seeds: i18n.t(`${localePrefix}.seeds`),
        Status: i18n.t(`${localePrefix}.state`),
        Ratio: i18n.t(`${localePrefix}.ratio`),
        Category: i18n.t(`${localePrefix}.category`),
        Tags: i18n.t(`${localePrefix}.tags`),
        AddedOn: i18n.t(`${localePrefix}.addedOn`),
        Availability: i18n.t(`${localePrefix}.availability`),
        LastActivity: i18n.t(`${localePrefix}.last_activity`)
      }

      return properties.map(property => ({ ...property, label: localeMap[property.name] }))
    }
  }
}
</script>
