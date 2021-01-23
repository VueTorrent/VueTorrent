<template>
  <v-layout
    row
    wrap
    class="ma-0 pa-1"
    :class="style"
  >
    <v-flex xs12 class="ma-1 mt-0" row>
      <span class="subtitle-1" style="line-height: 1.3em;">
        {{ torrent.name }}
      </span>
    </v-flex>
    <v-flex xs12 row class="ma-1 mt-0">
      <v-chip
        small
        class="caption white--text mr-2"
        :class="torrent.state.toLowerCase()"
      >
        {{ torrent.state }}
      </v-chip>
      <v-chip
        v-if="torrent.category"
        small
        class="upload caption white--text"
      >
        {{ torrent.category }}
      </v-chip>
    </v-flex>
    <v-flex xs12 class="pa-0 ma-1 row">
      <span class="body-2"> {{ torrent.dloaded | getDataValue }} </span>
      <span class="grey--text caption ml-1"> {{ torrent.dloaded | getDataUnit }} / </span>
      <span class="body-2 ml-1"> {{ torrent.size | getDataValue }} </span>
      <span class="grey--text caption ml-1"> {{ torrent.size | getDataUnit }} - </span>
      <span class="grey--text caption ml-1"> Ratio: </span>
      <span class="body-2 ml-1"> {{ torrent.ratio }} - </span>
      <span class="grey--text caption ml-1"> ETA: </span>
      <span class="body-2 ml-1"> {{ torrent.eta }} </span>
      <v-spacer />
      <span class="body-2">{{ torrent.progress }}</span>
      <span class="grey--text caption">%</span>
    </v-flex>
    <v-flex xs12 class="mt-1 mb-1">
      <v-progress-linear color="upload" :value="torrent.progress" />
    </v-flex>
    <v-flex row xs12 class="ma-1">
      <div class="caption grey--text">
        {{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds
      </div>
      <div class="caption grey--text ml-2">
        {{ torrent.num_leechs }}/{{ torrent.available_peers }} peers
      </div>
      <v-spacer />
      <div class="caption grey--text">
        <span v-if="torrent.dlspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronDown }}
          </v-icon> {{ torrent.dlspeed | getDataValue(1) }} {{ torrent.dlspeed | getDataUnit(1) }}/s
        </span>
        <span v-if="torrent.upspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronUp }}
          </v-icon> {{ torrent.upspeed | getDataValue(1) }} {{ torrent.upspeed | getDataUnit(1) }}/s
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
  }),
  computed: {
    style() {
      return `sideborder ${this.torrent.state.toLowerCase()} ${this.isSelected ? 'selected' : ''}`
    }
  }
}
</script>