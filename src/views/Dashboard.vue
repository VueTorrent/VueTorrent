<template>
  <div
    :class="isMobile ? 'background noselect px-1' : 'background noselect px-5'"
    @click.self="resetSelected"
  >
    <div
      class="primary"
      style="width:256px; height:48px; left:0px; top:0px; position:fixed;"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      class="updlGraph"
      style="position:absolute; width:300px; height:100%; right:0"
    >
      <!-- mask area -->
      <defs>
        <linearGradient id="fadeGrad" x1="100%" x2="0%">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="1" />
        </linearGradient>
        <mask id="fade" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#fadeGrad)" />
        </mask>
      </defs>
    </svg>
    <div v-if="torrents.length === 0" class="wrap_align">
      <div v-if="hasSearchFilter">
        <v-icon size="64" class="grey--text" style="opacity:.4">
          {{ mdiFileSearch }}
        </v-icon>
        <h3 class="grey--text">
          no items exists be filtered
        </h3>
      </div>
      <div v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 288 288"
          style="width:128px"
        >
          <g
            class="primaryFill"
            style="opacity:0.3"
          >
            <polygon points="240.75 288 288 225 155.25 225 108 288 240.75 288" />
            <rect width="72" height="288" />
          </g>
          <g
            class="primaryFill"
            style="opacity:0.2"
          >
            <polygon points="240.75 198 288 135 222.75 135 175.5 198 240.75 198" />
            <polygon points="216 0 72 192 72 288 288 0 216 0" />
          </g>
        </svg>
      </div>
    </div>
    <div v-else>
      <v-list flat class="pa-0 pt-5 transparent" :class="{'list-dblCondition': $vuetify.breakpoint.xl || $vuetify.breakpoint.sm}">
        <v-list-item
          v-for="(torrent, index) in paginatedData"
          :key="torrent.hash"
          class="pa-0"
          :class="isMobile ? 'mb-1' : 'mb-2'"
          @mousedown="trcMenu.show = false"
          @touchstart="strTouchStart($event, { torrent })"
          @touchmove="strTouchMove($event)"
          @touchend="strTouchEnd($event)"
          @contextmenu="showTorrentRightClickMenu($event, { torrent })"
          @dblclick.prevent="showInfo(torrent.hash)"
        >
          <!--@contextmenu.prevent="$refs.menu.open($event, { torrent })"-->
          <v-list-item-content class="pa-0 rounded">
            <Torrent :torrent="torrent" :index="index" />
          </v-list-item-content>
          <v-scale-transition origin="center center">
            <v-btn
              v-show="selectMode"
              icon
              small
              :dark="!$vuetify.theme.dark"
              :light="$vuetify.theme.dark"
              absolute
              right
              bottom
              :class="`torrent-${torrent.state.toLowerCase()}-color`"
              style="z-index:0;"
              @click="selectTorrent(torrent.hash)"
            >
              <v-icon>
                {{ selected_torrents.indexOf(torrent.hash) == -1 ? mdiCheckboxBlankCircle : mdiCheckboxMarkedCircle }}
              </v-icon>
            </v-btn>
          </v-scale-transition>
        </v-list-item>
      </v-list>
      <v-pagination
        v-if="(pageCount > 1) && !hasSearchFilter" 
        v-model="pageNumber"
        :length="pageCount"
        :total-visible="7"
        class="pagenation_style"
        @input="toTop"
      />
    </div>
    <v-scale-transition origin="center center">
      <v-btn
        v-show="!selectMode"
        fixed
        fab
        right
        bottom
        class="primary elevation-3"
        style="width:50px; height:50px;"
        @click="addModal('AddModal')"
      >
        <v-icon>
          {{ mdiFilePlus }}
        </v-icon>
      </v-btn>
    </v-scale-transition>
    <v-menu
      v-model="trcMenu.show"
      transition="slide-y-transition"
      :position-x="trcMenu.X"
      :position-y="trcMenu.Y"
      absolute
      class="targetMenu"
    >
      <TorrentRightClickMenu
        v-if="data"
        :torrent="data.torrent"
        :touchmode="tmCalc.TouchMode"
        :x="trcMenu.X"
      />
    </v-menu>
    <v-slide-y-transition>
      <div
        v-show="trcMenu.show"
        class="targetTooltip ma-2"
        style="position:fixed; pointer-events: none; z-index:999"
      >
        <!-- writing-mode: vertical-rl; -->
        <v-card
          class="px-1 caption elevation-3"
          style="opacity: .6;"
        >
          {{ targetTitle }}
        </v-card>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import { 
  mdiFilePlus, mdiFileSearch,
  mdiCheckboxMarkedCircle, mdiCheckboxBlankCircle } from '@mdi/js'

import Torrent from '@/components/Torrent/Torrent'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

import { TorrentSelect, General } from '@/mixins'


export default {
  name: 'Dashboard',
  components: { Torrent, TorrentRightClickMenu },
  mixins: [TorrentSelect, General],
  data() {
    return {
      data: null,
      trcMenu: {
        show: false, X: 0, Y: 0
      },
      tmCalc: {
        TouchMode: false, TouchTimer: 0, LastFinger: 0, LastHash: ''
      },
      trcMoveTick: 0,
      trcTooltip: null,
      pageNumber: 1,
      mdiFilePlus, mdiFileSearch,
      mdiCheckboxMarkedCircle, mdiCheckboxBlankCircle
    }
  },
  computed: {
    ...mapState(['mainData', 'selected_torrents']),
    ...mapGetters(['getTorrents', 'getTorrentCountString', 'getWebuiSettings']),
    torrents() {
      if (!this.hasSearchFilter) return this.getTorrents()

      const options = {
        threshold: 0.3,
        shouldSort: false,
        keys: ['name', 'size', 'state', 'hash', 'savePath', 'tags', 'category']
      }
      const fuse = new Fuse(this.getTorrents(), options)

      return fuse.search(this.$store.state.searchFilter).map(el => el.item)
    },
    paginationSize() {
      return this.getWebuiSettings().paginationSize
    },
    pageCount() {
      const l = this.torrents.length
      const s = this.paginationSize

      return Math.ceil(l / s)
    },
    paginatedData() {
      const start = (this.pageNumber - 1) * this.paginationSize
      const end = start + this.paginationSize
      if (this.hasSearchFilter) {
        return this.torrents
      }

      return this.torrents.slice(start, end)
    },
    torrentCountString() {
      return this.getTorrentCountString()
    },
    selectMode() {
      return this.$store.state.selectMode
    },
    hasSearchFilter() {
      return this.$store.state.searchFilter != null && this.$store.state.searchFilter != ''
    },
    selectedTorrentsLength() {
      return this.$store.state.selected_torrents.length 
    },
    allTorrentsSelected() {

      return this.selectedTorrentsLength === this.torrents.length
    },
    targetedTorrentName() {
      if (this.selectedTorrentsLength > 0) {

        return false
      } else {
        if (this.data)
          return this.data.torrent.name || 'aa'

        return null
      }
    },
    targetTitle() {
      if (this.data && this.selected_torrents)
        return this.selected_torrents.length > 0 ? `${this.selected_torrents.length}EA items selected` : this.data.torrent.name
      else
        return ''
    }
  },
  watch: {
    torrents: function (torrents) {
      this.$store.commit('SET_CURRENT_ITEM_COUNT', torrents.length)
    }
  },
  mounted() {
    this.trcTooltip = document.getElementsByClassName('targetTooltip')[0]
    //console.log(this.trcTooltip.style.left)
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    document.addEventListener('dragenter', this.detectDragEnter)
    this.$store.state.selectMode = false
    window.scrollTo(0, 0)
    document.addEventListener('scroll', function () {
      this.trcMenu.show = false
    }.bind(this))
    window.onresize = function () {
      this.trcMenu.show = false
    }.bind(this)
  },
  created() {
    this.$store.dispatch('INIT_INTERVALS')
    this.$store.commit('FETCH_CATEGORIES')
  },
  beforeDestroy() {
    this.$store.commit('REMOVE_INTERVALS')
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
    document.removeEventListener('dragenter', this.detectDragEnter)
  },
  methods: {
    strTouchStart(e, data) {
      this.trcMoveTick = 0
      this.trcMenu.show = false
      clearTimeout(this.tmCalc.TouchTimer)
      if (e.touches.length == 1) { // one finger only
        this.tmCalc.LastFinger = 1
        this.tmCalc.TouchTimer = setTimeout(() => this.showTorrentRightClickMenu(e.touches[0], data, true), 400)
      }
      if (e.touches.length == 2) { // two finger
        this.tmCalc.LastFinger = 2
        if (this.tmCalc.LastHash == data.torrent.hash) {
          e.preventDefault()
          this.showTorrentRightClickMenu(e.touches[0], data, true)
        }
      }
      this.tmCalc.LastHash = data.torrent.hash
    },
    strTouchMove(e) {
      this.trcMoveTick++
      if (this.trcMenu.show == true && e.touches.length > 1) {
        e.preventDefault()
      } else if (this.trcMoveTick > 1 && e.touches.length == 1) {
        if (this.tmCalc.LastFinger == 1) this.trcMenu.show = false
        clearTimeout(this.tmCalc.TouchTimer)
      }
    },
    strTouchEnd(e) {
      clearTimeout(this.tmCalc.TouchTimer)
      if (this.trcMenu.show)
        e.preventDefault()
    },
    showTorrentRightClickMenu(e, data, touchmode = false) {
      if (this.trcMenu.show)
        return false
      this.data = data
      if (e.preventDefault)
        e.preventDefault()
      this.tmCalc.TouchMode = touchmode
      this.trcMenu.X = e.clientX + (touchmode ? 12 : 6)
      this.trcMenu.Y = e.clientY + (touchmode ? 12 : 6)
      //this.trcTooltip.style.left = `${this.trcMenu.X - 30}px`
      this.trcTooltip.style.right = `${document.documentElement.clientWidth - this.trcMenu.X}px`
      this.trcTooltip.style.top = `${this.trcMenu.Y}px`
      this.$nextTick(() => {
        this.trcMenu.show = true
      })

    },
    detectDragEnter() {
      if (this.selected_torrents.length == 0 && this.$store.state.modals.length < 1) {
        this.createModal('AddModal', { openSuddenly: true })
      }

      return true
    },
    showInfo(hash) {
      if (!this.$store.state.selectMode && !this.trcMenu.show)
        this.createModal('TorrentDetailModal', { hash })
    },
    resetSelected() {
      this.$store.commit('RESET_SELECTED')
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    toggleSelectMode() {
      if (this.$store.state.selectMode) {
        this.$store.state.selected_torrents = []

        return this.$store.state.selectMode = false
      }
      this.$store.state.selectMode = true
    },
    addModal(name) {
      this.createModal(name)
    },
    selectAllTorrents() {
      if (this.allTorrentsSelected) {
        return (this.$store.state.selected_torrents = [])
      }
      const hashes = this.torrents.map(t => t.hash)
      this.$store.state.selectMode = true

      return (this.$store.state.selected_torrents = hashes)
    },
    handleKeyboardShortcut(e) {
      // 모달이 중첩으로 열려있으면 ( 대시보드 포함 2개이상 ) 키입력을 막는다
      //console.log(this.$store.state.modals.length)
      if (this.$store.state.modals.length > 0) {
        //e.preventDefault()

        return null
      }
      if (this.hasSearchFilter) {

        return null
      }
      // 'ctrl + A' => select torrents
      if (e.keyCode === 65 && e.ctrlKey) {
        e.preventDefault()
        this.selectAllTorrents()
      }

      // 'Delete' => Delete modal
      if (e.keyCode === 46) {
        e.preventDefault()

        // no torrents select to delete
        if (!this.selected_torrents.length) return

        return this.createModal('ConfirmDeleteModal')
      }
    }
  }
}
</script>

<style lang="scss">

.v-pagination>li>button {
  //background-color:black !important;
  margin: 0 !important;
  padding: 0 !important;
}
.pagenation_style {
  position: absolute;
  //position: fixed;
  //right: 14px;
  //top: 60px;
  >ul {
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--v-background-base);
    //box-shadow: 0px 3px 6px rgba(0,0,0,.3);
  }
}

.v-pagination__navigation {
  width: 32px !important;
  height: 32px !important;
  border-radius: 0px !important;
  box-shadow: none !important;
}
.v-pagination__item {
  outline:none;
  width: 32px !important;
  height: 32px !important;
  border-radius: 0px !important;
  box-shadow: none !important;
}
.v-pagination__more {
  width: 32px !important;
  height: 32px !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.list-dblCondition {
  column-count: 2 !important;
  .v-list-item {
    -webkit-column-break-inside: avoid; // Chrome, Safari, Opera
              page-break-inside: avoid; // Firefox
                   break-inside: avoid;
  }
}
</style>