<template>
  <v-flex>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="overflow-wrap">{{ torrent.name }}</v-card-title>
          <v-card-subtitle>
            <div v-for="commentPart in splitString(comment)" :key="commentPart">
              <a v-if="stringContainsUrl(commentPart)" target="_blank" :href="commentPart">{{ commentPart }}</a>
              <span v-else>{{ commentPart }}</span>
            </div>
            {{ torrent.hash }}
            <v-btn rounded @click="copyHash">{{ $t('rightClick.copy') }}</v-btn>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="4" md="3">
                <v-progress-circular v-if="torrent?.state === TorrentState.METADATA" indeterminate :size="100" color="torrent-metadata">{{ $t('modals.detail.pageOverview.fetchingMetadata') }}</v-progress-circular>
                <v-progress-circular v-else-if="torrent?.progress === 100" :size="100" :width="15" :value="100" color="torrent-seeding">
                  <v-icon color="torrent-seeding">{{ mdiCheck }}</v-icon>
                </v-progress-circular>
                <v-progress-circular v-else :rotate="-90" :size="100" :width="15" :value="torrent?.progress ?? 0" color="accent">{{ torrent.progress ?? 0 }} %</v-progress-circular>
              </v-col>
              <v-col cols="8" md="9" class="d-flex align-center justify-center flex-column">
                <div v-if="shouldRenderPieceStates">
                  <canvas id="pieceStates" width="0" height="1" />
                </div>
                <div v-if="shouldRenderPieceStates">
                  <span>
                    {{ torrentPieceOwned }} / {{ torrentPieceCount }}
                    ({{ torrentPieceSize | getDataValue }} {{ torrentPieceSize | getDataUnit }})
                  </span>
                </div>
                <div v-if="!shouldRenderPieceStates">
                  <span>No piece in torrent</span>
                </div>
                <div v-if="!shouldRefreshPieceState">
                  <span>Refresh disabled to save perf</span>
                </div>
                <div>
                  <v-icon>{{ mdiArrowDown }}</v-icon>
                  {{ torrent?.dlspeed | networkSpeed }}
                  <v-icon>{{ mdiArrowUp }}</v-icon>
                  {{ torrent?.upspeed | networkSpeed }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('torrent.properties.save_path') }}:<br/>
                {{ torrent.savePath }}
              </v-col>
              <v-col cols="6">
                {{ $t('modals.detail.pageOverview.fileCount') }}:<br/>
                {{ selectedFileCount }} / {{ torrentFileCount }}
                <span v-if="selectedFileCount === 1">({{ torrentFileName }})</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                {{ $t('torrent.properties.status') }}:
                <div>
                  <v-chip small :class="torrentStateClass" class="white--text caption">{{ torrent.state }}</v-chip>
                </div>
              </v-col>
              <v-col cols="6">
                {{ $t('torrent.properties.category') }}:
                <div>
                  <v-chip small class="upload white--text caption">
                    {{ torrent.category.length ? torrent.category : $t('navbar.filters.uncategorized') }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('torrent.properties.tracker') }}:
                <div>
                  <v-chip small class="moving white--text caption">
                    {{ this.torrent?.tracker ? getDomainBody(this.torrent?.tracker) : $t('navbar.filters.untracked') }}
                  </v-chip>
                </div>
              </v-col>
              <v-col cols="6">
                {{ $t('torrent.properties.tags') }}:
                <div class="d-flex flex-wrap chipgap">
                  <v-chip v-if="torrent?.tags" v-for="tag in torrent.tags" :key="tag" small class="tags white--text caption">
                    {{ tag }}
                  </v-chip>
                  <v-chip v-if="!torrent?.tags || torrent.tags.length === 0" small class="tags white--text caption">
                    {{ $t('navbar.filters.untagged') }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('modals.detail.pageOverview.selectedFileSize') }}:<br/>
                {{ torrent?.size | getDataValue }} {{ torrent?.size | getDataUnit }} /
                {{ torrent?.total_size | getDataValue }} {{ torrent?.total_size | getDataUnit }}
              </v-col>
              <v-col cols="6">
                {{ $t('ratio') }}:<br/>
                {{ torrent?.ratio }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('downloaded') }}:<br/>
                {{ torrent?.downloaded | getDataValue }} {{ torrent?.downloaded | getDataUnit }}
              </v-col>
              <v-col cols="6">
                {{ $t('uploaded') }}:<br/>
                {{ torrent?.uploaded | getDataValue }} {{ torrent?.uploaded | getDataUnit }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('modals.detail.pageOverview.dlSpeedAverage') }}:<br/>
                {{ downloadSpeedAvg | networkSpeed }}
              </v-col>
              <v-col cols="6">
                {{ $t('modals.detail.pageOverview.upSpeedAverage') }}:<br/>
                {{ uploadSpeedAvg | networkSpeed }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script lang="ts">
import dayjs from "dayjs";
import {FullScreenModal} from "@/mixins";
import qbit from "@/services/qbit";
import {getDomainBody, splitByUrl, stringContainsUrl} from "@/helpers";
import {defineComponent} from "vue";
import {Torrent} from "@/models";
import {mapState} from "vuex";
import {mdiArrowDown, mdiArrowUp, mdiCheck, mdiClose, mdiContentSave, mdiPencil} from "@mdi/js";
import {TorrentState} from "@/enums/vuetorrent";
import {Priority} from "@/enums/qbit";

export default defineComponent({
  name: 'Overflow',
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
      selectedFileCount: 0,
      torrentFileCount: 0,
      torrentFileName: '',
      torrentPieceSize: 0,
      torrentPieceOwned: 0,
      torrentPieceCount: 0,
      uploadSpeedAvg: 0,
      mdiClose,
      mdiPencil,
      mdiContentSave,
      mdiArrowUp,
      mdiArrowDown,
      mdiCheck,
      TorrentState
    }
  },
  async mounted() {
    await this.getTorrentProperties()
    await this.renderTorrentPieceStates()

    const files = await qbit.getTorrentFiles(this.torrent?.hash as string)
    const selectedFiles = files.filter(f => f.priority != Priority.DO_NOT_DOWNLOAD)

    this.selectedFileCount = selectedFiles.length
    this.torrentFileCount = files.length
    if (this.selectedFileCount === 1) {
      this.torrentFileName = selectedFiles[0].name
    }
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
    },
    shouldRenderPieceStates() {
      return this.torrentPieceCount > 0
    },
    shouldRefreshPieceState() {
      //TODO: set limit in settings
      return this.shouldRenderPieceStates && this.torrentPieceCount < 5000
    }
  },
  watch: {
    async torrent() {
      await this.getTorrentProperties()
      if (this.shouldRefreshPieceState) {
        await this.renderTorrentPieceStates()
      }
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
      this.uploadSpeedAvg = props.up_speed_avg
    },
    async renderTorrentPieceStates() {
      const canvas: HTMLCanvasElement | null = document.querySelector('canvas#pieceStates')
      if (canvas === null) return

      const files = await qbit.getTorrentFiles(this.torrent?.hash as string)
      const pieces = await qbit.getTorrentPieceStates(this.torrent?.hash as string)

      // Source: https://github.com/qbittorrent/qBittorrent/blob/6229b817300344759139d2fedbd59651065a561d/src/webui/www/private/scripts/prop-general.js#L230
      canvas.width = pieces.length || -1
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
        this.$toast.success(this.$t('toast.copySuccess').toString())
      } catch (err) {
        this.$toast.error(this.$t('toast.copyNotSupported').toString())
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
  height: 100%;
  width: 100%;
  border: 1px dotted;
}

.v-card__title {
  word-break: normal;
}

.chipgap {
  gap: 4px;
}

.overflow-wrap {
  overflow-wrap: anywhere;
}
</style>
