import { expect, test } from 'vitest'
import { getColorFromName, getRatioColor } from './colors'

test('helpers/colors/getColorFromName', () => {
  expect(getColorFromName('foo')).toBe('#7b2fde')
  expect(getColorFromName('bar')).toBe('#97e374')
  expect(getColorFromName('baz')).toBe('#447ecf')
})

test('helpers/colors/getRatioColor', () => {
  expect(getRatioColor(0)).toBe('text-ratio-bad')
  expect(getRatioColor(0.4)).toBe('text-ratio-bad')
  expect(getRatioColor(0.5)).toBe('text-ratio-almost')
  expect(getRatioColor(0.9)).toBe('text-ratio-almost')
  expect(getRatioColor(1)).toBe('text-ratio-good')
  expect(getRatioColor(4.9)).toBe('text-ratio-good')
  expect(getRatioColor(5)).toBe('text-ratio-best')
  expect(getRatioColor(10)).toBe('text-ratio-best')
})
