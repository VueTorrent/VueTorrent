<template>
    <v-card
        ripple
        flat
        class="pointer torrent noselect"
        :class="{ torrent_selected: containsTorrent(torrent.hash) }"
        @click.native="selectTorrent(torrent.hash)"
        @dblclick.prevent="showInfo(torrent.hash)"
    >
        <v-layout row wrap :class="style">
            <v-flex xs12 class="mb-4">
                <div class="caption grey--text">Torrent title</div>
                <div class="truncate">{{ torrent.name }}</div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Size</div>
                <div>
                    {{ torrent.size | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.size | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs12 sm1 md1 class="mr-4">
                <div class="caption grey--text">Done</div>
                <v-progress-linear
                    v-model="torrent.progress"
                    height="20"
                    :style="phoneLayout ? '' : 'width: 80%;'"
                    :color="`torrent-${state}-color`" >
                    <span
                        class="caption"
                    >
                        {{ torrent.progress }}%
                    </span>
                </v-progress-linear>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Ratio</div>
                <div>
                    {{ torrent.ratio }}
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">ETA</div>
                <div>
                    {{ torrent.eta }}
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Download</div>
                <div>
                    {{ torrent.dlspeed | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.dlspeed | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Upload</div>
                <div>
                    {{ torrent.upspeed | getDataValue }}
                    <span class="caption grey--text">{{
                        torrent.upspeed | getDataUnit
                    }}</span>
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Peers</div>
                <div>
                    {{ torrent.num_leechs }}
                    <span class="grey--text caption"
                        >/{{ torrent.available_peers }}</span
                    >
                </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
                <div class="caption grey--text">Seeds</div>
                <div>
                    {{ torrent.num_seeds }}
                    <span class="grey--text caption"
                        >/{{ torrent.available_seeds }}</span
                    >
                </div>
            </v-flex>
          <v-flex xs6 sm1 md1 :class="phoneLayout ? '' : 'mr-4'">
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
          <v-flex v-if="torrent.category" xs4 sm1 md1>
            <div class="caption grey--text">Category</div>
            <v-chip small class="upload white--text caption">
              {{ torrent.category }}
            </v-chip>
          </v-flex>
            <!-- Tags -->
            <v-flex xs12 sm1>
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
        <v-divider v-if="index !== length"></v-divider>
    </v-card>
</template>

<script>
import { General, Torrent } from '@/mixins'

export default {
    name: 'Torrent',
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
