import type { Directive } from 'vue'

const HANDLE_CLASS = 'vt-resizable-column-handle'
const COLGROUP_CLASS = 'vt-resizable-column-group'
const MIN_COLUMN_WIDTH = 36

type DirectiveInstance = {
  queueRedraw: () => void
  destroy: () => void
}

const instances = new WeakMap<HTMLElement, DirectiveInstance>()

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function setColumnWidth(col: HTMLTableColElement, th: HTMLTableCellElement, width: number) {
  const normalizedWidth = `${Math.ceil(width)}px`
  col.style.width = normalizedWidth
  th.style.width = normalizedWidth
}

function getColumnWidth(th: HTMLTableCellElement, col: HTMLTableColElement) {
  return Number.parseFloat(col.style.width) || th.offsetWidth
}

function createResizableColumnsInstance(el: HTMLElement): DirectiveInstance {
  let frameId = 0
  let resizeObserver: ResizeObserver | undefined
  const handleCleanups: Array<() => void> = []
  const lastMouseDownTimes = new Map<number, number>()

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

    if (!table || headerCells.length < 2) {
      return
    }

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

    // For columns that already have an explicit width (set by a previous
    // draw or by the user dragging), keep that width.  Only measure from
    // the DOM for columns that have no width yet.
    const needsMeasure = columns.some(col => !col.style.width)
    if (needsMeasure) {
      table.style.tableLayout = 'auto'
    }

    const savedWidths = headerCells.map((th, index) => {
      const existing = Number.parseFloat(columns[index].style.width)
      return Number.isFinite(existing) && existing > 0 ? existing : th.getBoundingClientRect().width
    })

    table.style.tableLayout = 'fixed'
    // table.style.width = 'max-content'
    // table.style.minWidth = '100%'

    columns.forEach((col, index) => {
      setColumnWidth(col, headerCells[index], savedWidths[index])
      headerCells[index].style.position = 'relative'
      headerCells[index].style.whiteSpace = 'nowrap'
    })

    resizeObserver?.observe(el)

    // start with 1 to disallow resizing of the tooltip column
    for (let index = 1; index < headerCells.length; index++) {
      const th = headerCells[index]
      const currentCol = columns[index]

      const handle = document.createElement('div')
      handle.classList.add(HANDLE_CLASS)
      handle.setAttribute('aria-hidden', 'true')
      handle.style.position = 'absolute'
      handle.style.top = '0'
      handle.style.right = '-4px'
      handle.style.width = '8px'
      handle.style.height = '100%'
      handle.style.cursor = 'col-resize'
      handle.style.userSelect = 'none'
      handle.style.touchAction = 'none'
      handle.style.zIndex = '3'

      function onMouseDown(event: MouseEvent) {
        const now = Date.now()
        const isDoubleClick = now - (lastMouseDownTimes.get(index) ?? 0) < 300
        lastMouseDownTimes.set(index, now)
        if (isDoubleClick) {
          event.preventDefault()
          event.stopPropagation()

          const table = el.querySelector('table')
          if (!table) return

          resizeObserver?.unobserve(el)
          table.style.tableLayout = 'auto'
          currentCol.style.width = ''
          th.style.width = ''

          requestAnimationFrame(() => {
            const naturalWidth = Math.max(th.getBoundingClientRect().width, MIN_COLUMN_WIDTH)
            table.style.tableLayout = 'fixed'
            setColumnWidth(currentCol, th, naturalWidth)
            resizeObserver?.observe(el)
          })
          return
        }

        event.preventDefault()
        event.stopPropagation()

        const startX = event.clientX
        const startWidth = getColumnWidth(th, currentCol)
        const previousCursor = document.body.style.cursor
        const previousUserSelect = document.body.style.userSelect

        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'

        function onMouseMove(moveEvent: MouseEvent) {
          let delta = moveEvent.clientX - startX
          const maxDecrease = startWidth - MIN_COLUMN_WIDTH
          const maxIncrease = Infinity

          delta = clamp(delta, -maxDecrease, maxIncrease)
          const newWidth = startWidth + delta

          setColumnWidth(currentCol, th, newWidth)
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

  function queueRedraw() {
    cancelAnimationFrame(frameId)
    frameId = requestAnimationFrame(drawHandles)
  }

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => queueRedraw())
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

const resizableColumns: Directive<HTMLElement, void> = {
  mounted(el) {
    const instance = createResizableColumnsInstance(el)
    instances.set(el, instance)
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
