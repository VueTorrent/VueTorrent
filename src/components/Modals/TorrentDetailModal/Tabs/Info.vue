<template>
  <v-card flat>
    <perfect-scrollbar>
      <v-card-text
        style="font-size: 1.1em"
        :style="{ minHeight: phoneLayout ? '' : '75vh', maxHeight: '75vh'}"
      >
        <v-simple-table>
          <tbody>
            <tr>
              <td class="grey--text">
                Torrent title
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.name }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Directory
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.savePath }}
              </td>
            </tr>
            <tr style="margin-top: 10px !important">
              <td class="grey--text">
                hash
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.hash }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Size
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.size | getDataValue }}
                {{ torrent.size | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Downloaded:
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.dloaded | getDataValue }}
                {{ torrent.dloaded | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Uploaded:
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.uploaded | getDataValue }}
                {{ torrent.uploaded | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Ratio
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.ratio }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Download Speed
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.dlspeed | getDataValue }}
                {{ torrent.dlspeed | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Upload Speed
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.upspeed | getDataValue }}
                {{ torrent.upspeed | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                ETA
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.eta }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Peers
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.num_leechs
                }}<span class="grey--text">/{{ torrent.available_peers }}</span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Seeds
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.num_seeds
                }}<span class="grey--text">/{{ torrent.available_seeds }}</span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Added on
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.added_on }}
              </td>
            </tr>
            <tr v-if="torrent.tracker">
              <td class="grey--text">
                Tracker
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.tracker }}
              </td>
            </tr>
            <tr v-if="torrent.comment">
              <td class="grey--text">
                Comment
              </td>
              <td class="torrentmodaltext--text">
                {{ torrent.comment }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Status
              </td>
              <v-chip
                small
                :class="`${torrent.state.toLowerCase()} white--text my-2 caption`"
              >
                {{ torrent.state }}
              </v-chip>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </perfect-scrollbar>
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
