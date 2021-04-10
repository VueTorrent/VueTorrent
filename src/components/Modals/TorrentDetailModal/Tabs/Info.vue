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
                {{ $t('torrent.detail.info.title') }}
              </td>
              <td>
                {{ torrent.name }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.directory') }}
              </td>
              <td>
                {{ torrent.savePath }}
              </td>
            </tr>
            <tr style="margin-top: 10px !important">
              <td class="grey--text">
                {{ $t('torrent.detail.info.hash') }}
              </td>
              <td>
                {{ torrent.hash }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.size') }}
              </td>
              <td>
                {{ torrent.size | getDataValue }}
                {{ torrent.size | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.downloaded') }}
              </td>
              <td>
                {{ torrent.dloaded | getDataValue }}
                {{ torrent.dloaded | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.uploaded') }}
              </td>
              <td>
                {{ torrent.uploaded | getDataValue }}
                {{ torrent.uploaded | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.ratio') }}
              </td>
              <td>
                {{ torrent.ratio }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.downloadSpeed') }}
              </td>
              <td>
                {{ torrent.dlspeed | getDataValue }}
                {{ torrent.dlspeed | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.uploadSpeed') }}
              </td>
              <td>
                {{ torrent.upspeed | getDataValue }}
                {{ torrent.upspeed | getDataUnit(1) }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.ETA') }}
              </td>
              <td>
                {{ torrent.eta }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.peers') }}
              </td>
              <td>
                {{ torrent.num_leechs
                }}<span class="grey--text">/{{ torrent.available_peers }}</span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.seeds') }}
              </td>
              <td>
                {{ torrent.num_seeds
                }}<span class="grey--text">/{{ torrent.available_seeds }}</span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.addedOn') }}
              </td>
              <td>
                {{ torrent.added_on }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                {{ $t('torrent.detail.info.status') }}
              </td>
              <td>
                <v-chip
                  small
                  :class="`${torrent.state.toLowerCase()} white--text caption`"
                >
                  {{ $t(`download.status.${torrent.state.toLowerCase()}`) }}
                </v-chip>
              </td>
            </tr>
            <tr v-if="torrent.tracker">
              <td class="grey--text">
                {{ $t('torrent.detail.info.tracker') }}
              </td>
              <td>
                {{ torrent.tracker }}
              </td>
            </tr>
            <tr v-if="torrent.comment">
              <td class="grey--text">
                {{ $t('torrent.detail.info.comment') }}
              </td>
              <td>
                {{ torrent.comment }}
              </td>
            </tr>

            <tr>
              <td class="grey--text">
                First/Last Piece Priority
              </td>
              <td>
                {{ torrent.f_l_piece_prio }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Sequential Download
              </td>
              <td>
                {{ torrent.seq_dl }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Auto TMM
              </td>
              <td>
                {{ torrent.auto_tmm }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Share Limit
              </td>
              <td>
                {{ torrent.ratio_limit }}
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Download Limit
              </td>
              <td>
                {{ torrent.dl_limit | getDataValue }} {{ torrent.dl_limit | getDataUnit }}<span v-if="torrent.dl_limit !== -1"> /s </span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Upload Limit
              </td>
              <td>
                {{ torrent.up_limit | getDataValue }} {{ torrent.up_limit | getDataUnit }}<span v-if="torrent.up_limit !== -1"> /s </span>
              </td>
            </tr>
            <tr>
              <td class="grey--text">
                Availability
              </td>
              <td>
                {{ torrent.availability }}
              </td>
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
