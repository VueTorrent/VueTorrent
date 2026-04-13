<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, useAttrs, useSlots } from 'vue'
import {
  RESIZE_HANDLE_CLASS,
  MIN_RESIZE_COLUMN_WIDTH,
  applyColumnWidths,
  clampResizeDelta,
  createResizeHandle,
  ensureColgroup,
  getResizeColumnWidth,
  resolveColumnWidths,
  setResizeColumnWidth,
} from '@/helpers/tableResize'
import { useVueTorrentStore } from '@/stores'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const rootId = computed(() => attrs.id as string | undefined)
const tableAttrs = computed<Record<string, any>>(() => attrs as Record<string, any>)

const rootRef = ref<HTMLElement | null>(null)
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
const vuetorrentStore = useVueTorrentStore()

let resizeFrameId = 0
let resetFrameId = 0
let resizeObserver: ResizeObserver | undefined
const resizeHandleCleanups: Array<() => void> = []
const resizeLastMouseDownTimes = new Map<number, number>()

function clearResizeHandles(root: HTMLElement) {
  while (resizeHandleCleanups.length) {
    resizeHandleCleanups.pop()?.()
  }
  root.querySelectorAll(`.${RESIZE_HANDLE_CLASS}`).forEach(node => node.remove())
}

function attachResizeHandles(
  headerCells: HTMLTableCellElement[],
  resizeColumns: HTMLTableColElement[],
  columnKeys: (string | undefined)[],
  resizeRoot: HTMLElement,
  resizeTableKey: string | undefined,
  table: HTMLTableElement
) {
  for (let index = 0; index < headerCells.length; index++) {
    const th = headerCells[index]
    const currentCol = resizeColumns[index]
    const columnKey = columnKeys[index]
    if (!columnKey) continue

    const resizeHandle = createResizeHandle()

    function onResizeMouseDown(event: MouseEvent) {
      const now = Date.now()
      const isDoubleClick = now - (resizeLastMouseDownTimes.get(index) ?? 0) < 300
      resizeLastMouseDownTimes.set(index, now)

      event.preventDefault()
      event.stopPropagation()

      if (isDoubleClick) {
        resizeObserver?.unobserve(resizeRoot)
        table.style.tableLayout = 'auto'
        currentCol.style.width = ''
        th.style.width = ''
        if (resizeTableKey && columnKey) {
          vuetorrentStore.clearTableColumnWidth(resizeTableKey, columnKey)
        }
        resetFrameId = requestAnimationFrame(() => {
          const naturalWidth = Math.max(th.getBoundingClientRect().width, MIN_RESIZE_COLUMN_WIDTH)
          table.style.tableLayout = 'fixed'
          setResizeColumnWidth(currentCol, th, naturalWidth)
          resizeObserver?.observe(resizeRoot)
        })
        return
      }

      const startX = event.clientX
      const startWidth = getResizeColumnWidth(th, currentCol)
      const previousCursor = document.body.style.cursor
      const previousUserSelect = document.body.style.userSelect

      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      function onResizeMouseMove(moveEvent: MouseEvent) {
        const delta = clampResizeDelta(moveEvent.clientX - startX, -(startWidth - MIN_RESIZE_COLUMN_WIDTH), Infinity)
        setResizeColumnWidth(currentCol, th, startWidth + delta)
      }

      function onResizeMouseUp() {
        document.removeEventListener('mousemove', onResizeMouseMove)
        document.removeEventListener('mouseup', onResizeMouseUp)
        document.body.style.cursor = previousCursor
        document.body.style.userSelect = previousUserSelect
        if (resizeTableKey && columnKey) {
          const width = getResizeColumnWidth(th, currentCol)
          vuetorrentStore.setTableColumnWidth(resizeTableKey, columnKey, width)
        }
        queueResizeRedraw()
      }

      document.addEventListener('mousemove', onResizeMouseMove)
      document.addEventListener('mouseup', onResizeMouseUp)
    }

    resizeHandle.addEventListener('mousedown', onResizeMouseDown)
    resizeHandleCleanups.push(() => resizeHandle.removeEventListener('mousedown', onResizeMouseDown))
    th.appendChild(resizeHandle)
  }
}

function drawResizeHandles() {
  const root = rootRef.value
  if (!root) return

  clearResizeHandles(root)

  const table = root.querySelector('table')
  const headerCells = Array.from(root.querySelectorAll<HTMLTableCellElement>('thead th'))
  if (!table || headerCells.length < 2) return

  const resizeColumns = ensureColgroup(table, headerCells)
  const columnKeys = headerCells.map(th => th.dataset.resizableKey)
  const resizeTableKey = rootId.value ? `table:${rootId.value}` : undefined
  const persistedWidths = resizeTableKey ? (vuetorrentStore.tableColumnWidths[resizeTableKey] ?? {}) : {}

  resizeObserver?.unobserve(root)
  const widths = resolveColumnWidths(table, headerCells, resizeColumns, columnKeys, persistedWidths)
  applyColumnWidths(resizeColumns, headerCells, widths, columnKeys)
  resizeObserver?.observe(root)

  attachResizeHandles(headerCells, resizeColumns, columnKeys, root, resizeTableKey, table)
}

function queueResizeRedraw() {
  cancelAnimationFrame(resizeFrameId)
  resizeFrameId = requestAnimationFrame(drawResizeHandles)
}

function destroyResizeBehavior() {
  const root = rootRef.value
  cancelAnimationFrame(resizeFrameId)
  cancelAnimationFrame(resetFrameId)
  resizeObserver?.disconnect()
  if (root) clearResizeHandles(root)
}

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    resizeObserver = new ResizeObserver(queueResizeRedraw)
    resizeObserver.observe(rootRef.value)
  }
  queueResizeRedraw()
})

onUpdated(queueResizeRedraw)
onBeforeUnmount(destroyResizeBehavior)
</script>

<template>
  <div ref="rootRef">
    <v-data-table v-bind="tableAttrs as any">
      <template v-for="name in slotNames" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped>
@use 'vuetify/settings';

:deep(th),
:deep(td) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
