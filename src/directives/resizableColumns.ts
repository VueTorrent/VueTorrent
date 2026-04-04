/**
 * v-resizable-columns
 *
 * Attaches drag handles to every `<th>` (except the first) inside the bound
 * element so the user can resize table columns.  A double-click on a handle
 * resets that column to its natural content width.
 */
import type { Directive } from 'vue'

const HANDLE_CLASS = 'vt-resizable-column-handle'
const COLGROUP_CLASS = 'vt-resizable-column-group'
const MIN_COLUMN_WIDTH = 36

type DirectiveInstance = {
  queueRedraw: () => void
  destroy: () => void
}

const instances = new WeakMap<HTMLElement, DirectiveInstance>()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getColumnWidth(th: HTMLTableCellElement, col: HTMLTableColElement): number {
  return Number.parseFloat(col.style.width) || th.offsetWidth
}

function setColumnWidth(col: HTMLTableColElement, th: HTMLTableCellElement, width: number) {
  const px = `${Math.ceil(width)}px`
  col.style.width = px
  th.style.width = px
}

/** Creates a styled, invisible drag handle element. */
function createHandle(): HTMLDivElement {
  const handle = document.createElement('div')
  handle.classList.add(HANDLE_CLASS)
  handle.setAttribute('aria-hidden', 'true')
  Object.assign(handle.style, {
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
  return handle
}

// ---------------------------------------------------------------------------
// Instance factory
// ---------------------------------------------------------------------------

function createResizableColumnsInstance(el: HTMLElement): DirectiveInstance {
  let frameId = 0
  let resizeObserver: ResizeObserver | undefined
  const handleCleanups: Array<() => void> = []
  const lastMouseDownTimes = new Map<number, number>()

  // Declared before drawHandles so inner callbacks can reference it without
  // relying on implicit function hoisting.
  function queueRedraw() {
    cancelAnimationFrame(frameId)
    frameId = requestAnimationFrame(drawHandles)
  }

  function clearHandles() {
    while (handleCleanups.length) {
      handleCleanups.pop()?.()
    }
    el.querySelectorAll(`.${HANDLE_CLASS}`).forEach(handle => handle.remove())
  }

  function drawHandles() {
    clearHandles()

    const table = el.querySelector('table')
    const headerCells = Array.from(el.querySelectorAll<HTMLTableCellElement>('thead th'))

    if (!table || headerCells.length < 2) return

    // Ensure a managed <colgroup> exists with one <col> per header cell.
    let colgroup = table.querySelector<HTMLTableColElement>(`colgroup.${COLGROUP_CLASS}`)
    if (!colgroup) {
      colgroup = document.createElement('colgroup')
      colgroup.classList.add(COLGROUP_CLASS)
      table.prepend(colgroup)
    }

    while (colgroup.children.length < headerCells.length) {
      colgroup.appendChild(document.createElement('col'))
    }
    while (colgroup.children.length > headerCells.length) {
      colgroup.lastElementChild?.remove()
    }

    const columns = Array.from(colgroup.children) as HTMLTableColElement[]

    // Suspend the ResizeObserver so that switching tableLayout doesn't
    // trigger a recursive redraw.
    resizeObserver?.unobserve(el)

    // For columns that already have an explicit width (set by a previous draw
    // or by dragging) keep that width.  Only measure from the DOM for columns
    // that have no width yet.
    const needsMeasure = columns.some(col => !col.style.width)
    if (needsMeasure) {
      table.style.tableLayout = 'auto'
    }

    const savedWidths = headerCells.map((th, i) => {
      const existing = Number.parseFloat(columns[i].style.width)
      return Number.isFinite(existing) && existing > 0 ? existing : th.getBoundingClientRect().width
    })

    table.style.tableLayout = 'fixed'

    columns.forEach((col, i) => {
      setColumnWidth(col, headerCells[i], savedWidths[i])
      headerCells[i].style.position = 'relative'
      headerCells[i].style.whiteSpace = 'nowrap'
    })

    resizeObserver?.observe(el)

    // Start at index 1 — the first column (tooltip) is intentionally not resizable.
    for (let index = 1; index < headerCells.length; index++) {
      const th = headerCells[index]
      const currentCol = columns[index]

      const handle = createHandle()

      function onMouseDown(event: MouseEvent) {
        const now = Date.now()
        const isDoubleClick = now - (lastMouseDownTimes.get(index) ?? 0) < 300
        lastMouseDownTimes.set(index, now)

        event.preventDefault()
        event.stopPropagation()

        if (isDoubleClick) {
          // Reset the column to its natural content width.
          resizeObserver?.unobserve(el)
          table!.style.tableLayout = 'auto'
          currentCol.style.width = ''
          th.style.width = ''

          requestAnimationFrame(() => {
            const naturalWidth = Math.max(th.getBoundingClientRect().width, MIN_COLUMN_WIDTH)
            table!.style.tableLayout = 'fixed'
            setColumnWidth(currentCol, th, naturalWidth)
            resizeObserver?.observe(el)
          })
          return
        }

        // Single-click drag: resize the column.
        const startX = event.clientX
        const startWidth = getColumnWidth(th, currentCol)
        const previousCursor = document.body.style.cursor
        const previousUserSelect = document.body.style.userSelect

        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'

        function onMouseMove(moveEvent: MouseEvent) {
          const delta = clamp(moveEvent.clientX - startX, -(startWidth - MIN_COLUMN_WIDTH), Infinity)
          setColumnWidth(currentCol, th, startWidth + delta)
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
          document.body.style.cursor = previousCursor
          document.body.style.userSelect = previousUserSelect
          queueRedraw()
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }

      handle.addEventListener('mousedown', onMouseDown)
      handleCleanups.push(() => handle.removeEventListener('mousedown', onMouseDown))

      th.appendChild(handle)
    }
  }

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(queueRedraw)
    resizeObserver.observe(el)
  }

  queueRedraw()

  return {
    queueRedraw,
    destroy() {
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      clearHandles()
    },
  }
}

// ---------------------------------------------------------------------------
// Vue directive
// ---------------------------------------------------------------------------

const resizableColumns: Directive<HTMLElement, void> = {
  mounted(el) {
    instances.set(el, createResizableColumnsInstance(el))
  },
  updated(el) {
    instances.get(el)?.queueRedraw()
  },
  unmounted(el) {
    instances.get(el)?.destroy()
    instances.delete(el)
  },
}

export default resizableColumns
