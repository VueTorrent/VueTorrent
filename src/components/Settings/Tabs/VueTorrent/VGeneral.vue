<template>
  <v-card flat>
    <v-subheader>
      {{ $t('modals.settings.pageVueTorrent.pageGeneral.tip') }}
    </v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="webuiSettings.showCurrentSpeed"
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
            v-model="webuiSettings.showSpeedGraph"
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
            v-model="webuiSettings.showAlltimeStat"
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
            v-model="webuiSettings.showSessionStat"
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
            v-model="webuiSettings.showFreeSpace"
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
            v-model="webuiSettings.showTrackerFilter"
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
            v-model="webuiSettings.rightDrawer"
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
        <v-col>
          <v-switch
            v-model="webuiSettings.topPagination"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.topPagination')"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-switch
            v-model="webuiSettings.openSideBarOnStart"
            class="v-input--reverse pa-0 ma-0"
            hide-details
            inset
            :label="$t('modals.settings.pageVueTorrent.pageGeneral.openSideBarOnStart')"
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
          <v-select v-model="webuiSettings.lang" flat solo dense hide-details background-color="background" class="rounded-xl" :items="languages" item-text="caption" />
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
          <v-select v-model="webuiSettings.paginationSize" flat solo dense hide-details background-color="background" class="rounded-xl" :items="paginationSizes" />
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
          <v-select v-model="webuiSettings.title" flat solo dense hide-details background-color="background" class="rounded-xl" :items="titleOptions" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col sm="6" md="9">
          <p class="subtitle-1 mt-2">
            {{ $t('modals.settings.pageVueTorrent.pageGeneral.dateFormat') }}
          </p>
        </v-col>
        <v-col sm="6" md="3">
          <v-text-field
            v-model="webuiSettings.dateFormat"
            class="mb-2"
            outlined
            dense
            hide-details
            :aria-label="$t('modals.settings.pageVueTorrent.pageGeneral.dateFormat')"
            placeholder="DD/MM/YYYY, HH:mm:ss"
            label="using Dayjs"
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
    <v-list-item class="justify-center pb-2">
      <v-btn @click="resetSettings"> {{ $t('modals.settings.pageVueTorrent.pageGeneral.resetSettings') }} </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Qbit } from '@/services/qbit'
import { LOCALES } from '@/lang/locales'

export default {
  name: 'VueTorrent-General',
  data() {
    return {
      languages: LOCALES,
      paginationSizes: [5, 15, 30, 50],
      titleOptions: ['Default', 'Global Speed', 'First Torrent Status'],
      Qbitversion: 0
    }
  },
  computed: {
    ...mapState(['webuiSettings']),
    ...mapGetters(['getAppVersion']),
    version() {
      return this.getAppVersion()
    }
  },
  created() {
    this.fetchQbitVersion()
  },
  methods: {
    async fetchQbitVersion() {
      this.Qbitversion = await Qbit.getAppVersion()
    },
    resetSettings() {
      window.localStorage.clear()
      location.reload()
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
  @import 'src/styles/styles.scss';
  @include reverse-switch;
}
</style>
