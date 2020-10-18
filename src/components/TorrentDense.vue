<template>
    <v-card
        ripple
        flat
        class="pointer torrent noselect"
        :class="{ torrent_selected: containsTorrent(torrent.hash) }"
        @click.native="selectTorrent(torrent.hash)"
        @dblclick.prevent="showInfo(torrent.hash)"
    >
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-layout v-on="on" row wrap :class="style">
            <v-flex xs12 sm2 md3>
              <div class="caption grey--text">Torrent title</div>
              <div class="truncate">{{ torrent.name }}</div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">Size</div>
              <div>
                {{ torrent.size | getDataValue }}
                <span class="caption grey--text">{{
                    torrent.size | getDataUnit
                  }}</span>
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Done</div>
              <div>
                {{ torrent.progress }}<span class="grey--text">% </span>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">Download</div>
              <div>
                {{ torrent.dlspeed | getDataValue }}
                <span class="caption grey--text">{{
                    torrent.dlspeed | getDataUnit
                  }}</span>
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Upload</div>
              <div>
                {{ torrent.upspeed | getDataValue }}
                <span class="caption grey--text">{{
                    torrent.upspeed | getDataUnit
                  }}</span>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">ETA</div>
              <div>
                {{ torrent.eta }}
              </div>
            </v-flex>
            <v-flex xs5 sm1 md1 class="mr-2">
              <div class="caption grey--text">Peers</div>
              <div>
                {{ torrent.num_leechs }}
                <span class="grey--text caption"
                >/{{ torrent.available_peers }}</span
                >
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="mr-2">
              <div class="caption grey--text">Seeds</div>
              <div>
                {{ torrent.num_seeds }}
                <span class="grey--text caption"
                >/{{ torrent.available_seeds }}</span
                >
              </div>
            </v-flex>
            <v-flex xs5 sm1>
              <div class="caption grey--text">Status</div>
              <v-chip
                  small
                  class="caption"
                  :class="
                            theme === 'light'
                                ? `${state} white--text `
                                : `${state}  black--text`">
                {{ torrent.state }}
              </v-chip>
            </v-flex>
            <!-- Category -->
            <v-flex v-if="torrent.category" class="mr-2" xs6 sm1 md1>
              <div class="caption grey--text">Category</div>
              <v-chip small class="upload white--text caption">
                {{ torrent.category }}
              </v-chip>
            </v-flex>
            <!-- Tags -->
            <v-flex xs5 sm4>
              <div class="caption grey--text">Tags</div>
              <v-row wrap class="ma-0">
                <v-chip v-for="tag in torrent.tags" :key="tag"
                        small
                        :class="
                        theme === 'light'
                            ? 'white--text'
                            : 'black--text'
                    "
                        class="download caption mb-1 mx-1"
                >
                  {{ tag }}
                </v-chip>
              </v-row>
            </v-flex>
          </v-layout>
        </template>
        <span>{{ torrent.name }}</span>
      </v-tooltip>
        <v-divider v-if="index !== length"></v-divider>
    </v-card>
</template>

<script>
import { General, Torrent } from '@/mixins'


export default {
    name: 'TorrentDense',
    mixins: [General, Torrent]
}
</script>

<style lang="scss" scoped>
.topBorderRadius {
    border-top-left-radius: 3px;
}
.bottomBorderRadius {
    border-bottom-left-radius: 3px;
}
</style>
