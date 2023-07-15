<template>
  <nav>
    <!--title-->
    <v-app-bar app elevate-on-scroll class="noselect">
      <v-app-bar-nav-icon class="grey--text text--lighten-1" aria-label="Open Navigation Drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="!$vuetify.breakpoint.xs" :class="['grey--text', { 'subheading ml-0': $vuetify.breakpoint.smAndDown }]">
        <span class="font-weight-light">qBit</span>
        <span>torrent</span>
      </v-toolbar-title>

      <v-slide-x-transition>
        <v-speed-dial v-if="filterCount > 0" v-model="filters_fab" open-on-hover transition="slide-y-transition" direction="bottom" class="ml-5">
          <template #activator>
            <v-btn color="primary" rounded small v-model="filters_fab">{{ $t('navbar.active_filter.btn_label').replace('$0', filterCount) }}</v-btn>
          </template>
          <div class="d-flex flex-column align-start" style="width: 100%; row-gap: 8px">
            <v-tooltip bottom open-delay="400">
              <template #activator="{ on }">
                <v-chip v-if="dashboard.searchFilter?.length > 0" small class="white--text caption">
                  {{ $t('navbar.active_filter.search_filter').replace('$0', dashboard.searchFilter) }}
                </v-chip>
              </template>
              <span>{{ $t('status') }}</span>
            </v-tooltip>
            <v-tooltip bottom open-delay="400">
              <template #activator="{ on }">
                <v-chip v-if="sort_options.filter !== null" small :class="`torrent-${sort_options.filter}`" class="white--text caption">{{
                  $t(`navbar.filters.${sort_options.filter}`)
                }}</v-chip>
              </template>
              <span>{{ $t('status') }}</span>
            </v-tooltip>
            <v-tooltip bottom open-delay="400">
              <template #activator="{ on }">
                <v-chip v-if="sort_options.category !== null" small class="category white--text caption">{{
                  sort_options.category === '' ? $t('navbar.filters.uncategorized') : sort_options.category
                }}</v-chip>
              </template>
              <span>{{ $t('category') }}</span>
            </v-tooltip>
            <v-tooltip bottom open-delay="400">
              <template #activator="{ on }">
                <v-chip v-if="sort_options.tag !== null" small class="tags white--text caption">{{
                  sort_options.tag === '' ? $t('navbar.filters.untagged') : sort_options.tag
                }}</v-chip>
              </template>
              <span>{{ $t('tags') }}</span>
            </v-tooltip>
            <v-tooltip bottom open-delay="400">
              <template #activator="{ on }">
                <v-chip v-if="sort_options.tracker !== null" small class="tracker white--text caption">{{
                  sort_options.tracker === '' ? $t('navbar.filters.not_working') : sort_options.tracker
                }}</v-chip>
              </template>
              <span>{{ $t('tracker') }}</span>
            </v-tooltip>
          </div>
        </v-speed-dial>
      </v-slide-x-transition>

      <v-spacer />

      <TopMenu />
    </v-app-bar>

    <!--navigation drawer itself -->
    <v-navigation-drawer v-model="drawer" app class="primary drawer" style="position: fixed" width="256" height="100%" disable-resize-watcher :right="webuiSettings.rightDrawer">
      <v-card v-if="status" style="display: flex; flex-direction: column" class="pt-3 primary" flat>
        <CurrentSpeed v-if="webuiSettings.showCurrentSpeed" :status="status" />

        <SpeedGraph v-if="webuiSettings.showSpeedGraph" />

        <TransferStats v-if="webuiSettings.showAlltimeStat" :session="false" :status="status" />

        <TransferStats v-if="webuiSettings.showSessionStat" :session="true" :status="status" />

        <FreeSpace v-if="webuiSettings.showFreeSpace" :space="status.freeDiskSpace" />

        <FilterSelect :show-tracker-filter="webuiSettings.showTrackerFilter" />
        <div style="font-size: 0.9em" class="download--text text-uppercase text-center mt-5">
          {{ torrentCountString }}
        </div>
      </v-card>
      <template #append>
        <div class="pa-2">
          <BottomActions />
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import { BottomActions, TopMenu, SpeedGraph, FreeSpace, TransferStats, CurrentSpeed, FilterSelect } from './index'

export default {
  name: 'Navbar',
  components: {
    FreeSpace,
    BottomActions,
    TopMenu,
    SpeedGraph,
    TransferStats,
    CurrentSpeed,
    FilterSelect
  },
  data() {
    return {
      drawer: this.$vuetify.breakpoint.mdAndUp,
      filters_fab: false
    }
  },
  computed: {
    ...mapGetters(['getWebuiSettings', 'getStatus', 'getTorrentCountString']),
    ...mapState(['dashboard', 'sort_options']),
    webuiSettings() {
      return this.getWebuiSettings()
    },
    status() {
      return this.getStatus()
    },
    torrentCountString() {
      return this.getTorrentCountString()
    },
    filterCount() {
      return (
        (this.dashboard.searchFilter?.length > 0) +
        (this.sort_options.filter !== null) +
        (this.sort_options.category !== null) +
        (this.sort_options.tag !== null) +
        (this.sort_options.tracker !== null)
      )
    }
  },
  created() {
    this.drawer = this.webuiSettings.openSideBarOnStart && this.$vuetify.breakpoint.mdAndUp
  }
}
</script>

<style lang="scss">
#app > div > nav > nav > div.v-navigation-drawer__content {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #56718c;
    border-radius: 20px;
  }
}

.v-app-bar > .v-toolbar__content {
  padding-right: 0;
}

.navbar {
  @media screen and (max-width: 480px) {
    .v-toolbar__title {
      display: none;
    }
    .spacer {
      display: none;
    }
  }
}
</style>
