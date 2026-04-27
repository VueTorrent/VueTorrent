import { onBeforeUnmount, onMounted } from 'vue'
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
  setResizeColumnWidthLocked,
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
  let headerMutationObserver: MutationObserver | undefined
  let observedHeader: HTMLTableSectionElement | null = null
  const resizeHandleStates = new Map<HTMLTableCellElement, ResizeHandleState>()

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

  function syncHeaderObserver(header: HTMLTableSectionElement | null) {
    if (observedHeader === header) return

    headerMutationObserver?.disconnect()
    observedHeader = header

    if (!header || typeof MutationObserver === 'undefined') return

    if (!headerMutationObserver) {
      headerMutationObserver = new MutationObserver(mutations => {
        const hasRelevantMutation = mutations.some(mutation => {
          if (mutation.type === 'characterData') return true
          if (mutation.type !== 'childList') return false

          const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes]
            .filter((node): node is Element => node instanceof Element)
            .filter(node => !node.classList.contains(RESIZE_HANDLE_CLASS))

          return changedNodes.length > 0
        })

        if (hasRelevantMutation) {
          queueResizeRedraw()
        }
      })
    }

    headerMutationObserver.observe(header, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

  function attachResizeHandles(
    headerCells: HTMLTableCellElement[],
    resizeColumns: HTMLTableColElement[],
    columnKeys: (string | undefined)[],
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
        event.preventDefault()
        event.stopPropagation()

        const startX = event.clientX
        const startWidth = getResizeColumnWidth(th, currentCol)
        const previousCursor = document.body.style.cursor
        const previousUserSelect = document.body.style.userSelect

        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'

        function onResizeMouseMove(moveEvent: MouseEvent) {
          const delta = clampResizeDelta(moveEvent.clientX - startX, -(startWidth - MIN_RESIZE_COLUMN_WIDTH), Infinity)
          setResizeColumnWidthLocked(currentCol, true)
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

      function onResizeClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
      }

      function onResizeDoubleClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        table.style.tableLayout = 'auto'
        setResizeColumnWidthLocked(currentCol, false)
        currentCol.style.width = ''
        th.style.width = ''
        if (resizeTableKey && columnKey) {
          vuetorrentStore.clearTableColumnWidth(resizeTableKey, columnKey)
        }
        resetFrameId = requestAnimationFrame(() => {
          const naturalWidth = Math.max(th.getBoundingClientRect().width, MIN_RESIZE_COLUMN_WIDTH)
          table.style.tableLayout = 'fixed'
          setResizeColumnWidth(currentCol, th, naturalWidth)
        })
      }

      resizeHandle.addEventListener('mousedown', onResizeMouseDown)
      resizeHandle.addEventListener('click', onResizeClick)
      resizeHandle.addEventListener('dblclick', onResizeDoubleClick)
      resizeHandleStates.set(th, {
        cleanup: () => {
          resizeHandle.removeEventListener('mousedown', onResizeMouseDown)
          resizeHandle.removeEventListener('click', onResizeClick)
          resizeHandle.removeEventListener('dblclick', onResizeDoubleClick)
        },
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
    const header = table?.querySelector('thead') ?? null
    const headerCells = Array.from(root.querySelectorAll<HTMLTableCellElement>('thead th'))
    if (!table || headerCells.length < 2) {
      syncHeaderObserver(header)
      clearResizeHandles(root)
      return
    }

    syncHeaderObserver(header)

    const resizeColumns = ensureColgroup(table, headerCells)
    const columnKeys = headerCells.map(th => th.dataset.resizableKey)
    const resizeTableKey = rootId.value ? `table:${rootId.value}` : undefined
    const persistedWidths = resizeTableKey ? (vuetorrentStore.tableColumnWidths[resizeTableKey] ?? {}) : {}

    const widths = resolveColumnWidths(table, headerCells, resizeColumns, columnKeys, persistedWidths)
    applyColumnWidths(resizeColumns, headerCells, widths, columnKeys)
    attachResizeHandles(headerCells, resizeColumns, columnKeys, resizeTableKey, table)
  }

  function destroyResizeBehavior() {
    const root = rootRef.value
    cancelAnimationFrame(resizeFrameId)
    cancelAnimationFrame(resetFrameId)
    headerMutationObserver?.disconnect()
    observedHeader = null
    window.removeEventListener('resize', queueResizeRedraw)
    if (root) clearResizeHandles(root)
  }

  onMounted(() => {
    window.addEventListener('resize', queueResizeRedraw)
    queueResizeRedraw()
  })
  onBeforeUnmount(destroyResizeBehavior)
}
