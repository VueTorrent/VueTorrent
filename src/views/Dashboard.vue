<template>
  <div class="px-1 px-sm-5 pt-4 background" @click.self="resetSelected">
    <v-row
      no-gutters
      class="grey--text"
      align="center"
      justify="center"
    >
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          Dashboard
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <span style="float: right; font-size: 0.8em" class="mr-2 text-uppercase">
          {{ torrentCountString }}
        </span>
      </v-col>
    </v-row>

    <div class="my-2 px-2" @click.self="resetSelected">
      <v-row class="my-2 mx-1" @click.self="resetSelected">
        <v-expand-x-transition>
          <v-card
            v-show="searchFilterEnabled"
            id="searchFilter"
            flat
            xs7
            md3
            class="ma-0 pa-0 mt-1 transparent"
          >
            <v-text-field
              v-model="input"
              flat
              label="Search"
              dense
              outlined
              clearable
              solo
              height="50px"
              width="100px"
              @click:clear="resetInput()"
            />
          </v-card>
        </v-expand-x-transition>
        <v-row style="margin-top: 10px" class="mb-1 mx-1">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                text
                small
                fab
                class="mr-0 ml-0"
                aria-label="Select Mode"
                v-on="on"
                @click="searchFilterEnabled = !searchFilterEnabled"
              >
                <v-icon color="grey">
                  {{ mdiFilter }}
                </v-icon>
              </v-btn>
            </template>
            <span>Toggle Search Filter</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                text
                small
                fab
                class="mr-0 ml-0"
                aria-label="Select Mode"
                v-on="on"
                @click="toggleSelectMode()"
              >
                <v-icon color="grey">
                  {{ $store.state.selectMode ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Select Mode</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                text
                small
                fab
                class="mr-0 ml-0"
                aria-label="Sort Torrents"
                v-on="on"
                @click="addModal('SortModal')"
              >
                <v-icon color="grey">
                  {{ mdiSort }}
                </v-icon>
              </v-btn>
            </template>
            <span>Sort Torrents</span>
          </v-tooltip>
        </v-row>
      </v-row>

      <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
        <p class="grey--text">
          Nothing to see here!
        </p>
      </div>
      <div v-else>
        <v-list class="pa-0 transparent">
          <v-list-item
            v-for="(torrent, index) in paginatedData"
            :key="torrent.hash"
            class="pa-0"
            :class="isMobile ? 'mb-1' : 'mb-2'"
            @contextmenu.prevent="$refs.menu.open($event, { torrent })"
          >
            <template #default>
              <v-expand-x-transition>
                <v-card v-show="selectMode" flat class="transparent">
                  <v-list-item-action>
                    <v-checkbox
                      color="grey"
                      :input-value="selected_torrents.indexOf(torrent.hash) !== -1"
                      @click="selectTorrent(torrent.hash)"
                    />
                  </v-list-item-action>
                </v-card>
              </v-expand-x-transition>
              <v-list-item-content class="pa-0">
                <Torrent :torrent="torrent" :index="index" />
                <v-divider
                  v-if="index < paginatedData.length - 1"
                  :key="index"
                />
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
        <v-row
          v-if="(pageCount > 1) && !hasSearchFilter"
          xs12
          justify="center"
          class="mb-0"
        >
          <v-col>
            <v-container>
              <v-pagination
                v-model="pageNumber"
                :length="pageCount"
                :total-visible="7"
                @input="toTop"
              />
            </v-container>
          </v-col>
        </v-row>
      </div>
    </div>
    <vue-context ref="menu" v-slot="{ data }">
      <TorrentRightClickMenu v-if="data" :torrent="data.torrent" />
    </vue-context>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import { mdiFilter, mdiCheckboxMarked, mdiCheckboxBlankOutline, mdiSort } from '@mdi/js'

import { VueContext } from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'

import Torrent from '@/components/Torrent/Torrent'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

import { TorrentSelect, General } from '@/mixins'

export default {
  name: 'Dashboard',
  components: { Torrent, VueContext, TorrentRightClickMenu },
  mixins: [TorrentSelect, General],
  data() {
    return {
      input: '',
      searchFilterEnabled: false,
      pageNumber: 1,
      mdiFilter, mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiSort
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

      return fuse.search(this.input).map(el => el.item)
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
    }
  },
  watch: {
    torrents: function (torrents) {
      this.$store.commit('SET_CURRENT_ITEM_COUNT', torrents.length)
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  created() {
    this.$store.dispatch('INIT_INTERVALS')
    this.$store.commit('FETCH_CATEGORIES')
  },
  beforeDestroy() {
    this.$store.commit('REMOVE_INTERVALS')
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  methods: {
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

        return this.$store.state.selectMode = false
      }
      this.$store.state.selectMode = true
    },
    addModal(name) {
      this.createModal(name)
    },
    handleKeyboardShortcut(e) {
      // 'ctrl + A' => select torrents
      if (e.keyCode === 65 && e.ctrlKey) {
        e.preventDefault()
        if (
          this.$store.state.selected_torrents.length === this.torrents.length
        ) {
          return (this.$store.state.selected_torrents = [])
        }
        const hashes = this.torrents.map(t => t.hash)

        return (this.$store.state.selected_torrents = hashes)
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
#searchFilter .v-text-field__details {
  display: none;
}
</style>

<style scoped lang="scss">
.v-context {
  &,
  & ul {
    border-radius: 0.3rem;
    padding: 0;
  }
}
</style>
