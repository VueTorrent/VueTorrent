<template>
  <div class="px-1 px-sm-5 pt-4 background noselect" @click.self="resetSelected">
    <v-row class="ma-0 pa-0 mb-2" @click.self="resetSelected">
      <v-col v-if="topPagination && isMobile" cols="12" class="align-center justify-center pa-0">
        <div class="text-center">
          <v-pagination v-if="pageCount > 1 && !hasSearchFilter" v-model="pageNumber" :length="pageCount" :total-visible="7" @input="toTop" />
        </div>
      </v-col>
      <v-expand-x-transition>
        <v-card v-show="searchFilterEnabled" id="searchFilter" flat xs7 md3 class="ma-0 pa-0 transparent">
          <v-text-field
            v-model="input"
            autofocus
            flat
            solo
            clearable
            class="rounded-pill"
            dense
            hide-details
            label="Search"
            :prepend-inner-icon="mdiMagnify"
            height="100%"
            width="100px"
            @click:clear="resetInput()"
          />
        </v-card>
      </v-expand-x-transition>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn text small fab class="mr-0 ml-0" aria-label="Select Mode" v-on="on" @click="searchFilterEnabled = !searchFilterEnabled">
            <v-icon color="grey">
              {{ searchFilterEnabled ? mdiChevronLeftCircle : mdiTextBoxSearch }}
            </v-icon>
          </v-btn>
        </template>
        <span>Toggle Search Filter</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn text small fab class="mr-0 ml-0" aria-label="Select Mode" v-on="on" @click="toggleSelectMode">
            <v-icon color="grey">
              {{ $store.state.selectMode ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
            </v-icon>
          </v-btn>
        </template>
        <span>Select Mode</span>
      </v-tooltip>
      <v-expand-x-transition>
        <v-card v-show="sortEnabled" flat class="ma-0 pa-0 mt-1 transparent">
          <v-select
            v-model="sort_options.sort"
            flat
            solo
            dense
            height="30"
            class="ml-2 mr-2"
            :items="sortOptions"
            style="max-width: 10em"
            :prepend-icon="sort_options.reverse ? mdiArrowUpThin : mdiArrowDownThin"
            @click:prepend="$store.state.sort_options.reverse = !$store.state.sort_options.reverse"
          />
        </v-card>
      </v-expand-x-transition>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn text small fab class="mr-0 ml-0" aria-label="Sort Torrents" v-on="on" @click="sortEnabled = !sortEnabled">
            <v-icon color="grey">
              {{ sortEnabled ? mdiChevronLeftCircle : mdiSort }}
            </v-icon>
          </v-btn>
        </template>
        <span>Sort Torrents</span>
      </v-tooltip>
      <v-col v-if="topPagination && !isMobile" cols="8" class="align-center justify-center pa-0">
        <div class="text-center">
          <v-pagination v-if="pageCount > 1 && !hasSearchFilter" v-model="pageNumber" :length="pageCount" :total-visible="7" @input="toTop" />
        </div>
      </v-col>
      <v-col class="align-center justify-center">
        <span style="float: right; font-size: 0.8em" class="mr-2 text-uppercase">
          {{ torrentCountString }}
        </span>
      </v-col>
    </v-row>
    <v-row id="selectAllTorrents" class="ma-0 pa-0">
      <v-expand-transition>
        <v-card v-show="selectMode" flat class="transparent" height="40">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn text small fab style="left: -8px" aria-label="Select Mode" class="grey--text" v-on="on" @click="selectAllTorrents()">
                <v-icon>
                  {{ allTorrentsSelected ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Select All</span>
          </v-tooltip>
          <span class="grey--text"> Select / Release All ( Ctrl + A ) </span>
        </v-card>
      </v-expand-transition>
    </v-row>
    <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
      <p class="grey--text">Nothing to see here!</p>
    </div>
    <div v-else>
      <v-list class="pa-0 transparent">
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
          <template #default>
            <v-expand-x-transition>
              <v-card v-show="selectMode" flat class="transparent">
                <v-list-item-action>
                  <v-checkbox color="grey" :input-value="selected_torrents.indexOf(torrent.hash) !== -1" @click="selectTorrent(torrent.hash)" />
                </v-list-item-action>
              </v-card>
            </v-expand-x-transition>
            <v-list-item-content class="pa-0 rounded">
              <Torrent :torrent="torrent" :index="index" />
              <v-divider v-if="index < paginatedData.length - 1" :key="index" />
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
      <div v-if="!topPagination" class="text-center mb-5">
        <v-pagination v-if="pageCount > 1 && !hasSearchFilter" v-model="pageNumber" :length="pageCount" :total-visible="7" @input="toTop" />
      </div>
    </div>
    <v-menu v-model="trcMenu.show" transition="slide-y-transition" :position-x="trcMenu.X" :position-y="trcMenu.Y" absolute>
      <TorrentRightClickMenu v-if="data" :torrent="data.torrent" :touchmode="tmCalc.TouchMode" :x="trcMenu.X" />
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { mdiTextBoxSearch, mdiChevronLeftCircle, mdiMagnify, mdiCheckboxMarked, mdiCheckboxBlankOutline, mdiSort, mdiArrowUpThin, mdiArrowDownThin } from '@mdi/js'
import { QuickScore } from 'quick-score'

import Torrent from '@/components/Torrent/Torrent.vue'
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
        show: false,
        X: 0,
        Y: 0
      },
      tmCalc: {
        TouchMode: false,
        TouchTimer: 0,
        LastFinger: 0,
        LastHash: ''
      },
      trcMoveTick: 0,
      searchFilterEnabled: false,
      sortEnabled: false,
      sortOptions: [
        { value: '', text: this.$i18n.t('modals.sort.sortBy.none') },
        { value: 'added_on', text: this.$i18n.t('modals.sort.sortBy.addedOn') },
        { value: 'availability', text: this.$i18n.t('modals.sort.sortBy.availability') },
        { value: 'category', text: this.$i18n.t('modals.sort.sortBy.category') },
        { value: 'completed', text: this.$i18n.t('modals.sort.sortBy.completed') },
        { value: 'dlspeed', text: this.$i18n.t('modals.sort.sortBy.downloadSpeed') },
        { value: 'downloaded', text: this.$i18n.t('modals.sort.sortBy.downloaded') },
        { value: 'eta', text: this.$i18n.t('modals.sort.sortBy.ETA') },
        { value: 'name', text: this.$i18n.t('modals.sort.sortBy.name') },
        { value: 'num_leechs', text: this.$i18n.t('modals.sort.sortBy.peers') },
        { value: 'last_activity', text: this.$i18n.t('modals.sort.sortBy.last_activity') },
        { value: 'priority', text: this.$i18n.t('modals.sort.sortBy.priority') },
        { value: 'progress', text: this.$i18n.t('modals.sort.sortBy.progress') },
        { value: 'ratio', text: this.$i18n.t('modals.sort.sortBy.ratio') },
        { value: 'save_path', text: this.$i18n.t('modals.sort.sortBy.save_path') },
        { value: 'size', text: this.$i18n.t('modals.sort.sortBy.size') },
        { value: 'state', text: this.$i18n.t('modals.sort.sortBy.state') },
        { value: 'time_active', text: this.$i18n.t('modals.sort.sortBy.timeActive') },
        { value: 'uploaded', text: this.$i18n.t('modals.sort.sortBy.uploaded') },
        { value: 'upspeed', text: this.$i18n.t('modals.sort.sortBy.uploadSpeed') }
      ],
      mdiTextBoxSearch,
      mdiChevronLeftCircle,
      mdiMagnify,
      mdiCheckboxBlankOutline,
      mdiCheckboxMarked,
      mdiSort,
      mdiArrowUpThin,
      mdiArrowDownThin
    }
  },
  computed: {
    ...mapState(['mainData', 'selected_torrents', 'dashboard', 'sort_options']),
    ...mapGetters(['getTorrents', 'getTorrentCountString', 'getWebuiSettings']),
    torrents() {
      if (!this.hasSearchFilter) return this.getTorrents()

      const qs = new QuickScore(this.getTorrents(), ['name', 'size', 'state', 'hash', 'savePath', 'tags', 'category'])
      return qs.search(this.input).map(el => el.item)
    },
    pageNumber: {
      get() {
        return this.dashboard.currentPage
      },
      set(val) {
        this.dashboard.currentPage = val
      }
    },
    input: {
      get() {
        return this.dashboard.searchFilter
      },
      set(val) {
        this.dashboard.searchFilter = val
      }
    },
    topPagination() {
      return this.getWebuiSettings().topPagination
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
      return this.input && this.input.length
    },
    selectedTorrentsLength() {
      return this.$store.state.selected_torrents.length
    },
    allTorrentsSelected() {
      return this.selectedTorrentsLength === this.torrents.length
    }
  },
  watch: {
    torrents: function (torrents) {
      this.$store.commit('SET_CURRENT_ITEM_COUNT', torrents.length)
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    document.addEventListener('dragenter', this.detectDragEnter)
    this.$store.state.selectMode = false
    window.scrollTo(0, 0)
    document.addEventListener(
      'scroll',
      function () {
        this.trcMenu.show = false
      }.bind(this)
    )
  },
  created() {
    this.$store.dispatch('INIT_INTERVALS')
    this.$store.commit('FETCH_CATEGORIES')
    if (this.input) this.searchFilterEnabled = true
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
      if (e.touches.length == 1) {
        // one finger only
        this.tmCalc.LastFinger = 1
        this.tmCalc.TouchTimer = setTimeout(() => this.showTorrentRightClickMenu(e.touches[0], data, true), 400)
      }
      if (e.touches.length == 2) {
        // two finger
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
      if (this.trcMenu.show) e.preventDefault()
    },
    showTorrentRightClickMenu(e, data, touchmode = false) {
      if (this.trcMenu.show) return false
      this.data = data
      if (e.preventDefault) e.preventDefault()
      this.tmCalc.TouchMode = touchmode
      this.trcMenu.X = e.clientX + (touchmode ? 12 : 6)
      this.trcMenu.Y = e.clientY + (touchmode ? 12 : 6)
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
      if (!this.$store.state.selectMode) this.$router.push({ name: 'torrentDetail', params: { hash } })
    },
    resetSelected() {
      this.$store.commit('RESET_SELECTED')
    },
    resetInput() {
      this.input = ''
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    toggleSelectMode() {
      if (this.$store.state.selectMode) {
        this.$store.state.selected_torrents = []

        return (this.$store.state.selectMode = false)
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
      if (this.$store.state.modals.length > 0) {
        //e.preventDefault()

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

      // 'Search new torrent'
      if (e.keyCode === 55) {
        return this.createModal('SearchModal')
      }
    }
  }
}
</script>
