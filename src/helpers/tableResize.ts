export const RESIZE_HANDLE_CLASS = 'vt-resizable-column-handle'
export const RESIZE_COLGROUP_CLASS = 'vt-resizable-column-group'
export const MIN_RESIZE_COLUMN_WIDTH = 36

export function clampResizeDelta(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function getResizeColumnWidth(th: HTMLTableCellElement, col: HTMLTableColElement): number {
  return Number.parseFloat(col.style.width) || th.offsetWidth
}

export function setResizeColumnWidth(col: HTMLTableColElement, th: HTMLTableCellElement, width: number) {
  const px = `${width}px`
  col.style.width = px
  th.style.width = px
}

export function createResizeHandle(): HTMLDivElement {
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

export function ensureColgroup(table: HTMLTableElement, headerCells: HTMLTableCellElement[]): HTMLTableColElement[] {
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

export function resolveColumnWidths(
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

export function applyColumnWidths(resizeColumns: HTMLTableColElement[], headerCells: HTMLTableCellElement[], widths: number[], columnKeys: (string | undefined)[]) {
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
