<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, useAttrs, useSlots } from 'vue'
import { useVueTorrentStore } from '@/stores'

const RESIZE_HANDLE_CLASS = 'vt-resizable-column-handle'
const RESIZE_COLGROUP_CLASS = 'vt-resizable-column-group'
const MIN_RESIZE_COLUMN_WIDTH = 36

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const rootId = computed(() => attrs.id as string | undefined)
const tableAttrs = computed<Record<string, any>>(() => attrs as Record<string, any>)

const rootRef = ref<HTMLElement | null>(null)
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
const vuetorrentStore = useVueTorrentStore()

let resizeFrameId = 0
let resizeObserver: ResizeObserver | undefined
const resizeHandleCleanups: Array<() => void> = []
const resizeLastMouseDownTimes = new Map<number, number>()

function clampResizeDelta(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getResizeColumnWidth(th: HTMLTableCellElement, col: HTMLTableColElement): number {
  return Number.parseFloat(col.style.width) || th.offsetWidth
}

function setResizeColumnWidth(col: HTMLTableColElement, th: HTMLTableCellElement, width: number) {
  const px = `${width}px`
  col.style.width = px
  th.style.width = px
}

function createResizeHandle(): HTMLDivElement {
  const resizeHandle = document.createElement('div')
  resizeHandle.classList.add(RESIZE_HANDLE_CLASS)
  resizeHandle.setAttribute('aria-hidden', 'true')
  Object.assign(resizeHandle.style, {
    position: 'absolute',
    top: '0',
    right: '-4px',
    width: '8px',
    height: '100%',
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',
    zIndex: '3',
  })
  return resizeHandle
}

function clearResizeHandles(root: HTMLElement) {
  while (resizeHandleCleanups.length) {
    resizeHandleCleanups.pop()?.()
  }
  root.querySelectorAll(`.${RESIZE_HANDLE_CLASS}`).forEach(node => node.remove())
}

function ensureColgroup(table: HTMLTableElement, headerCells: HTMLTableCellElement[]): HTMLTableColElement[] {
  let colgroup = table.querySelector<HTMLTableColElement>(`colgroup.${RESIZE_COLGROUP_CLASS}`)
  if (!colgroup) {
    colgroup = document.createElement('colgroup')
    colgroup.classList.add(RESIZE_COLGROUP_CLASS)
    table.prepend(colgroup)
  }
  while (colgroup.children.length < headerCells.length) {
    colgroup.appendChild(document.createElement('col'))
  }
  while (colgroup.children.length > headerCells.length) {
    colgroup.lastElementChild?.remove()
  }
  return Array.from(colgroup.children) as HTMLTableColElement[]
}

function resolveColumnWidths(
  table: HTMLTableElement,
  headerCells: HTMLTableCellElement[],
  resizeColumns: HTMLTableColElement[],
  columnKeys: (string | undefined)[],
  persistedWidths: Record<string, number>
): number[] {
  const needsResizeMeasure = resizeColumns.some((col, i) => {
    const key = columnKeys[i]
    const isSameKey = key ? col.dataset.resizableKey === key : col.dataset.resizableKey === undefined
    const persistedWidth = key ? persistedWidths[key] : undefined
    if (Number.isFinite(persistedWidth) && (persistedWidth as number) > 0) return false
    const existing = Number.parseFloat(col.style.width)
    if (isSameKey && Number.isFinite(existing) && existing > 0) return false
    return true
  })

  if (needsResizeMeasure) {
    table.style.tableLayout = 'auto'
  }

  const widths = headerCells.map((th, i) => {
    const key = columnKeys[i]
    const col = resizeColumns[i]
    const isSameKey = key ? col.dataset.resizableKey === key : col.dataset.resizableKey === undefined
    const existing = Number.parseFloat(col.style.width)
    if (isSameKey && Number.isFinite(existing) && existing > 0) return existing
    const persistedWidth = key ? persistedWidths[key] : undefined
    if (Number.isFinite(persistedWidth) && (persistedWidth as number) > 0) return persistedWidth as number
    return th.getBoundingClientRect().width
  })

  table.style.tableLayout = 'fixed'
  return widths
}

function applyColumnWidths(resizeColumns: HTMLTableColElement[], headerCells: HTMLTableCellElement[], widths: number[], columnKeys: (string | undefined)[]) {
  resizeColumns.forEach((col, i) => {
    setResizeColumnWidth(col, headerCells[i], widths[i])
    headerCells[i].style.position = 'relative'
    headerCells[i].style.whiteSpace = 'nowrap'
    const key = columnKeys[i]
    if (key) {
      col.dataset.resizableKey = key
    } else {
      delete col.dataset.resizableKey
    }
  })
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
        requestAnimationFrame(() => {
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

th,
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
