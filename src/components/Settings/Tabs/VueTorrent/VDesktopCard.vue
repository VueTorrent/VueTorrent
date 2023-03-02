<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDesktopCard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="busyDesktopTorrentProperties" tag="tbody">
              <v-list-item v-for="(item, index) in busyDesktopTorrentProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
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
          {{ $t('modals.settings.pageVueTorrent.pageDesktopCard.completedTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable :list="doneDesktopTorrentProperties" tag="tbody">
              <v-list-item v-for="(item, index) in doneDesktopTorrentProperties" :key="index" class="ma-2 elevation-2 rounded-lg pointer">
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
  name: 'VDesktopCard',
  components: {
    draggable
  },
  data: () => ({
    mdiMenu
  }),
  computed: {
    busyDesktopTorrentProperties() {
      return this.injectLocalization(this.$store.state.webuiSettings.busyDesktopTorrentProperties)
    },
    doneDesktopTorrentProperties() {
      return this.injectLocalization(this.$store.state.webuiSettings.doneDesktopTorrentProperties)
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
        Downloaded: i18n.t(`${localePrefix}.downloaded`),
        Directory: i18n.t(`${localePrefix}.save_path`),
        Uploaded: i18n.t(`${localePrefix}.uploaded`),
        ETA: i18n.t(`${localePrefix}.ETA`),
        Peers: i18n.t(`${localePrefix}.peers`),
        Seeds: i18n.t(`${localePrefix}.seeds`),
        Status: i18n.t(`${localePrefix}.state`),
        Ratio: i18n.t(`${localePrefix}.ratio`),
        Tracker: i18n.t(`${localePrefix}.tracker`),
        Category: i18n.t(`${localePrefix}.category`),
        Tags: i18n.t(`${localePrefix}.tags`),
        AddedOn: i18n.t(`${localePrefix}.addedOn`),
        Availability: i18n.t(`${localePrefix}.availability`),
        LastActivity: i18n.t(`${localePrefix}.last_activity`),
        CompletedOn: i18n.t(`${localePrefix}.completion_on`),
        GlobalSpeed: i18n.t(`${localePrefix}.globalSpeed`),
        GlobalVolume: i18n.t(`${localePrefix}.globalVolume`)
      }

      properties.forEach(property => (property.label = localeMap[property.name]))
      return properties
    }
  }
}
</script>
