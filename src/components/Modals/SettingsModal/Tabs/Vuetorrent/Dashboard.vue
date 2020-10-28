<template>
  <v-container>
    <v-card flat>
      <v-card-text class="pa-0" style="font-size: 1.1em">
        <div class="box">
          <v-subheader>
            Properties to display for busy torrents
          </v-subheader>
          <v-row dense>
            <v-list flat>
              <draggable
                  :list="busyTorrentProperties"
                  tag="tbody"
              >
                <v-list-item
                    v-for="(item, index) in busyTorrentProperties"
                    :key="index"
                    style="width: 68vh"
                >
                  <v-checkbox v-model="item.active" dense class="pa-0 ma-0 mt-3"/>
                  <v-list-item-content>
                    <v-list-item-title class="truncate" v-text="item.name"/>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </v-list>
          </v-row>
        </div>
        <div class="box">
          <v-subheader>
            Properties to display for completed torrents
          </v-subheader>
          <v-row dense>
            <v-list flat>
              <draggable
                  :list="doneTorrentProperties"
                  tag="tbody"
              >
                <v-list-item
                    v-for="(item, index) in doneTorrentProperties"
                    :key="index"
                    style="width: 68vh"
                >
                  <v-checkbox v-model="item.active" dense class="pa-0 ma-0 mt-3"/>
                  <v-list-item-content>
                    <v-list-item-title class="truncate" v-text="item.name"/>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </v-list>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
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