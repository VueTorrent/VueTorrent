<template>
  <v-card flat>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-subheader>
          {{ $t('modals.settings.pageVueTorrent.pageDashboard.busyTorrentTip') }}
        </v-subheader>
        <v-row dense>
          <v-list flat class="ma-2 pa-0">
            <draggable
              :list="busyTorrentProperties"
              tag="tbody"
            >
              <v-list-item
                v-for="(item, index) in busyTorrentProperties"
                :key="index"
                class="ma-2 elevation-2 rounded-lg pointer"
              >
                <v-checkbox
                  v-model="item.active"
                  dense
                  hide-details
                  class="pa-0 ma-0"
                />
                <v-list-item-content>
                  <v-list-item-title class="truncate" v-text="item.name" />
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
            <draggable
              :list="doneTorrentProperties"
              tag="tbody"
            >
              <v-list-item
                v-for="(item, index) in doneTorrentProperties"
                :key="index"
                class="ma-2 elevation-2 rounded-lg pointer"
              >
                <v-checkbox
                  v-model="item.active"
                  dense
                  hide-details
                  class="pa-0 ma-0"
                />
                <v-list-item-content>
                  <v-list-item-title class="truncate" v-text="item.name" />
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
      return this.$store.state.webuiSettings.busyTorrentProperties
    },
    doneTorrentProperties() {
      return this.$store.state.webuiSettings.doneTorrentProperties
    }
  }
}
</script>