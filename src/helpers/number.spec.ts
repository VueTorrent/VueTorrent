import { formatPercent, toPrecision } from '@/helpers/number'
import { expect, test } from 'vitest'

test('helpers/number/toPrecision', () => {
  expect(toPrecision(0, 3)).toBe('0.00')
  expect(toPrecision(0.1, 3)).toBe('0.10')

  expect(toPrecision(1, 3)).toBe('1.00')

  expect(toPrecision(10, 3)).toBe('10.0')
  expect(toPrecision(10, 2)).toBe('10')
  expect(toPrecision(10, 1)).toBe('10')

  expect(toPrecision(100, 3)).toBe('100')
})

test('helpers/number/formatPercent', () => {
  expect(formatPercent(0)).toBe('0.00 %')
  expect(formatPercent(0.1)).toBe('10.0 %')
  expect(formatPercent(1)).toBe('100 %')
})
