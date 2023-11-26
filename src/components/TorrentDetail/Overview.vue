<script setup lang="ts">
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import MoveTorrentFileDialog from '@/components/Dialogs/MoveTorrentFileDialog.vue'
import { FilePriority, PieceState, TorrentState } from '@/constants/qbit'
import {
  formatData,
  formatDataUnit,
  formatDataValue,
  formatPercent,
  formatSpeed,
  getDomainBody,
  splitByUrl,
  stringContainsUrl
} from '@/helpers'
import { useDialogStore, useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { TorrentFile } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { useIntervalFn } from '@vueuse/core'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t } = useI18n()
const theme = useTheme()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()
const vuetorrentStore = useVueTorrentStore()

const canvas = ref<HTMLCanvasElement>()

const comment = ref('')
const downloadSpeedAvg = ref(0)
const files = ref<TorrentFile[]>([])
const selectedFileCount = ref(0)
const torrentFileCount = ref(0)
const torrentFileName = ref('')
const torrentPieceSize = ref(0)
const torrentPieceOwned = ref(0)
const torrentPieceCount = ref(0)
const uploadSpeedAvg = ref(0)

const torrentStateColor = computed(() => `torrent-${ props.torrent.state }`)
const pieceSize = computed(() => `${ parseInt(formatDataValue(torrentPieceSize.value, true)) } ${ formatDataUnit(torrentPieceSize.value, true) }`)
const isFetchingMetadata = computed(() => props.torrent.state === TorrentState.META_DL)
const shouldRenderPieceState = computed(() => !isFetchingMetadata.value && torrentPieceCount.value > 0 && torrentPieceCount.value < vuetorrentStore.canvasRenderThreshold)
const shouldRefreshPieceState = computed(() => shouldRenderPieceState.value && torrentPieceCount.value < vuetorrentStore.canvasRefreshThreshold)

async function getTorrentProperties() {
  const ppts = await torrentStore.getTorrentProperties(props.torrent.hash)
  comment.value = ppts.comment
  downloadSpeedAvg.value = ppts.dl_speed_avg
  torrentPieceCount.value = ppts.pieces_num
  torrentPieceOwned.value = ppts.pieces_have
  torrentPieceSize.value = ppts.piece_size
  uploadSpeedAvg.value = ppts.up_speed_avg
}

async function updateTorrentFiles() {
  files.value = await maindataStore.fetchFiles(props.torrent.hash)
  torrentFileCount.value = files.value.length
  const selectedFiles = files.value.filter(f => f.priority !== FilePriority.DO_NOT_DOWNLOAD)
  selectedFileCount.value = selectedFiles.length
  if (selectedFileCount.value === 1) {
    torrentFileName.value = selectedFiles[0].name
  }
}

/**
 * Source:
 * https://github.com/qbittorrent/qBittorrent/blob/6229b817300344759139d2fedbd59651065a561d/src/webui/www/private/scripts/prop-general.js#L230
 */
async function renderTorrentPieceStates() {
  if (!canvas.value) return

  const pieces = await maindataStore.fetchPieceState(props.torrent.hash)

  canvas.value.width = pieces.length || -1
  const ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Group contiguous colors together and draw as a single rectangle
  let color = ''
  let rectWidth = 1

  for (let i = 0; i < pieces.length; ++i) {
    const state = pieces[i]
    let newColor = ''

    if (state === PieceState.DOWNLOADING) newColor = theme.current.value.colors['torrent-downloading']
    else if (state === PieceState.DOWNLOADED) newColor = theme.current.value.colors['torrent-pausedUP']
    else if (state === PieceState.MISSING) {
      const selected_piece_ranges = files.value.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).map(file => file.piece_range)
      for (const [min_piece_range, max_piece_range] of selected_piece_ranges) {
        if (i > min_piece_range && i < max_piece_range) {
          newColor = theme.current.value.colors['torrent-pausedDL']
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
      ctx.fillRect(i - rectWidth, 0, rectWidth, canvas.value.height)
    }

    rectWidth = 1
    color = newColor
  }

  // Fill a rect at the end of the canvas if one is needed
  if (color !== '') {
    ctx.fillStyle = color
    ctx.fillRect(pieces.length - rectWidth, 0, rectWidth, canvas.value.height)
  }
}

async function copyHash() {
  await navigator.clipboard.writeText(props.torrent.hash)
}

function openMoveTorrentDialog(mode: 'dl' | 'save') {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [props.torrent.hash], mode })
}

function openMoveTorrentFileDialog() {
  dialogStore.createDialog(MoveTorrentFileDialog, {
    hash: props.torrent.hash,
    isFolder: false,
    oldName: torrentFileName.value
  })
}

const { resume: resumeTimer, pause: pauseTimer } = useIntervalFn(async () => {
  await updateTorrentFiles()
  if (shouldRefreshPieceState.value) {
    await renderTorrentPieceStates()
  }
}, vuetorrentStore.fileContentInterval, {
  immediate: true,
  immediateCallback: true
})

watch(
  () => props.isActive,
  newValue => {
    if (newValue) {
      resumeTimer()
    } else {
      pauseTimer()
    }
  }
)

watch(
  () => props.torrent,
  async () => {
    await getTorrentProperties()
  }
)

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) return false

  if (e.key === 'd') {
    e.preventDefault()
    openMoveTorrentDialog('dl')
    return true
  }

  if (e.key === 's') {
    e.preventDefault()
    openMoveTorrentDialog('save')
    return true
  }

  if (e.key === 'f' && selectedFileCount.value === 1) {
    e.preventDefault()
    openMoveTorrentFileDialog()
    return true
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <v-card v-if="torrent">
    <v-card-title class="text-wrap">{{ torrent.name }}</v-card-title>
    <v-card-subtitle>
      <div>
        <span v-for="commentPart in splitByUrl(comment)">
          <a v-if="stringContainsUrl(commentPart)" target="_blank" :href="commentPart">{{ commentPart }}</a>
          <span v-else>{{ commentPart }}</span>
        </span>
      </div>
      <div class="my-1">
        <span class="mr-2">{{ torrent.hash }}</span>
        <v-btn variant="outlined" rounded @click="copyHash">{{ $t('torrentDetail.overview.copy_hash') }}</v-btn>
      </div>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="4">
              <v-progress-circular :color="torrentStateColor" :indeterminate="isFetchingMetadata" :size="100"
                                   :model-value="torrent?.progress * 100 ?? 0" :width="15">
                <template v-slot>
                  <span v-if="isFetchingMetadata">{{ $t('torrentDetail.overview.fetchingMetadata') }}</span>
                  <v-icon v-else-if="torrent.progress === 1" icon="mdi-check" size="x-large" />
                  <span v-else>{{ formatPercent(torrent.progress) }}</span>
                </template>
              </v-progress-circular>
            </v-col>
            <v-col cols="8" class="d-flex flex-column align-center justify-center">
              <div v-if="isFetchingMetadata">
                <span>{{ $t('torrentDetail.overview.waitingForMetadata') }}</span>
              </div>
              <div v-else-if="shouldRenderPieceState">
                <canvas ref="canvas" width="0" height="10" />
              </div>

              <div v-if="!isFetchingMetadata && !shouldRenderPieceState">
                <span>{{ $t('torrentDetail.overview.canvasRenderDisabled') }}</span>
              </div>
              <div v-else-if="!isFetchingMetadata && !shouldRefreshPieceState">
                <span>{{ $t('torrentDetail.overview.canvasRefreshDisabled') }}</span>
              </div>

              <div v-if="torrentPieceCount > 0">
                <span>
                  {{
                    t('torrentDetail.overview.pieceCount', {
                      owned: torrentPieceOwned,
                      total: torrentPieceCount,
                      pieceSize
                    })
                  }}
                </span>
              </div>

              <div>
                <v-icon icon="mdi-arrow-down" />
                {{ formatSpeed(torrent.dlspeed, vuetorrentStore.useBitSpeed) }}

                <v-icon icon="mdi-arrow-up" />
                {{ formatSpeed(torrent.upspeed, vuetorrentStore.useBitSpeed) }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.download_path') }}:</div>
              <div>{{ torrent.download_path }}</div>
              <v-btn icon="mdi-pencil" color="accent" size="x-small" @click="openMoveTorrentDialog('dl')" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.fileCount') }}:</div>
              <div>{{ selectedFileCount }} / {{ torrentFileCount }}</div>
              <div v-if="selectedFileCount === 1">{{ torrentFileName }}</div>
              <v-btn v-if="selectedFileCount === 1" icon="mdi-pencil" color="accent" size="x-small"
                     @click="openMoveTorrentFileDialog" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.save_path') }}:</div>
              <div>{{ torrent.savePath }}</div>
              <v-btn icon="mdi-pencil" color="accent" size="x-small" @click="openMoveTorrentDialog('save')" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.content_path') }}:</div>
              <div>{{ torrent.content_path }}</div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.state') }}:</div>
              <v-chip variant="flat" :color="torrentStateColor">{{ $t(`torrent.state.${ torrent.state }`) }}</v-chip>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.category') }}:</div>
              <v-chip variant="flat" color="category">
                {{ torrent.category.length ? torrent.category : $t('navbar.side.filters.uncategorized') }}
              </v-chip>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.tracker') }}:</div>
              <v-chip variant="flat" color="tracker">
                {{ torrent.tracker ? getDomainBody(torrent.tracker) : $t('navbar.side.filters.untracked') }}
              </v-chip>
            </v-col>
            <v-col cols="6" class="d-flex flex-wrap chipgap">
              <div>{{ $t('torrent.properties.tags') }}:</div>
              <v-chip v-if="torrent.tags" v-for="tag in torrent.tags" :key="tag" variant="flat" color="tag">
                {{ tag }}
              </v-chip>
              <v-chip v-if="!torrent.tags || torrent.tags.length === 0" variant="flat" color="tag">
                {{ $t('navbar.side.filters.untagged') }}
              </v-chip>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.selectedFileSize') }}:</div>
              <div>
                {{ formatData(torrent.size, vuetorrentStore.useBinarySize) }} /
                {{ formatData(torrent.total_size, vuetorrentStore.useBinarySize) }}
              </div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.ratio') }}:</div>
              <div>{{ torrent.ratio }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.downloaded') }}:</div>
              <div>{{ formatData(torrent.downloaded, vuetorrentStore.useBinarySize) }}</div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.uploaded') }}:</div>
              <div>{{ formatData(torrent.uploaded, vuetorrentStore.useBinarySize) }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.dlSpeedAverage') }}:</div>
              <div>{{ formatSpeed(downloadSpeedAvg, vuetorrentStore.useBitSpeed) }}</div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.upSpeedAverage') }}:</div>
              <div>{{ formatSpeed(uploadSpeedAvg, vuetorrentStore.useBitSpeed) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}

.chipgap {
  gap: 4px;
}
</style>
