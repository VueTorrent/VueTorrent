<template>
  <v-data-table
    :headers="headers"
    :items="torrents"
    :items-per-page="30"
    calculate-widths
    hide-default-footer
    class="elevation-5 mb-5 torrent-table"
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
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { TorrentDashboardItem } from '@/mixins'

export default {
  name: 'TorrentTable',
  components: {},
  mixins: [TorrentDashboardItem],
  props: {
    headers: Array,
    torrents: Array
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['sort_options']),
    ...mapGetters(['getWebuiSettings'])
  },
  watch: {},
  mounted() {

  },
  methods: {
    stateString(torrent) {
      if (torrent.forced) {
        return `[F] ${torrent.state}`
      }

      return torrent.state
    }
  }
}
</script>
<style>

</style>
