import { expect, test } from 'vitest'
import { formatPercent, toPrecision, safeDiv } from './number'

describe('helpers/number', () => {
  test('toPrecision', () => {
    expect(toPrecision(0, 3)).toBe('0.00')
    expect(toPrecision(0.1, 3)).toBe('0.10')

    expect(toPrecision(1, 3)).toBe('1.00')

    expect(toPrecision(10, 3)).toBe('10.0')
    expect(toPrecision(10, 2)).toBe('10')
    expect(toPrecision(10, 1)).toBe('10')

    expect(toPrecision(99.99, 3)).toBe('99.9')

    expect(toPrecision(100, 3)).toBe('100')
  })

  test('formatPercent', () => {
    expect(formatPercent(0)).toBe('0.00 %')
    expect(formatPercent(0.1)).toBe('10.0 %')
    expect(formatPercent(1)).toBe('100 %')

    expect(formatPercent(0.999942870757758)).toBe('99.9 %')
  })

  test('safeDiv', () => {
    expect(safeDiv(1, 1)).toBe(1)
    expect(safeDiv(0, 1)).toBe(0)
    expect(safeDiv(1, 0)).toBe(0)
    expect(safeDiv(0, 0)).toBe(0)
    expect(safeDiv(10, 10)).toBe(1)
  })
})
