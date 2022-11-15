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
            {{ $t('modals.detail.pageInfo.pieceStates') }}
          </td>
          <td id="pieceStates" class="d-flex">
            <span class="mr-2 align-center d-flex"> {{ torrent.progress }}% </span>
            <canvas width="0" height="1" />
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
            {{ $t('torrent.timeActive') | titleCase }}
          </td>
          <td>
            {{ torrent.time_active }}
            <span v-if="torrent.seeding_time">{{ `(${$t('torrent.seededFor')} ${torrent.seeding_time})` }}</span>
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
            {{ torrent.num_leechs }}<span :class="commonStyle">/{{ torrent.available_peers }}</span>
          </td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.seeds') }}
          </td>
          <td>
            {{ torrent.num_seeds }}<span :class="commonStyle">/{{ torrent.available_seeds }}</span>
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
            <v-chip small :class="`${torrent.state.toLowerCase()} white--text caption`">
              {{ torrent.state }}
            </v-chip>
          </td>
        </tr>
        <tr v-if="torrent.tracker">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.trackers') }}
          </td>
          <td>
            <span v-for="trackersPart in splitString(torrent.tracker)" :key="trackersPart">
              <a v-if="stringContainsUrl(trackersPart)" _target="blank" :href="trackersPart">{{ trackersPart }}</a>
              <span v-else>{{ trackersPart }}</span>
            </span>
          </td>
        </tr>
        <tr v-if="createdBy">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.createdBy') }}
          </td>
          <td>
            <span v-for="createdByPart in splitString(createdBy)" :key="createdByPart">
              <a v-if="stringContainsUrl(createdByPart)" _target="blank" :href="createdByPart">{{ createdByPart }}</a>
              <span v-else>{{ createdByPart }}</span>
            </span>
          </td>
        </tr>
        <tr v-if="comment">
          <td :class="commonStyle">
            {{ $t('torrent.comments') | titleCase }}
          </td>
          <td>
            <span v-for="commentPart in splitString(comment)" :key="commentPart">
              <a v-if="stringContainsUrl(commentPart)" _target="blank" :href="commentPart">{{ commentPart }}</a>
              <span v-else>{{ commentPart }}</span>
            </span>
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
          <td v-if="torrent.dl_limit > 0">{{ torrent.dl_limit | getDataValue }} {{ torrent.dl_limit | getDataUnit }}<span>/s </span></td>
          <td v-else>∞</td>
        </tr>
        <tr>
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.uploadLimit') }}
          </td>
          <td v-if="torrent.up_limit > 0">{{ torrent.up_limit | getDataValue }} {{ torrent.up_limit | getDataUnit }}<span>/s </span></td>
          <td v-else>∞</td>
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
import { FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
import { splitByUrl, stringContainsUrl } from '@/helpers'

export default {
  name: 'Info',
  mixins: [FullScreenModal],
  props: {
    hash: String,
    torrent: Object
  },
  data() {
    return {
      commonStyle: 'caption',
      createdBy: null,
      comment: null
    }
  },
  mounted() {
    this.getTorrentProperties()
    this.renderTorrentPieceStates()
  },
  methods: {
    async getTorrentProperties() {
      const props = await qbit.getTorrentProperties(this.hash)
      this.createdBy = props.created_by || null
      this.comment = props.comment || null
    },
    async renderTorrentPieceStates() {
      const canvas = document.querySelector('#pieceStates canvas')
      const { data } = await qbit.getTorrentPieceStates(this.hash)

      // Source: https://github.com/qbittorrent/qBittorrent/blob/6229b817300344759139d2fedbd59651065a561d/src/webui/www/private/scripts/prop-general.js#L230
      if (data) {
        canvas.width = data.length
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Group contiguous colors together and draw as a single rectangle
        let color = ''
        let rectWidth = 1

        for (let i = 0; i < data.length; ++i) {
          const status = data[i]
          let newColor = ''

          if (status === 1)
            // requested / downloading
            newColor = this.$vuetify.theme.currentTheme['torrent-downloading']
          else if (status === 2)
            // already downloaded
            newColor = this.$vuetify.theme.currentTheme['torrent-done']

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
          ctx.fillRect(data.length - rectWidth, 0, rectWidth, canvas.height)
        }
      }
    },
    stringContainsUrl(string) {
      return stringContainsUrl(string)
    },
    splitString(string) {
      return splitByUrl(string)
    }
  }
}
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
    width: 50%;
    border: 1px dotted;
  }
}
</style>
