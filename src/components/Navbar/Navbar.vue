<template>
  <nav>
    <!--title-->
    <v-app-bar app elevate-on-scroll class="noselect">
      <v-app-bar-nav-icon class="grey--text text--lighten-1" aria-label="Open Navigation Drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="!$vuetify.breakpoint.xs" :class="['grey--text', { 'subheading ml-0': $vuetify.breakpoint.smAndDown }]">
        <span class="font-weight-light">qBit</span>
        <span>torrent</span>
      </v-toolbar-title>
      <v-spacer />

      <TopMenu />
    </v-app-bar>
    <!--navigation drawer itself -->
    <v-navigation-drawer v-model="drawer" app class="primary drawer" style="position: fixed" width="256" height="100%" disable-resize-watcher :right="webuiSettings.rightDrawer">
      <v-card v-if="status" style="display: flex; flex-direction: column" class="pt-3 primary" flat>
        <CurrentSpeed v-if="webuiSettings.showCurrentSpeed" :status="status" />

        <SpeedGraph v-if="webuiSettings.showSpeedGraph" />

        <TranserStats v-if="webuiSettings.showAlltimeStat" :session="false" :status="status" />

        <TranserStats v-if="webuiSettings.showSessionStat" :session="true" :status="status" />

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

<script>
import { mapGetters } from 'vuex'
import { BottomActions, TopMenu, SpeedGraph, FreeSpace, TranserStats, CurrentSpeed, FilterSelect } from './index'

export default {
  name: 'Navbar',
  components: {
    FreeSpace,
    BottomActions,
    TopMenu,
    SpeedGraph,
    TranserStats,
    CurrentSpeed,
    FilterSelect
  },
  data() {
    return {
      drawer: this.$vuetify.breakpoint.mdAndUp
    }
  },
  computed: {
    ...mapGetters(['getTheme', 'getWebuiSettings', 'getStatus', 'getTorrentCountString']),
    webuiSettings() {
      return this.getWebuiSettings()
    },
    status() {
      return this.getStatus()
    },
    torrentCountString() {
      return this.getTorrentCountString()
    }
  },
  created() {
    this.$vuetify.theme.dark = this.getTheme()
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
