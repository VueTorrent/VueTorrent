<template>
  <v-card flat>
    <v-subheader>
      {{ $t('modals.settings.pageVueTorrent.pageGeneral.tip') }}
    </v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showCurrentSpeed"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.currentSpeed')"
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
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.speedGraph')"
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
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.sessionStats')"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="showAlltimeStat"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.allTimeStats')"
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
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.freeSpace')"
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
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.trackerFilter')"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="rightDrawer"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.rightDrawer')"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="8" sm="8" md="10">
          <p class="subtitle-1 mt-2">
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.language') }}
          </p>
        </v-col>
        <v-col cols="4" sm="4" md="2">
          <v-select
            v-model="lang"
            flat
            solo
            dense
            hide-details
            background-color="background"
            class="rounded-xl"
            :items="languages"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col cols="8" sm="8" md="10">
          <p class="subtitle-1 mt-2">
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.paginationSize') }}
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
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.vueTorrentTitle') }}
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
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.currentVersion') }}
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
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.qbittorrentVersion') }}
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
import { availableLanguages } from '@/lang'
export default {
  name: 'General',
  data() {
    return {
      languages: availableLanguages,
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
    showAlltimeStat: {
      get() {
        return this.webuiSettings.showAlltimeStat
      },
      set(val) {
        this.webuiSettings.showAlltimeStat = val
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
    rightDrawer: {
      get() {
        return this.webuiSettings.rightDrawer
      },
      set(val) {
        this.webuiSettings.rightDrawer = val
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
    lang: {
      get() {
        return this.webuiSettings.lang
      },
      set(val) {
        this.webuiSettings.lang = val
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
:deep(.v-select .v-select__selection) {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
// Reversed input variant
:deep(.v-input--reverse .v-input__slot) {
  @import "src/styles/styles.scss";
  @include reverse-switch;
}
</style>