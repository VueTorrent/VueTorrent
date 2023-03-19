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
            id="searchInput"
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
        <span>{{ $t('dashboard.tooltips.toggleSearch') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn text small fab class="mr-0 ml-0" aria-label="Select Mode" v-on="on" @click="toggleSelectMode">
            <v-icon color="grey">
              {{ $store.state.selectMode ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('dashboard.tooltips.toggleSelect') }}</span>
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
        <span>{{ $t('dashboard.tooltips.toggleSort') }}</span>
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
            <span>{{ $t('dashboard.tooltips.selectAll') }}</span>
          </v-tooltip>
          <span class="grey--text">{{ $t('dashboard.tooltips.selectAllCaption') }}</span>
        </v-card>
      </v-expand-transition>
    </v-row>
    <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
      <p class="grey--text">{{ $t('dashboard.emptyTorrentList') }}</p>
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
      <TorrentRightClickMenu v-if="data" :hash="data.torrent.hash" :touchmode="tmCalc.TouchMode" :x="trcMenu.X" />
    </v-menu>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { mdiTextBoxSearch, mdiChevronLeftCircle, mdiMagnify, mdiCheckboxMarked, mdiCheckboxBlankOutline, mdiSort, mdiArrowUpThin, mdiArrowDownThin } from '@mdi/js'
import { QuickScore } from 'quick-score'

import Torrent from '@/components/Torrent/Torrent.vue'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

import { TorrentSelect, General } from '@/mixins'
import { doesCommand } from '@/helpers'

export default {
  name: 'Dashboard',
  components: { Torrent, TorrentRightClickMenu },
  mixins: [TorrentSelect, General],
  data() {
    const sortOptions = [
      { value: 'added_on', text: this.$t('modals.sort.sortBy.added_on') },
      { value: 'amount_left', text: this.$t('modals.sort.sortBy.amount_left') },
      { value: 'auto_tmm', text: this.$t('modals.sort.sortBy.auto_tmm') },
      { value: 'availability', text: this.$t('modals.sort.sortBy.availability') },
      { value: 'category', text: this.$t('modals.sort.sortBy.category') },
      { value: 'completed', text: this.$t('modals.sort.sortBy.completed') },
      { value: 'completion_on', text: this.$t('modals.sort.sortBy.completion_on') },
      { value: 'content_path', text: this.$t('modals.sort.sortBy.content_path') },
      { value: 'dl_limit', text: this.$t('modals.sort.sortBy.dl_limit') },
      { value: 'dlspeed', text: this.$t('modals.sort.sortBy.dlspeed') },
      { value: 'download_path', text: this.$t('modals.sort.sortBy.download_path') },
      { value: 'downloaded', text: this.$t('modals.sort.sortBy.downloaded') },
      { value: 'downloaded_session', text: this.$t('modals.sort.sortBy.downloaded_session') },
      { value: 'eta', text: this.$t('modals.sort.sortBy.eta') },
      { value: 'f_l_piece_prio', text: this.$t('modals.sort.sortBy.f_l_piece_prio') },
      { value: 'force_start', text: this.$t('modals.sort.sortBy.force_start') },
      { value: 'globalSpeed', text: this.$t('modals.sort.sortBy.globalSpeed') },
      { value: 'globalVolume', text: this.$t('modals.sort.sortBy.globalVolume') },
      { value: 'hash', text: this.$t('modals.sort.sortBy.hash') },
      { value: 'infohash_v1', text: this.$t('modals.sort.sortBy.infohash_v1') },
      { value: 'infohash_v2', text: this.$t('modals.sort.sortBy.infohash_v2') },
      { value: 'last_activity', text: this.$t('modals.sort.sortBy.last_activity') },
      { value: 'magnet_uri', text: this.$t('modals.sort.sortBy.magnet_uri') },
      { value: 'max_ratio', text: this.$t('modals.sort.sortBy.max_ratio') },
      { value: 'max_seeding_time', text: this.$t('modals.sort.sortBy.max_seeding_time') },
      { value: 'name', text: this.$t('modals.sort.sortBy.name') },
      { value: 'num_complete', text: this.$t('modals.sort.sortBy.num_complete') },
      { value: 'num_incomplete', text: this.$t('modals.sort.sortBy.num_incomplete') },
      { value: 'num_leechs', text: this.$t('modals.sort.sortBy.num_leechs') },
      { value: 'num_seeds', text: this.$t('modals.sort.sortBy.num_seeds') },
      { value: 'priority', text: this.$t('modals.sort.sortBy.priority') },
      { value: 'progress', text: this.$t('modals.sort.sortBy.progress') },
      { value: 'ratio', text: this.$t('modals.sort.sortBy.ratio') },
      { value: 'ratio_limit', text: this.$t('modals.sort.sortBy.ratio_limit') },
      { value: 'save_path', text: this.$t('modals.sort.sortBy.save_path') },
      { value: 'seeding_time', text: this.$t('modals.sort.sortBy.seeding_time') },
      { value: 'seeding_time_limit', text: this.$t('modals.sort.sortBy.seeding_time_limit') },
      { value: 'seen_complete', text: this.$t('modals.sort.sortBy.seen_complete') },
      { value: 'seq_dl', text: this.$t('modals.sort.sortBy.seq_dl') },
      { value: 'size', text: this.$t('modals.sort.sortBy.size') },
      { value: 'state', text: this.$t('modals.sort.sortBy.state') },
      { value: 'super_seeding', text: this.$t('modals.sort.sortBy.super_seeding') },
      { value: 'tags', text: this.$t('modals.sort.sortBy.tags') },
      { value: 'time_active', text: this.$t('modals.sort.sortBy.time_active') },
      { value: 'total_size', text: this.$t('modals.sort.sortBy.total_size') },
      { value: 'tracker', text: this.$t('modals.sort.sortBy.tracker') },
      { value: 'trackers_count', text: this.$t('modals.sort.sortBy.trackers_count') },
      { value: 'up_limit', text: this.$t('modals.sort.sortBy.up_limit') },
      { value: 'uploaded', text: this.$t('modals.sort.sortBy.uploaded') },
      { value: 'uploaded_session', text: this.$t('modals.sort.sortBy.uploaded_session') },
      { value: 'upspeed', text: this.$t('modals.sort.sortBy.upspeed') }
    ]
    sortOptions.sort((a,b) => a.text.localeCompare(b.text))

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
        { value: '', text: this.$t('modals.sort.sortBy.default') },
        ...sortOptions
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
    ...mapState(['selected_torrents', 'dashboard', 'sort_options']),
    ...mapGetters(['getTorrents', 'getTorrentCountString', 'getWebuiSettings']),
    torrents() {
      let torrents
      if (!this.hasSearchFilter) torrents = this.getTorrents()
      else {
        const qs = new QuickScore(this.getTorrents(), ['name', 'size', 'state', 'hash', 'savePath', 'tags', 'category'])
        torrents = qs.search(this.input).map(el => el.item)
      }

      if (this.sort_options.isCustomSortEnabled) {
        torrents.sort((a, b) => a[this.sort_options.sort] - b[this.sort_options.sort] || a.added_on - b.added_on)
        if (this.sort_options.reverse) torrents.reverse()
      }
      return torrents
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
      set: _.debounce(function (val) {
        this.dashboard.searchFilter = val
      }, 300)
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

      const pageCount = Math.ceil(torrents.length / this.paginationSize)
      if (pageCount < this.pageNumber) {
        this.pageNumber = Math.max(1, pageCount)
      }
    }
  },
  mounted() {
    this.$store.dispatch('INIT_INTERVALS')
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    document.addEventListener('dragenter', this.detectDragEnter)
    this.$store.state.selectMode = false
    window.scrollTo(0, 0)
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
    this.$store.commit('FETCH_TAGS')
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
      if (e.touches.length === 1) {
        // one finger only
        this.tmCalc.LastFinger = 1
        this.tmCalc.TouchTimer = setTimeout(() => this.showTorrentRightClickMenu(e.touches[0], data, true), 400)
      }
      if (e.touches.length === 2) {
        // two finger
        this.tmCalc.LastFinger = 2
        if (this.tmCalc.LastHash === data.torrent.hash) {
          e.preventDefault()
          this.showTorrentRightClickMenu(e.touches[0], data, true)
        }
      }
      this.tmCalc.LastHash = data.torrent.hash
    },
    strTouchMove(e) {
      this.trcMoveTick++
      if (this.trcMenu.show === true && e.touches.length > 1) {
        e.preventDefault()
      } else if (this.trcMoveTick > 1 && e.touches.length === 1) {
        if (this.tmCalc.LastFinger === 1) this.trcMenu.show = false
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
      if (this.selected_torrents.length === 0 && this.$store.state.modals.length < 1) {
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
      if (e.keyCode === 65 && doesCommand(e) && e.target?.tagName !== 'INPUT') {
        e.preventDefault()

        this.selectAllTorrents()
      }

      // 'ctrl + F' => Focus search filter field
      if (e.keyCode === 70 && doesCommand(e)) {
        e.preventDefault()

        this.searchFilterEnabled = true
        document.getElementById('searchInput').focus()
      }

      // 'Escape' => Remove focus from search field
      if (e.keyCode === 27) {
        document.getElementById('searchInput').blur()
        this.searchFilterEnabled = false
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
