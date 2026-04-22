import { afterEach, beforeEach } from 'vitest'
import {
  RESIZE_COLGROUP_CLASS,
  RESIZE_HANDLE_CLASS,
  applyColumnWidths,
  clampResizeDelta,
  createResizeHandle,
  ensureColgroup,
  getResizeColumnWidth,
  resolveColumnWidths,
  setResizeColumnWidth,
} from './tableResize'

const DEFAULT_WIDTH = 100

function makeCells(count: number, keys?: (string | undefined)[]): HTMLTableCellElement[] {
  return Array.from({ length: count }, (_, i) => {
    const th = document.createElement('th')
    const key = keys?.[i]
    if (key) th.dataset.resizableKey = key
    return th
  })
}

describe('helpers/tableResize', () => {
  describe('clampResizeDelta', () => {
    it('passes through values within range', () => {
      expect(clampResizeDelta(50, 0, 100)).toBe(50)
    })

    it('clamps to min', () => {
      expect(clampResizeDelta(-10, 0, 100)).toBe(0)
    })

    it('clamps to max', () => {
      expect(clampResizeDelta(150, 0, 100)).toBe(100)
    })
  })

  describe('getResizeColumnWidth', () => {
    it('returns the parsed col style.width when set', () => {
      const th = document.createElement('th')
      const col = document.createElement('col')
      col.style.width = '150px'
      expect(getResizeColumnWidth(th, col)).toBe(150)
    })

    it('falls back to th.offsetWidth when col has no width', () => {
      const th = document.createElement('th')
      const col = document.createElement('col')
      Object.defineProperty(th, 'offsetWidth', { configurable: true, get: () => DEFAULT_WIDTH })
      expect(getResizeColumnWidth(th, col)).toBe(DEFAULT_WIDTH)
    })
  })

  describe('setResizeColumnWidth', () => {
    it('sets both col and th widths as pixel strings', () => {
      const th = document.createElement('th')
      const col = document.createElement('col')
      setResizeColumnWidth(col, th, 200)
      expect(col.style.width).toBe('200px')
      expect(th.style.width).toBe('200px')
    })
  })

  describe('createResizeHandle', () => {
    it('returns a div with the handle class', () => {
      const handle = createResizeHandle()
      expect(handle.tagName).toBe('DIV')
      expect(handle.classList.contains(RESIZE_HANDLE_CLASS)).toBe(true)
    })

    it('sets aria-hidden', () => {
      expect(createResizeHandle().getAttribute('aria-hidden')).toBe('true')
    })

    it('does not set inline styles', () => {
      const handle = createResizeHandle()
      expect(handle.getAttribute('style')).toBeNull()
    })
  })

  describe('ensureColgroup', () => {
    let table: HTMLTableElement

    beforeEach(() => {
      table = document.createElement('table')
    })

    it('creates a colgroup with the correct class and the right number of cols', () => {
      const cols = ensureColgroup(table, makeCells(3))
      const colgroup = table.querySelector(`colgroup.${RESIZE_COLGROUP_CLASS}`)
      expect(colgroup).toBeTruthy()
      expect(cols).toHaveLength(3)
      expect(colgroup?.children).toHaveLength(3)
    })

    it('reuses an existing colgroup on subsequent calls', () => {
      const cells = makeCells(2)
      ensureColgroup(table, cells)
      const colgroup = table.querySelector(`colgroup.${RESIZE_COLGROUP_CLASS}`)
      ensureColgroup(table, cells)
      expect(table.querySelectorAll(`colgroup.${RESIZE_COLGROUP_CLASS}`)).toHaveLength(1)
      expect(colgroup?.children).toHaveLength(2)
    })

    it('adds cols when header count grows', () => {
      ensureColgroup(table, makeCells(2))
      const cols = ensureColgroup(table, makeCells(4))
      expect(cols).toHaveLength(4)
    })

    it('removes cols when header count shrinks', () => {
      ensureColgroup(table, makeCells(4))
      const cols = ensureColgroup(table, makeCells(2))
      expect(cols).toHaveLength(2)
    })
  })

  describe('resolveColumnWidths', () => {
    let table: HTMLTableElement

    beforeEach(() => {
      table = document.createElement('table')
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
        width: DEFAULT_WIDTH,
        height: 40,
        top: 0,
        left: 0,
        right: DEFAULT_WIDTH,
        bottom: 40,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('always sets tableLayout to fixed after resolving', () => {
      const cells = makeCells(1, ['col-0'])
      const cols = ensureColgroup(table, cells)
      resolveColumnWidths(table, cells, cols, ['col-0'], {})
      expect(table.style.tableLayout).toBe('fixed')
    })

    it('uses the measured getBoundingClientRect width as a fallback', () => {
      const cells = makeCells(1, ['col-0'])
      const cols = ensureColgroup(table, cells)
      const widths = resolveColumnWidths(table, cells, cols, ['col-0'], {})
      expect(widths[0]).toBe(DEFAULT_WIDTH)
    })

    it('uses persisted width over measurement when key matches', () => {
      const cells = makeCells(1, ['col-0'])
      const cols = ensureColgroup(table, cells)
      const widths = resolveColumnWidths(table, cells, cols, ['col-0'], { 'col-0': 200 })
      expect(widths[0]).toBe(200)
    })

    it('prefers existing col width over persisted width when the key matches', () => {
      const cells = makeCells(1, ['col-0'])
      const cols = ensureColgroup(table, cells)
      cols[0].style.width = '150px'
      cols[0].dataset.resizableKey = 'col-0'
      const widths = resolveColumnWidths(table, cells, cols, ['col-0'], { 'col-0': 200 })
      expect(widths[0]).toBe(150)
    })

    it('ignores existing col width when the resizable key does not match', () => {
      const cells = makeCells(1, ['col-0'])
      const cols = ensureColgroup(table, cells)
      cols[0].style.width = '150px'
      cols[0].dataset.resizableKey = 'col-OTHER'
      const widths = resolveColumnWidths(table, cells, cols, ['col-0'], {})
      expect(widths[0]).toBe(DEFAULT_WIDTH)
    })
  })

  describe('applyColumnWidths', () => {
    it('sets col and th widths', () => {
      const col = document.createElement('col')
      const th = document.createElement('th')
      applyColumnWidths([col], [th], [180], ['col-0'])
      expect(col.style.width).toBe('180px')
      expect(th.style.width).toBe('180px')
    })

    it('sets position:relative and white-space:nowrap on th', () => {
      const col = document.createElement('col')
      const th = document.createElement('th')
      applyColumnWidths([col], [th], [100], ['col-0'])
      expect(th.style.position).toBe('relative')
      expect(th.style.whiteSpace).toBe('nowrap')
    })

    it('sets data-resizable-key on col when a key is provided', () => {
      const col = document.createElement('col')
      const th = document.createElement('th')
      applyColumnWidths([col], [th], [100], ['my-key'])
      expect(col.dataset.resizableKey).toBe('my-key')
    })

    it('removes data-resizable-key from col when key is undefined', () => {
      const col = document.createElement('col')
      col.dataset.resizableKey = 'old-key'
      const th = document.createElement('th')
      applyColumnWidths([col], [th], [100], [undefined])
      expect(col.dataset.resizableKey).toBeUndefined()
    })
  })
})
