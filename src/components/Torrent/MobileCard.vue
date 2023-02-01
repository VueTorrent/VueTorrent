<template>
  <v-layout row wrap class="ma-0 pa-1">
    <v-flex xs12 class="ma-1" row>
      <span class="subtitle-1" style="line-height: 1.3em; font-size: 0.95em !important">
        {{ torrent.name }}
      </span>
    </v-flex>
    <v-flex xs12 row class="ma-1 mt-0 chipgap">
      <v-chip small class="caption white--text" :class="torrent.state.toLowerCase()" style="height: 20px">
        {{ stateString }}
      </v-chip>
      <v-chip v-if="torrent.category" small class="upload caption white--text" style="height: 20px">
        {{ torrent.category }}
      </v-chip>
      <v-chip v-if="torrent.tags" v-for="tag in torrent.tags" :key="tag" small class="tags caption white--text" style="height: 20px">
        {{ tag }}
      </v-chip>
    </v-flex>
    <v-flex xs12 class="pa-0 ma-1 row spangap">
      <span class="downloaded">
        <span class="body-2">{{ torrent.dloaded | getDataValue }} </span>
        <span class="grey--text caption">{{ torrent.dloaded | getDataUnit }}</span>
      </span>
      <span class="grey--text caption">/</span>
      <span class="size">
        <span class="body-2">{{ torrent.size | getDataValue }} </span>
        <span class="grey--text caption">{{ torrent.size | getDataUnit }}</span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="progress">
        <span class="body-2">{{ torrent.progress }} </span>
        <span class="grey--text caption">%</span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="ratio">
        <span class="grey--text caption">R: </span>
        <span class="body-2">{{ torrent.ratio }}</span>
      </span>
      <span class="grey--text" style="margin-top: 3px">•</span>
      <span class="uploaded">
        <span class="body-2">{{ torrent.uploaded | getDataValue }} </span>
        <span class="grey--text caption">{{ torrent.uploaded | getDataUnit }}</span>
      </span>
      <v-spacer />
      <span class="body-2">{{ torrent.eta }}</span>
    </v-flex>
    <v-flex xs12 class="ma-1">
      <v-progress-linear rounded color="upload" height="5" :value="torrent.progress" />
    </v-flex>
    <v-flex row xs12 class="ma-1">
      <div class="caption grey--text">{{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds</div>
      <span class="mx-1 grey--text" style="margin-top: 2px">•</span>
      <div class="caption grey--text">{{ torrent.num_leechs }}/{{ torrent.available_peers }} peers</div>
      <v-spacer />
      <div>
        <span v-if="torrent.dlspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronDown }}
          </v-icon>
          <span class="caption font-weight-medium grey--text">{{ torrent.dlspeed | getDataValue(1) }} </span>
          <span class="caption grey--text" style="font-size: 0.6em !important"> {{ torrent.dlspeed | getDataUnit(1) }}/s </span>
        </span>
        <span v-if="torrent.upspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronUp }}
          </v-icon>
          <span class="caption font-weight-medium grey--text">{{ torrent.upspeed | getDataValue(1) }} </span>
          <span class="caption grey--text" style="font-size: 0.6em !important"> {{ torrent.upspeed | getDataUnit(1) }}/s </span>
        </span>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import {Torrent} from '@/models'

export default {
  name: 'MobileCard',
  props: {
    torrent: Torrent
  },
  data: () => ({
    mdiChevronUp,
    mdiChevronDown
  }),
  computed: {
    stateString() {
      if (this.torrent.forced)
        return `[F] ${this.torrent.state}`
      else
        return this.torrent.state
    }
  }
}
</script>

<style>
.chipgap {
  gap: 8px;
}
.spangap {
  gap: 4px;
}
.tags {
  background-color: #048b9a !important;
}
</style>
