<template>
  <nav>
    <!--navigation-->
    <v-app-bar
      app
      flat
      class="noselect"
    >
      <v-app-bar-nav-icon
        :class="commonStyle"
        aria-label="Open Navigation Drawer"
        @click.stop="drawer = !drawer"
      />
      <v-fade-transition>
        <svg
          v-show="toolbarMode != 0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          style="position:absolute; width:300px; height:100%; right:0"
        >
          <defs>
            <linearGradient
              id="fadeGrad_nav"
              x1="20%"
              x2="100%"
              gradientTransform="rotate(10)"
            >
              <stop offset="0" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="1" />
            </linearGradient>
            <mask id="fade_nav" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="url(#fadeGrad_nav)" />
            </mask>
          </defs>
          <g mask="url(#fade_nav)">
            <rect
              x="0"
              y="0"
              width="1"
              height="1"
              class="grdColor"
            />
          </g>
        </svg>
      </v-fade-transition>
      <v-toolbar-title v-if="!isMobile" :class="commonStyle">
        <span class="font-weight-light mx-1">VUE</span>
        <span>TORRENT</span>
      </v-toolbar-title>
      
      <v-slide-y-transition>
        <v-divider
          v-if="!isPhone || toolbarMode == 0"
          inset
          vertical
          class="mx-4 primarytext"
        />
      </v-slide-y-transition>
      <transition name="slide-y-transition">
        <v-layout v-if="!drawer && !$vuetify.breakpoint.xs" :class="commonStyle">
          <v-toolbar-title style="width:105px;">
            <v-icon :class="commonStyle">
              {{ mdiChevronDown }}
            </v-icon>
            <span class="subtitle-2">
              {{ status.dlspeed | getSpeedValue }}{{ status.dlspeed | getDataUnit(1) }}/s
            </span>
          </v-toolbar-title>
          <v-toolbar-title style="width:105px;">
            <v-icon :class="commonStyle">
              {{ mdiChevronUp }}
            </v-icon>
            <span class="subtitle-2">
              {{ status.upspeed | getSpeedValue }}{{ status.upspeed | getDataUnit(1) }}/s
            </span>
          </v-toolbar-title>
        </v-layout>
      </transition>
      <v-spacer />

      <v-slide-y-transition>
        <v-row
          v-show="toolbarMode == 0"
          no-gutters
          style="position:absolute;right:0px;"
        >
          <span :class="commonStyle + ' subtitle-2 mt-3'">
            {{ torrentCountString }}
          </span>
          <v-btn
            small
            fab
            text
            :class="input == '' || input == null ? commonStyle : 'info--text'"
            @click="toolbarMode = 1"
          >
            <v-icon>
              {{ mdiMagnify }}
            </v-icon>
          </v-btn>
          <v-btn
            small
            fab
            text
            :class="commonStyle"
            @click="toolbarMode = 2"
          >
            <v-icon>
              {{ mdiPlaylistEdit }}
            </v-icon>
          </v-btn>
          <v-btn
            small
            fab
            text
            :class="commonStyle"
            @click="addModal('SettingsModal')"
          >
            <v-icon>
              {{ mdiCog }}
            </v-icon>
          </v-btn>
        </v-row>
      </v-slide-y-transition>

      <v-slide-y-reverse-transition>
        <v-row
          v-show="toolbarMode == 1"
          no-gutters
          style="position:absolute;right:0px;"
        >
          <v-card-actions class="ma-0 pa-0">
            <v-btn
              small
              fab
              text
              :class="commonStyle"
              @click="addModal('SearchModal')"
            >
              <v-icon color="grey">
                {{ mdiSearchWeb }}
              </v-icon>
            </v-btn>
            <v-text-field
              v-model="input"
              autofocus
              flat
              solo
              clearable
              dense
              hide-details
              class="rounded-pill shrink"
              :style="isPhone ? 'width:70vw' : 'width:240px;'"
              label="검색"
              :prepend-inner-icon="mdiMagnify"
            />
            <v-divider
              inset
              vertical
              class="ml-3 mr-1 my-2 primarytext"
            />
            <v-btn
              small
              fab
              text
              :class="commonStyle"
              @click="toolbarMode = 0"
            >
              <v-icon>
                {{ mdiArrowUpCircle }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-slide-y-reverse-transition>
      
      <v-slide-y-reverse-transition>
        <v-row
          v-show="toolbarMode == 2"
          no-gutters
          style="position:absolute;right:0px;"
        >
          <v-btn
            small
            fab
            text
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="addModal('SortModal')"
          >
            <v-icon>
              {{ mdiSort }}
            </v-icon>
          </v-btn>
          <v-btn
            small
            fab
            text
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="selectAll()"
          >
            <v-icon>
              {{ mdiCheckAll }}
            </v-icon>
          </v-btn>
          <v-divider
            v-show="!isPhone"
            inset
            vertical
            class="mx-1 my-2 primarytext"
          />
          <v-btn
            v-show="!isPhone"
            small
            fab
            text
            :disabled="!multiple"
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="resumeTorrents()"
          >
            <v-icon>
              {{ mdiPlay }}
            </v-icon>
          </v-btn>
          <v-btn
            v-show="!isPhone"
            small
            fab
            text
            :disabled="!multiple"
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="pauseTorrents()"
          >
            <v-icon>
              {{ mdiPause }}
            </v-icon>
          </v-btn>
          <v-btn
            v-show="!isPhone"
            small
            fab
            text
            :disabled="!multiple"
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="removeTorrents()"
          >
            <v-icon>
              {{ mdiTrashCan }}
            </v-icon>
          </v-btn>
          <v-btn
            v-touch="{ start: () => touchTick = true }"
            small
            fab
            text
            :disabled="!multiple"
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="openMenu()"
          >
            <v-icon>
              {{ mdiDotsHorizontalCircle }}
            </v-icon>
          </v-btn>
          <v-divider
            inset
            vertical
            class="mx-1 my-2 primarytext"
          />
          <v-btn
            small
            fab
            text
            :class="commonStyle"
            aria-label="Remove Selected Torrents"
            @click="toolbarMode = 0"
          >
            <v-icon>
              {{ mdiArrowUpCircle }}
            </v-icon>
          </v-btn>
        </v-row>
      </v-slide-y-reverse-transition>
      
      <v-slide-y-reverse-transition>
        <div
          v-show="toolbarMode != 0"
          style="pointer-events: none; position:fixed; top: 48px; right: 0px; "
        >
          <v-card
            style="opacity: .85;"
            class="ma-2 py-1 px-3 elevation-6"
          >
            <span class="subtitle-2">
              {{ toolbarModeString }}{{ torrentCountString }}
            </span>
          </v-card>
        </div>
      </v-slide-y-reverse-transition>
      
      <!--<TopMenu />-->
    </v-app-bar>
    <!--navigation drawer itself -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="primary drawer noselect"
      style="position: fixed;"
      width="256"
      height="100%"
      disable-resize-watcher
    >
      <v-card
        v-if="status"
        style="display: flex; flex-direction: column;"
        class="pt-3 primary"
        flat
      >
        <CurrentSpeed
          v-if="webuiSettings.showCurrentSpeed"
          :status="status"
        />

        <SpeedGraph v-if="webuiSettings.showSpeedGraph" />
        <SessionStats
          v-if="webuiSettings.showSessionStat"
          :status="status"
        />

        <FreeSpace
          v-if="webuiSettings.showFreeSpace"
          :space="status.freeDiskSpace"
        />
        <FilterSelect :show-tracker-filter="webuiSettings.showTrackerFilter" />
        <div
          style="font-size: 0.9em"
          class="grey--text text-center mt-5"
        >
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
import { General } from '@/mixins'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import qbit from '@/services/qbit'
import { 
  mdiCog, mdiMagnify, mdiPlaylistEdit,
  mdiSort, mdiCheckAll, mdiPlay, mdiPause, mdiTrashCan, mdiDotsHorizontalCircle,
  mdiSearchWeb, mdiArrowUpCircle, mdiChevronUp, mdiChevronDown
} from '@mdi/js'
import {
  BottomActions,
  //TopMenu,
  SpeedGraph,
  CurrentSpeed,
  FilterSelect, FreeSpace, SessionStats
} from './index'

export default {
  name: 'Navbar',
  components: {
    BottomActions,
    //TopMenu,
    SpeedGraph,
    CurrentSpeed,
    FilterSelect, FreeSpace, SessionStats
  },
  filters: {
    getSpeedValue(value) {
      if (!value) return '0'
      const c = 1024
      const d = value > 1048576 ? 1 : 0 // 2 decimals when MB
      const f = Math.floor(Math.log(value) / Math.log(c))

      return `${parseFloat((value / Math.pow(c, f)).toFixed(d))}`
    }
  },
  mixins: [General],
  data() {
    return {
      touchTick: false,
      toolbarMode_: 0, //0: normal, 1: search, 2: edit
      toolbarModeString: '',
      commonStyle: 'grey--text',
      drawer: false, //this.$vuetify.breakpoint.mdAndUp
      mdiChevronUp, mdiChevronDown,
      mdiSort, mdiCheckAll, mdiPlay, mdiPause, mdiTrashCan, mdiDotsHorizontalCircle,
      mdiSearchWeb, mdiArrowUpCircle, mdiCog, mdiMagnify, mdiPlaylistEdit
    }
  },
  computed: {
    toolbarMode: {
      get: function () {
        return this.toolbarMode_
      },
      set: function (value) {
        switch (value) {
          case 0:
            break
          case 1:
            this.toolbarModeString = 'filter mode - '
            break
          case 2:
            this.toolbarModeString = 'select mode - '
            break
          default:
            this.toolbarModeString = ''
        }
        if (this.toolbarMode_ == 2) {
          this.$store.state.selectMode = false
          this.$store.state.selected_torrents = []
        }
        if (value == 2)
          this.$store.state.selectMode = true
        this.toolbarMode_ = value
      }
    },
    input: {
      get: function () {
        return this.$store.state.searchFilter
      },
      set: function (value) {
        this.$store.state.searchFilter = value
      }
    },
    ...mapGetters(['getTheme', 'getWebuiSettings', 'getStatus', 'getTorrentCountString']),
    ...mapState(['selected_torrents']),
    multiple() {
      return this.selected_torrents.length > 0 ? true : false
    },
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
  watch: {
    '$store.state.selectMode'(e) {
      if (e == true) {
        this.toolbarMode = 2
      }
    }
  },
  methods: {
    pauseTorrents() {
      qbit.pauseTorrents(this.selected_torrents)
    },
    resumeTorrents() {
      qbit.resumeTorrents(this.selected_torrents)
    },
    removeTorrents() {
      if (!this.selected_torrents.length) return

      return this.createModal('ConfirmDeleteModal')
    },
    addModal(name) {
      this.createModal(name)
    },
    selectAll() {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        keyCode: 65, ctrlKey: true
      }))
    },
    openMenu() {
      const firstSelected = document.getElementsByClassName('v-list-item__content')[0]
      if (this.touchTick) {
        this.touchTick = false
        const touchObj = new Touch({
          identifier: Date.now(),
          target: firstSelected,
          clientX: document.documentElement.clientWidth,
          clientY: 48
        })
        firstSelected.dispatchEvent(new TouchEvent('touchstart', {
          cancelable: true,
          bubbles: true,
          touches: [touchObj],
          targetTouches: [],
          changedTouches: [touchObj]
        }))
        firstSelected.dispatchEvent(new TouchEvent('touchstart', {
          cancelable: true,
          bubbles: true,
          touches: [touchObj, touchObj],
          targetTouches: [],
          changedTouches: [touchObj]
        }))
      } else {
        firstSelected.dispatchEvent(new MouseEvent('contextmenu', { 
          bubbles: true,
          clientX: document.documentElement.clientWidth,
          clientY: 48
        }))
      }
    }
  }
}
</script>

<style lang="scss">
#app > div > nav > nav > div.v-navigation-drawer__content {
  &::-webkit-scrollbar {
    width: 8px;
        height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #6c8878;
    border-radius: 20px;
  }
}

.v-app-bar > .v-toolbar__content{
 padding-right: 0;
}

.navbar {
  @media screen and (max-width: 480px) {
    .v-toolbar__title { display: none; }
    .spacer { display: none; }
  }
}
.grdColor {
  fill: orange;
  //fill: orange;
  //fill: var(--v-upload-base);
  //fill: var(--v-background-base);
  opacity: .3;
}
</style>
