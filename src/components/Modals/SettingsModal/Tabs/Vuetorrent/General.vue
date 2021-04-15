<template>
  <v-card flat>
    <v-subheader>
      These settings are for the custom WebUI
      itself
    </v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showCurrentSpeed"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Show Current Speed"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showSpeedGraph"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Show Speed Graph"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showSessionStat"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Show Session Stats"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="freeSpace"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Show Free Space"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showTrackerFilter"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Show Tracker Filter"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="useDeviceDarkMode"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            label="Use device dark/light mode"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="8" sm="8" md="10">
          <p class="subtitle-1 mt-2">
            Pagination size:
          </p>
        </v-col>
        <v-col cols="4" sm="4" md="2">
          <v-select
            v-model="paginationSize"
            flat
            solo
            dense
            hide-details
            background-color="background"
            class="rounded-xl"
            :items="paginationSizes"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="8" sm="8" md="10">
          <p class="subtitle-1 mt-2">
            VueTorrent title:
          </p>
        </v-col>
        <v-col cols="4" sm="4" md="2">
          <v-select
            v-model="title"
            flat
            solo
            dense
            hide-details
            background-color="background"
            class="rounded-xl"
            :items="titleOptions"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="10" sm="10" md="11">
          <p class="subtitle-1">
            Current Version:
          </p>
        </v-col>
        <v-col cols="2" sm="2" md="1">
          <a target="_blank" :href="`https://github.com/WDaan/VueTorrent/releases/tag/v${version}`">
            <p class="mb-2">{{ version }}</p>
          </a>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="10" sm="10" md="11">
          <p class="subtitle-1">
            QBittorrent Version:
          </p>
        </v-col>
        <v-col cols="2" sm="2" md="1">
          <a target="_blank" :href="`https://github.com/qbittorrent/qBittorrent/releases/tag/release-${Qbitversion}`">
            <p class="mb-2">
              {{ Qbitversion }}
            </p>
          </a>
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import qbit from '@/services/qbit'
export default {
  name: 'General',
  data() {
    return {
      paginationSizes: [5, 15, 30, 50],
      titleOptions: ['Default', 'Global Speed', 'First Torrent Status'],
      Qbitversion: 0
    }
  },
  computed: {
    ...mapState(['webuiSettings']),
    ...mapGetters(['getAppVersion']),
    freeSpace: {
      get() {
        return this.webuiSettings.showFreeSpace
      },
      set(val) {
        this.webuiSettings.showFreeSpace = val
      }
    },
    showCurrentSpeed: {
      get() {
        return this.webuiSettings.showCurrentSpeed
      },
      set(val) {
        this.webuiSettings.showCurrentSpeed = val
      }
    },
    showSpeedGraph: {
      get() {
        return this.webuiSettings.showSpeedGraph
      },
      set(val) {
        this.webuiSettings.showSpeedGraph = val
      }
    },
    showSessionStat: {
      get() {
        return this.webuiSettings.showSessionStat
      },
      set(val) {
        this.webuiSettings.showSessionStat = val
      }
    },
    showTrackerFilter: {
      get() {
        return this.webuiSettings.showTrackerFilter
      },
      set(val) {
        this.webuiSettings.showTrackerFilter = val
      }
    },
    useDeviceDarkMode: {
      get() {
        return this.webuiSettings.useDeviceDarkMode
      },
      set(val) {
        this.webuiSettings.useDeviceDarkMode = val
      }
    },
    paginationSize: {
      get() {
        return this.webuiSettings.paginationSize
      },
      set(val) {
        this.webuiSettings.paginationSize = val
      }
    },
    title: {
      get() {
        return this.webuiSettings.title
      },
      set(val) {
        this.webuiSettings.title = val
      }
    },
    version() {
      return this.getAppVersion()
    }
  },
  created() {
    this.fetchQbitVersion()
  },
  methods: {
    async fetchQbitVersion() {
      const version = await qbit.getAppVersion()
      this.Qbitversion = version.includes('v') ? version.substring(1) : version
    }
  }
}
</script>

<style lang="scss" scoped>
// Reversed input variant
::v-deep .v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
  .v-application--is-ltr & {
    .v-input--selection-controls__input {
      margin-right: 0;
      margin-left: 8px;
    }
  }
  .v-application--is-rtl & {
    .v-input--selection-controls__input {
      margin-left: 0;
      margin-right: 8px;
    }
  }
}
</style>