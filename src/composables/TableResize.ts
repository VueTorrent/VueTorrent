import { onBeforeUnmount, onMounted, onUpdated } from 'vue'
import type { Ref } from 'vue'
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

type ResizeHandleState = {
  cleanup: () => void
  columnKey: string
  col: HTMLTableColElement
  handle: HTMLDivElement
  index: number
}

export function useTableResize(rootRef: Ref<HTMLElement | null>, rootId: Ref<string | undefined>) {
  const vuetorrentStore = useVueTorrentStore()

  let resizeFrameId = 0
  let resetFrameId = 0
  let resizeObserver: ResizeObserver | undefined
  let isApplyingResize = false
  const resizeHandleStates = new Map<HTMLTableCellElement, ResizeHandleState>()
  const resizeLastMouseDownTimes = new Map<number, number>()

  function removeResizeHandle(th: HTMLTableCellElement) {
    const existing = resizeHandleStates.get(th)
    if (!existing) return

    existing.cleanup()
    existing.handle.remove()
    resizeHandleStates.delete(th)
  }

  function clearResizeHandles(root: HTMLElement) {
    for (const th of resizeHandleStates.keys()) {
      removeResizeHandle(th)
    }
    root.querySelectorAll(`.${RESIZE_HANDLE_CLASS}`).forEach(node => node.remove())
  }

  function queueResizeRedraw() {
    cancelAnimationFrame(resizeFrameId)
    resizeFrameId = requestAnimationFrame(drawResizeHandles)
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
      const existing = resizeHandleStates.get(th)

      if (!columnKey) {
        removeResizeHandle(th)
        continue
      }

      if (existing && existing.columnKey === columnKey && existing.index === index && existing.col === currentCol) {
        continue
      }

      removeResizeHandle(th)

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
      resizeHandleStates.set(th, {
        cleanup: () => resizeHandle.removeEventListener('mousedown', onResizeMouseDown),
        columnKey,
        col: currentCol,
        handle: resizeHandle,
        index,
      })
      th.appendChild(resizeHandle)
    }

    const activeHeaders = new Set(headerCells)
    for (const th of resizeHandleStates.keys()) {
      if (!activeHeaders.has(th)) {
        removeResizeHandle(th)
      }
    }
  }

  function drawResizeHandles() {
    const root = rootRef.value
    if (!root) return

    const table = root.querySelector('table')
    const headerCells = Array.from(root.querySelectorAll<HTMLTableCellElement>('thead th'))
    if (!table || headerCells.length < 2) {
      clearResizeHandles(root)
      return
    }

    const resizeColumns = ensureColgroup(table, headerCells)
    const columnKeys = headerCells.map(th => th.dataset.resizableKey)
    const resizeTableKey = rootId.value ? `table:${rootId.value}` : undefined
    const persistedWidths = resizeTableKey ? (vuetorrentStore.tableColumnWidths[resizeTableKey] ?? {}) : {}

    isApplyingResize = true
    resizeObserver?.unobserve(root)
    const widths = resolveColumnWidths(table, headerCells, resizeColumns, columnKeys, persistedWidths)
    applyColumnWidths(resizeColumns, headerCells, widths, columnKeys)
    attachResizeHandles(headerCells, resizeColumns, columnKeys, root, resizeTableKey, table)

    requestAnimationFrame(() => {
      if (rootRef.value !== root) return
      isApplyingResize = false
      resizeObserver?.observe(root)
    })
  }

  function destroyResizeBehavior() {
    const root = rootRef.value
    cancelAnimationFrame(resizeFrameId)
    cancelAnimationFrame(resetFrameId)
    resizeObserver?.disconnect()
    isApplyingResize = false
    if (root) clearResizeHandles(root)
  }

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (isApplyingResize) return
        queueResizeRedraw()
      })
      resizeObserver.observe(rootRef.value)
    }
    queueResizeRedraw()
  })

  onUpdated(queueResizeRedraw)
  onBeforeUnmount(destroyResizeBehavior)
}
