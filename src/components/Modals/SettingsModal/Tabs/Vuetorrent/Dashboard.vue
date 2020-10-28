<template>
  <div class="ma-3 pa-2">
    <v-card flat>
      <v-card-text class="pa-0">
        <v-layout row wrap align-center justify-center>
        <v-flex class="box ma-1" style="width:50px !important;" xs12 md5>
          <v-subheader>
            Properties to display for busy torrents
          </v-subheader>
          <v-row dense  >
            <v-list flat class="ma-0 pa-0">
              <draggable
                  :list="busyTorrentProperties"
                  tag="tbody"
              >
                <v-list-item
                    v-for="(item, index) in busyTorrentProperties"
                    :key="index"
                    style="width: 30vh"
                >
                  <v-checkbox v-model="item.active" dense class="pa-0 ma-0 mt-3"/>
                  <v-list-item-content>
                    <v-list-item-title class="truncate" v-text="item.name"/>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </v-list>
          </v-row>
        </v-flex>
          <v-flex class="box ma-1" xs12 md5>
          <v-subheader>
            Properties to display for completed torrents
          </v-subheader>
            <v-row dense>
            <v-list flat class="ma-0 pa-0">
              <draggable
                  :list="doneTorrentProperties"
                  tag="tbody"
              >
                <v-list-item
                    v-for="(item, index) in doneTorrentProperties"
                    :key="index"
                    style="width: 30vh"
                >
                  <v-checkbox v-model="item.active" dense class="pa-0 ma-0 mt-3"/>
                  <v-list-item-content>
                    <v-list-item-title class="truncate" v-text="item.name"/>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </v-list>
          </v-row>
        </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'Dashboard',
    components: {
        draggable
    },
    computed : {
        busyTorrentProperties(){
            return this.$store.state.webuiSettings.busyTorrentProperties
        },
        doneTorrentProperties(){
            return this.$store.state.webuiSettings.doneTorrentProperties
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SettingsTab.scss';
</style>