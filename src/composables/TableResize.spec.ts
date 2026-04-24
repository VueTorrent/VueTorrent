import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import { useTableResize } from './TableResize'
import { RESIZE_COLGROUP_CLASS as COLGROUP_CLASS, RESIZE_HANDLE_CLASS as HANDLE_CLASS } from '@/helpers/tableResize'
import { useVueTorrentStore } from '@/stores'

const tableColumnWidths: Record<string, Record<string, number>> = {}
const DEFAULT_WIDTH = 120

vi.mock('@/stores', () => {
  return {
    useVueTorrentStore: () => ({
      tableColumnWidths,
      setTableColumnWidth: (tableKey: string, columnKey: string, width: number) => {
        if (!tableKey || !columnKey || !Number.isFinite(width) || width <= 0) return
        if (!tableColumnWidths[tableKey]) {
          tableColumnWidths[tableKey] = {}
        }
        tableColumnWidths[tableKey][columnKey] = width
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

const ResizeHarness = defineComponent({
  name: 'ResizeHarness',
  props: {
    columnCount: {
      type: Number,
      required: true,
    },
    tableId: {
      type: String,
      default: undefined,
    },
    keyedIndexes: {
      type: Array as () => number[],
      default: () => [],
    },
  },
  setup(props) {
    const rootRef = ref<HTMLElement | null>(null)
    const rootId = computed(() => props.tableId)

    useTableResize(rootRef, rootId)

    return () =>
      h('div', { ref: rootRef }, [
        h('table', [
          h(
            'thead',
            h(
              'tr',
              Array.from({ length: props.columnCount }, (_, index) => h('th', props.keyedIndexes.includes(index) ? { 'data-resizable-key': `col-${index}` } : {}, `Col ${index}`))
            )
          ),
        ]),
      ])
  },
})

const GrowingHeaderHarness = defineComponent({
  name: 'GrowingHeaderHarness',
  props: {
    showSortIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const rootRef = ref<HTMLElement | null>(null)
    const rootId = computed(() => 'torrents')

    useTableResize(rootRef, rootId)

    return () =>
      h('div', { ref: rootRef }, [
        h('table', [
          h('thead', [
            h('tr', [
              h('th', { 'data-resizable-key': 'name', 'data-natural-width': props.showSortIcon ? '144' : '120' }, [
                h('span', 'Name'),
                props.showSortIcon ? h('span', { class: 'sort-icon' }, 'icon') : null,
              ]),
              h('th', { 'data-resizable-key': 'size', 'data-natural-width': '120' }, 'Size'),
            ]),
          ]),
        ]),
      ])
  },
})

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

function fireClick(target: Element, clientX = 0) {
  target.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX,
    })
  )
}

function fireDblclick(target: Element, clientX = 0) {
  target.dispatchEvent(
    new MouseEvent('dblclick', {
      bubbles: true,
      cancelable: true,
      clientX,
    })
  )
}

describe('composables/TableResize', () => {
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
    vi.unstubAllGlobals()
  })

  it('redraws handles when the header count changes on component update', async () => {
    const wrapper = mount(ResizeHarness, {
      props: {
        columnCount: 2,
        keyedIndexes: [0, 1],
      },
    })

    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(2)
    expect(wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS}`)?.children).toHaveLength(2)

    await wrapper.setProps({
      columnCount: 3,
      keyedIndexes: [0, 1, 2],
    })
    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(3)
    expect(wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS}`)?.children).toHaveLength(3)
  })

  it('keeps existing handle nodes stable across ordinary component updates', async () => {
    const wrapper = mount(ResizeHarness, {
      props: {
        columnCount: 2,
        keyedIndexes: [0, 1],
      },
    })

    vi.runAllTimers()

    const initialHandles = Array.from(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`))
    expect(initialHandles).toHaveLength(2)

    await wrapper.setProps({
      keyedIndexes: [0, 1],
    })
    vi.runAllTimers()

    const updatedHandles = Array.from(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`))
    expect(updatedHandles).toHaveLength(2)
    expect(updatedHandles[0]).toBe(initialHandles[0])
    expect(updatedHandles[1]).toBe(initialHandles[1])
  })

  it('stops click events on the resize handle from bubbling to the header', () => {
    const onHeaderClick = vi.fn()
    const wrapper = mount({
      setup() {
        const rootRef = ref<HTMLElement | null>(null)
        const rootId = computed(() => 'torrents')

        useTableResize(rootRef, rootId)

        return () =>
          h('div', { ref: rootRef }, [
            h('table', [h('thead', [h('tr', [h('th', { 'data-resizable-key': 'col-0', onClick: onHeaderClick }, 'Col 0'), h('th', { 'data-resizable-key': 'col-1' }, 'Col 1')])])]),
          ])
      },
    })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    fireClick(handle)

    expect(onHeaderClick).not.toHaveBeenCalled()
  })

  it('stops double-click events on the resize handle from bubbling to the header', () => {
    const onHeaderDoubleClick = vi.fn()
    const wrapper = mount({
      setup() {
        const rootRef = ref<HTMLElement | null>(null)
        const rootId = computed(() => 'torrents')

        useTableResize(rootRef, rootId)

        return () =>
          h('div', { ref: rootRef }, [
            h('table', [
              h('thead', [h('tr', [h('th', { 'data-resizable-key': 'col-0', onDblclick: onHeaderDoubleClick }, 'Col 0'), h('th', { 'data-resizable-key': 'col-1' }, 'Col 1')])]),
            ]),
          ])
      },
    })

    vi.runAllTimers()

    const handle = wrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement
    fireDblclick(handle)

    expect(onHeaderDoubleClick).not.toHaveBeenCalled()
  })

  it('persists keyed widths from the composable and restores them on remount', () => {
    const firstWrapper = mount(ResizeHarness, {
      props: {
        columnCount: 2,
        tableId: 'torrents',
        keyedIndexes: [0, 1],
      },
    })

    vi.runAllTimers()

    const handle = firstWrapper.element.querySelector(`.${HANDLE_CLASS}`) as HTMLElement

    fireMousedown(handle, 100)
    fireMousemove(175)
    fireMouseup()
    vi.runAllTimers()

    const store = useVueTorrentStore() as {
      tableColumnWidths: Record<string, Record<string, number>>
    }
    expect(store.tableColumnWidths['table:torrents']?.['col-0']).toBe(DEFAULT_WIDTH + 75)

    firstWrapper.unmount()

    const secondWrapper = mount(ResizeHarness, {
      props: {
        columnCount: 2,
        tableId: 'torrents',
        keyedIndexes: [0, 1],
      },
    })

    vi.runAllTimers()

    const col = secondWrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:nth-child(1)`) as HTMLElement
    expect(parseFloat(col.style.width)).toBe(DEFAULT_WIDTH + 75)
  })

  it('remeasures an auto-sized header when its content grows after update', async () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const width = Number.parseFloat((this as HTMLElement).dataset?.naturalWidth ?? `${DEFAULT_WIDTH}`)
      return {
        width,
        height: 40,
        top: 0,
        left: 0,
        right: width,
        bottom: 40,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect
    })

    const wrapper = mount(GrowingHeaderHarness)

    vi.runAllTimers()

    const col = wrapper.element.querySelector(`colgroup.${COLGROUP_CLASS} col:first-child`) as HTMLElement
    expect(parseFloat(col.style.width)).toBe(120)

    await wrapper.setProps({ showSortIcon: true })
    vi.runAllTimers()

    expect(parseFloat(col.style.width)).toBe(144)
  })

  it('disconnects the ResizeObserver and removes handles on unmount', () => {
    const observeSpy = vi.fn()
    const unobserveSpy = vi.fn()
    const disconnectSpy = vi.fn()

    const MockResizeObserver = vi.fn(function MockResizeObserver(this: ResizeObserver) {
      this.observe = observeSpy
      this.unobserve = unobserveSpy
      this.disconnect = disconnectSpy
    } as any)

    vi.stubGlobal('ResizeObserver', MockResizeObserver)

    const wrapper = mount(ResizeHarness, {
      props: {
        columnCount: 3,
        keyedIndexes: [0, 1, 2],
      },
      attachTo: document.body,
    })

    vi.runAllTimers()

    expect(wrapper.element.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(3)
    expect(observeSpy).toHaveBeenCalledWith(wrapper.element)

    wrapper.unmount()

    expect(disconnectSpy).toHaveBeenCalledOnce()
    expect(unobserveSpy).toHaveBeenCalled()
    expect(document.body.querySelectorAll(`.${HANDLE_CLASS}`)).toHaveLength(0)
  })
})
