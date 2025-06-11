<script setup lang="ts">
import { FilePriority, PieceState } from '@/constants/qbit'
import { TorrentState } from '@/constants/vuetorrent'
import { getTorrentStateColor } from '@/helpers'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import IntervalTree from '@flatten-js/interval-tree'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const theme = useTheme()
const contentStore = useContentStore()
const { cachedFiles } = storeToRefs(contentStore)
const { fileContentInterval } = storeToRefs(useVueTorrentStore())

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

function getPieceStateColor(piece: PieceState) {
  switch (piece) {
    case PieceState.MISSING:
      return getTorrentStateColor(TorrentState.DL_STOPPED)
    case PieceState.DOWNLOADING:
      return getTorrentStateColor(TorrentState.DOWNLOADING)
    case PieceState.DOWNLOADED:
      return getTorrentStateColor(TorrentState.UL_STALLED)
  }
}

function renderWrapper() {
  renderCanvas().catch(() => {})
}

const { pause, resume } = useIntervalFn(renderWrapper, fileContentInterval, {
  immediate: false,
  immediateCallback: true
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
})

onBeforeUnmount(() => {
  app.value?.destroy({ removeView: false }, { children: true })
})

onBeforeRouteLeave(() => !isPieceCanvasOverviewOpened.value)
</script>

<template>
  <v-dialog v-model="isPieceCanvasOverviewOpened">
    <template v-slot:activator="{ props }">
      <canvas v-bind="props" ref="canvas" class="cursor-pointer" width="4096" height="20" />
    </template>

    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ $t('torrentDetail.overview.piece_canvas_dialog.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="isPieceCanvasOverviewOpened = false" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-row flex-wrap ga-1">
          <div v-for="(piece, i) in cachedPieces" :key="i" :class="['piece-single', `bg-${getPieceStateColor(piece)}`]" />
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

.piece-single {
  height: 12px;
  width: 12px;
}
</style>
