<script setup lang="ts">
import { FilePriority, PieceState } from '@/constants/qbit'
import { useContentStore, useMaindataStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import IntervalTree from '@flatten-js/interval-tree'
import { storeToRefs } from 'pinia'
import { Application, Graphics } from 'pixi.js'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const theme = useTheme()
const { cachedFiles } = storeToRefs(useContentStore())
const maindataStore = useMaindataStore()

const canvas = ref<HTMLCanvasElement>()

// Application/Graphics will throw exception if ref is used, use shallowRef
const appPromise = shallowRef<Promise<Application>>()
const lastGraphics = shallowRef<Graphics>()

// Rudimentary guard to prevent renderCanvas from running concurrently,
// can happen if watch() and onMounted() trigger at the same time
const renderCanvasRunning = ref<boolean>(false)

async function renderCanvas() {
  if (renderCanvasRunning.value || !canvas.value || !appPromise.value) return

  renderCanvasRunning.value = true
  const app = await appPromise.value

  const pieces = await maindataStore.fetchPieceState(props.torrent.hash)

  const selectedRanges = new IntervalTree()
  cachedFiles.value.filter(file => file.priority !== FilePriority.DO_NOT_DOWNLOAD).forEach(file => selectedRanges.insert(file.piece_range, file.name))

  const graphics = new Graphics()

  // Group contiguous colors together and draw as a single rectangle
  let color = ''
  let rectWidth = 1

  for (let i = 0; i < pieces.length; ++i) {
    const state = pieces[i]
    let newColor = ''

    if (state === PieceState.DOWNLOADING) newColor = theme.current.value.colors['torrent-downloading']
    else if (state === PieceState.DOWNLOADED) newColor = theme.current.value.colors['torrent-pausedUP']
    else if (state === PieceState.MISSING && selectedRanges.intersect_any([i, i])) newColor = theme.current.value.colors['torrent-pausedDL']

    if (newColor === color) {
      ++rectWidth
      continue
    }

    if (color !== '') {
      graphics.rect(((i - rectWidth) / pieces.length) * canvas.value.width, 0, (rectWidth / pieces.length) * canvas.value.width, canvas.value.height)
      graphics.fill(color)
    }

    rectWidth = 1
    color = newColor
  }

  // Fill a rect at the end of the canvas if one is needed
  if (color !== '') {
    graphics.rect(((pieces.length - rectWidth) / pieces.length) * canvas.value.width, 0, (rectWidth / pieces.length) * canvas.value.width, canvas.value.height)
    graphics.fill(color)
  }

  app.stage.addChild(graphics)
  if (lastGraphics.value) lastGraphics.value.destroy()
  lastGraphics.value = graphics
  renderCanvasRunning.value = false
}

watch(cachedFiles, () => {
  if (props.isActive) {
    renderCanvas()
  }
})

onMounted(() => {
  if (!canvas.value) return

  appPromise.value = new Promise<Application>(async resolve => {
    const app = new Application()
    await app.init({ antialias: true, width: canvas.value?.width, height: canvas.value?.height, canvas: canvas.value })
    resolve(app)
  })
  if (cachedFiles.value) {
    renderCanvas()
  }
})

onUnmounted(async () => {
  if (!appPromise.value) return

  const app = await appPromise.value
  app.destroy({ removeView: false }, { children: true })
})
</script>

<template>
  <canvas ref="canvas" width="4096" height="20" />
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
