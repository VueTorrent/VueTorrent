<template>
  <v-layout row wrap class="ma-0 pa-1">
    <v-flex xs12 class="ma-1" row>
      <span class="subtitle-1" style="line-height: 1.3em; font-size: 0.95em !important">
        {{ torrent.name }}
      </span>
    </v-flex>
    <v-flex xs12 row class="ma-1 mt-0 chipgap">
      <v-chip v-if="isStatusActive" small class="caption white--text" :class="torrent.state.toLowerCase()" style="height: 20px">
        {{ stateString }}
      </v-chip>
      <v-chip v-if="isTrackerActive && torrent.tracker" small class="trackers caption white--text" style="height: 20px">
        {{ trackerHost }}
      </v-chip>
      <v-chip v-if="isCategoryActive && torrent.category" small class="upload caption white--text" style="height: 20px">
        {{ torrent.category }}
      </v-chip>
      <v-chip v-if="isTagsActive && torrent.tags" v-for="tag in torrent.tags" :key="tag" small class="tags caption white--text" style="height: 20px">
        {{ tag }}
      </v-chip>
    </v-flex>
    <v-flex xs12 class="pa-0 ma-1 row spangap">
      <span v-if="isSizeActive">
        <span class="downloaded">
          <span class="body-2">{{ torrent.dloaded | getDataValue }} </span>
          <span class="grey--text caption">{{ torrent.dloaded | getDataUnit }}</span>
        </span>
        <span class="grey--text caption">/</span>
        <span class="size">
          <span class="body-2">{{ torrent.size | getDataValue }} </span>
          <span class="grey--text caption">{{ torrent.size | getDataUnit }}</span>
        </span>
      </span>
      <span v-if="isSizeActive && isProgressActive" class="grey--text" style="margin-top: 3px">•</span>
      <span v-if="isProgressActive" class="progress">
        <span class="body-2">{{ torrent.progress }} </span>
        <span class="grey--text caption">%</span>
      </span>
      <span v-if="(isSizeActive || isProgressActive) && isRatioActive" class="grey--text" style="margin-top: 3px">•</span>
      <span v-if="isRatioActive" class="ratio">
        <span class="grey--text caption">R: </span>
        <span class="body-2">{{ torrent.ratio }}</span>
      </span>
      <span v-if="(isSizeActive || isProgressActive || isRatioActive) && isUploadedActive" class="grey--text" style="margin-top: 3px">•</span>
      <span v-if="isUploadedActive" class="uploaded">
        <span class="body-2">{{ torrent.uploaded | getDataValue }} </span>
        <span class="grey--text caption">{{ torrent.uploaded | getDataUnit }}</span>
      </span>
      <v-spacer />
      <span v-if="isEtaActive" class="body-2">{{ torrent.eta }}</span>
    </v-flex>
    <v-flex xs12 class="ma-1">
      <v-progress-linear rounded color="upload" height="5" :value="torrent.progress" />
    </v-flex>
    <v-flex row xs12 class="ma-1">
      <div v-if="isSeedsActive" class="caption grey--text">{{ torrent.num_seeds }}/{{ torrent.available_seeds }} seeds</div>
      <span v-if="isSeedsActive && isPeersActive" class="mx-1 grey--text" style="margin-top: 2px">•</span>
      <div v-if="isPeersActive" class="caption grey--text">{{ torrent.num_leechs }}/{{ torrent.available_peers }} peers</div>
      <v-spacer />
      <div>
        <span v-if="isDownloadActive && torrent.dlspeed">
          <v-icon small class="grey--text">
            {{ mdiChevronDown }}
          </v-icon>
          <span class="caption font-weight-medium grey--text">{{ torrent.dlspeed | getDataValue(1) }} </span>
          <span class="caption grey--text" style="font-size: 0.6em !important"> {{ torrent.dlspeed | getDataUnit }}/s </span>
        </span>
        <span v-if="isUploadActive && torrent.upspeed">
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
import { mapState } from 'vuex'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { Torrent } from '@/models'
import { getDomainBody } from '@/helpers'
import { DashboardProperty } from '@/enums/vuetorrent'

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
    ...mapState(['webuiSettings']),
    stateString() {
      if (this.torrent.forced) return `[F] ${this.torrent.state}`
      else return this.torrent.state
    },
    trackerHost() {
      return getDomainBody(this.torrent.tracker)
    },
    properties() {
      if (this.torrent.progress === 100) {
        return this.webuiSettings.doneMobileCardProperties
      }

      return this.webuiSettings.busyMobileCardProperties
    },
    isStatusActive() {
      return this.properties.find(e => e.name === DashboardProperty.STATUS).active
    },
    isTrackerActive() {
      return this.properties.find(e => e.name === DashboardProperty.TRACKER).active
    },
    isCategoryActive() {
      return this.properties.find(e => e.name === DashboardProperty.CATEGORY).active
    },
    isTagsActive() {
      return this.properties.find(e => e.name === DashboardProperty.TAGS).active
    },
    isSizeActive() {
      return this.properties.find(e => e.name === DashboardProperty.SIZE).active
    },
    isProgressActive() {
      return this.properties.find(e => e.name === DashboardProperty.PROGRESS).active
    },
    isRatioActive() {
      return this.properties.find(e => e.name === DashboardProperty.RATIO).active
    },
    isUploadedActive() {
      return this.properties.find(e => e.name === DashboardProperty.UPLOADED).active
    },
    isEtaActive() {
      return this.properties.find(e => e.name === DashboardProperty.ETA).active
    },
    isSeedsActive() {
      return this.properties.find(e => e.name === DashboardProperty.SEEDS).active
    },
    isPeersActive() {
      return this.properties.find(e => e.name === DashboardProperty.PEERS).active
    },
    isDownloadActive() {
      return this.properties.find(e => e.name === DashboardProperty.DOWNLOAD).active
    },
    isUploadActive() {
      return this.properties.find(e => e.name === DashboardProperty.UPLOAD).active
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
