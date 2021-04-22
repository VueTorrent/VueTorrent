<template>
  <v-layout
    row
    wrap
    class="ma-0 pa-1"
  >
    <v-flex xs12 class="ma-1" row>
      <span class="subtitle-1" style="line-height: 1.3em; font-size: .95em !important;">
        {{ torrent.name }}
      </span>
    </v-flex>
    <v-flex xs12 row class="ma-1 mt-0">
      <v-chip
        small
        class="caption white--text mr-2"
        :class="torrent.state.toLowerCase()"
        style="height: 20px;"
      >
        {{ torrent.state }}
      </v-chip>
      <v-chip
        v-if="torrent.category"
        small
        class="upload caption white--text"
        style="height: 20px;"
      >
        {{ torrent.category }}
      </v-chip>
    </v-flex>
    <v-flex xs12 class="pa-0 ma-1 row">
      <span class="body-2"> {{ torrent.dloaded | getDataValue }} </span>
      <span class="grey--text caption ml-1"> {{ torrent.dloaded | getDataUnit }} / </span>
      <span class="body-2 ml-1"> {{ torrent.size | getDataValue }} </span>
      <span class="grey--text caption ml-1"> {{ torrent.size | getDataUnit }}</span>
      <span class="mx-1 grey--text" style="margin-top: 3px">•</span>
      <span class="body-2">{{ torrent.progress }}</span>
      <span class="grey--text caption ml-1">%</span>
      <span class="mx-1 grey--text" style="margin-top: 3px">•</span>
      <span class="grey--text caption"> Ratio: </span>
      <span class="body-2 ml-1"> {{ torrent.ratio }} </span>
      <v-spacer />
      <span class="body-2 ml-1"> {{ torrent.eta }} </span>
    </v-flex>
    <v-flex xs12 class="ma-1">
      <v-progress-linear
        rounded
        color="upload"
        height="5"
        :value="torrent.progress"
      />
    </v-flex>
    <v-flex row xs12 class="ma-1">
      <div class="caption grey--text">
        {{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds
      </div>
      <span class="mx-1 grey--text" style="margin-top: 2px">•</span>
      <div class="caption grey--text">
        {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
      </div>
      <v-spacer />
      <div>
        <span v-if="torrent.dlspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronDown }}
          </v-icon> 
          <span class="caption font-weight-medium grey--text">{{ torrent.dlspeed | getDataValue(1) }} </span>
          <span class="caption grey--text" style="font-size: 0.6em !important;">  {{ torrent.dlspeed | getDataUnit(1) }}/s </span>
        </span>
        <span v-if="torrent.upspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronUp }}
          </v-icon> 
          <span class="caption font-weight-medium grey--text">{{ torrent.upspeed | getDataValue(1) }} </span>
          <span class="caption grey--text" style="font-size: 0.6em !important;"> {{ torrent.upspeed | getDataUnit(1) }}/s </span>
        </span>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
export default {
  name: 'MobileCard',
  props: {
    torrent: Object
  },
  data: () => ({
    mdiChevronUp, mdiChevronDown
  })
}
</script>