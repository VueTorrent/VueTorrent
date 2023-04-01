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
                  <v-list-item-title class="truncate" v-text="getLabel(item.name)" />
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
import { mapState } from 'vuex'

export default {
  name: 'VDesktopCard',
  components: {
    draggable
  },
  data: () => ({
    mdiMenu
  }),
  computed: {
    ...mapState(['webuiSettings']),
    busyDesktopTorrentProperties() {
      return this.webuiSettings.busyDesktopTorrentProperties
    },
    doneDesktopTorrentProperties() {
      return this.webuiSettings.doneDesktopTorrentProperties
    }
  },
  methods: {
    getLabel(propertyName) {
      // convert component name from PascalCase to snake_case to match locale key
      const value = propertyName.replace(/\.?([A-Z]+)/g, (x, y) => '_' + y.toLowerCase()).replace(/^_/, '')
      return i18n.t(`torrent.properties.${value}`)
    }
  }
}
</script>
