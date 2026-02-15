<script setup lang="ts">
import IntervalTree from '@flatten-js/interval-tree'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useTheme } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { FilePriority, PieceState } from '@/constants/qbit'
import { TorrentState } from '@/constants/vuetorrent'
import { formatPercent, getFileIcon, getTorrentStateColor } from '@/helpers'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t } = useI18nUtils()
const theme = useTheme()
const contentStore = useContentStore()
const { cachedFiles } = storeToRefs(contentStore)
const vueTorrentStore = useVueTorrentStore()
const { fileContentInterval, piecesViewSplitByFile } = storeToRefs(vueTorrentStore)

const canvas = ref<HTMLCanvasElement>()
const renderCanvasRunning = ref(false)
const app = shallowRef<Application>()
const lastGraphics = shallowRef<Graphics>()
const cachedPieces = ref<PieceState[]>([])
const isPieceCanvasOverviewOpened = ref(false)

async function renderCanvas() {
  if (renderCanvasRunning.value || !canvas.value || !app.value) return

  renderCanvasRunning.value = true

  cachedPieces.value = await contentStore.fetchPieceState(props.torrent.hash)

  const selectedRanges = new IntervalTree()
  cachedFiles.value.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).forEach(file => selectedRanges.insert(file.piece_range, file.name))

  const graphics = new Graphics()

  // Group contiguous colors together and draw as a single rectangle
  let color = ''
  let rectWidth = 1

  for (let i = 0; i < cachedPieces.value.length; ++i) {
    const state = cachedPieces.value[i]
    let newColor = ''

    if (state === PieceState.DOWNLOADING) newColor = theme.current.value.colors['torrent-downloading']
    else if (state === PieceState.DOWNLOADED) newColor = theme.current.value.colors['torrent-ul_stopped']
    else if (state === PieceState.MISSING && selectedRanges.intersect_any([i, i])) newColor = theme.current.value.colors['torrent-dl_stopped']

    if (newColor === color) {
      ++rectWidth
      continue
    }

    if (color !== '') {
      graphics.rect(((i - rectWidth) / cachedPieces.value.length) * canvas.value.width, 0, (rectWidth / cachedPieces.value.length) * canvas.value.width, canvas.value.height)
      graphics.fill(color)
    }

    rectWidth = 1
    color = newColor
  }

  // Fill a rect at the end of the canvas if one is needed
  if (color !== '') {
    graphics.rect(
      ((cachedPieces.value.length - rectWidth) / cachedPieces.value.length) * canvas.value.width,
      0,
      (rectWidth / cachedPieces.value.length) * canvas.value.width,
      canvas.value.height
    )
    graphics.fill(color)
  }

  app.value.stage.addChild(graphics)
  if (lastGraphics.value) lastGraphics.value.destroy()
  lastGraphics.value = graphics
  renderCanvasRunning.value = false
}

function getPieceStateColor(piece: PieceState | undefined) {
  switch (piece) {
    case PieceState.MISSING:
    case undefined:
      return getTorrentStateColor(TorrentState.DL_STOPPED)
    case PieceState.DOWNLOADING:
      return getTorrentStateColor(TorrentState.DOWNLOADING)
    case PieceState.DOWNLOADED:
      return getTorrentStateColor(TorrentState.UL_STALLED)
  }
}

function getPieceAtIndex(index: number): PieceState | undefined {
  return cachedPieces.value[index]
}

function getPieceStateKey(state: PieceState | undefined): string {
  switch (state) {
    case PieceState.MISSING:
      return 'missing'
    case PieceState.DOWNLOADING:
      return 'downloading'
    case PieceState.DOWNLOADED:
      return 'downloaded'
    default:
      return 'downloaded'
  }
}

function getFileColor(priority: FilePriority): string {
  return priority === FilePriority.DO_NOT_DOWNLOAD ? 'grey' : ''
}

function getPieceTooltip(pieceIndex: number): string {
  const state = getPieceAtIndex(pieceIndex)
  const stateKey = getPieceStateKey(state)
  const stateText = t(`torrentDetail.overview.piece_canvas_dialog.piece_states.${stateKey}`)
  return t('torrentDetail.overview.piece_canvas_dialog.piece_tooltip', { index: pieceIndex, state: stateText })
}

function renderWrapper() {
  renderCanvas().catch(() => {})
}

const { pause, resume } = useIntervalFn(renderWrapper, fileContentInterval, {
  immediate: false,
  immediateCallback: true,
})

watch(
  () => props.isActive,
  isActive => {
    if (isActive) resume()
    else pause()
  }
)

onMounted(() => {
  if (!canvas.value) return

  const application = new Application()
  application
    .init({ antialias: true, width: canvas.value?.width, height: canvas.value?.height, canvas: canvas.value })
    .then(() => (app.value = application))
    .then(() => props.isActive && resume())
    .catch(() => (app.value = undefined))
})

onBeforeUnmount(() => {
  app.value?.destroy({ removeView: false }, { children: true })
})

onBeforeRouteLeave(() => !isPieceCanvasOverviewOpened.value)
</script>

<template>
  <v-dialog v-model="isPieceCanvasOverviewOpened">
    <template #activator="{ props: dialogProps }">
      <canvas v-bind="dialogProps" ref="canvas" class="cursor-pointer" width="4096" height="20" />
    </template>

    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ $t('torrentDetail.overview.piece_canvas_dialog.title') }}</v-toolbar-title>
          <v-spacer />
          <v-checkbox v-model="piecesViewSplitByFile" :label="$t('torrentDetail.overview.piece_canvas_dialog.split_by_file')" hide-details density="compact" class="mr-2" />
          <v-btn icon="mdi-close" @click="isPieceCanvasOverviewOpened = false" />
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pt-2">
        <div v-if="!piecesViewSplitByFile" class="pieces-container">
          <div v-for="(piece, i) in cachedPieces" :key="i" :class="['piece-single', `bg-${getPieceStateColor(piece)}`]" :title="getPieceTooltip(i)" />
        </div>

        <div v-else id="files-list">
          <div v-if="cachedFiles.length === 0" class="text-center pa-4 text-disabled">
            {{ $t('common.emptyList') }}
          </div>
          <div v-for="file in cachedFiles" :key="file.index" class="file-section">
            <div class="file-header">
              <v-icon :icon="getFileIcon(file.name)" :color="getFileColor(file.priority)" size="small" />
              <span :class="`file-name text-${getFileColor(file.priority)}`">{{ file.name }}</span>
              <span :class="`file-meta text-${getFileColor(file.priority)}`">{{ formatPercent(file.progress) }}</span>
            </div>
            <div v-if="file.priority !== FilePriority.DO_NOT_DOWNLOAD" class="pieces-container">
              <div
                v-for="i in file.piece_range[1] - file.piece_range[0] + 1"
                :key="i"
                :class="['piece-single', `bg-${getPieceStateColor(getPieceAtIndex(file.piece_range[0] + i - 1))}`]"
                :title="getPieceTooltip(file.piece_range[0] + i - 1)" />
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}

.pieces-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  align-items: flex-start;
}

.piece-single {
  height: 12px;
  width: 12px;
  flex-shrink: 0;
}

#files-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
}

.file-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.file-name {
  font-weight: 500;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  font-size: 12px;
  opacity: 0.7;
  flex-shrink: 0;
}
</style>
