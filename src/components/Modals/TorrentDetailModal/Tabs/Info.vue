<template>
  <v-card flat>
    <v-simple-table>
      <tbody>
        <tr>
          <td :class="commonStyle">
            Torrent title
          </td>
          <td>
            {{ torrent.name }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Directory
          </td>
          <td>
            {{ torrent.savePath }}
          </td>
        </tr>
        <tr style="margin-top: 10px !important">
          <td :class="commonStyle">
            hash
          </td>
          <td>
            {{ torrent.hash }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Size
          </td>
          <td>
            {{ torrent.size | getDataValue }}
            {{ torrent.size | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Downloaded
          </td>
          <td>
            {{ torrent.dloaded | getDataValue }}
            {{ torrent.dloaded | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Uploaded
          </td>
          <td>
            {{ torrent.uploaded | getDataValue }}
            {{ torrent.uploaded | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Ratio
          </td>
          <td>
            {{ torrent.ratio }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            DL Speed
          </td>
          <td>
            {{ torrent.dlspeed | getDataValue }}
            {{ torrent.dlspeed | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            UP Speed
          </td>
          <td>
            {{ torrent.upspeed | getDataValue }}
            {{ torrent.upspeed | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            ETA
          </td>
          <td>
            {{ torrent.eta }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Peers
          </td>
          <td>
            {{ torrent.num_leechs
            }}<span :class="commonStyle">/{{ torrent.available_peers }}</span>
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Seeds
          </td>
          <td>
            {{ torrent.num_seeds
            }}<span cla:class="commonStyle">/{{ torrent.available_seeds }}</span>
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Added on
          </td>
          <td>
            {{ torrent.added_on }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Status
          </td>
          <td>
            <v-chip
              small
              :class="`${torrent.state.toLowerCase()} white--text caption`"
            >
              {{ torrent.state }}
            </v-chip>
          </td>
        </tr>
        <tr v-if="torrent.tracker">
          <td :class="commonStyle">
            Trackers
          </td>
          <td>
            {{ torrent.tracker }}
          </td>
        </tr>
        <tr v-if="torrent.comment">
          <td :class="commonStyle">
            Comments
          </td>
          <td>
            {{ torrent.comment }}
          </td>
        </tr>

        <tr>
          <td :class="commonStyle">
            First/Last Piece Priority
          </td>
          <td>
            {{ torrent.f_l_piece_prio }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Sequential Download
          </td>
          <td>
            {{ torrent.seq_dl }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Auto TMM
          </td>
          <td>
            {{ torrent.auto_tmm }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Share Limit
          </td>
          <td>
            {{ torrent.ratio_limit }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Download Limit
          </td>
          <td v-if="torrent.dl_limit > 0">
            {{ torrent.dl_limit | getDataValue }} {{ torrent.dl_limit | getDataUnit }}<span>/s </span>
          </td>
          <td v-else>
            ∞
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Upload Limit
          </td>
          <td v-if="torrent.up_limit > 0">
            {{ torrent.up_limit | getDataValue }} {{ torrent.up_limit | getDataUnit }}<span>/s </span>
          </td>
          <td v-else>
            ∞
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            Availability
          </td>
          <td>
            {{ torrent.availability }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { FullScreenModal } from '@/mixins'
export default {
  name: 'Info',
  mixins: [FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      commonStyle: 'caption'
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    torrent() {
      return this.getTorrent(this.hash)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table thead th,
::v-deep .v-data-table tbody td {
  padding: 0 !important;
  height: 3em;

  white-space: nowrap;

  &:first-child {
    padding: 0 0 0 8px !important;
  }
  &:last-child {
    padding-right: 8px !important;
  }
}
</style>
