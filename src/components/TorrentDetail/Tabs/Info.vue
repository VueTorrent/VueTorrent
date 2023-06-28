<template>
  <v-flex>
    <v-row>
      <v-col cols="6">
        <v-card flat>
          <v-card-title>{{ torrent.name }}</v-card-title>
          <v-card-subtitle><v-btn text @click="copyHash">{{ torrent.hash }}</v-btn></v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-progress-circular v-if="torrent?.state === TorrentState.METADATA" indeterminate :size="100" color="torrent-metadata">Fetching...</v-progress-circular>
                <v-progress-circular v-else :rotate="-90" :size="100" :width="15" :value="torrent?.progress ?? 0" color="accent">{{ torrent.progress ?? 0 }} %</v-progress-circular>
              </v-col>
              <v-col cols="9" class="d-flex align-center justify-center">
                <canvas id="pieceStates" width="0" height="1" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card flat>
          <v-card-text>
            <v-list-item>
              {{ $t('modals.detail.pageInfo.status') }}:
              <v-chip small :class="`${torrentStateClass} white--text caption ml-2`">{{ torrent.state }}</v-chip>
            </v-list-item>
            <v-list-item>
              {{ $t('torrent.properties.category') }}:
              <v-chip small class="upload white--text caption ml-2">{{ torrent.category.length ? torrent.category : '(no cat)' }}</v-chip>
            </v-list-item>
            <v-list-item>
              {{ $t('torrent.properties.tracker') }}:
              <v-chip small class="moving white--text caption ml-2">{{ this.torrent?.tracker ? getDomainBody(this.torrent?.tracker) : '(no tracker)' }}</v-chip>
            </v-list-item>
            <v-list-item>
              {{ $t('torrent.properties.tags') }}:
              <v-chip v-if="torrent?.tags" v-for="tag in torrent.tags" :key="tag" small class="tags white--text caption ml-2">{{ tag }}</v-chip>
              <v-chip v-if="!torrent?.tags || torrent.tags.length === 0" small class="tags white--text caption ml-2">(no tags)</v-chip>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { FullScreenModal } from "@/mixins";
import qbit from "@/services/qbit";
import { getDomainBody, splitByUrl, stringContainsUrl } from "@/helpers";
import { defineComponent } from "vue";
import { Torrent } from "@/models";
import { mapState } from "vuex";
import { mdiClose, mdiContentSave, mdiPencil } from "@mdi/js";
import { TorrentState } from "@/enums/vuetorrent";

export default defineComponent({
  name: 'Info',
  mixins: [FullScreenModal],
  props: {
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
      uploadSpeedAvg: 0,
      mdiClose,
      mdiPencil,
      mdiContentSave
    }
  },
  async mounted() {
    console.log(this.torrent?.tags && this.torrent.tags.length > 0)
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
  watch: {
    torrent() {
      this.renderTorrentPieceStates()
    }
  },
  methods: {
    getDomainBody,
    async getTorrentProperties() {
      const props = await qbit.getTorrentProperties(this.torrent?.hash as string)
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
      const canvas: HTMLCanvasElement | null = document.querySelector('canvas#pieceStates')
      if (canvas === null) return

      const files = await qbit.getTorrentFiles(this.torrent?.hash as string)
      const pieces = await qbit.getTorrentPieceStates(this.torrent?.hash as string)
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
    },
    async copyHash() {
      try {
        await navigator.clipboard.writeText(this.torrent?.hash as string);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
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

canvas#pieceStates {
  height: 50%;
  width: 100%;
  border: 1px dotted;
}
</style>
