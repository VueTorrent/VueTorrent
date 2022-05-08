<template>
  <v-card flat>
    <v-simple-table>
      <tbody>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.torrentTitle') }}
          </td>
          <td>
            {{ torrent.name }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('torrent.directory') | titleCase }}
          </td>
          <td>
            {{ torrent.savePath }}
          </td>
        </tr>
        <tr style="margin-top: 10px !important">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.hash') }}
          </td>
          <td>
            {{ torrent.hash }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('torrent.size') | titleCase }}
          </td>
          <td>
            {{ torrent.size | getDataValue }}
            {{ torrent.size | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('torrent.downloaded') | titleCase }}
          </td>
          <td>
            {{ torrent.dloaded | getDataValue }}
            {{ torrent.dloaded | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('torrent.uploaded') | titleCase }}
          </td>
          <td>
            {{ torrent.uploaded | getDataValue }}
            {{ torrent.uploaded | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.ratio') }}
          </td>
          <td>
            {{ torrent.ratio }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.downloadSpeed') }}
          </td>
          <td>
            {{ torrent.dlspeed | getDataValue }}
            {{ torrent.dlspeed | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.uploadSpeed') }}
          </td>
          <td>
            {{ torrent.upspeed | getDataValue }}
            {{ torrent.upspeed | getDataUnit(1) }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.eta') }}
          </td>
          <td>
            {{ torrent.eta }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.peers') }}
          </td>
          <td>
            {{ torrent.num_leechs
            }}<span :class="commonStyle">/{{ torrent.available_peers }}</span>
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.seeds') }}
          </td>
          <td>
            {{ torrent.num_seeds
            }}<span cla:class="commonStyle">/{{ torrent.available_seeds }}</span>
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('torrent.added') | titleCase }}
          </td>
          <td>
            {{ torrent.added_on }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.status') }}
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
            {{ $t('modals.detail.pageInfo.trackers') }}
          </td>
          <td>
            {{ torrent.tracker }}
          </td>
        </tr>
        <tr v-if="createdBy">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.createdBy') }}
          </td>
          <td>
            {{ createdBy }}
          </td>
        </tr>
        <tr v-if="comment">
          <td :class="commonStyle">
            {{ $t('torrent.comments') | titleCase }}
          </td>
          <td>
            {{ comment }}
          </td>
        </tr>

        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.firstLastPiecePriority') }}
          </td>
          <td>
            {{ torrent.f_l_piece_prio }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.sequentialDownload') }}
          </td>
          <td>
            {{ torrent.seq_dl }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.autoTMM') }}
          </td>
          <td>
            {{ torrent.auto_tmm }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareRatioLimit') }}
          </td>
          <td>
            {{ torrent.ratio_limit | limitToValue }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareTimeLimit') }}
          </td>
          <td>
            {{ torrent.ratio_time_limit | limitToValue }}
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.downloadLimit') }}
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
            {{ $t('modals.detail.pageInfo.uploadLimit') }}
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
            {{ $t('torrent.availability') | titleCase }}
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
import qbit from '@/services/qbit'

export default {
  name: 'Info',
  mixins: [FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      commonStyle: 'caption',
      createdBy: null,
      comment: null
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    torrent() {
      return this.getTorrent(this.hash)
    }
  },
  mounted() {
    this.getTorrentProperties()
  },
  methods: {
    async getTorrentProperties() {
      const props = await qbit.getTorrentProperties(this.hash)
      this.createdBy = props.created_by || null
      this.comment = props.comment || null
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
