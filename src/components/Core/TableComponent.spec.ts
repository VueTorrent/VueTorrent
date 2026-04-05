import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

const tableColumnWidths: Record<string, Record<string, number>> = {}

vi.mock('@/stores', () => {
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

import TableComponent from './TableComponent.vue'
import vuetify from '@/plugins/vuetify'
import { useVueTorrentStore } from '@/stores'

const HANDLE_CLASS = 'vt-resizable-column-handle'
const COLGROUP_CLASS = 'vt-resizable-column-group'
const MIN_COLUMN_WIDTH = 36
const DEFAULT_WIDTH = 120

function buildHeaders(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    title: `Col ${index}`,
    key: `col-${index}`,
    sortable: false,
  }))
}

function mountTableComponent(thCount: number, options: { id?: string; withKeys?: boolean; keyedIndexes?: number[] } = {}) {
  return mount(TableComponent, {
    props: {
      headers: buildHeaders(thCount),
      items: [],
      hideDefaultFooter: true,
    },
    attrs: options.id ? { id: options.id } : {},
    slots: {
      headers: ({ columns }: { columns: Array<{ key: string; title?: string }> }) =>
        h(
          'tr',
          columns.map((column, index) => h('th', options.withKeys || options.keyedIndexes?.includes(index) ? { 'data-resizable-key': column.key } : {}, column.title ?? column.key))
        ),
    },
    global: {
      plugins: [vuetify],
    },
  })
}

function fireMousedown(target: Element, clientX = 0) {
  target.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX,
    })
  )
}

function fireMousemove(clientX: number) {
  document.dispatchEvent(new MouseEvent('mousemove', { clientX }))
}

function fireMouseup() {
  document.dispatchEvent(new MouseEvent('mouseup'))
}

beforeEach(() => {
  vi.useFakeTimers()

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

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return DEFAULT_WIDTH
    },
  })
})

afterEach(() => {
  document.body.innerHTML = ''
  Object.keys(tableColumnWidths).forEach(key => delete tableColumnWidths[key])
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('TableComponent.vue', () => {
  it('attaches resize handles after the first animation frame', () => {
    const wrapper = mountTableComponent(3, { withKeys: true })

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)

    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(3)
  })

  it('does not create handles when fewer than 2 header cells exist', () => {
    const wrapper = mountTableComponent(1, { withKeys: true })

    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)
  })

  it('creates and maintains a managed colgroup sized to the header count', async () => {
    const wrapper = mountTableComponent(3, { withKeys: true })

    vi.runAllTimers()

    const colgroup = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS}`)
    expect(colgroup).toBeTruthy()
    expect(colgroup?.children).toHaveLength(3)

    await wrapper.setProps({})
    vi.runAllTimers()

    expect(wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS}`)).toBe(colgroup)
  })

  it('resizes the column when the handle is dragged right', () => {
    const wrapper = mountTableComponent(2, { withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement

    fireMousedown(handle, 100)
    fireMousemove(150)
    fireMouseup()

    expect(parseFloat(col.style.width)).toBeCloseTo(DEFAULT_WIDTH + 50, 0)
  })

  it('resizes the column when the handle is dragged left', () => {
    const wrapper = mountTableComponent(2, { withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement

    fireMousedown(handle, 200)
    fireMousemove(160)
    fireMouseup()

    expect(parseFloat(col.style.width)).toBeCloseTo(DEFAULT_WIDTH - 40, 0)
  })

  it('enforces the minimum column width during drag', () => {
    const wrapper = mountTableComponent(2, { withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement

    fireMousedown(handle, 200)
    fireMousemove(0)
    fireMouseup()

    expect(parseFloat(col.style.width)).toBeGreaterThanOrEqual(MIN_COLUMN_WIDTH)
  })

  it('sets and restores body cursor and user-select during drag', () => {
    const wrapper = mountTableComponent(2, { withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    fireMousedown(handle, 100)
    expect(document.body.style.cursor).toBe('col-resize')
    expect(document.body.style.userSelect).toBe('none')

    fireMouseup()
    expect(document.body.style.cursor).toBe('')
    expect(document.body.style.userSelect).toBe('')
  })

  it('queues a redraw after mouseup without duplicating handles', () => {
    const wrapper = mountTableComponent(3, { withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    fireMousedown(handle, 100)
    fireMousemove(150)
    fireMouseup()
    vi.runAllTimers()
    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(3)
  })

  it('resets the column to natural width on double-click', () => {
    const wrapper = mountTableComponent(2, { id: 'torrents', withKeys: true })

    vi.runAllTimers()

    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement
    const initialHandle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    fireMousedown(initialHandle, 100)
    fireMousemove(200)
    fireMouseup()
    vi.runAllTimers()

    expect(parseFloat(col.style.width)).toBeGreaterThan(DEFAULT_WIDTH)

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    vi.setSystemTime(1000)
    fireMousedown(handle, 0)

    vi.setSystemTime(1100)
    fireMousedown(handle, 0)
    vi.runAllTimers()

    expect(parseFloat(col.style.width)).toBeCloseTo(DEFAULT_WIDTH, 0)
  })

  it('persists keyed column widths after dragging', () => {
    const wrapper = mountTableComponent(2, { id: 'torrents', withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    fireMousedown(handle, 100)
    fireMousemove(180)
    fireMouseup()
    vi.runAllTimers()

    const store = useVueTorrentStore() as {
      tableColumnWidths: Record<string, Record<string, number>>
    }

    expect(store.tableColumnWidths['table:torrents']?.['col-0']).toBe(Math.ceil(DEFAULT_WIDTH + 80))
  })

  it('restores persisted widths for keyed columns on mount', () => {
    const store = useVueTorrentStore() as {
      tableColumnWidths: Record<string, Record<string, number>>
    }
    store.tableColumnWidths['table:torrents'] = { 'col-0': 222 }

    const wrapper = mountTableComponent(2, { id: 'torrents', withKeys: true })

    vi.runAllTimers()

    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement
    expect(parseFloat(col.style.width)).toBe(222)
  })

  it('clears persisted widths on keyed double-click reset', () => {
    const store = useVueTorrentStore() as {
      tableColumnWidths: Record<string, Record<string, number>>
    }
    store.tableColumnWidths['table:torrents'] = { 'col-0': 222 }

    const wrapper = mountTableComponent(2, { id: 'torrents', withKeys: true })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    vi.setSystemTime(1000)
    fireMousedown(handle, 0)

    vi.setSystemTime(1100)
    fireMousedown(handle, 0)
    vi.runAllTimers()

    expect(store.tableColumnWidths['table:torrents']).toBeUndefined()
  })

  it('observes the resize root when ResizeObserver is available and disconnects on unmount', () => {
    const observeSpy = vi.fn()
    const unobserveSpy = vi.fn()
    const disconnectSpy = vi.fn()

    const MockResizeObserver = vi.fn(function MockResizeObserver(this: ResizeObserver) {
      this.observe = observeSpy
      this.unobserve = unobserveSpy
      this.disconnect = disconnectSpy
    } as any)

    vi.stubGlobal('ResizeObserver', MockResizeObserver)

    const wrapper = mountTableComponent(3, { withKeys: true })

    vi.runAllTimers()

    expect(MockResizeObserver).toHaveBeenCalledOnce()
    expect(observeSpy).toHaveBeenCalledWith(wrapper.element)

    wrapper.unmount()

    expect(disconnectSpy).toHaveBeenCalledOnce()
    vi.unstubAllGlobals()
  })

  it('does not crash when ResizeObserver is unavailable', () => {
    vi.stubGlobal('ResizeObserver', undefined)

    const wrapper = mountTableComponent(3, { withKeys: true })

    expect(() => {
      vi.runAllTimers()
      wrapper.unmount()
    }).not.toThrow()

    vi.unstubAllGlobals()
  })

  it('does not create handles for headers without a resizable key', () => {
    const wrapper = mountTableComponent(3, { keyedIndexes: [1, 2] })

    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(2)
    expect(wrapper.element.querySelector('th:first-child .vt-resizable-column-handle')).toBeNull()
  })
})
