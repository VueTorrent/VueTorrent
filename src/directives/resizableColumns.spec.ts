/**
 * Unit tests for the v-resizable-columns directive.
 *
 * Strategy
 * --------
 * The directive is DOM-heavy: it crawls a real <table> structure, creates
 * drag handles, and reacts to mouse events.  jsdom (configured in
 * vite.config.ts) gives us a real DOM so we can test the full behaviour
 * without standing up a browser.
 *
 * Things that jsdom cannot simulate:
 *   - `offsetWidth` / `getBoundingClientRect` — always 0/empty.  We stub
 *     those with `vi.spyOn` where needed.
 *   - `requestAnimationFrame` — jsdom provides it but it never fires unless
 *     we call `vi.runAllTimers()`.  We use fake timers throughout.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/stores', () => {
  const tableColumnWidths: Record<string, Record<string, number>> = {}

  return {
    useVueTorrentStore: () => ({
      tableColumnWidths,
      setTableColumnWidth: (tableKey: string, columnKey: string, width: number) => {
        if (!tableKey || !columnKey || !Number.isFinite(width) || width <= 0) return
        if (!tableColumnWidths[tableKey]) {
          tableColumnWidths[tableKey] = {}
        }
        tableColumnWidths[tableKey][columnKey] = Math.ceil(width)
      },
      clearTableColumnWidth: (tableKey: string, columnKey: string) => {
        if (!tableKey || !columnKey) return
        const tableEntry = tableColumnWidths[tableKey]
        if (!tableEntry) return
        delete tableEntry[columnKey]
        if (!Object.keys(tableEntry).length) {
          delete tableColumnWidths[tableKey]
        }
      },
    }),
  }
})

import resizableColumns from './resizableColumns'

// ---------------------------------------------------------------------------
// Constants mirrored from the directive (not exported, so we duplicate them)
// ---------------------------------------------------------------------------
const HANDLE_CLASS = 'vt-resizable-column-handle'
const COLGROUP_CLASS = 'vt-resizable-column-group'
const MIN_COLUMN_WIDTH = 36

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal <div> wrapping a <table> with the given number of <th>s. */
function buildTable(thCount: number): HTMLElement {
  const el = document.createElement('div')
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  for (let i = 0; i < thCount; i++) {
    const th = document.createElement('th')
    th.textContent = `Col ${i}`
    tr.appendChild(th)
  }

  thead.appendChild(tr)
  table.appendChild(thead)
  el.appendChild(table)
  document.body.appendChild(el)
  return el
}

/** Fire a mousedown event on an element. */
function fireMousedown(target: Element, clientX = 0) {
  target.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX,
    })
  )
}

/** Fire a mousemove event on document. */
function fireMousemove(clientX: number) {
  document.dispatchEvent(new MouseEvent('mousemove', { clientX }))
}

/** Fire a mouseup event on document. */
function fireMouseup() {
  document.dispatchEvent(new MouseEvent('mouseup'))
}

/** Mount the directive on el without a Vue app (call lifecycle hooks directly). */
function mountDirective(el: HTMLElement) {
  resizableColumns.mounted!(el, {} as any, {} as any, {} as any)
}

function updateDirective(el: HTMLElement) {
  resizableColumns.updated!(el, {} as any, {} as any, {} as any)
}

function unmountDirective(el: HTMLElement) {
  resizableColumns.unmounted!(el, {} as any, {} as any, {} as any)
}

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------

// Stub getBoundingClientRect to return a predictable width.
const DEFAULT_WIDTH = 120

beforeEach(() => {
  vi.useFakeTimers()

  // Make every element report a 120 px wide bounding rect.
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

  // jsdom doesn't implement offsetWidth; default is 0 which breaks clamp logic.
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return DEFAULT_WIDTH
    },
  })
})

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// Directive lifecycle
// ---------------------------------------------------------------------------

describe('directive lifecycle', () => {
  it('mounted: attaches handles after the first animation frame', () => {
    const el = buildTable(3)
    mountDirective(el)

    // No handles yet – drawHandles is queued via rAF.
    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)

    vi.runAllTimers()

    // 3 columns → handles on index 1 and 2 (not index 0).
    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(2)
  })

  it('updated: queues a redraw', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    // Add a fourth column and call updated.
    const th = document.createElement('th')
    el.querySelector('tr')!.appendChild(th)
    updateDirective(el)
    vi.runAllTimers()

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(3)
  })

  it('unmounted: removes all handles and disconnects observers', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`).length).toBeGreaterThan(0)

    unmountDirective(el)

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)
  })

  it('unmounted: cancels pending animation frame (no error after removal)', () => {
    const el = buildTable(3)
    mountDirective(el)
    // Unmount *before* the rAF fires – should not throw.
    expect(() => {
      unmountDirective(el)
      vi.runAllTimers()
    }).not.toThrow()
  })
})

// ---------------------------------------------------------------------------
// Handle creation
// ---------------------------------------------------------------------------

describe('handle creation', () => {
  it('does not create handles when fewer than 2 header cells exist', () => {
    const el = buildTable(1)
    mountDirective(el)
    vi.runAllTimers()

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)
  })

  it('does not create handles when there is no table', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    mountDirective(el)
    vi.runAllTimers()

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)
  })

  it('creates N-1 handles for N header cells (first column excluded)', () => {
    for (const count of [2, 3, 5]) {
      document.body.innerHTML = ''
      const el = buildTable(count)
      mountDirective(el)
      vi.runAllTimers()

      expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(count - 1)
    }
  })

  it('handle has aria-hidden and col-resize cursor', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()
    vi.setSystemTime(1000)

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    expect(handle).toBeTruthy()
    expect(handle.getAttribute('aria-hidden')).toBe('true')
    expect(handle.style.cursor).toBe('col-resize')
  })

  it('handle is appended inside the <th>', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    const ths = el.querySelectorAll('th')
    // First th should NOT have a handle.
    expect(ths[0].querySelector(`.${HANDLE_CLASS}`)).toBeNull()
    // Second and third th SHOULD have a handle.
    expect(ths[1].querySelector(`.${HANDLE_CLASS}`)).toBeTruthy()
    expect(ths[2].querySelector(`.${HANDLE_CLASS}`)).toBeTruthy()
  })
})

// ---------------------------------------------------------------------------
// colgroup management
// ---------------------------------------------------------------------------

describe('colgroup management', () => {
  it('creates a managed <colgroup> on first draw', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    const colgroup = el.querySelector(`colgroup.${COLGROUP_CLASS}`)
    expect(colgroup).toBeTruthy()
    expect(colgroup!.children).toHaveLength(3)
  })

  it('reuses an existing managed <colgroup> on redraw', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    const colgroup1 = el.querySelector(`colgroup.${COLGROUP_CLASS}`)

    // Trigger a second draw.
    updateDirective(el)
    vi.runAllTimers()

    const colgroup2 = el.querySelector(`colgroup.${COLGROUP_CLASS}`)
    expect(colgroup1).toBe(colgroup2)
  })

  it('adjusts col count when columns are added', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    // Add a column.
    const th = document.createElement('th')
    el.querySelector('tr')!.appendChild(th)
    updateDirective(el)
    vi.runAllTimers()

    expect(el.querySelector(`colgroup.${COLGROUP_CLASS}`)!.children).toHaveLength(3)
  })

  it('adjusts col count when columns are removed', () => {
    const el = buildTable(4)
    mountDirective(el)
    vi.runAllTimers()

    // Remove a column.
    el.querySelector('tr')!.lastElementChild!.remove()
    updateDirective(el)
    vi.runAllTimers()

    expect(el.querySelector(`colgroup.${COLGROUP_CLASS}`)!.children).toHaveLength(3)
  })

  it('sets table-layout to fixed after drawing', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    expect(el.querySelector('table')!.style.tableLayout).toBe('fixed')
  })
})

// ---------------------------------------------------------------------------
// Drag – column resizing
// ---------------------------------------------------------------------------

describe('drag resize', () => {
  it('resizes the column when the handle is dragged right', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!

    const startX = 100
    const delta = 50
    fireMousedown(handle, startX)
    fireMousemove(startX + delta)
    fireMouseup()

    // The column style width should reflect the drag delta.
    const newWidth = parseFloat(col.style.width)
    expect(newWidth).toBeCloseTo(DEFAULT_WIDTH + delta, 0)
  })

  it('resizes the column when the handle is dragged left', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!

    const startX = 200
    const delta = -40
    fireMousedown(handle, startX)
    fireMousemove(startX + delta)
    fireMouseup()

    const newWidth = parseFloat(col.style.width)
    expect(newWidth).toBeCloseTo(DEFAULT_WIDTH + delta, 0)
  })

  it('enforces minimum column width during drag', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!

    // Drag so far left that it would go below MIN_COLUMN_WIDTH.
    fireMousedown(handle, 200)
    fireMousemove(0) // huge leftward drag
    fireMouseup()

    const newWidth = parseFloat(col.style.width)
    expect(newWidth).toBeGreaterThanOrEqual(MIN_COLUMN_WIDTH)
  })

  it('sets col-resize cursor on body during drag and restores it on mouseup', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!

    fireMousedown(handle, 100)
    expect(document.body.style.cursor).toBe('col-resize')

    fireMouseup()
    expect(document.body.style.cursor).toBe('')
  })

  it('disables text selection on body during drag and restores it on mouseup', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!

    fireMousedown(handle, 100)
    expect(document.body.style.userSelect).toBe('none')

    fireMouseup()
    expect(document.body.style.userSelect).toBe('')
  })

  it('queues a redraw after mouseup', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    fireMousedown(handle, 100)
    fireMousemove(150)
    fireMouseup()

    // The rAF queued by queueRedraw should fire and re-attach handles.
    vi.runAllTimers()
    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(2)
  })

  it('mousemove before mousedown does not affect width', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!
    const widthBefore = col.style.width

    // Move without a preceding mousedown on the handle.
    fireMousemove(999)
    expect(col.style.width).toBe(widthBefore)
  })
})

// ---------------------------------------------------------------------------
// Double-click – auto-size reset
// ---------------------------------------------------------------------------

describe('double-click auto-size', () => {
  it('resets column to natural width on double-click (< 300 ms between clicks)', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!

    // First set a custom width via drag so we can confirm it gets cleared.
    fireMousedown(handle, 100)
    fireMousemove(200)
    fireMouseup()
    vi.runAllTimers()

    const widthAfterDrag = parseFloat(col.style.width)
    expect(widthAfterDrag).toBeGreaterThan(DEFAULT_WIDTH)

    // Re-acquire handle after redraw.
    const handle2 = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!

    // Simulate two mousedowns < 300 ms apart.
    vi.setSystemTime(1000)
    fireMousedown(handle2, 0)

    vi.setSystemTime(1100) // 100 ms later → double-click
    fireMousedown(handle2, 0)

    // After the rAF in the double-click handler resolves, width should be
    // reset to natural (mocked getBoundingClientRect → DEFAULT_WIDTH).
    vi.runAllTimers()

    const widthAfterReset = parseFloat(col.style.width)
    expect(widthAfterReset).toBeCloseTo(DEFAULT_WIDTH, 0)
  })

  it('does NOT reset if two clicks are more than 300 ms apart', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const handle = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!

    const nowSpy = vi.spyOn(Date, 'now')
    let now = 1_000_000
    nowSpy.mockImplementation(() => now)

    // Drag to a custom width first.
    fireMousedown(handle, 100)
    fireMousemove(250)
    fireMouseup()
    vi.runAllTimers()

    const handle2 = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!
    const widthAfterDrag = parseFloat(col.style.width)
    expect(widthAfterDrag).toBeGreaterThan(DEFAULT_WIDTH)

    // Two clicks > 300 ms apart → NOT a double-click.
    now = 1_001_000
    fireMousedown(handle2, 0)
    expect(col.style.width).not.toBe('')
    fireMouseup()
    vi.runAllTimers()

    const handle3 = el.querySelector<HTMLElement>(`.${HANDLE_CLASS}`)!
    now = 1_001_500
    fireMousedown(handle3, 0)
    expect(col.style.width).not.toBe('')
    fireMouseup()
    vi.runAllTimers()
  })
})

// ---------------------------------------------------------------------------
// ResizeObserver integration
// ---------------------------------------------------------------------------

describe('ResizeObserver integration', () => {
  it('calls observe on the host element when ResizeObserver is available', () => {
    const observeSpy = vi.fn()
    const disconnectSpy = vi.fn()
    const unobserveSpy = vi.fn()

    const MockResizeObserver = vi.fn(function MockResizeObserver(this: any, _callback: ResizeObserverCallback) {
      this.observe = observeSpy
      this.unobserve = unobserveSpy
      this.disconnect = disconnectSpy
    })

    vi.stubGlobal('ResizeObserver', MockResizeObserver)

    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    expect(MockResizeObserver).toHaveBeenCalledOnce()
    expect(observeSpy).toHaveBeenCalledWith(el)

    vi.unstubAllGlobals()
  })

  it('disconnects ResizeObserver on unmount', () => {
    const disconnectSpy = vi.fn()

    const MockResizeObserver = vi.fn(function MockResizeObserver(this: any, _callback: ResizeObserverCallback) {
      this.observe = vi.fn()
      this.unobserve = vi.fn()
      this.disconnect = disconnectSpy
    })

    vi.stubGlobal('ResizeObserver', MockResizeObserver)

    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    unmountDirective(el)

    expect(disconnectSpy).toHaveBeenCalledOnce()

    vi.unstubAllGlobals()
  })

  it('works without ResizeObserver (no crash when undefined)', () => {
    // Remove ResizeObserver from global scope.
    const original = (globalThis as any).ResizeObserver
    ;(globalThis as any).ResizeObserver = undefined

    const el = buildTable(3)
    expect(() => {
      mountDirective(el)
      vi.runAllTimers()
      unmountDirective(el)
    }).not.toThrow()
    ;(globalThis as any).ResizeObserver = original
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('edge cases', () => {
  it('redraw clears old handles before attaching new ones (no duplicates)', () => {
    const el = buildTable(3)
    mountDirective(el)
    vi.runAllTimers()

    // Force two redraws.
    updateDirective(el)
    vi.runAllTimers()
    updateDirective(el)
    vi.runAllTimers()

    expect(el.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(2)
  })

  it('preserves explicit column width across redraws', () => {
    const el = buildTable(2)
    mountDirective(el)
    vi.runAllTimers()

    const col = el.querySelector<HTMLElement>(`colgroup.${COLGROUP_CLASS} col:nth-child(2)`)!

    // Simulate a previous resize by setting an explicit width.
    col.style.width = '200px'

    updateDirective(el)
    vi.runAllTimers()

    // The explicit width should be preserved.
    expect(parseFloat(col.style.width)).toBeCloseTo(200, 0)
  })
})
