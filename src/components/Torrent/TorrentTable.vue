<template>
  <div>
    <v-data-table
      v-model="selectedTorrents"
      :headers="headers"
      :items="torrents"
      :items-per-page="30"
      item-key="hash"
      hide-default-footer
      :show-select="selectMode"
      unselectable
      class="elevation-5 mb-5 torrent-table"
      @current-items="current = $event"
      @item-selected="bulkSelect"
      @dblclick:row="showTorrentInfo"
      @contextmenu:row="showContextMenu"
    >
      <template
        #[`item.name`]="{ item }"
      >
        <span class="torrent-name">{{ item.name | formatTextSize }}</span>
      </template>
      <template
        #[`item.size`]="{ item }"
      >
        {{ item.size | getDataValue }}
        <span class="caption grey--text">
          {{
            item.size | getDataUnit
          }}
        </span>
      </template>
      <template
        #[`item.progress`]="{ item }"
      >
        <v-progress-linear
          :value="item.progress"
          height="20"
          :style="phoneLayout ? '' : 'width: 80%;'"
          :color="`torrent-${ item.state.toLowerCase() }-color`"
          rounded
        >
          <span
            class="caption black--text"
          >
            {{ item.progress }}%
          </span>
        </v-progress-linear>
      </template>
      <template
        #[`item.dloaded`]="{ item }"
      >
        {{ item.dloaded | getDataValue(2) }}
        <span class="caption grey--text">
          {{
            item.dloaded | getDataUnit(1)
          }}
        </span>
      </template>
      <template
        #[`item.dlspeed`]="{ item }"
      >
        {{ item.dlspeed | getDataValue(1) }}
        <span class="caption grey--text">
          {{
            item.dlspeed | getDataUnit(1)
          }}/s
        </span>
      </template>
      <template
        #[`item.upspeed`]="{ item }"
      >
        {{ item.upspeed | getDataValue(1) }}
        <span class="caption grey--text">
          {{
            item.upspeed | getDataUnit(1)
          }}/s
        </span>
      </template>
      <template
        #[`item.available_peers`]="{ item }"
      >
        {{ item.num_leechs }}
        <span
          class="grey--text caption"
        >
          /{{ item.available_peers }}
        </span>
      </template>
      <template
        #[`item.available_seeds`]="{ item }"
      >
        {{ item.num_seeds }}
        <span
          class="grey--text caption"
        >
          /{{ item.available_seeds }}
        </span>
      </template>
      <template
        #[`item.state`]="{ item }"
      >
        <v-chip
          small
          class="caption white--text px-2"
          :class="item.state.toLowerCase()"
        >
          {{ stateString(item) }}
        </v-chip>
      </template>
      <template
        #[`item.category`]="{ item }"
      >
        <v-chip small class="upload white--text caption">
          {{ item.category }}
        </v-chip>
      </template>
    </v-data-table>
    <vue-context ref="contextMenu" v-slot="{ data }">
      <TorrentRightClickMenu v-if="data" :torrent="data.torrent" />
    </vue-context>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { General, TorrentDashboardItem } from '@/mixins'
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu'
import { VueContext } from 'vue-context'

export default {
  name: 'TorrentTable',
  components: { VueContext, TorrentRightClickMenu },
  mixins: [TorrentDashboardItem, General],
  props: {
    headers: Array,
    torrents: Array
  },
  data() {
    return {
      selectedTorrents: [],
      current: []
    }
  },
  computed: {
    ...mapState(['sort_options', 'selectMode']),
    ...mapGetters(['getWebuiSettings'])
  },
  watch: {
    selectedTorrents: function (newTorrents, oldTorrents) {
      const hashes = newTorrents.map(t => t.hash)
      this.$store.state.selected_torrents = hashes
    }
  },
  created() {
    const self = this
    self.keyDownHandler = function ({ key }) {
      if (key == 'Shift') self.shiftKeyOn = true
    }
    self.keyUpHandler = function ({ key }) {
      if (key == 'Shift') self.shiftKeyOn = false
    }
    window.addEventListener('keydown', this.keyDownHandler)
    window.addEventListener('keyup', this.keyUpHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDownHandler)
    window.removeEventListener('keyup', this.keyUpHandler)
  },
  methods: {
    stateString(torrent) {
      if (torrent.forced) {
        return `[F] ${torrent.state}`
      }

      return torrent.state
    },
    showTorrentInfo(event, torrent) {
      const hash = torrent.item.hash
      this.createModal('TorrentDetailModal', { hash })
    },
    showContextMenu(event, torrent) {
      event.preventDefault()
      this.$refs.contextMenu.open(event, { torrent })
    },
    bulkSelect({ item: b, value }) {
      const { selectedTorrents, current, shiftKeyOn } = this
      if (selectedTorrents.length == 1 && value == true && shiftKeyOn) {
        const [a] = selectedTorrents
        let start = current.findIndex(item => item.hash == a.hash)
        let end = current.findIndex(item => item == b)
        if (start - end > 0) {
          const temp = start
          start = end
          end = temp
        }
        for (let i = start; i <= end; i++) {
          selectedTorrents.push(current[i])
        }
      }
    }
  }
}
</script>