<template>
  <v-card flat>
    <v-simple-table>
      <tbody>
        <tr id="torrentName">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.torrentTitle') }}
          </td>
          <td>
            {{ torrent.name }}
          </td>
        </tr>
        <tr id="torrentComment" v-if="comment">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.comments') | titleCase }}
          </td>
          <td>
            <span v-for="commentPart in splitString(comment)" :key="commentPart">
              <a v-if="stringContainsUrl(commentPart)" target="_blank" :href="commentPart">{{ commentPart }}</a>
              <span v-else>{{ commentPart }}</span>
            </span>
          </td>
        </tr>
        <tr id="torrentPieceState">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.pieceStates') }}
          </td>
          <td id="pieceStates" class="d-flex">
            <span class="mr-2 align-center d-flex"> {{ torrent.progress }}% </span>
            <canvas width="0" height="1" />
          </td>
        </tr>
        <tr id="torrentSavePath">
          <td :class="commonStyle">
            {{ $t('torrent.properties.save_path') | titleCase }}
          </td>
          <td>
            {{ torrent.savePath }}
          </td>
        </tr>
        <tr id="torrentHash">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.hash') }}
          </td>
          <td>
            {{ torrent.hash }}
          </td>
        </tr>
        <tr id="torrentSize">
          <td :class="commonStyle">
            {{ $t('torrent.properties.size') | titleCase }}
          </td>
          <td>
            {{ torrent.size | getDataValue }}
            {{ torrent.size | getDataUnit }}
          </td>
        </tr>
        <tr id="torrentTotalSize">
          <td :class="commonStyle">
            {{ $t('torrent.properties.total_size') | titleCase }}
          </td>
          <td>
            {{ torrent.total_size | getDataValue }}
            {{ torrent.total_size | getDataUnit }}
          </td>
        </tr>
        <tr id="torrentTimeActive">
          <td :class="commonStyle">
            {{ $t('torrent.properties.time_active') | titleCase }}
          </td>
          <td>
            {{ torrent.time_active }}
            <span>{{ seedingTime }}</span>
          </td>
        </tr>
        <tr id="torrentDownloaded">
          <td :class="commonStyle">
            {{ $t('torrent.downloaded') | titleCase }}
          </td>
          <td>
            {{ torrent.downloaded | getDataValue }}
            {{ torrent.downloaded | getDataUnit }}
          </td>
        </tr>
        <tr id="torrentUploaded">
          <td :class="commonStyle">
            {{ $t('torrent.uploaded') | titleCase }}
          </td>
          <td>
            {{ torrent.uploaded | getDataValue }}
            {{ torrent.uploaded | getDataUnit }}
          </td>
        </tr>
        <tr id="torrentRatio">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.ratio') }}
          </td>
          <td>
            {{ torrent.ratio }}
          </td>
        </tr>
        <tr id="torrentDlSpeed">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.downloadSpeed') }}
          </td>
          <td>
            {{ torrent.dlspeed | getDataValue }}
            {{ torrent.dlspeed | getDataUnit }}/s
          </td>
        </tr>
        <tr id="torrentDlSpeedAvg">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.dl_speed_average') | titleCase }}
          </td>
          <td>
            {{ downloadSpeedAvg | getDataValue }}
            {{ downloadSpeedAvg | getDataUnit }}/s
          </td>
        </tr>
        <tr id="torrentUpSpeed">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.uploadSpeed') }}
          </td>
          <td>
            {{ torrent.upspeed | getDataValue }}
            {{ torrent.upspeed | getDataUnit }}/s
          </td>
        </tr>
        <tr id="torrentUpSpeedAvg">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.up_speed_average') | titleCase }}
          </td>
          <td>
            {{ uploadSpeedAvg | getDataValue }}
            {{ uploadSpeedAvg | getDataUnit }}/s
          </td>
        </tr>
        <tr id="torrentEta">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.eta') }}
          </td>
          <td>
            {{ torrent.eta }}
          </td>
        </tr>
        <tr id="torrentPeers">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.peers') }}
          </td>
          <td>
            {{ torrent.num_leechs }}<span :class="commonStyle">/{{ torrent.available_peers }}</span>
          </td>
        </tr>
        <tr id="torrentSeeds">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.seeds') }}
          </td>
          <td>
            {{ torrent.num_seeds }}<span :class="commonStyle">/{{ torrent.available_seeds }}</span>
          </td>
        </tr>
        <tr id="torrentAddedOn">
          <td :class="commonStyle">
            {{ $t('torrent.properties.added_on') | titleCase }}
          </td>
          <td>
            {{ torrent.added_on }}
          </td>
        </tr>
        <tr id="torrentCreationDate">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.creation_date') | titleCase }}
          </td>
          <td>
            {{ creationDate }}
          </td>
        </tr>
        <tr id="torrentState">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.status') }}
          </td>
          <td>
            <v-chip small :class="`${torrentStateClass} white--text caption`">
              {{ torrent.state }}
            </v-chip>
          </td>
        </tr>
        <tr id="torrentTrackers" v-if="torrent?.tracker">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.trackers') }}
          </td>
          <td>
            <span v-for="trackersPart in splitString(torrent.tracker)" :key="trackersPart">
              <a v-if="stringContainsUrl(trackersPart)" target="_blank" :href="trackersPart">{{ trackersPart }}</a>
              <span v-else>{{ trackersPart }}</span>
            </span>
          </td>
        </tr>
        <tr id="torrentCreatedBy" v-if="createdBy">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.createdBy') }}
          </td>
          <td>
            <span v-for="createdByPart in splitString(createdBy)" :key="createdByPart">
              <a v-if="stringContainsUrl(createdByPart)" target="_blank" :href="createdByPart">{{ createdByPart }}</a>
              <span v-else>{{ createdByPart }}</span>
            </span>
          </td>
        </tr>

        <tr id="torrentFLPiecePrio">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.firstLastPiecePriority') }}
          </td>
          <td>
            {{ torrent.f_l_piece_prio }}
          </td>
        </tr>
        <tr id="torrentSeqDl">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.sequentialDownload') }}
          </td>
          <td>
            {{ torrent.seq_dl }}
          </td>
        </tr>
        <tr id="torrentAutoTMM">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.autoTMM') }}
          </td>
          <td>
            {{ torrent.auto_tmm }}
          </td>
        </tr>
        <tr id="torrentRatioLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareRatioLimit') }}
          </td>
          <td>
            {{ torrent.ratio_limit | limitToValue }}
          </td>
        </tr>
        <tr id="torrentRatioTimeLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareTimeLimit') }}
          </td>
          <td>
            {{ torrent.ratio_time_limit | limitToValue }}
          </td>
        </tr>
        <tr id="torrentDlLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.downloadLimit') }}
          </td>
          <td v-if="torrent?.dl_limit > 0">
            {{ torrent.dl_limit | getDataValue }}
            {{ torrent.dl_limit | getDataUnit }}<span>/s </span>
          </td>
          <td v-else>∞</td>
        </tr>
        <tr id="torrentUpLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.uploadLimit') }}
          </td>
          <td v-if="torrent?.up_limit > 0">
            {{ torrent.up_limit | getDataValue }}
            {{ torrent.up_limit | getDataUnit }}<span>/s </span>
          </td>
          <td v-else>∞</td>
        </tr>
        <tr id="torrentAvailability">
          <td :class="commonStyle">
            {{ $t('torrent.properties.availability') | titleCase }}
          </td>
          <td>
            {{ torrent.availability }}
          </td>
        </tr>
        <tr id="torrentPrivate">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.is_private') | titleCase }}
          </td>
          <td>
            {{ isPrivateTorrent }}
          </td>
        </tr>
        <tr id="torrentPieceCount">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.piece_owned') | titleCase }}
          </td>
          <td>{{ torrentPieceOwned }} / {{ torrentPieceCount }}</td>
        </tr>
        <tr id="torrentPieceSize">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.piece_size') | titleCase }}
          </td>
          <td>
            {{ torrentPieceSize | getDataValue }}
            {{ torrentPieceSize | getDataUnit }}
          </td>
        </tr>
        <tr id="torrentWastedSize">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.wasted_size') | titleCase }}
          </td>
          <td>
            {{ wastedSize | getDataValue }}
            {{ wastedSize | getDataUnit }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
import { splitByUrl, stringContainsUrl } from '@/helpers'
import { defineComponent } from 'vue'
import { Torrent } from '@/models'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Info',
  mixins: [FullScreenModal],
  props: {
    hash: String,
    torrent: Torrent,
    isActive: Boolean
  },
  data() {
    return {
      commonStyle: 'caption',
      comment: '',
      createdBy: '',
      creationDate: '',
      downloadSpeedAvg: 0,
      isPrivateTorrent: false,
      torrentPieceSize: 0,
      torrentPieceOwned: 0,
      torrentPieceCount: 0,
      wastedSize: 0,
      uploadSpeedAvg: 0
    }
  },
  async mounted() {
    await this.getTorrentProperties()
    await this.renderTorrentPieceStates()
  },
  computed: {
    ...mapState(['webuiSettings']),
    seedingTime() {
      if (!this.torrent?.seeding_time) return ''

      const content = this.$t('modals.detail.pageInfo.seededFor').toString().replace('$0', this.torrent.seeding_time)
      return `(${content})`
    },
    torrentStateClass() {
      return this.torrent?.state ? this.torrent.state.toLowerCase() : ''
    }
  },
  methods: {
    async getTorrentProperties() {
      const props = await qbit.getTorrentProperties(this.hash as string)
      this.comment = props.comment
      this.createdBy = props.created_by
      // @ts-expect-error: TS2339: Property 'dateFormat' does not exist on type 'never'.
      this.creationDate = dayjs(props.creation_date * 1000).format(this.webuiSettings.dateFormat)
      this.downloadSpeedAvg = props.dl_speed_avg
      this.isPrivateTorrent = props.is_private
      this.torrentPieceSize = props.piece_size
      this.torrentPieceOwned = props.pieces_have
      this.torrentPieceCount = props.pieces_num
      this.wastedSize = props.total_wasted
      this.uploadSpeedAvg = props.up_speed_avg
    },
    async renderTorrentPieceStates() {
      const canvas: HTMLCanvasElement | null = document.querySelector('#pieceStates canvas')
      if (canvas === null) return

      const files = await qbit.getTorrentFiles(this.hash as string)
      const pieces = await qbit.getTorrentPieceStates(this.hash as string)
      if (!pieces) return

      // Source: https://github.com/qbittorrent/qBittorrent/blob/6229b817300344759139d2fedbd59651065a561d/src/webui/www/private/scripts/prop-general.js#L230
      canvas.width = pieces.length
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Group contiguous colors together and draw as a single rectangle
      let color = ''
      let rectWidth = 1

      for (let i = 0; i < pieces.length; ++i) {
        const status = pieces[i]
        let newColor = ''

        if (status === 1)
          // requested / downloading
          newColor = this.$vuetify.theme.currentTheme['torrent-downloading'] as string
        else if (status === 2)
          // already downloaded
          newColor = this.$vuetify.theme.currentTheme['torrent-done'] as string
        else {
          // pending download
          const selected_piece_ranges = files.filter(file => file.priority !== 0).map(file => file.piece_range)
          for (const [min_piece_range, max_piece_range] of selected_piece_ranges) {
            if (i > min_piece_range && i < max_piece_range) {
              newColor = this.$vuetify.theme.currentTheme['torrent-paused'] as string
              break
            }
          }
        }

        if (newColor === color) {
          ++rectWidth
          continue
        }

        if (color !== '') {
          ctx.fillStyle = color
          ctx.fillRect(i - rectWidth, 0, rectWidth, canvas.height)
        }

        rectWidth = 1
        color = newColor
      }

      // Fill a rect at the end of the canvas if one is needed
      if (color !== '') {
        ctx.fillStyle = color
        ctx.fillRect(pieces.length - rectWidth, 0, rectWidth, canvas.height)
      }
    },
    stringContainsUrl(string: string) {
      return stringContainsUrl(string)
    },
    splitString(string: string) {
      return splitByUrl(string)
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.v-data-table thead th),
:deep(.v-data-table tbody td) {
  padding: 0 !important;
  height: 3em;

  &:first-child {
    padding: 0 0 0 8px !important;
  }

  &:last-child {
    padding-right: 8px !important;
  }
}

:deep(.v-data-table tbody td.caption) {
  width: 20%;
}

#pieceStates {
  display: block;

  canvas {
    height: 100%;
    width: 75%;
    border: 1px dotted;
  }
}
</style>
